import React from 'react';
import { motion } from 'framer-motion';
import './Resources.css';

const Resources = () => {
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

  const mathResources = [
    {
      title: "Agent State Vector Mathematics",
      description: "Deep dive into the mathematical representation of agent states and how they evolve over time.",
      type: "Technical Paper",
      level: "Advanced",
      link: "#"
    },
    {
      title: "Communication Function Optimization",
      description: "Understanding how agents develop efficient communication protocols through mathematical optimization.",
      type: "Research",
      level: "Intermediate", 
      link: "#"
    },
    {
      title: "Emergent Coordination Mechanisms",
      description: "Mathematical foundations of how distributed systems achieve coordination without central control.",
      type: "Tutorial",
      level: "Beginner",
      link: "#"
    }
  ];

  const practicalResources = [
    {
      title: "Build Your First Agent System",
      description: "Step-by-step guide to implementing basic agentic behaviors using Python and mathematical principles.",
      type: "Tutorial",
      level: "Beginner",
      link: "#"
    },
    {
      title: "Agent Simulation Toolkit",
      description: "Open-source tools for experimenting with multi-agent coordination and emergence.",
      type: "Code",
      level: "Intermediate",
      link: "#"
    },
    {
      title: "Production Agent Deployment",
      description: "Best practices for deploying autonomous agent systems in real-world applications.",
      type: "Guide",
      level: "Advanced",
      link: "#"
    }
  ];

  const industryResources = [
    {
      title: "Agentic AI in Finance",
      description: "How autonomous agents are revolutionizing trading, risk management, and financial optimization.",
      type: "Case Study",
      level: "Industry",
      link: "#"
    },
    {
      title: "Healthcare Agent Coordination", 
      description: "Applications of multi-agent systems in medical diagnosis, treatment planning, and patient care.",
      type: "Case Study", 
      level: "Industry",
      link: "#"
    },
    {
      title: "Supply Chain Optimization",
      description: "Real-world examples of agent systems optimizing complex supply chain networks.",
      type: "Case Study",
      level: "Industry", 
      link: "#"
    }
  ];

  const tools = [
    {
      name: "Agent Builder",
      description: "Visual tool for creating and testing basic agent behaviors",
      status: "Available",
      link: "#"
    },
    {
      name: "Coordination Simulator",
      description: "Interactive environment for exploring agent coordination patterns",
      status: "Beta",
      link: "#"
    },
    {
      name: "Mathematical Framework Visualizer",
      description: "Interactive visualization of the mathematical concepts",
      status: "Coming Soon",
      link: "#"
    }
  ];

  const ResourceCard = ({ resource, onClick }) => (
    <motion.div 
      className="resource-card"
      variants={itemVariants}
      whileHover={{ y: -4 }}
      onClick={onClick}
    >
      <div className="resource-header">
        <h3>{resource.title}</h3>
        <div className="resource-badges">
          <span className={`badge badge-${resource.type.toLowerCase().replace(' ', '-')}`}>
            {resource.type}
          </span>
          <span className={`badge badge-${resource.level.toLowerCase()}`}>
            {resource.level}
          </span>
        </div>
      </div>
      <p>{resource.description}</p>
      <button className="resource-link">
        Access Resource →
      </button>
    </motion.div>
  );

  const ToolCard = ({ tool }) => (
    <motion.div 
      className="tool-card"
      variants={itemVariants}
      whileHover={{ y: -4 }}
    >
      <div className="tool-header">
        <h3>{tool.name}</h3>
        <span className={`status status-${tool.status.toLowerCase().replace(' ', '-')}`}>
          {tool.status}
        </span>
      </div>
      <p>{tool.description}</p>
      <button 
        className={`tool-btn ${tool.status === 'Coming Soon' ? 'disabled' : ''}`}
        disabled={tool.status === 'Coming Soon'}
      >
        {tool.status === 'Coming Soon' ? 'Notify Me' : 'Try Tool'}
      </button>
    </motion.div>
  );

  return (
    <div className="resources-page">
      <motion.div 
        className="resources-container"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        {/* Hero Section */}
        <motion.section className="resources-hero" variants={itemVariants}>
          <h1>Resources & Tools</h1>
          <p>
            Everything you need to understand, build, and deploy agentic AI systems. 
            From mathematical foundations to practical implementations.
          </p>
        </motion.section>

        {/* Search and Filter */}
        <motion.section className="resources-filter" variants={itemVariants}>
          <div className="filter-controls">
            <input 
              type="search" 
              placeholder="Search resources..."
              className="search-input"
            />
            <div className="filter-buttons">
              <button className="filter-btn active">All</button>
              <button className="filter-btn">Mathematical</button>
              <button className="filter-btn">Practical</button>
              <button className="filter-btn">Industry</button>
              <button className="filter-btn">Tools</button>
            </div>
          </div>
        </motion.section>

        {/* Mathematical Resources */}
        <motion.section className="resource-section" variants={itemVariants}>
          <div className="section-header">
            <h2>Mathematical Foundations</h2>
            <p>Deep dive into the mathematical principles underlying agentic AI</p>
          </div>
          <div className="resources-grid">
            {mathResources.map((resource, index) => (
              <ResourceCard 
                key={index} 
                resource={resource}
                onClick={() => console.log('Navigate to', resource.title)}
              />
            ))}
          </div>
        </motion.section>

        {/* Practical Resources */}
        <motion.section className="resource-section" variants={itemVariants}>
          <div className="section-header">
            <h2>Practical Implementation</h2>
            <p>Hands-on guides and tutorials for building agent systems</p>
          </div>
          <div className="resources-grid">
            {practicalResources.map((resource, index) => (
              <ResourceCard 
                key={index} 
                resource={resource}
                onClick={() => console.log('Navigate to', resource.title)}
              />
            ))}
          </div>
        </motion.section>

        {/* Industry Applications */}
        <motion.section className="resource-section" variants={itemVariants}>
          <div className="section-header">
            <h2>Industry Applications</h2>
            <p>Real-world case studies and industry-specific implementations</p>
          </div>
          <div className="resources-grid">
            {industryResources.map((resource, index) => (
              <ResourceCard 
                key={index} 
                resource={resource}
                onClick={() => console.log('Navigate to', resource.title)}
              />
            ))}
          </div>
        </motion.section>

        {/* Interactive Tools */}
        <motion.section className="tools-section" variants={itemVariants}>
          <div className="section-header">
            <h2>Interactive Tools</h2>
            <p>Hands-on tools for experimenting with agentic AI concepts</p>
          </div>
          <div className="tools-grid">
            {tools.map((tool, index) => (
              <ToolCard key={index} tool={tool} />
            ))}
          </div>
        </motion.section>

        {/* Getting Started Guide */}
        <motion.section className="getting-started" variants={itemVariants}>
          <div className="getting-started-card">
            <h2>New to Agentic AI?</h2>
            <p>Start your journey with our curated learning path</p>
            
            <div className="learning-path">
              <div className="path-step">
                <div className="step-number">1</div>
                <div className="step-content">
                  <h3>Understand the Foundations</h3>
                  <p>Begin with our Three-Act Transformation Guide</p>
                </div>
              </div>
              
              <div className="path-step">
                <div className="step-number">2</div>
                <div className="step-content">
                  <h3>Explore the Mathematics</h3>
                  <p>Study agent coordination and emergence principles</p>
                </div>
              </div>
              
              <div className="path-step">
                <div className="step-number">3</div>
                <div className="step-content">
                  <h3>Build Your First Agent</h3>
                  <p>Implement basic agentic behaviors with our tutorials</p>
                </div>
              </div>
              
              <div className="path-step">
                <div className="step-number">4</div>
                <div className="step-content">
                  <h3>Join the Community</h3>
                  <p>Connect with other practitioners and researchers</p>
                </div>
              </div>
            </div>
            
            <button className="btn btn-primary">
              Start Learning Path
            </button>
          </div>
        </motion.section>

        {/* Newsletter CTA */}
        <motion.section className="newsletter-cta" variants={itemVariants}>
          <div className="cta-card">
            <h2>Stay Updated</h2>
            <p>
              Get weekly insights and new resources delivered to your inbox. 
              Join 5,300+ readers exploring the future of agentic AI.
            </p>
            <button className="btn btn-primary">
              Join Newsletter
            </button>
          </div>
        </motion.section>
      </motion.div>
    </div>
  );
};

export default Resources;