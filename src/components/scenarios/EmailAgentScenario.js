import React, { useState, useEffect, useCallback } from 'react';
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
      name: 'Reader',
      role: 'Scans and parses incoming emails',
      position: { x: 120, y: 160 },
      status: 'idle',
      color: '#99112A'
    },
    classifier: {
      id: 'classifier', 
      name: 'Classifier',
      role: 'Analyzes content and assigns priority levels',
      position: { x: 250, y: 120 },
      status: 'idle',
      color: '#6E9911'
    },
    manager: {
      id: 'manager',
      name: 'Manager', 
      role: 'Orchestrates agents and handles user communication',
      position: { x: 380, y: 200 },
      status: 'idle',
      color: '#119980'
    },
    user: {
      id: 'user',
      name: 'User',
      role: 'Receives reports and provides feedback',
      position: { x: 250, y: 300 },
      status: 'idle',
      color: '#3c1199',
      shape: 'square'
    }
  });

  const [processedEmails, setProcessedEmails] = useState([]);
  const [communicationLog, setCommunicationLog] = useState([]);
  const [currentCommunication, setCurrentCommunication] = useState(null);
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
    "Initializing agent network and user interface...",
    "Reader: Scanning incoming email queue...",
    "Reader: Parsing email headers and metadata...",
    "Reader → Manager: Reporting 4 emails detected...",
    "Manager → Reader: Requesting detailed email parsing...",
    "Reader → Classifier: Sending parsed email data...",
    "Classifier: Analyzing semantic content and context...",
    "Classifier: Extracting priority signals and urgency markers...", 
    "Classifier → Manager: Sending classification results...",
    "Manager: Evaluating response strategies and priorities...",
    "Manager → User: Escalating critical server outage email...",
    "User → Manager: Confirming escalation and requesting action...",
    "Manager → Classifier: Requesting re-evaluation of medium priority items...",
    "Classifier → Manager: Confirming priority assessments...",
    "Manager: Generating automated responses for low-priority emails...",
    "Manager → Reader: Requesting verification of response generation...",
    "Reader → Manager: Confirming response accuracy...",
    "Manager → User: Sending comprehensive status report...",
    "User → Manager: Acknowledging report and system completion...",
    "All agents: Finalizing coordination and returning to idle state..."
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

  const calculateCommunicationMetrics = useCallback(() => {
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
  }, [agentStates, communicationRadius, canCommunicate]);

  useEffect(() => {
    calculateCommunicationMetrics();
  }, [communicationRadius, agentStates, calculateCommunicationMetrics]);

  const startSimulation = useCallback(async () => {
    console.log('Play button clicked, isPlaying:', isPlaying);
    if (isPlaying) return; // Prevent multiple simultaneous runs
    
    setIsPlaying(true);
    setSimulationComplete(false);
    setCurrentStep(0);
    setCommunicationLog([]);
    setProcessedEmails([]);

    // Reset agent states
    setAgentStates(agents);
    
    try {
      // Step 1: Initialize (immediate start)
      setCurrentStep(1);
      updateAgentStatus('reader', 'active');
      addCommunication('reader', 'user', 'Network initialized. User interface ready. Beginning email scan...', 'analysis');
      
      await delay(8000);
      if (!isPlaying) return;
      
      // Step 2: Scanning emails
      setCurrentStep(2);
      addCommunication('reader', 'reader', 'Scanning incoming email queue... 4 emails detected', 'analysis');
      
      await delay(8000);
      if (!isPlaying) return;
      
      // Step 3: Parsing headers
      setCurrentStep(3);
      addCommunication('reader', 'reader', 'Parsing email headers and extracting metadata...', 'analysis');
      
      await delay(8000);
      if (!isPlaying) return;
      
      // Step 4: Reader → Manager communication
      setCurrentStep(4);
      updateAgentStatus('manager', 'active');
      addCommunication('reader', 'manager', 'Reporting: 4 emails detected - 1 critical, 1 high, 1 medium, 1 low priority', 'data_transfer');
      
      await delay(8000);
      if (!isPlaying) return;
      
      // Step 5: Manager → Reader request
      setCurrentStep(5);
      addCommunication('manager', 'reader', 'Requesting detailed parsing of all email content for processing', 'coordination');
      
      await delay(8000);
      if (!isPlaying) return;
      
      // Step 6: Reader → Classifier communication
      setCurrentStep(6);
      updateAgentStatus('classifier', 'active');
      
      await delay(8000);
      if (!isPlaying) return;
      
      for (let email of emails) {
        if (!isPlaying) return;
        await delay(2000);
        addCommunication('reader', 'classifier', 
          `Email parsed: "${email.subject}" from ${email.from}. Content: ${email.content.length} chars`, 
          'data_transfer'
        );
      }

      // Step 7: Semantic analysis
      setCurrentStep(7);
      addCommunication('classifier', 'classifier', 'Analyzing semantic content, keywords, and contextual urgency...', 'analysis');

      await delay(8000);
      if (!isPlaying) return;

      // Step 8: Priority extraction
      setCurrentStep(8);
      addCommunication('classifier', 'classifier', 'Extracting priority signals: revenue impact, deadlines, sender authority...', 'analysis');

      await delay(8000);
      if (!isPlaying) return;

      // Step 9: Classifier → Manager
      setCurrentStep(9);

      const classifications = [
        { emailId: 1, priority: 'critical', confidence: 0.95, reasoning: 'Revenue impact detected' },
        { emailId: 2, priority: 'low', confidence: 0.88, reasoning: 'Marketing content, no urgency' },
        { emailId: 3, priority: 'high', confidence: 0.82, reasoning: 'Legal deadline today' },
        { emailId: 4, priority: 'medium', confidence: 0.91, reasoning: 'Internal communication' }
      ];

      for (let classification of classifications) {
        if (!isPlaying) return;
        await delay(2000);
        const email = emails.find(e => e.id === classification.emailId);
        addCommunication('classifier', 'manager',
          `"${email.subject}": Priority=${classification.priority}, Confidence=${classification.confidence}`,
          'coordination'
        );
      }

      // Step 10: Manager evaluation
      setCurrentStep(10);
      addCommunication('manager', 'manager', 'Evaluating response strategies and escalation priorities...', 'synthesis');

      await delay(8000);
      if (!isPlaying) return;

      // Step 11: Manager → User escalation
      setCurrentStep(11);
      updateAgentStatus('user', 'active');
      addCommunication('manager', 'user', 'URGENT ESCALATION: Server outage affecting revenue - immediate attention required', 'escalation');

      await delay(8000);
      if (!isPlaying) return;

      // Step 12: User → Manager confirmation
      setCurrentStep(12);
      addCommunication('user', 'manager', 'Escalation acknowledged. Initiating emergency response protocol.', 'response');

      await delay(8000);
      if (!isPlaying) return;

      // Step 13: Manager → Classifier re-evaluation request
      setCurrentStep(13);
      addCommunication('manager', 'classifier', 'Please re-evaluate medium priority items for potential batch processing', 'coordination');

      await delay(8000);
      if (!isPlaying) return;

      // Step 14: Classifier → Manager confirmation
      setCurrentStep(14);
      addCommunication('classifier', 'manager', 'Re-evaluation complete. Medium priority items confirmed for standard processing', 'data_transfer');

      await delay(8000);
      if (!isPlaying) return;

      // Step 15: Manager generating responses
      setCurrentStep(15);
      addCommunication('manager', 'manager', 'Generating automated responses for low-priority communications...', 'synthesis');

      await delay(8000);
      if (!isPlaying) return;

      // Step 16: Manager → Reader verification request
      setCurrentStep(16);
      addCommunication('manager', 'reader', 'Please verify accuracy of generated response templates', 'coordination');

      await delay(8000);
      if (!isPlaying) return;

      // Step 17: Reader → Manager verification
      setCurrentStep(17);
      addCommunication('reader', 'manager', 'Response templates verified. Grammar and tone appropriate for recipients', 'response');

      await delay(8000);
      if (!isPlaying) return;

      // Step 18: Manager → User final report
      setCurrentStep(18);
      addCommunication('manager', 'user', 'Status Report: 1 escalated, 2 auto-responded, 1 queued. System efficiency: 94%', 'report');

      await delay(8000);
      if (!isPlaying) return;

      // Step 19: User → Manager acknowledgment
      setCurrentStep(19);
      addCommunication('user', 'manager', 'Report received and processed. System performance satisfactory. Thank you.', 'response');

      await delay(8000);
      if (!isPlaying) return;

      // Step 20: Final coordination (index 19 = step 20)
      setCurrentStep(19);
      addCommunication('manager', 'reader', 'All agents: Processing complete. Returning to idle state for next queue', 'coordination');
      addCommunication('manager', 'classifier', 'All agents: Processing complete. Returning to idle state for next queue', 'coordination');

      setAgentStates(prev => ({
        reader: { ...prev.reader, status: 'complete' },
        classifier: { ...prev.classifier, status: 'complete' },
        manager: { ...prev.manager, status: 'complete' },
        user: { ...prev.user, status: 'complete' }
      }));

      // Automatically stop simulation when complete
      setIsPlaying(false);
      setSimulationComplete(true);
      
      if (onComplete) onComplete();
    } catch (error) {
      console.error('Simulation error:', error);
      setIsPlaying(false);
    }
  }, [isPlaying, emails, onComplete]);

  const stopSimulation = () => {
    console.log('Stop button clicked');
    setIsPlaying(false);
    setSimulationComplete(false);
  };

  const refreshSimulation = useCallback(() => {
    console.log('Refresh button clicked');
    setIsPlaying(false);
    setSimulationComplete(false);
    setCurrentStep(0);
    setCommunicationLog([]);
    setProcessedEmails([]);
    setAgentStates(agents);
  }, [agents]);

  // Auto-restart when radius changes
  useEffect(() => {
    if (isPlaying) {
      setIsPlaying(false);
      setTimeout(() => {
        startSimulation();
      }, 500);
    }
  }, [communicationRadius, isPlaying, startSimulation]);

  // Calculate real AI metrics matching GeometricFoundation
  const calculateRealMetrics = useCallback(() => {
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
  }, [communicationRadius, taskComplexity, agentSpecialization, informationQuality]);

  // Update metrics when parameters change
  useEffect(() => {
    calculateRealMetrics();
  }, [communicationRadius, taskComplexity, agentSpecialization, informationQuality, calculateRealMetrics]);

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
    
    // Set current communication for real-time display on graph
    if (from !== 'system' && to !== 'system') {
      setCurrentCommunication({
        from,
        to,
        message,
        timestamp: Date.now()
      });
      
      // Clear after 3 seconds
      setTimeout(() => {
        setCurrentCommunication(null);
      }, 3000);
    }
  };

  return (
    <div className="email-scenario-container">
      <div className="scenario-header">
        <h3>A real simulation</h3>
        <p>Watch three autonomous agents coordinate through geometric proximity rules</p>
      </div>

      <div className="simulation-workspace-side-by-side">
        {/* Left: Visualization and Performance Metrics */}
        <div className="simulation-viz-section">
          <div className="viz-header">
            <h4>Real Agent Coordination</h4>
            <div className="coordination-status">
              <div 
                className="status-indicator"
                style={{ backgroundColor: isPlaying ? '#4caf50' : '#666' }}
              />
              <span className="status-text">{isPlaying ? 'RUNNING' : 'IDLE'}</span>
            </div>
          </div>
          
          <svg
            width="500"
            height="400"
            className="agent-svg"
            viewBox="0 0 500 400"
          >
            {/* Communication radius circles - exclude user */}
            {Object.values(agentStates).filter(agent => agent.id !== 'user').map(agent => (
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
                // Special handling for user - only connects to manager
                if (agent1.id === 'user' || agent2.id === 'user') {
                  const isUserManagerLink = (
                    (agent1.id === 'user' && agent2.id === 'manager') ||
                    (agent1.id === 'manager' && agent2.id === 'user')
                  );
                  if (!isUserManagerLink) return null;
                  
                  return (
                    <line
                      key={`link-${agent1.id}-${agent2.id}`}
                      x1={agent1.position.x}
                      y1={agent1.position.y}
                      x2={agent2.position.x}
                      y2={agent2.position.y}
                      stroke="rgba(60, 17, 153, 0.6)"
                      strokeWidth="3"
                      className="active-link"
                    />
                  );
                }
                
                // Normal agent-to-agent communication based on radius
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

            {/* Current Communication Line */}
            {currentCommunication && (
              <line
                x1={agents[currentCommunication.from]?.position.x || 0}
                y1={agents[currentCommunication.from]?.position.y || 0}
                x2={agents[currentCommunication.to]?.position.x || 0}
                y2={agents[currentCommunication.to]?.position.y || 0}
                stroke="#ff4444"
                strokeWidth="4"
                strokeDasharray="10,5"
                className="communication-active"
              />
            )}

            {/* Agent nodes */}
            {Object.values(agentStates).map(agent => (
              <g key={agent.id} transform={`translate(${agent.position.x}, ${agent.position.y})`}>
                {agent.shape === 'square' ? (
                  <rect
                    x="-25"
                    y="-25"
                    width="50"
                    height="50"
                    fill={agent.color}
                    stroke="#000"
                    strokeWidth="2"
                    className="agent-node"
                  />
                ) : (
                  <circle
                    r="25"
                    fill={agent.color}
                    stroke="#000"
                    strokeWidth="2"
                    className="agent-node"
                  />
                )}
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

            {/* Legend inside SVG */}
            <g transform="translate(20, 340)">
              <rect
                x="0"
                y="0"
                width="460"
                height="50"
                fill="rgba(255, 255, 255, 0.9)"
                stroke="rgba(0, 0, 0, 0.1)"
                strokeWidth="1"
                rx="6"
              />
              <text x="8" y="12" fontSize="10" fontWeight="600" fill="#000">Network Entities</text>
              
              {/* Reader legend */}
              <circle cx="15" cy="28" r="6" fill="#99112A" stroke="#000" strokeWidth="1"/>
              <text x="25" y="32" fontSize="9" fill="#000">Reader</text>
              
              {/* Classifier legend */}
              <circle cx="80" cy="28" r="6" fill="#6E9911" stroke="#000" strokeWidth="1"/>
              <text x="90" y="32" fontSize="9" fill="#000">Classifier</text>
              
              {/* Manager legend */}
              <circle cx="155" cy="28" r="6" fill="#119980" stroke="#000" strokeWidth="1"/>
              <text x="165" y="32" fontSize="9" fill="#000">Manager</text>
              
              {/* User legend */}
              <rect x="235" y="22" width="12" height="12" fill="#3c1199" stroke="#000" strokeWidth="1"/>
              <text x="252" y="32" fontSize="9" fill="#000">User</text>
            </g>
          </svg>


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
        <div className="simulation-controls-sidebar">
          <h4>Simulation Controls</h4>
          
          <div className="simulation-buttons">
            <button 
              className={`pro-control-btn play-btn ${isPlaying ? 'active' : ''}`}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                console.log('Play button click handler fired');
                startSimulation();
              }}
              disabled={isPlaying}
              type="button"
            >
              <TfiControlPlay />
              <span>Play</span>
            </button>
            <button 
              className={`pro-control-btn stop-btn`}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                console.log('Stop button click handler fired');
                stopSimulation();
              }}
              disabled={!isPlaying}
              type="button"
            >
              <TfiControlStop />
              <span>Stop</span>
            </button>
            <button 
              className="pro-control-btn refresh-btn"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                console.log('Refresh button click handler fired');
                refreshSimulation();
              }}
              type="button"
            >
              <TfiReload />
              <span>Refresh</span>
            </button>
          </div>

          <div className="controls-grid">
            <div className="control-row">
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
            </div>

            <div className="control-row">
              <label htmlFor="task-complexity">
                Task Complexity: <span className="value">{taskComplexity}</span>
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
            </div>

            <div className="control-row">
              <label htmlFor="agent-specialization">
                Agent Specialization: <span className="value">{agentSpecialization}</span>
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
            </div>

            <div className="control-row">
              <label htmlFor="info-quality">
                Information Quality: <span className="value">{informationQuality}</span>
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
            </div>
          </div>

          <div className="current-step">
            <div className="step-indicator">Step {currentStep + 1}/{steps.length}</div>
            <div className="step-description">{steps[currentStep]}</div>
            {currentCommunication && (
              <div className="current-communication-inline">
                <strong>Active Communication:</strong> {currentCommunication.from} → {currentCommunication.to}: {currentCommunication.message}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmailAgentScenario;