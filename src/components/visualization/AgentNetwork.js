import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import { v4 as uuidv4 } from 'uuid';
import './AgentNetwork.css';

const AgentNetwork = ({ 
  agents, 
  isRunning, 
  onAgentClick,
  communicationLogs = [],
  task = ""
}) => {
  const svgRef = useRef();
  const [dimensions, setDimensions] = useState({ width: 600, height: 400 });
  const [simulation, setSimulation] = useState(null);
  const [currentCommunication, setCurrentCommunication] = useState(null);

  // Prepare agent data for D3
  const agentNodes = Object.entries(agents).map(([id, agent], index) => ({
    id,
    name: agent.name,
    task: agent.task,
    configured: !!agent.task.trim(),
    status: isRunning ? 'active' : 'idle',
    x: 300 + 150 * Math.cos((index * 2 * Math.PI) / 3),
    y: 200 + 150 * Math.sin((index * 2 * Math.PI) / 3),
    fx: null, // Allow initial positioning
    fy: null
  }));

  // Create links between all agents (full mesh)
  const agentLinks = [];
  for (let i = 0; i < agentNodes.length; i++) {
    for (let j = i + 1; j < agentNodes.length; j++) {
      agentLinks.push({
        source: agentNodes[i].id,
        target: agentNodes[j].id,
        strength: 0.1,
        active: false
      });
    }
  }

  // Initialize D3 simulation
  useEffect(() => {
    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    const width = dimensions.width;
    const height = dimensions.height;

    // Create simulation
    const sim = d3.forceSimulation(agentNodes)
      .force("link", d3.forceLink(agentLinks).id(d => d.id).strength(0.1))
      .force("charge", d3.forceManyBody().strength(-300))
      .force("center", d3.forceCenter(width / 2, height / 2))
      .force("collision", d3.forceCollide().radius(60));

    setSimulation(sim);

    // Create groups
    const container = svg.append("g").attr("class", "network-container");

    // Create gradient definitions
    const defs = svg.append("defs");
    
    const gradient = defs.append("linearGradient")
      .attr("id", "agentGradient")
      .attr("gradientUnits", "objectBoundingBox");
    
    gradient.append("stop")
      .attr("offset", "0%")
      .attr("stop-color", "#00d4ff");
    
    gradient.append("stop")
      .attr("offset", "100%")
      .attr("stop-color", "#ff006e");

    // Create communication gradient
    const commGradient = defs.append("linearGradient")
      .attr("id", "communicationGradient")
      .attr("gradientUnits", "objectBoundingBox");
    
    commGradient.append("stop")
      .attr("offset", "0%")
      .attr("stop-color", "#00d4ff")
      .attr("stop-opacity", 0.8);
    
    commGradient.append("stop")
      .attr("offset", "50%")
      .attr("stop-color", "#ffffff")
      .attr("stop-opacity", 1);
    
    commGradient.append("stop")
      .attr("offset", "100%")
      .attr("stop-color", "#ff006e")
      .attr("stop-opacity", 0.8);

    // Create links
    const links = container.selectAll(".link")
      .data(agentLinks)
      .enter().append("line")
      .attr("class", "link")
      .attr("stroke", "rgba(255, 255, 255, 0.1)")
      .attr("stroke-width", 2);

    // Create communication particles container
    const particleContainer = container.append("g").attr("class", "particles");

    // Create agent nodes
    const nodes = container.selectAll(".agent-node")
      .data(agentNodes)
      .enter().append("g")
      .attr("class", "agent-node")
      .call(d3.drag()
        .on("start", dragstarted)
        .on("drag", dragged)
        .on("end", dragended))
      .on("click", (event, d) => {
        if (onAgentClick && !isRunning) {
          onAgentClick(d.id);
        }
      });

    // Agent circles
    nodes.append("circle")
      .attr("r", 40)
      .attr("fill", d => d.configured ? "url(#agentGradient)" : "rgba(255, 255, 255, 0.2)")
      .attr("stroke", d => d.configured ? "#00d4ff" : "rgba(255, 255, 255, 0.3)")
      .attr("stroke-width", 3)
      .attr("class", "agent-circle");

    // Agent status indicator
    nodes.append("circle")
      .attr("r", 8)
      .attr("cx", 25)
      .attr("cy", -25)
      .attr("fill", d => d.configured ? "#4caf50" : "#ffc107")
      .attr("class", "status-indicator");

    // Agent labels
    nodes.append("text")
      .attr("text-anchor", "middle")
      .attr("dy", ".35em")
      .attr("fill", "white")
      .attr("font-weight", "bold")
      .attr("font-size", "12px")
      .text(d => d.name);

    // Agent task preview (on hover)
    nodes.append("title")
      .text(d => d.task || "Click to configure");

    // Update simulation on tick
    sim.on("tick", () => {
      links
        .attr("x1", d => d.source.x)
        .attr("y1", d => d.source.y)
        .attr("x2", d => d.target.x)
        .attr("y2", d => d.target.y);

      nodes
        .attr("transform", d => `translate(${d.x},${d.y})`);
    });

    function dragstarted(event, d) {
      if (!event.active) sim.alphaTarget(0.3).restart();
      d.fx = d.x;
      d.fy = d.y;
    }

    function dragged(event, d) {
      d.fx = event.x;
      d.fy = event.y;
    }

    function dragended(event, d) {
      if (!event.active) sim.alphaTarget(0);
      d.fx = null;
      d.fy = null;
    }

    return () => {
      sim.stop();
    };
  }, [agentNodes.length, dimensions, onAgentClick, isRunning]);

  // Animate communications
  useEffect(() => {
    if (!simulation || !isRunning) return;

    const svg = d3.select(svgRef.current);
    const container = svg.select(".network-container");

    // Activate links during communication
    const links = container.selectAll(".link");
    links
      .transition()
      .duration(500)
      .attr("stroke", "url(#communicationGradient)")
      .attr("stroke-width", 4)
      .attr("opacity", 0.8);

    // Create communication particles
    const createParticle = (link) => {
      const particle = container.select(".particles")
        .append("circle")
        .attr("r", 4)
        .attr("fill", "#00d4ff")
        .attr("cx", link.source.x)
        .attr("cy", link.source.y)
        .attr("opacity", 0);

      particle
        .transition()
        .duration(2000)
        .ease(d3.easeLinear)
        .attr("cx", link.target.x)
        .attr("cy", link.target.y)
        .attr("opacity", 1)
        .transition()
        .duration(500)
        .attr("opacity", 0)
        .remove();
    };

    // Animate particles on all links
    agentLinks.forEach((link, index) => {
      setTimeout(() => {
        if (simulation) createParticle(link);
      }, index * 500);
    });

    // Pulse agent nodes
    const nodes = container.selectAll(".agent-circle");
    nodes
      .transition()
      .duration(1000)
      .attr("r", 45)
      .transition()
      .duration(1000)
      .attr("r", 40);

  }, [isRunning, simulation, agentLinks]);

  // Handle communication logs
  useEffect(() => {
    if (communicationLogs.length > 0) {
      const latest = communicationLogs[communicationLogs.length - 1];
      setCurrentCommunication(latest);
      setTimeout(() => setCurrentCommunication(null), 3000);
    }
  }, [communicationLogs]);

  // Handle resize
  useEffect(() => {
    const handleResize = () => {
      const container = svgRef.current?.parentElement;
      if (container) {
        setDimensions({
          width: container.offsetWidth,
          height: Math.max(400, container.offsetHeight)
        });
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="agent-network-container">
      <div className="network-header">
        <h4>Agent Communication Network</h4>
        {task && (
          <div className="current-task">
            <strong>Task:</strong> {task}
          </div>
        )}
      </div>
      
      <div className="network-visualization">
        <svg
          ref={svgRef}
          width={dimensions.width}
          height={dimensions.height}
          className="agent-network-svg"
        >
        </svg>
        
        {currentCommunication && (
          <div className="communication-overlay">
            <div className="communication-bubble">
              <div className="comm-from">
                {currentCommunication.from} → {currentCommunication.to}
              </div>
              <div className="comm-message">
                {currentCommunication.message}
              </div>
            </div>
          </div>
        )}
      </div>

      {isRunning && (
        <div className="network-status">
          <div className="status-indicator pulsing"></div>
          <span>Agents are communicating...</span>
        </div>
      )}
    </div>
  );
};

export default AgentNetwork;