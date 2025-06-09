import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
// import MathFramework from '../MathFramework'; // Removed for Act 3 redesign
import './ThreeActs.css';

const ThreeActs = () => {
  const [currentAct, setCurrentAct] = useState(1);
  const [progress, setProgress] = useState(0);
  const [userInteracted, setUserInteracted] = useState(false);
  const [agentDemo, setAgentDemo] = useState('idle');
  const [userTask, setUserTask] = useState('');
  const [agentTasks, setAgentTasks] = useState({
    agent1: { name: 'Agent A', task: '', placeholder: 'Define Agent A behavior...' },
    agent2: { name: 'Agent B', task: '', placeholder: 'Define Agent B behavior...' },
    agent3: { name: 'Agent C', task: '', placeholder: 'Define Agent C behavior...' }
  });
  const [selectedAgent, setSelectedAgent] = useState(null);
  const [showInsights, setShowInsights] = useState({});
  const [selectedConcept, setSelectedConcept] = useState(null);
  
  const mathematicalConcepts = {
    energy: {
      title: 'Energy Dynamics',
      description: 'How agents minimize collective energy through distributed optimization',
      details: {
        overview: 'Agents naturally seek energy-efficient states through mathematical optimization principles. This drives them toward coordination without central control.',
        principles: [
          'Collective Energy Minimization: Agents work together to reduce system-wide energy consumption',
          'Distributed Optimization: No single agent controls the process, yet optimal solutions emerge',
          'Energy Landscapes: Agents navigate complex solution spaces seeking global minima',
          'Thermodynamic Analogies: Agent systems follow principles similar to physical energy systems'
        ],
        mathematics: 'E_total = Σ(E_individual + E_interaction), where energy minimization drives coordination',
        realWorld: 'Like molecules forming crystals or birds flocking - individual actions create collective order'
      }
    },
    coordination: {
      title: 'Coordination Mechanisms',
      description: 'Mathematical foundations of how distributed systems achieve synchronization',
      details: {
        overview: 'Agents develop sophisticated communication protocols and coordination strategies through mathematical optimization, enabling complex collective behaviors.',
        principles: [
          'Information Propagation: Agents share state information through optimal communication channels',
          'Consensus Algorithms: Mathematical protocols ensure agents reach agreement without central authority',
          'Synchronization Patterns: Agents naturally align their behaviors through coupling mechanisms',
          'Network Topology: Communication structure emerges to optimize information flow'
        ],
        mathematics: 'C(i→j) = f(S_i, S_j, channel_ij) - Communication function between agents',
        realWorld: 'Similar to how neurons coordinate in the brain or how internet protocols enable global connectivity'
      }
    },
    emergence: {
      title: 'Emergent Intelligence',
      description: 'How collective behaviors transcend individual agent capabilities',
      details: {
        overview: 'The most fascinating aspect: when simple agents interact according to mathematical rules, intelligence emerges at the system level that no individual agent possesses.',
        principles: [
          'Collective Intelligence: System-level intelligence emerges from agent interactions',
          'Non-linear Dynamics: Small changes in agent behavior can cause dramatic system shifts',
          'Self-Organization: Complex structures form without external control or planning',
          'Phase Transitions: Systems can suddenly shift between different operational modes'
        ],
        mathematics: 'E(t+1) = T(S_1(t), S_2(t), ..., S_n(t)) - Transformation function creating emergence',
        realWorld: 'Like consciousness emerging from neurons, or market intelligence from individual traders'
      }
    }
  };

  const acts = {
    1: {
      title: "What You Think You Know",
      subtitle: "The Misconception Phase",
      description: "Most people think agentic AI is just smarter chatbots or better automation. Let's start there, then shatter that assumption.",
      content: "traditional"
    },
    2: {
      title: "The Game That Reveals Everything", 
      subtitle: "The Discovery Phase",
      description: "Watch what happens when we give three simple agents one task. The emergence you'll see couldn't be programmed.",
      content: "interactive"
    },
    3: {
      title: "What This Actually Means",
      subtitle: "The Transformation Phase", 
      description: "Now the mathematical insights become accessible. See how the patterns reflect deeper principles.",
      content: "mathematical"
    }
  };

  const handleActChange = (actNumber) => {
    if (actNumber <= currentAct + 1 || actNumber <= Math.max(2, currentAct)) {
      setCurrentAct(actNumber);
      setProgress((actNumber - 1) * 33.33 + (userInteracted ? 33.33 : 0));
    }
  };

  const handleInteraction = () => {
    setUserInteracted(true);
    setProgress(currentAct * 33.33);
  };

  const triggerAgentDemo = () => {
    if (!userTask.trim()) {
      alert('Please define a task for the agents first!');
      return;
    }
    
    const undefindedAgents = Object.values(agentTasks).filter(agent => !agent.task.trim());
    if (undefindedAgents.length > 0) {
      alert('Please define tasks for all agents first!');
      return;
    }
    
    setAgentDemo('running');
    setTimeout(() => {
      setAgentDemo('complete');
      setShowInsights({ coordination: true, emergence: true });
    }, 4000);
  };
  
  const handleAgentTaskUpdate = (agentId, task) => {
    setAgentTasks(prev => ({
      ...prev,
      [agentId]: { ...prev[agentId], task }
    }));
    setSelectedAgent(null);
  };
  
  const resetDemo = () => {
    setAgentDemo('idle');
    setShowInsights({});
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  return (
    <div className="three-acts-page">
      <div className="acts-container">
        {/* Progress Header */}
        <motion.div 
          className="acts-header"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <motion.h1 variants={itemVariants}>
            SpotlightAI Agents in 3 Acts Transformation Guide
          </motion.h1>
          <motion.p variants={itemVariants}>
            Experience the complete journey from misconception to mastery
          </motion.p>
          
          <motion.div className="progress-container" variants={itemVariants}>
            <div className="progress-track">
              <div 
                className="progress-fill"
                style={{ width: `${progress}%` }}
              />
            </div>
            <div className="progress-labels">
              <span className={currentAct >= 1 ? 'active' : ''}>Recognize</span>
              <span className={currentAct >= 2 ? 'active' : ''}>Experience</span>
              <span className={currentAct >= 3 ? 'active' : ''}>Transform</span>
            </div>
          </motion.div>
        </motion.div>

        {/* Act Navigation */}
        <div className="acts-navigation">
          {[1, 2, 3].map((actNum) => (
            <button
              key={actNum}
              className={`act-nav-btn ${currentAct === actNum ? 'active' : ''} ${
                actNum <= Math.max(2, currentAct) ? 'available' : 'locked'
              }`}
              onClick={() => handleActChange(actNum)}
              disabled={actNum > Math.max(2, currentAct)}
            >
              <span className="act-number">{actNum}</span>
              <div className="act-nav-content">
                <h3>{acts[actNum].title}</h3>
                <p>{acts[actNum].subtitle}</p>
              </div>
            </button>
          ))}
        </div>

        {/* Act Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentAct}
            className="act-content"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
          >
            <div className="act-header">
              <h2>{acts[currentAct].title}</h2>
              <p>{acts[currentAct].description}</p>
            </div>

            {/* Act 1: Traditional View */}
            {currentAct === 1 && (
              <div className="act-1-content">
                <div className="misconception-demo">
                  <h3>The Common Misconception</h3>
                  <div className="demo-grid">
                    <div className="demo-card traditional">
                      <h4>What People Think Agentic AI Is:</h4>
                      <ul>
                        <li>Smarter chatbots with better responses</li>
                        <li>Automated workflows with if/then logic</li>
                        <li>Pre-programmed decision trees</li>
                        <li>Linear, predictable interactions</li>
                      </ul>
                    </div>
                    <div className="vs-divider">VS</div>
                    <div className="demo-card reality">
                      <h4>What It Actually Is:</h4>
                      <ul>
                        <li>Emergent coordination between autonomous agents</li>
                        <li>Self-organizing systems with unprogrammed behaviors</li>
                        <li>Dynamic adaptation to novel situations</li>
                        <li>Mathematical foundations of distributed intelligence</li>
                      </ul>
                    </div>
                  </div>
                  
                  <div className="shatter-button-container">
                    <button 
                      className="shatter-btn"
                      onClick={() => {
                        handleInteraction();
                        setTimeout(() => handleActChange(2), 1000);
                      }}
                    >
                      Shatter This Assumption
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Act 2: Interactive Demo */}
            {currentAct === 2 && (
              <div className="act-2-content">
                <div className="interactive-demo">
                  <h3>Design Your Agent System</h3>
                  <div className="demo-explanation">
                    <p>
                      You're about to witness true emergence. Define a task and configure three agents 
                      to work together. Watch as they develop coordination strategies that nobody programmed.
                    </p>
                  </div>
                  
                  {/* Task Definition */}
                  <div className="task-definition">
                    <h4>1. Define the Main Task</h4>
                    <div className="task-input-container">
                      <input
                        type="text"
                        value={userTask}
                        onChange={(e) => setUserTask(e.target.value)}
                        placeholder="Describe the task for your agents (e.g., 'Optimize supply chain logistics', 'Coordinate emergency response', 'Manage traffic flow')..."
                        className="task-input"
                        disabled={agentDemo === 'running'}
                      />
                    </div>
                  </div>

                  {/* Agent Configuration */}
                  <div className="agent-configuration">
                    <h4>2. Configure Individual Agents</h4>
                    <p>Click on each agent to define their specific role and capabilities:</p>
                    
                    <div className={`agent-playground triangle-layout ${agentDemo}`}>
                      {/* Triangle Formation */}
                      <div 
                        className={`agent agent-1 ${selectedAgent === 'agent1' ? 'selected' : ''} ${
                          agentTasks.agent1.task ? 'configured' : ''
                        }`}
                        onClick={() => agentDemo === 'idle' && setSelectedAgent(selectedAgent === 'agent1' ? null : 'agent1')}
                      >
                        <div className="agent-core"></div>
                        <div className="agent-label">
                          <strong>{agentTasks.agent1.name}</strong>
                          <span>{agentTasks.agent1.task || 'Click to configure'}</span>
                        </div>
                      </div>
                      
                      <div 
                        className={`agent agent-2 ${selectedAgent === 'agent2' ? 'selected' : ''} ${
                          agentTasks.agent2.task ? 'configured' : ''
                        }`}
                        onClick={() => agentDemo === 'idle' && setSelectedAgent(selectedAgent === 'agent2' ? null : 'agent2')}
                      >
                        <div className="agent-core"></div>
                        <div className="agent-label">
                          <strong>{agentTasks.agent2.name}</strong>
                          <span>{agentTasks.agent2.task || 'Click to configure'}</span>
                        </div>
                      </div>
                      
                      <div 
                        className={`agent agent-3 ${selectedAgent === 'agent3' ? 'selected' : ''} ${
                          agentTasks.agent3.task ? 'configured' : ''
                        }`}
                        onClick={() => agentDemo === 'idle' && setSelectedAgent(selectedAgent === 'agent3' ? null : 'agent3')}
                      >
                        <div className="agent-core"></div>
                        <div className="agent-label">
                          <strong>{agentTasks.agent3.name}</strong>
                          <span>{agentTasks.agent3.task || 'Click to configure'}</span>
                        </div>
                      </div>
                      
                      {/* Arrow Connections */}
                      {(agentDemo === 'running' || agentDemo === 'complete') && (
                        <>
                          <div className="arrow-connection arrow-1-2">
                            <svg viewBox="0 0 100 20" className="arrow-svg">
                              <defs>
                                <marker id="arrowhead1" markerWidth="10" markerHeight="7" 
                                 refX="9" refY="3.5" orient="auto">
                                  <polygon points="0 0, 10 3.5, 0 7" fill="url(#connectionGradient)" />
                                </marker>
                                <linearGradient id="connectionGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                  <stop offset="0%" stopColor="var(--primary-cyan)" />
                                  <stop offset="100%" stopColor="var(--primary-magenta)" />
                                </linearGradient>
                              </defs>
                              <line x1="5" y1="10" x2="85" y2="10" stroke="url(#connectionGradient)" 
                                    strokeWidth="2" markerEnd="url(#arrowhead1)" />
                            </svg>
                          </div>
                          <div className="arrow-connection arrow-2-3">
                            <svg viewBox="0 0 100 20" className="arrow-svg">
                              <line x1="5" y1="10" x2="85" y2="10" stroke="url(#connectionGradient)" 
                                    strokeWidth="2" markerEnd="url(#arrowhead1)" />
                            </svg>
                          </div>
                          <div className="arrow-connection arrow-3-1">
                            <svg viewBox="0 0 100 20" className="arrow-svg">
                              <line x1="5" y1="10" x2="85" y2="10" stroke="url(#connectionGradient)" 
                                    strokeWidth="2" markerEnd="url(#arrowhead1)" />
                            </svg>
                          </div>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Agent Task Input Modal */}
                  {selectedAgent && (
                    <div className="agent-modal-overlay" onClick={() => setSelectedAgent(null)}>
                      <div className="agent-modal" onClick={(e) => e.stopPropagation()}>
                        <h4>Configure {agentTasks[selectedAgent].name}</h4>
                        <p>Define this agent's specific role and capabilities:</p>
                        <textarea
                          value={agentTasks[selectedAgent].task}
                          onChange={(e) => setAgentTasks(prev => ({
                            ...prev,
                            [selectedAgent]: { ...prev[selectedAgent], task: e.target.value }
                          }))}
                          placeholder={agentTasks[selectedAgent].placeholder}
                          className="agent-task-input"
                          rows="4"
                        />
                        <div className="modal-actions">
                          <button 
                            className="btn btn-secondary"
                            onClick={() => setSelectedAgent(null)}
                          >
                            Cancel
                          </button>
                          <button 
                            className="btn btn-primary"
                            onClick={() => handleAgentTaskUpdate(selectedAgent, agentTasks[selectedAgent].task)}
                          >
                            Save Configuration
                          </button>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Deploy Controls */}
                  <div className="deploy-section">
                    <h4>3. Deploy & Observe</h4>
                    <div className="agent-controls">
                      <button 
                        className="deploy-btn"
                        onClick={() => {
                          triggerAgentDemo();
                          handleInteraction();
                        }}
                        disabled={agentDemo === 'running'}
                      >
                        {agentDemo === 'idle' ? 'Deploy Agent System' : 
                         agentDemo === 'running' ? 'Agents Coordinating...' : 
                         'Deploy New System'}
                      </button>
                      {agentDemo === 'complete' && (
                        <button 
                          className="reset-btn"
                          onClick={resetDemo}
                        >
                          Reset & Try Again
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Emergence Results */}
                  {agentDemo === 'complete' && (
                    <div className="emergence-revelation">
                      <h4>🤯 Emergent Coordination Detected!</h4>
                      <div className="emergence-analysis">
                        <p>
                          <strong>Task:</strong> {userTask}
                        </p>
                        
                        <div className="agent-behaviors">
                          <h5>Observed Agent Behaviors:</h5>
                          {Object.entries(agentTasks).map(([id, agent]) => (
                            <div key={id} className="agent-behavior">
                              <strong>{agent.name}:</strong> Developed autonomous protocols for "{agent.task}" 
                              and began coordinating with other agents without explicit programming.
                            </div>
                          ))}
                        </div>
                        
                        <div className="emergence-insights">
                          <h5>🔬 What Just Happened:</h5>
                          <ul>
                            <li><strong>Self-Organization:</strong> Agents formed a triangular communication network spontaneously</li>
                            <li><strong>Distributed Intelligence:</strong> No single agent controlled the system, yet coordinated behavior emerged</li>
                            <li><strong>Adaptive Protocols:</strong> Communication patterns evolved based on task requirements</li>
                            <li><strong>Emergent Efficiency:</strong> Collective performance exceeded individual agent capabilities</li>
                          </ul>
                        </div>
                        
                        <div className="next-act-prompt">
                          <p>This coordination wasn't programmed—it <em>emerged</em> from mathematical principles.</p>
                          <button 
                            className="advance-btn"
                            onClick={() => handleActChange(3)}
                          >
                            Understand the Mathematics →
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Act 3: Mathematical Foundation */}
            {currentAct === 3 && (
              <div className="act-3-content">
                <div className="mathematical-insights">
                  <h3>The Mathematical Foundation</h3>
                  <p>Now you've seen emergence in action. Here are the three fundamental principles that explain it:</p>
                  
                  <div className="concept-cards-grid">
                    {Object.entries(mathematicalConcepts).map(([key, concept]) => (
                      <motion.div 
                        key={key}
                        className="concept-card"
                        whileHover={{ y: -4 }}
                        onClick={() => setSelectedConcept(key)}
                      >
                        <div className="concept-icon">
                          {key === 'energy' && '⚡'}
                          {key === 'coordination' && '🔄'}
                          {key === 'emergence' && '🎆'}
                        </div>
                        <h4>{concept.title}</h4>
                        <p>{concept.description}</p>
                        <button className="explore-btn">Explore Deeper →</button>
                      </motion.div>
                    ))}
                  </div>

                  {/* Concept Detail Modal */}
                  {selectedConcept && (
                    <div className="concept-modal-overlay" onClick={() => setSelectedConcept(null)}>
                      <div className="concept-modal" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-header">
                          <h3>{mathematicalConcepts[selectedConcept].title}</h3>
                          <button 
                            className="close-btn"
                            onClick={() => setSelectedConcept(null)}
                          >
                            ×
                          </button>
                        </div>
                        
                        <div className="modal-content">
                          <div className="concept-overview">
                            <h4>Overview</h4>
                            <p>{mathematicalConcepts[selectedConcept].details.overview}</p>
                          </div>
                          
                          <div className="concept-principles">
                            <h4>Key Principles</h4>
                            <ul>
                              {mathematicalConcepts[selectedConcept].details.principles.map((principle, index) => (
                                <li key={index}>{principle}</li>
                              ))}
                            </ul>
                          </div>
                          
                          <div className="concept-mathematics">
                            <h4>Mathematical Representation</h4>
                            <div className="math-formula">
                              {mathematicalConcepts[selectedConcept].details.mathematics}
                            </div>
                          </div>
                          
                          <div className="concept-real-world">
                            <h4>Real-World Analogy</h4>
                            <p>{mathematicalConcepts[selectedConcept].details.realWorld}</p>
                          </div>
                          
                          <div className="modal-note">
                            <p><em>This section will be enhanced with more detailed mathematical derivations and interactive visualizations.</em></p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="transformation-complete">
                    <h3>🎯 Transformation Complete</h3>
                    <p>
                      You now understand what agentic AI actually is: not just smarter software, 
                      but mathematical systems capable of genuine emergence and coordination. 
                      This changes everything about how we build, deploy, and think about AI systems.
                    </p>
                    
                    <div className="next-steps">
                      <h4>Ready to go deeper?</h4>
                      <div className="next-step-buttons">
                        <button className="btn btn-primary">
                          Build Your Own Agent
                        </button>
                        <button className="btn btn-secondary">
                          Join the Newsletter
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ThreeActs;