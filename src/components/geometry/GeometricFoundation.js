import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import * as d3 from 'd3';
import './GeometricFoundation.css';

const GeometricFoundation = ({ isActive, communicationRadius = 120, onRadiusChange }) => {
  const svgRef = useRef();
  const [numAgents, setNumAgents] = useState(3);
  const [taskComplexity, setTaskComplexity] = useState(50);
  const [agentSpecialization, setAgentSpecialization] = useState(50);
  const [informationQuality, setInformationQuality] = useState(75);
  const [dimensions] = useState({ width: 500, height: 350 });
  const [coordinationState, setCoordinationState] = useState('analyzing');
  const [realMetrics, setRealMetrics] = useState({
    taskSuccessRate: 0,
    coordinationOverhead: 0,
    adaptationSpeed: 0
  });

  // Agent positions in metric space
  const [agents, setAgents] = useState([
    { id: 1, x: 150, y: 200, vx: 0, vy: 0, connected: false },
    { id: 2, x: 300, y: 150, vx: 0, vy: 0, connected: false },
    { id: 3, x: 450, y: 250, vx: 0, vy: 0, connected: false }
  ]);

  // Mathematical insights to display
  const insights = {
    coordination: {
      title: "Coordination Condition",
      equation: "d(aᵢ, aⱼ) ≤ r_comm",
      description: "Agents can coordinate when their distance is within communication radius"
    },
    emergence: {
      title: "Emergent Behavior", 
      equation: "G = ∪ᵢ{aⱼ : d(aᵢ, aⱼ) ≤ r}",
      description: "Group behavior emerges from local geometric constraints"
    },
    connectivity: {
      title: "Network Resilience",
      equation: "λ₂(L) > 0 ⟺ Connected",
      description: "Network resilience - how many backup communication paths exist between agents when connections fail"
    },
    phase: {
      title: "Phase Transition",
      equation: "r_critical = √(ln(n)/n) × A",
      description: "Critical radius threshold for global coordination"
    }
  };

  // Calculate if agents can communicate
  const calculateConnections = useCallback(() => {
    const connections = [];
    const updatedAgents = agents.map(agent => ({ ...agent, connected: false }));
    
    for (let i = 0; i < agents.length; i++) {
      for (let j = i + 1; j < agents.length; j++) {
        const dx = agents[i].x - agents[j].x;
        const dy = agents[i].y - agents[j].y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance <= communicationRadius) {
          connections.push({ source: i, target: j, distance });
          updatedAgents[i].connected = true;
          updatedAgents[j].connected = true;
        }
      }
    }
    
    setAgents(updatedAgents);
    return connections;
  }, [agents, communicationRadius]);

  // Check if network is fully connected
  const isNetworkConnected = useCallback((connections) => {
    if (agents.length <= 1) return true;
    
    const graph = Array(agents.length).fill().map(() => []);
    connections.forEach(conn => {
      graph[conn.source].push(conn.target);
      graph[conn.target].push(conn.source);
    });
    
    const visited = new Set();
    const dfs = (node) => {
      visited.add(node);
      graph[node].forEach(neighbor => {
        if (!visited.has(neighbor)) dfs(neighbor);
      });
    };
    
    dfs(0);
    return visited.size === agents.length;
  }, [agents]);

  // Calculate real AI metrics based on parameters
  const calculateRealMetrics = useCallback(() => {
    const connections = calculateConnections();
    const connected = isNetworkConnected(connections);
    const connectivity = connections.length / ((agents.length * (agents.length - 1)) / 2);
    
    // Task Success Rate: depends on coordination bandwidth, task complexity, and specialization balance
    const bandwidthFactor = (communicationRadius - 50) / 150; // 0-1 scale
    const complexityPenalty = taskComplexity / 100; // Higher complexity needs more coordination
    const specializationBalance = 1 - Math.abs(agentSpecialization - 50) / 50; // Sweet spot around 50%
    const qualityBonus = informationQuality / 100;
    
    let taskSuccessRate = Math.max(0, Math.min(100, 
      (bandwidthFactor * 40 + // Bandwidth contribution
       specializationBalance * 30 + // Specialization balance
       qualityBonus * 20 + // Information quality
       (connected ? 10 : 0)) * // Connection bonus
      (1 - complexityPenalty * 0.3) // Complexity penalty
    ));

    // Coordination Overhead: higher when bandwidth is low but specialization is high
    const overheadFromSpecialization = (agentSpecialization / 100) * (1 - bandwidthFactor);
    const overheadFromComplexity = (taskComplexity / 100) * (1 - bandwidthFactor);
    const coordinationOverhead = Math.max(0, Math.min(100,
      (overheadFromSpecialization * 50 + overheadFromComplexity * 30 + 
       (connected ? 0 : 20)) // Extra overhead if not connected
    ));

    // Adaptation Speed: how quickly network adjusts to changes
    const adaptationSpeed = Math.max(0, Math.min(100,
      bandwidthFactor * 40 + // Higher bandwidth = faster adaptation
      (informationQuality / 100) * 30 + // Better info = faster decisions
      connectivity * 30 // More connections = more adaptation paths
    ));

    setRealMetrics({
      taskSuccessRate: Math.round(taskSuccessRate),
      coordinationOverhead: Math.round(coordinationOverhead),
      adaptationSpeed: Math.round(adaptationSpeed)
    });
  }, [agents, communicationRadius, taskComplexity, agentSpecialization, informationQuality, calculateConnections, isNetworkConnected]);

  // Update coordination state and real metrics
  useEffect(() => {
    const connections = calculateConnections();
    const connected = isNetworkConnected(connections);
    const connectivityRatio = connections.length / ((agents.length * (agents.length - 1)) / 2);
    
    if (connected && connectivityRatio > 0.8) {
      setCoordinationState('optimal');
    } else if (connected) {
      setCoordinationState('coordinated');
    } else if (connectivityRatio > 0.3) {
      setCoordinationState('fragmented');
    } else {
      setCoordinationState('isolated');
    }

    calculateRealMetrics();
  }, [communicationRadius, agents, taskComplexity, agentSpecialization, informationQuality, calculateConnections, isNetworkConnected, calculateRealMetrics]);

  // D3 visualization
  useEffect(() => {
    if (!isActive) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    const width = dimensions.width;
    const height = dimensions.height;

    // Create container
    const container = svg.append("g").attr("class", "geometry-container");

    // Create gradients
    const defs = svg.append("defs");
    
    const coordinationGradient = defs.append("radialGradient")
      .attr("id", "coordinationGradient")
      .attr("cx", "50%")
      .attr("cy", "50%")
      .attr("r", "50%");
    
    coordinationGradient.append("stop")
      .attr("offset", "0%")
      .attr("stop-color", "rgba(0, 212, 255, 0.3)")
      .attr("stop-opacity", 1);
    
    coordinationGradient.append("stop")
      .attr("offset", "100%")
      .attr("stop-color", "rgba(0, 212, 255, 0)")
      .attr("stop-opacity", 0);

    // Draw task complexity field (deformed landscape)
    const complexityField = container.append("g").attr("class", "complexity-field");
    
    const numPoints = 20;
    for (let i = 0; i < numPoints; i++) {
      for (let j = 0; j < numPoints; j++) {
        const x = (width / numPoints) * i;
        const y = (height / numPoints) * j;
        const distanceFromCenter = Math.sqrt((x - width/2)**2 + (y - height/2)**2);
        const maxDistance = Math.sqrt((width/2)**2 + (height/2)**2);
        const intensity = (taskComplexity / 100) * (1 - distanceFromCenter / maxDistance);
        
        complexityField.append("circle")
          .attr("cx", x)
          .attr("cy", y)
          .attr("r", 1)
          .attr("fill", `rgba(255, 0, 110, ${intensity * 0.3})`)
          .attr("opacity", 0.5);
      }
    }

    // Draw communication radius circles
    agents.forEach(agent => {
      container.append("circle")
        .attr("cx", agent.x)
        .attr("cy", agent.y)
        .attr("r", communicationRadius)
        .attr("fill", "url(#coordinationGradient)")
        .attr("stroke", "rgba(0, 212, 255, 0.5)")
        .attr("stroke-width", 1)
        .attr("stroke-dasharray", "3,3")
        .attr("class", "comm-radius");
    });

    // Draw connections
    const connections = calculateConnections();
    connections.forEach(conn => {
      const source = agents[conn.source];
      const target = agents[conn.target];
      
      container.append("line")
        .attr("x1", source.x)
        .attr("y1", source.y)
        .attr("x2", target.x)
        .attr("y2", target.y)
        .attr("stroke", "rgba(0, 212, 255, 0.8)")
        .attr("stroke-width", 2)
        .attr("class", "coordination-link")
        .style("filter", "drop-shadow(0 0 3px rgba(0, 212, 255, 0.6))");
    });

    // Draw agents
    agents.forEach(agent => {
      const agentGroup = container.append("g")
        .attr("transform", `translate(${agent.x}, ${agent.y})`);
      
      agentGroup.append("circle")
        .attr("r", 12)
        .attr("fill", agent.connected ? "#00d4ff" : "rgba(255, 255, 255, 0.3)")
        .attr("stroke", agent.connected ? "#00d4ff" : "rgba(255, 255, 255, 0.5)")
        .attr("stroke-width", 2)
        .attr("class", "geometry-agent")
        .style("filter", agent.connected ? "drop-shadow(0 0 6px rgba(0, 212, 255, 0.8))" : "none");
      
      agentGroup.append("text")
        .attr("text-anchor", "middle")
        .attr("dy", "0.35em")
        .attr("fill", "white")
        .attr("font-size", "10")
        .attr("font-weight", "bold")
        .text(agent.id);
    });

    // Add geodesic paths (shortest coordination routes)
    if (coordinationState === 'optimal' || coordinationState === 'coordinated') {
      connections.forEach(conn => {
        const source = agents[conn.source];
        const target = agents[conn.target];
        
        container.append("path")
          .attr("d", `M ${source.x} ${source.y} Q ${(source.x + target.x)/2} ${(source.y + target.y)/2 - 20} ${target.x} ${target.y}`)
          .attr("stroke", "rgba(255, 193, 7, 0.6)")
          .attr("stroke-width", 1)
          .attr("fill", "none")
          .attr("stroke-dasharray", "2,2")
          .attr("class", "geodesic-path");
      });
    }

  }, [isActive, communicationRadius, agents, taskComplexity, coordinationState, calculateConnections, dimensions.width, dimensions.height]);

  // Generate agents based on number
  useEffect(() => {
    const newAgents = [];
    for (let i = 0; i < numAgents; i++) {
      const angle = (i * 2 * Math.PI) / numAgents;
      const radius = 100;
      const centerX = dimensions.width / 2;
      const centerY = dimensions.height / 2;
      
      newAgents.push({
        id: i + 1,
        x: centerX + radius * Math.cos(angle),
        y: centerY + radius * Math.sin(angle),
        vx: 0,
        vy: 0,
        connected: false
      });
    }
    setAgents(newAgents);
  }, [numAgents, dimensions]);

  const getCoordinationDescription = () => {
    switch(coordinationState) {
      case 'optimal':
        return "Perfect coordination achieved - all agents connected with optimal information flow";
      case 'coordinated': 
        return "Network connected - coordination possible but suboptimal";
      case 'fragmented':
        return "Partial connectivity - some coordination clusters formed";
      case 'isolated':
        return "Insufficient connectivity - agents cannot coordinate effectively";
      default:
        return "Analyzing coordination topology...";
    }
  };

  const getPhaseColor = () => {
    switch(coordinationState) {
      case 'optimal': return '#4caf50';
      case 'coordinated': return '#00d4ff';
      case 'fragmented': return '#ffc107';
      case 'isolated': return '#f44336';
      default: return '#666';
    }
  };

  const getComplexityLabel = (value) => {
    if (value < 25) return 'Simple';
    if (value < 50) return 'Moderate';
    if (value < 75) return 'Complex';
    return 'Intricate';
  };

  const getSpecializationLabel = (value) => {
    if (value < 25) return 'Generalist';
    if (value < 50) return 'Hybrid';
    if (value < 75) return 'Focused';
    return 'Specialist';
  };

  const getQualityLabel = (value) => {
    if (value < 25) return 'Uncertain';
    if (value < 50) return 'Noisy';
    if (value < 75) return 'Clean';
    return 'Precise';
  };

  return (
    <div className="geometric-foundation">
      <div className="foundation-header">
        <h3>The geometry of agentic AI</h3>
        <p>
          True agency emerges not from programming, but from geometric constraints in metric spaces. 
          Adjust the parameters below to witness phase transitions in coordination behavior.
        </p>
      </div>

      <div className="geometry-workspace-side-by-side">
        {/* Left: Visualization and Performance Metrics */}
        <div className="geometry-viz-section">
          <div className="viz-header">
            <h4>Real AI System Performance</h4>
            <div className="coordination-status">
              <div 
                className="status-indicator"
                style={{ backgroundColor: getPhaseColor() }}
              />
              <span className="status-text">{coordinationState.toUpperCase()}</span>
            </div>
          </div>
          
          <svg
            ref={svgRef}
            width={dimensions.width}
            height={dimensions.height}
            className="geometry-svg"
            viewBox={`0 0 ${dimensions.width} ${dimensions.height}`}
          />
          
          <div className="real-metrics-display">
            <div className="metrics-grid">
              <div className="metric-card">
                <div className="metric-label">Task Success Rate</div>
                <div className="metric-value">{realMetrics.taskSuccessRate}%</div>
                <div className="metric-desc">Problems solved correctly</div>
              </div>
              <div className="metric-card">
                <div className="metric-label">Coordination Overhead</div>
                <div className="metric-value">{realMetrics.coordinationOverhead}%</div>
                <div className="metric-desc">Extra communication needed</div>
              </div>
              <div className="metric-card">
                <div className="metric-label">Adaptation Speed</div>
                <div className="metric-value">{realMetrics.adaptationSpeed}%</div>
                <div className="metric-desc">Network adjustment rate</div>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Interactive Controls */}
        <div className="geometry-controls-sidebar">
          <h4>Real AI System Parameters</h4>
          <div className="controls-column">
            <div className="control-group">
              <label htmlFor="coord-bandwidth">
                Coordination Bandwidth: <span className="value">{communicationRadius}</span>
              </label>
              <input
                id="coord-bandwidth"
                type="range"
                min="50"
                max="200"
                value={communicationRadius}
                onChange={(e) => onRadiusChange && onRadiusChange(parseInt(e.target.value))}
                className="control-slider"
              />
              <div className="control-description">
                How much information agents can share per interaction. High bandwidth = full context & attachments, low bandwidth = brief summaries only.
              </div>
            </div>

            <div className="control-group">
              <label htmlFor="task-complexity">
                Task Complexity: <span className="value">{getComplexityLabel(taskComplexity)}</span>
              </label>
              <input
                id="task-complexity"
                type="range"
                min="0"
                max="100"
                value={taskComplexity}
                onChange={(e) => setTaskComplexity(parseInt(e.target.value))}
                className="control-slider"
              />
              <div className="control-description">
                Simple tasks like "sort emails" need minimal coordination. Complex tasks like "draft quarterly report" require extensive back-and-forth.
              </div>
            </div>

            <div className="control-group">
              <label htmlFor="agent-specialization">
                Agent Specialization: <span className="value">{getSpecializationLabel(agentSpecialization)}</span>
              </label>
              <input
                id="agent-specialization"
                type="range"
                min="0"
                max="100"
                value={agentSpecialization}
                onChange={(e) => setAgentSpecialization(parseInt(e.target.value))}
                className="control-slider"
              />
              <div className="control-description">
                Specialists (legal, financial, writing agents) need more coordination but solve complex problems. Generalists coordinate easily but may miss insights.
              </div>
            </div>

            <div className="control-group">
              <label htmlFor="info-quality">
                Information Quality: <span className="value">{getQualityLabel(informationQuality)}</span>
              </label>
              <input
                id="info-quality"
                type="range"
                min="0"
                max="100"
                value={informationQuality}
                onChange={(e) => setInformationQuality(parseInt(e.target.value))}
                className="control-slider"
              />
              <div className="control-description">
                Well-formatted corporate emails vs unclear customer complaints. Poor data quality forces agents to ask clarifying questions.
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mathematical Insights - Full Width */}
      <div className="mathematical-insights">
          <h4>The Geometric Necessity</h4>
          <div className="insights-row">
            {Object.entries(insights).map(([key, insight]) => (
              <motion.div
                key={key}
                className="insight-card-small"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <div className="insight-title">{insight.title}</div>
                <div className="insight-equation">{insight.equation}</div>
                <div className="insight-description">{insight.description}</div>
              </motion.div>
            ))}
          </div>
        </div>
    </div>
  );
};

export default GeometricFoundation;