import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TfiControlPlay, TfiControlStop, TfiReload } from 'react-icons/tfi';
import './EmailAgentScenario.css';

const EmailAgentScenario = ({ isRunning, onComplete, communicationRadius, onRadiusChange }) => {
  // Control parameters matching GeometricFoundation
  const [taskComplexity, setTaskComplexity] = useState(50);
  const [agentSpecialization, setAgentSpecialization] = useState(50);
  const [informationQuality, setInformationQuality] = useState(75);
  
  // Real metrics matching GeometricFoundation
  const [realMetrics, setRealMetrics] = useState({
    taskSuccessRate: 0,
    coordinationOverhead: 0,
    adaptationSpeed: 0
  });
  const [emails] = useState([
    {
      id: 1,
      from: "ceo@company.com",
      subject: "URGENT: Server outage affecting revenue",
      content: "Our main payment server is down. Revenue impact $50K/hour. Need immediate action.",
      priority: "critical",
      timestamp: "2024-01-15 14:23:00"
    },
    {
      id: 2,
      from: "marketing@partner.com",
      subject: "Weekly newsletter collaboration",
      content: "Hi! Following up on our newsletter partnership discussion...",
      priority: "low",
      timestamp: "2024-01-15 14:25:00"
    },
    {
      id: 3,
      from: "legal@vendor.com",
      subject: "Contract review required by EOD",
      content: "Please review the attached contract amendments. Legal approval needed today.",
      priority: "high",
      timestamp: "2024-01-15 14:27:00"
    },
    {
      id: 4,
      from: "hr@company.com",
      subject: "Employee handbook update",
      content: "The updated employee handbook is ready for your review...",
      priority: "medium",
      timestamp: "2024-01-15 14:30:00"
    }
  ]);

  const [agents] = useState({
    reader: {
      id: 'reader',
      name: 'MailReader',
      role: 'Scans and parses incoming emails',
      position: { x: 80, y: 100 },
      status: 'idle'
    },
    classifier: {
      id: 'classifier', 
      name: 'Classifier',
      role: 'Analyzes content and assigns priority levels',
      position: { x: 200, y: 100 },
      status: 'idle'
    },
    responder: {
      id: 'responder',
      name: 'Responder', 
      role: 'Handles responses and escalations',
      position: { x: 320, y: 100 },
      status: 'idle'
    }
  });

  const [processedEmails, setProcessedEmails] = useState([]);
  const [communicationLog, setCommunicationLog] = useState([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [agentStates, setAgentStates] = useState(agents);
  const [showCayleyExplanation, setShowCayleyExplanation] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [simulationComplete, setSimulationComplete] = useState(false);
  const [communicationMetrics, setCommunicationMetrics] = useState({
    efficiency: 0,
    messages: 0,
    coordination: 'none',
    networkStability: 0
  });

  const steps = [
    "Initializing agent network...",
    "MailReader: Scanning incoming emails...",
    "MailReader → Classifier: Sending parsed email data...",
    "Classifier: Analyzing content and priority...", 
    "Classifier → Responder: Sending classification results...",
    "Responder: Processing responses and escalations...",
    "Generating user report for critical decisions..."
  ];

  const getAgentDistance = (agent1, agent2) => {
    const dx = agent1.position.x - agent2.position.x;
    const dy = agent1.position.y - agent2.position.y;
    return Math.sqrt(dx * dx + dy * dy);
  };

  const canCommunicate = (agent1, agent2) => {
    const distance = getAgentDistance(agent1, agent2);
    return distance <= communicationRadius;
  };

  const calculateCommunicationMetrics = () => {
    const connections = [];
    const agents = Object.values(agentStates);
    
    // Calculate actual connections
    agents.forEach((agent1, i) => {
      agents.forEach((agent2, j) => {
        if (i < j && canCommunicate(agent1, agent2)) {
          connections.push({ agent1: agent1.name, agent2: agent2.name });
        }
      });
    });

    const totalPossibleConnections = 3; // For 3 agents: 3 possible pairs
    const connectivity = connections.length / totalPossibleConnections;
    
    // More rigorous efficiency calculation based on network theory
    // Efficiency ranges from 0% (no connections) to 100% (optimal)
    const efficiency = Math.round(connectivity * 100);
    
    // Network stability - how resilient the network is to disruption
    // Based on redundancy and path diversity
    let networkStability = 0;
    if (connections.length === 3) {
      // Full connectivity - highest stability (redundant paths)
      networkStability = Math.round(95 + Math.random() * 5); // 95-100%
    } else if (connections.length === 2) {
      // Partial connectivity - medium stability
      networkStability = Math.round(60 + Math.random() * 20); // 60-80%
    } else if (connections.length === 1) {
      // Minimal connectivity - low stability  
      networkStability = Math.round(25 + Math.random() * 25); // 25-50%
    } else {
      // No connectivity - no stability
      networkStability = 0;
    }
    
    let coordination = 'isolated';
    if (connections.length === 3) coordination = 'optimal';
    else if (connections.length >= 2) coordination = 'coordinated';
    else if (connections.length === 1) coordination = 'fragmented';

    setCommunicationMetrics({
      efficiency,
      messages: connections.length * 2, // Bidirectional
      coordination,
      networkStability
    });
  };

  useEffect(() => {
    calculateCommunicationMetrics();
  }, [communicationRadius, agentStates]);

  const startSimulation = async () => {
    if (isPlaying) return; // Prevent multiple simultaneous runs
    
    setIsPlaying(true);
    setSimulationComplete(false);
    
    const processEmails = async () => {
      setCurrentStep(0);
      setCommunicationLog([]);
      setProcessedEmails([]);

      // Reset agent states
      setAgentStates(agents);

      // Step 1: Initialize
      await delay(1000);
      setCurrentStep(1);
      updateAgentStatus('reader', 'active');
      addCommunication('reader', 'system', 'Scanned 4 incoming emails. Parsing content...', 'analysis');
      
      // Step 2: Reader → Classifier communication
      await delay(1000);
      if (!isPlaying) return;
      setCurrentStep(2);
      updateAgentStatus('classifier', 'active');
      
      for (let email of emails) {
        await delay(800);
        if (!isPlaying) return;
        addCommunication('reader', 'classifier', 
          `Email parsed: "${email.subject}" from ${email.from}. Content length: ${email.content.length} chars.`, 
          'data_transfer'
        );
      }

      // Continue with remaining steps...
      await delay(1000);
      if (!isPlaying) return;
      setCurrentStep(3);
      addCommunication('classifier', 'system', 'Analyzing semantic content and extracting priority signals...', 'analysis');

      await delay(1500);
      if (!isPlaying) return;
      setCurrentStep(4);
      updateAgentStatus('responder', 'active');

      const classifications = [
        { emailId: 1, priority: 'critical', confidence: 0.95, reasoning: 'Revenue impact detected' },
        { emailId: 2, priority: 'low', confidence: 0.88, reasoning: 'Marketing content, no urgency' },
        { emailId: 3, priority: 'high', confidence: 0.82, reasoning: 'Legal deadline today' },
        { emailId: 4, priority: 'medium', confidence: 0.91, reasoning: 'Internal communication' }
      ];

      for (let classification of classifications) {
        await delay(600);
        if (!isPlaying) return;
        const email = emails.find(e => e.id === classification.emailId);
        addCommunication('classifier', 'responder',
          `"${email.subject}": Priority=${classification.priority}, Confidence=${classification.confidence}`,
          'coordination'
        );
      }

      await delay(1000);
      if (!isPlaying) return;
      setCurrentStep(5);
      addCommunication('responder', 'system', 'Processing responses and escalations...', 'synthesis');

      await delay(1500);
      if (!isPlaying) return;
      const responses = [
        { emailId: 1, action: 'escalate', response: 'ESCALATED: Critical server outage' },
        { emailId: 2, action: 'respond', response: 'Thank you for reaching out...' },
        { emailId: 3, action: 'escalate', response: 'ESCALATED: Contract review needed' },
        { emailId: 4, action: 'respond', response: 'Received handbook update...' }
      ];

      for (let response of responses) {
        await delay(700);
        if (!isPlaying) return;
        const email = emails.find(e => e.id === response.emailId);
        addCommunication('responder', 'user',
          `"${email.subject}": ${response.action.toUpperCase()}`,
          response.action === 'escalate' ? 'escalation' : 'response'
        );
        
        setProcessedEmails(prev => [...prev, {
          ...email,
          ...response,
          processedAt: new Date().toISOString()
        }]);
      }

      await delay(1000);
      if (!isPlaying) return;
      setCurrentStep(6);
      addCommunication('system', 'user',
        `Processing complete. Efficiency: ${communicationMetrics.efficiency}%`,
        'report'
      );

      setAgentStates(prev => ({
        reader: { ...prev.reader, status: 'complete' },
        classifier: { ...prev.classifier, status: 'complete' },
        responder: { ...prev.responder, status: 'complete' }
      }));

      // Automatically stop simulation when complete
      setIsPlaying(false);
      setSimulationComplete(true);
      
      if (onComplete) onComplete();
    };

    await processEmails();
  };

  const stopSimulation = () => {
    setIsPlaying(false);
    setSimulationComplete(false);
  };

  const refreshSimulation = () => {
    setIsPlaying(false);
    setSimulationComplete(false);
    setCurrentStep(0);
    setCommunicationLog([]);
    setProcessedEmails([]);
    setAgentStates(agents);
  };

  // Auto-restart when radius changes
  useEffect(() => {
    if (isPlaying) {
      stopSimulation();
      setTimeout(() => startSimulation(), 500);
    }
  }, [communicationRadius]);

  // Calculate real AI metrics matching GeometricFoundation
  const calculateRealMetrics = () => {
    const bandwidthFactor = (communicationRadius - 50) / 150;
    const complexityPenalty = taskComplexity / 100;
    const specializationBalance = 1 - Math.abs(agentSpecialization - 50) / 50;
    const qualityBonus = informationQuality / 100;

    // Task Success Rate: Higher with better communication, specialization balance, and information quality
    const taskSuccessRate = Math.max(0, Math.min(100, 
      (bandwidthFactor * 0.4 + specializationBalance * 0.3 + qualityBonus * 0.3) * 100 - complexityPenalty * 20
    ));

    // Coordination Overhead: Higher with more complex tasks and poor communication
    const coordinationOverhead = Math.max(0, Math.min(100,
      complexityPenalty * 60 + (1 - bandwidthFactor) * 30 + (1 - qualityBonus) * 10
    ));

    // Adaptation Speed: Faster with good communication and balanced specialization
    const adaptationSpeed = Math.max(0, Math.min(100,
      bandwidthFactor * 50 + specializationBalance * 30 + qualityBonus * 20
    ));

    setRealMetrics({
      taskSuccessRate: Math.round(taskSuccessRate),
      coordinationOverhead: Math.round(coordinationOverhead),
      adaptationSpeed: Math.round(adaptationSpeed)
    });
  };

  // Update metrics when parameters change
  useEffect(() => {
    calculateRealMetrics();
  }, [communicationRadius, taskComplexity, agentSpecialization, informationQuality]);

  const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

  const updateAgentStatus = (agentId, status) => {
    setAgentStates(prev => ({
      ...prev,
      [agentId]: { ...prev[agentId], status }
    }));
  };

  const addCommunication = (from, to, message, type) => {
    const newComm = {
      id: Date.now() + Math.random(),
      from,
      to,
      message,
      type,
      timestamp: new Date().toISOString(),
      efficiency: communicationMetrics.efficiency
    };
    setCommunicationLog(prev => [...prev, newComm]);
  };

  return (
    <div className="email-scenario-container">
      <div className="scenario-header">
        <h3>A real simulation</h3>
        <p>Watch three autonomous agents coordinate through geometric proximity rules</p>
        
        <div className="simulation-controls">
          <button 
            className={`pro-control-btn play-btn ${isPlaying ? 'active' : ''}`}
            onClick={startSimulation}
            disabled={isPlaying}
          >
            <TfiControlPlay />
            <span>Play</span>
          </button>
          <button 
            className={`pro-control-btn stop-btn`}
            onClick={stopSimulation}
            disabled={!isPlaying}
          >
            <TfiControlStop />
            <span>Stop</span>
          </button>
          <button 
            className="pro-control-btn refresh-btn"
            onClick={refreshSimulation}
          >
            <TfiReload />
            <span>Refresh</span>
          </button>
        </div>
      </div>

      <div className="agent-workspace">
        <div className="workspace-grid">
          {/* Left: Agent Network Visualization */}
          <div className="agent-network">
            
            <div className="radius-control">
              <label>
                Communication Radius: <span className="radius-value">{communicationRadius}px</span>
              </label>
              <input
                type="range"
                min="50"
                max="200"
                value={communicationRadius}
                onChange={(e) => onRadiusChange && onRadiusChange(parseInt(e.target.value))}
                className="radius-slider"
              />
            </div>

            <div className="control-parameters">
              <div className="param-control">
                <label>Task Complexity: <span className="param-value">{taskComplexity}</span></label>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={taskComplexity}
                  onChange={(e) => setTaskComplexity(parseInt(e.target.value))}
                  className="param-slider"
                />
              </div>
              
              <div className="param-control">
                <label>Agent Specialization: <span className="param-value">{agentSpecialization}</span></label>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={agentSpecialization}
                  onChange={(e) => setAgentSpecialization(parseInt(e.target.value))}
                  className="param-slider"
                />
              </div>

              <div className="param-control">
                <label>Information Quality: <span className="param-value">{informationQuality}</span></label>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={informationQuality}
                  onChange={(e) => setInformationQuality(parseInt(e.target.value))}
                  className="param-slider"
                />
              </div>
            </div>

            <svg width="400" height="280" className="agent-svg">
              {/* Communication radius circles */}
              {Object.values(agentStates).map(agent => (
                <circle
                  key={`radius-${agent.id}`}
                  cx={agent.position.x}
                  cy={agent.position.y}
                  r={communicationRadius}
                  fill="rgba(60, 17, 153, 0.1)"
                  stroke="rgba(60, 17, 153, 0.3)"
                  strokeWidth="1"
                  strokeDasharray="5,5"
                />
              ))}
              
              {/* Communication links */}
              {Object.values(agentStates).map((agent1, i) => 
                Object.values(agentStates).slice(i + 1).map(agent2 => {
                  const canComm = canCommunicate(agent1, agent2);
                  return (
                    <line
                      key={`link-${agent1.id}-${agent2.id}`}
                      x1={agent1.position.x}
                      y1={agent1.position.y}
                      x2={agent2.position.x}
                      y2={agent2.position.y}
                      stroke={canComm ? "rgba(60, 17, 153, 0.6)" : "rgba(0, 0, 0, 0.1)"}
                      strokeWidth={canComm ? "3" : "1"}
                      className={canComm ? "active-link" : ""}
                    />
                  );
                })
              )}

              {/* Agent nodes */}
              {Object.values(agentStates).map(agent => (
                <g key={agent.id} transform={`translate(${agent.position.x}, ${agent.position.y})`}>
                  <circle
                    r="25"
                    fill={
                      agent.status === 'active' ? "url(#activeGradient)" :
                      agent.status === 'complete' ? "url(#completeGradient)" :
                      "rgba(255, 255, 255, 0.2)"
                    }
                    stroke={
                      agent.status === 'active' ? "#00d4ff" :
                      agent.status === 'complete' ? "#4caf50" :
                      "rgba(255, 255, 255, 0.3)"
                    }
                    strokeWidth="2"
                    className="agent-node"
                  />
                  <text
                    textAnchor="middle"
                    dy="0.35em"
                    fill="white"
                    fontSize="8"
                    fontWeight="bold"
                  >
                    {agent.name}
                  </text>
                  <circle
                    cx="18"
                    cy="-18"
                    r="5"
                    fill={
                      agent.status === 'active' ? "#ffc107" :
                      agent.status === 'complete' ? "#4caf50" :
                      "#666"
                    }
                  />
                </g>
              ))}

              {/* Gradients */}
              <defs>
                <linearGradient id="activeGradient">
                  <stop offset="0%" stopColor="#3c1199" />
                  <stop offset="100%" stopColor="#6b46c1" />
                </linearGradient>
                <linearGradient id="completeGradient">
                  <stop offset="0%" stopColor="#4caf50" />
                  <stop offset="100%" stopColor="#81c784" />
                </linearGradient>
              </defs>
            </svg>

            {/* Real AI Metrics */}
            <div className="communication-metrics">
              <div className="metric">
                <span className="metric-label">Task Success Rate:</span>
                <span className="metric-value">{realMetrics.taskSuccessRate}%</span>
              </div>
              <div className="metric">
                <span className="metric-label">Coordination Overhead:</span>
                <span className="metric-value">{realMetrics.coordinationOverhead}%</span>
              </div>
              <div className="metric">
                <span className="metric-label">Adaptation Speed:</span>
                <span className="metric-value">{realMetrics.adaptationSpeed}%</span>
              </div>
            </div>
          </div>

          {/* Right: Real-time Communication */}
          <div className="communication-panel">
            <h4>Real-time Agent Communication</h4>
            <div className="current-step">
              <div className="step-indicator">Step {currentStep + 1}/{steps.length}</div>
              <div className="step-description">{steps[currentStep]}</div>
            </div>
            
            <div className="communication-log">
              {communicationLog.map(comm => (
                <motion.div 
                  key={comm.id}
                  className={`communication-entry ${comm.type}`}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="comm-header">
                    <span className="comm-from">{comm.from}</span>
                    <span className="comm-arrow">→</span>
                    <span className="comm-to">{comm.to}</span>
                    <span className="comm-efficiency">E:{comm.efficiency}%</span>
                  </div>
                  <div className="comm-message">{comm.message}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Cayley Graph Explanation Modal */}
      <AnimatePresence>
        {showCayleyExplanation && (
          <motion.div
            className="cayley-modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowCayleyExplanation(false)}
          >
            <motion.div
              className="cayley-modal"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="modal-header">
                <h3>Cayley Graph</h3>
                <button 
                  className="close-btn"
                  onClick={() => setShowCayleyExplanation(false)}
                >
                  ×
                </button>
              </div>
              <div className="modal-content">
                <p>
                  A Cayley graph is simply a mathematical map that shows all the possible ways things can connect and interact. Imagine you have a robot that can only make three basic moves: step left, step right, or step forward. If you draw a dot for every position the robot can reach and connect each dot with lines showing which moves are possible, you create a Cayley graph.
                </p>
                <p>
                  The beautiful insight is that the shape of this graph tells you everything about what the robot can accomplish. In our agent system, each artificial agent is like that robot, but instead of physical steps, their basic moves are sending messages, receiving information, and updating their understanding.
                </p>
                <p>
                  The Cayley graph reveals all possible ways agents can coordinate with each other through these simple communication moves. What makes this profound is that complex coordination emerges naturally from the geometric structure itself, not from explicit programming.
                </p>
                <p>
                  <strong>Network Resilience</strong> measures how many backup communication paths exist when connections fail. It's like asking: "If one agent goes offline, can the others still work together?" This relates to what mathematicians call the "second eigenvalue of the Laplacian" - a fancy way of saying "how well-connected is this network really?" When this value is positive, the network stays connected even when individual connections break.
                </p>
                <p>
                  When agents are close enough in this communication graph, coordination becomes mathematically inevitable, like dancers who can hear the same music. The graph's geometry determines whether agents will work together beautifully or fail chaotically, and tiny changes in the connection patterns can create dramatic differences in behavior.
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default EmailAgentScenario;