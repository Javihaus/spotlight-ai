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
    responder: {
      id: 'responder',
      name: 'Responder', 
      role: 'Handles responses and escalations',
      position: { x: 380, y: 200 },
      status: 'idle',
      color: '#119980'
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
    "Initializing agent network...",
    "MailReader: Scanning incoming emails...",
    "MailReader: Parsing email headers and metadata...",
    "MailReader → Classifier: Sending parsed email data...",
    "Classifier: Analyzing semantic content...",
    "Classifier: Extracting priority signals...", 
    "Classifier → Responder: Sending classification results...",
    "Responder: Evaluating response strategies...",
    "Responder: Processing escalation decisions...",
    "Responder: Generating automated responses...",
    "System: Coordinating final agent states...",
    "Generating comprehensive user report..."
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

  const startSimulation = async () => {
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
      // Step 1: Initialize
      await delay(1500);
      setCurrentStep(1);
      updateAgentStatus('reader', 'active');
      addCommunication('reader', 'system', 'Network initialized. Beginning email scan...', 'analysis');
      
      // Step 2: Scanning emails
      await delay(1500);
      setCurrentStep(2);
      addCommunication('reader', 'system', 'Scanned 4 incoming emails. Processing headers...', 'analysis');
      
      // Step 3: Parsing headers
      await delay(1500);
      setCurrentStep(3);
      addCommunication('reader', 'system', 'Headers parsed. Extracting content and metadata...', 'analysis');
      
      // Step 4: Reader → Classifier communication
      await delay(1500);
      setCurrentStep(4);
      updateAgentStatus('classifier', 'active');
      
      for (let email of emails) {
        await delay(1000);
        addCommunication('reader', 'classifier', 
          `Email parsed: "${email.subject}" from ${email.from}. Content length: ${email.content.length} chars.`, 
          'data_transfer'
        );
      }

      // Step 5: Semantic analysis
      await delay(1500);
      setCurrentStep(5);
      addCommunication('classifier', 'system', 'Analyzing semantic content and context...', 'analysis');

      // Step 6: Priority extraction
      await delay(1500);
      setCurrentStep(6);
      addCommunication('classifier', 'system', 'Extracting priority signals and urgency markers...', 'analysis');

      // Step 7: Classifier → Responder
      await delay(1500);
      setCurrentStep(7);
      updateAgentStatus('responder', 'active');

      const classifications = [
        { emailId: 1, priority: 'critical', confidence: 0.95, reasoning: 'Revenue impact detected' },
        { emailId: 2, priority: 'low', confidence: 0.88, reasoning: 'Marketing content, no urgency' },
        { emailId: 3, priority: 'high', confidence: 0.82, reasoning: 'Legal deadline today' },
        { emailId: 4, priority: 'medium', confidence: 0.91, reasoning: 'Internal communication' }
      ];

      for (let classification of classifications) {
        await delay(800);
        const email = emails.find(e => e.id === classification.emailId);
        addCommunication('classifier', 'responder',
          `"${email.subject}": Priority=${classification.priority}, Confidence=${classification.confidence}`,
          'coordination'
        );
      }

      // Step 8: Response strategy evaluation
      await delay(1500);
      setCurrentStep(8);
      addCommunication('responder', 'system', 'Evaluating optimal response strategies...', 'synthesis');

      // Step 9: Escalation decisions
      await delay(1500);
      setCurrentStep(9);
      addCommunication('responder', 'system', 'Processing escalation decisions...', 'synthesis');

      // Step 10: Response generation
      await delay(1500);
      setCurrentStep(10);
      const responses = [
        { emailId: 1, action: 'escalate', response: 'ESCALATED: Critical server outage' },
        { emailId: 2, action: 'respond', response: 'Thank you for reaching out...' },
        { emailId: 3, action: 'escalate', response: 'ESCALATED: Contract review needed' },
        { emailId: 4, action: 'respond', response: 'Received handbook update...' }
      ];

      for (let response of responses) {
        await delay(800);
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

      // Step 11: System coordination
      await delay(1500);
      setCurrentStep(11);
      addCommunication('system', 'system', 'Coordinating final agent states and cleanup...', 'coordination');

      // Step 12: Final report
      await delay(1500);
      setCurrentStep(11);
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
    } catch (error) {
      console.error('Simulation error:', error);
      setIsPlaying(false);
    }
  };

  const stopSimulation = () => {
    console.log('Stop button clicked');
    setIsPlaying(false);
    setSimulationComplete(false);
  };

  const refreshSimulation = () => {
    console.log('Refresh button clicked');
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
      setIsPlaying(false);
      setTimeout(() => {
        startSimulation();
      }, 500);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [communicationRadius]);

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
                <circle
                  r="25"
                  fill={agent.color}
                  stroke="#000"
                  strokeWidth="2"
                  className="agent-node"
                />
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
            <g transform="translate(20, 350)">
              <rect
                x="0"
                y="0"
                width="180"
                height="40"
                fill="rgba(255, 255, 255, 0.9)"
                stroke="rgba(0, 0, 0, 0.1)"
                strokeWidth="1"
                rx="6"
              />
              <text x="8" y="12" fontSize="10" fontWeight="600" fill="#000">Agent Types</text>
              
              {/* Reader legend */}
              <circle cx="15" cy="22" r="6" fill="#99112A" stroke="#000" strokeWidth="1"/>
              <text x="25" y="26" fontSize="9" fill="#000">Reader</text>
              
              {/* Classifier legend */}
              <circle cx="70" cy="22" r="6" fill="#6E9911" stroke="#000" strokeWidth="1"/>
              <text x="80" y="26" fontSize="9" fill="#000">Classifier</text>
              
              {/* Responder legend */}
              <circle cx="135" cy="22" r="6" fill="#119980" stroke="#000" strokeWidth="1"/>
              <text x="145" y="26" fontSize="9" fill="#000">Responder</text>
            </g>
          </svg>

          {/* Current Communication Display */}
          {currentCommunication && (
            <div className="current-communication">
              <strong>{currentCommunication.from} → {currentCommunication.to}:</strong> {currentCommunication.message}
            </div>
          )}

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
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmailAgentScenario;