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
  const [dimensions] = useState({ width: 600, height: 400 });

  // Prepare agent data with static positions (no D3 simulation)
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
        y
      };
    });
  }, [agents, dimensions, isRunning]);

  // Create links between all agents (full mesh)
  const agentLinks = useMemo(() => {
    const links = [];
    for (let i = 0; i < agentNodes.length; i++) {
      for (let j = i + 1; j < agentNodes.length; j++) {
        links.push({
          source: agentNodes[i],
          target: agentNodes[j],
          strength: 0.1,
          active: false
        });
      }
    }
    return links;
  }, [agentNodes]);

  // Initialize static SVG visualization (NO D3 SIMULATION)
  useEffect(() => {
    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

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
      .attr("stop-color", "#ff006e")
      .attr("stop-opacity", 0.8);

    // Create static links between agents
    container.selectAll(".link")
      .data(agentLinks)
      .enter().append("line")
      .attr("class", "link")
      .attr("stroke", "rgba(255, 255, 255, 0.1)")
      .attr("stroke-width", 2)
      .attr("x1", d => d.source.x)
      .attr("y1", d => d.source.y)
      .attr("x2", d => d.target.x)
      .attr("y2", d => d.target.y);

    // Create communication particles container
    container.append("g").attr("class", "particles");

    // Create static agent nodes (NO SIMULATION - STATIC POSITIONING)
    const nodes = container.selectAll(".agent-node")
      .data(agentNodes)
      .enter().append("g")
      .attr("class", "agent-node")
      .attr("transform", d => `translate(${d.x},${d.y})`)
      .style("cursor", "pointer")
      .on("click", (event, d) => {
        event.stopPropagation();
        if (onAgentClick && !isRunning) {
          console.log('Agent clicked:', d.id); // Debug log
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

    // Agent status indicator (yellow dot for configuration)
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

  }, [agentNodes, agentLinks, onAgentClick, isRunning]);

  // Animate communications (simplified for static visualization)
  useEffect(() => {
    if (!isRunning) return;

    const svg = d3.select(svgRef.current);
    const container = svg.select(".network-container");

    // Activate links during communication
    const links = container.selectAll(".link");
    links
      .transition()
      .duration(500)
      .attr("stroke", "rgba(0, 212, 255, 0.6)")
      .attr("stroke-width", 3)
      .transition()
      .duration(500)
      .attr("stroke", "rgba(255, 255, 255, 0.1)")
      .attr("stroke-width", 2);

    // Animate agents pulsing
    const nodes = container.selectAll(".agent-circle");
    nodes
      .transition()
      .duration(1000)
      .attr("r", 45)
      .transition()
      .duration(1000)
      .attr("r", 40);

    // Create communication particles with static coordinates
    const createParticle = (sourceNode, targetNode) => {
      const particle = container.select(".particles")
        .append("circle")
        .attr("r", 4)
        .attr("fill", "#00d4ff")
        .attr("cx", sourceNode.x)
        .attr("cy", sourceNode.y)
        .attr("opacity", 0);

      particle
        .transition()
        .duration(2000)
        .ease(d3.easeLinear)
        .attr("cx", targetNode.x)
        .attr("cy", targetNode.y)
        .attr("opacity", 1)
        .transition()
        .duration(500)
        .attr("opacity", 0)
        .remove();
    };

    // Animate particles on all links
    agentLinks.forEach((link, index) => {
      setTimeout(() => {
        createParticle(link.source, link.target);
      }, index * 500);
    });

  }, [isRunning, agentLinks]);

  // Handle communication logs
  useEffect(() => {
    if (communicationLogs.length === 0) return;
    
    const latestLog = communicationLogs[communicationLogs.length - 1];
    console.log('Latest communication:', latestLog);
    
    // You could add visual feedback here based on communication logs
  }, [communicationLogs]);

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
          className="agent-network-svg"
          width={dimensions.width}
          height={dimensions.height}
          viewBox={`0 0 ${dimensions.width} ${dimensions.height}`}
        />
      </div>
      
      {isRunning && (
        <div className="communication-status">
          <span className="status-indicator">🔄 Agents communicating...</span>
        </div>
      )}
    </div>
  );
};

export default AgentNetwork;