import React, { useEffect, useRef, useState, useMemo } from 'react';
import * as d3 from 'd3';
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

  // Prepare agent data for D3 with fixed positions
  const agentNodes = useMemo(() => {
    const width = dimensions.width;
    const height = dimensions.height;
    const centerX = width / 2;
    const centerY = height / 2;
    const radius = 120;
    
    return Object.entries(agents).map(([id, agent], index) => {
      const angle = (index * 2 * Math.PI) / 3 - Math.PI / 2; // Start from top
      const x = centerX + radius * Math.cos(angle);
      const y = centerY + radius * Math.sin(angle);
      
      return {
        id,
        name: agent.name,
        task: agent.task,
        configured: !!agent.task.trim(),
        status: isRunning ? 'active' : 'idle',
        x,
        y,
        fx: x, // Fix x position
        fy: y  // Fix y position
      };
    });
  }, [agents, dimensions, isRunning]);

  // Create links between all agents (full mesh)
  const agentLinks = useMemo(() => {
    const links = [];
    for (let i = 0; i < agentNodes.length; i++) {
      for (let j = i + 1; j < agentNodes.length; j++) {
        links.push({
          source: agentNodes[i].id,
          target: agentNodes[j].id,
          strength: 0.1,
          active: false
        });
      }
    }
    return links;
  }, [agentNodes]);

  // Initialize D3 simulation
  useEffect(() => {
    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    // Dimensions are now handled in agentNodes useMemo

    // Create a minimal simulation that stops immediately 
    const sim = d3.forceSimulation(agentNodes)
      .force("link", d3.forceLink(agentLinks).id(d => d.id).strength(0))
      .alpha(0) // Set alpha to 0 to stop immediately
      .alphaTarget(0)
      .alphaDecay(1) // Fast decay to stop quickly
      .stop(); // Explicitly stop the simulation

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
    container.append("g").attr("class", "particles");

    // Create agent nodes
    const nodes = container.selectAll(".agent-node")
      .data(agentNodes)
      .enter().append("g")
      .attr("class", "agent-node")
      .on("click", (event, d) => {
        event.stopPropagation();
        if (onAgentClick && !isRunning) {
          console.log('Agent clicked:', d.id); // Debug log
          onAgentClick(d.id);
        }
      })
      .call(d3.drag()
        .on("start", dragstarted)
        .on("drag", dragged)
        .on("end", dragended));

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

    // Set initial positions without tick updates (static positioning)
    links
      .attr("x1", d => agentNodes.find(n => n.id === d.source.id || n.id === d.source)?.x || 0)
      .attr("y1", d => agentNodes.find(n => n.id === d.source.id || n.id === d.source)?.y || 0)
      .attr("x2", d => agentNodes.find(n => n.id === d.target.id || n.id === d.target)?.x || 0)
      .attr("y2", d => agentNodes.find(n => n.id === d.target.id || n.id === d.target)?.y || 0);

    nodes
      .attr("transform", d => `translate(${d.x},${d.y})`);

    function dragstarted(event, d) {
      // Disable dragging for stable positioning
      event.subject.fx = event.subject.x;
      event.subject.fy = event.subject.y;
    }

    function dragged(event, d) {
      // Allow minimal dragging but keep position fixed
      event.subject.fx = event.x;
      event.subject.fy = event.y;
      // Update visual position immediately
      d3.select(event.sourceEvent.target.parentNode)
        .attr("transform", `translate(${event.x},${event.y})`);
    }

    function dragended(event, d) {
      // Return to fixed position after drag
      const originalNode = agentNodes.find(n => n.id === event.subject.id);
      event.subject.fx = originalNode.x;
      event.subject.fy = originalNode.y;
      // Snap back to original position
      d3.select(event.sourceEvent.target.parentNode)
        .transition()
        .duration(200)
        .attr("transform", `translate(${originalNode.x},${originalNode.y})`);
    }

    return () => {
      sim.stop();
    };
  }, [agentNodes, agentLinks, dimensions, onAgentClick, isRunning]);

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