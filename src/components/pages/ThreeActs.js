import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import MathFramework from '../MathFramework';
import './ThreeActs.css';

const ThreeActs = () => {
  const [currentAct, setCurrentAct] = useState(1);
  const [progress, setProgress] = useState(0);
  const [userInteracted, setUserInteracted] = useState(false);
  const [agentDemo, setAgentDemo] = useState('idle');

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
    setAgentDemo('running');
    setTimeout(() => setAgentDemo('complete'), 3000);
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
            SpotlightAI Three-Act Transformation Guide
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
                  <h3>Deploy Three Agents: One Simple Task</h3>
                  <p>Task: Optimize resource distribution across a network</p>
                  
                  <div className="agent-playground">
                    <div className="agent-controls">
                      <button 
                        className="deploy-btn"
                        onClick={() => {
                          triggerAgentDemo();
                          handleInteraction();
                        }}
                        disabled={agentDemo === 'running'}
                      >
                        {agentDemo === 'idle' ? 'Deploy Agents' : 
                         agentDemo === 'running' ? 'Agents Working...' : 
                         'Deploy New Scenario'}
                      </button>
                    </div>

                    <div className={`agent-visualization ${agentDemo}`}>
                      <div className="agent agent-1">
                        <div className="agent-core"></div>
                        <span>Agent A: Resource Scanner</span>
                      </div>
                      <div className="agent agent-2">
                        <div className="agent-core"></div>
                        <span>Agent B: Distribution Optimizer</span>
                      </div>
                      <div className="agent agent-3">
                        <div className="agent-core"></div>
                        <span>Agent C: Efficiency Monitor</span>
                      </div>
                      
                      {agentDemo === 'running' && (
                        <>
                          <div className="connection-line line-1-2"></div>
                          <div className="connection-line line-2-3"></div>
                          <div className="connection-line line-1-3"></div>
                        </>
                      )}
                    </div>

                    {agentDemo === 'complete' && (
                      <div className="emergence-revelation">
                        <h4>🤯 The Emergence</h4>
                        <p>
                          The agents developed a <strong>triangular communication protocol</strong> 
                          that no human programmed. Agent A began sharing partial data, 
                          Agent B created dynamic routing algorithms, and Agent C developed 
                          predictive efficiency metrics. Together, they evolved a 
                          <strong>distributed optimization strategy</strong> that exceeded 
                          any individual agent's capabilities.
                        </p>
                        
                        <div className="next-act-prompt">
                          <p>This wasn't programmed. It <em>emerged</em>.</p>
                          <button 
                            className="advance-btn"
                            onClick={() => handleActChange(3)}
                          >
                            Understand the Mathematics →
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Act 3: Mathematical Foundation */}
            {currentAct === 3 && (
              <div className="act-3-content">
                <div className="mathematical-insights">
                  <h3>The Mathematical Foundation</h3>
                  <p>Now you've seen emergence in action. Here's the mathematics that explains it:</p>
                  
                  <MathFramework />
                  
                  <div className="insights-grid">
                    <div className="insight-card">
                      <h4>Energy Dynamics</h4>
                      <p>
                        The agents minimize collective energy through distributed optimization, 
                        naturally finding efficient coordination patterns.
                      </p>
                    </div>
                    
                    <div className="insight-card">
                      <h4>Coordination Mechanisms</h4>
                      <p>
                        Communication functions enable agents to share state information 
                        and develop synchronized behaviors without central control.
                      </p>
                    </div>
                    
                    <div className="insight-card">
                      <h4>Emergent Intelligence</h4>
                      <p>
                        The transformation function T creates collective behaviors 
                        that transcend individual agent capabilities.
                      </p>
                    </div>
                  </div>

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