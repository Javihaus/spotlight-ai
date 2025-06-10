import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import EmailAgentScenario from '../scenarios/EmailAgentScenario';
import GeometricFoundation from '../geometry/GeometricFoundation';
// import MathFramework from '../MathFramework'; // Removed for Act 3 redesign
import './ThreeActs.css';
import './ThreeActsRealTime.css';

const ThreeActs = () => {
  const [currentAct, setCurrentAct] = useState(1);
  const [progress, setProgress] = useState(0);
  const [userInteracted, setUserInteracted] = useState(false);
  const [emailScenarioRunning, setEmailScenarioRunning] = useState(false);
  const [selectedConcept, setSelectedConcept] = useState(null);
  const [communicationRadius, setCommunicationRadius] = useState(120);
  
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
      title: "The Mathematical Soul Revealed", 
      subtitle: "The Discovery Phase",
      description: "Watch real agents coordinate through geometric necessity. Above: practical scenario. Below: the mathematical truth that makes it inevitable.",
      content: "geometric"
    },
    3: {
      title: "What This Actually Means",
      subtitle: "The Transformation Phase", 
      description: "Now you understand: true agency emerges from geometric constraints, not programming. This changes everything.",
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

  const startEmailScenario = () => {
    setEmailScenarioRunning(true);
    handleInteraction();
  };

  const onScenarioComplete = () => {
    // Scenario completed, user can move to Act 3
    setProgress(100);
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

            {/* Act 2: Mathematical Soul - Distill.pub Style */}
            {currentAct === 2 && (
              <div className="act-2-content">
                <div className="distill-demo">
                  <div className="demo-introduction">
                    <h3>The Mathematical Soul of Agentic AI</h3>
                    <p>
                      Below, watch a real email processing system where three agents coordinate autonomously. 
                      Then discover the geometric necessity that makes this coordination mathematically inevitable.
                    </p>
                    
                    <div className="start-demo-section">
                      <button 
                        className="start-demo-btn"
                        onClick={startEmailScenario}
                        disabled={emailScenarioRunning}
                      >
                        {emailScenarioRunning ? 'Scenario Running...' : 'Start Email Processing Demo'}
                      </button>
                    </div>
                  </div>

                  {/* Upper Part: Email Agent Scenario */}
                  <EmailAgentScenario 
                    isRunning={emailScenarioRunning}
                    onComplete={onScenarioComplete}
                    communicationRadius={communicationRadius}
                    onRadiusChange={setCommunicationRadius}
                  />

                  {/* Lower Part: Geometric Foundation */}
                  <GeometricFoundation 
                    isActive={currentAct === 2}
                    communicationRadius={communicationRadius}
                    onRadiusChange={setCommunicationRadius}
                  />

                  {/* Transition to Act 3 */}
                  <div className="act-transition">
                    <div className="transition-content">
                      <h4>Ready for the Final Insight?</h4>
                      <p>
                        You've seen the practical coordination and the geometric necessity. 
                        Now discover what this means for the future of AI systems.
                      </p>
                      <button 
                        className="advance-btn"
                        onClick={() => handleActChange(3)}
                      >
                        Complete the Transformation →
                      </button>
                    </div>
                  </div>
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