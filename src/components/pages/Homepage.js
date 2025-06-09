import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import './Homepage.css';

const Homepage = () => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleNewsletterSignup = (e) => {
    e.preventDefault();
    // TODO: Implement actual newsletter signup logic
    console.log('Newsletter signup:', email);
    setIsSubscribed(true);
    setEmail('');
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
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
    <div className="homepage">
      {/* Hero Section */}
      <motion.section 
        className="hero-section"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <div className="hero-container">
          <motion.div className="hero-content" variants={itemVariants}>
            <h1 className="hero-title">
              99% of AI's potential is 
              <span className="gradient-text"> untapped</span>
            </h1>
            <p className="hero-subtitle">
              Discover the mathematical foundation of autonomous intelligence through 
              our three-act transformation guide. Join 5,300+ readers understanding 
              what agentic AI really means.
            </p>
          </motion.div>

          <motion.div className="hero-newsletter" variants={itemVariants}>
            <div className="newsletter-card">
              <div className="newsletter-header">
                <h2>Join the SpotlightAI Newsletter</h2>
                <p>Weekly insights on agentic AI - 5 minute read</p>
                <div className="social-proof">
                  <div className="reader-avatars">
                    {[1, 2, 3, 4, 5].map(i => (
                      <div key={i} className="avatar"></div>
                    ))}
                  </div>
                  <span className="reader-count">5,300+ readers</span>
                </div>
              </div>

              {!isSubscribed ? (
                <form onSubmit={handleNewsletterSignup} className="newsletter-form">
                  <div className="form-group">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email address"
                      required
                      className="email-input"
                    />
                    <button type="submit" className="submit-btn">
                      Subscribe
                    </button>
                  </div>
                  <p className="privacy-text">
                    No spam. Unsubscribe anytime. Privacy-first approach.
                  </p>
                </form>
              ) : (
                <div className="success-message">
                  <div className="success-icon">✓</div>
                  <h3>Welcome to SpotlightAI!</h3>
                  <p>Check your email for confirmation and your first insights.</p>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Three Acts Preview */}
      <motion.section 
        className="three-acts-preview"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={containerVariants}
      >
        <div className="section-container">
          <motion.div className="section-header" variants={itemVariants}>
            <h2 className="section-title">Agents in 3 Acts Transformation</h2>
            <p className="section-subtitle">
              Experience the complete journey from misconception to mastery
            </p>
          </motion.div>

          <div className="acts-grid">
            <motion.div className="act-card" variants={itemVariants}>
              <div className="act-number">01</div>
              <h3>What You Think You Know</h3>
              <p>
                Start with what people think agentic AI means - smarter chatbots, 
                better automation. Then witness emergence that couldn't be programmed.
              </p>
              <div className="act-progress">
                <div className="progress-bar">
                  <div className="progress-fill" style={{ width: '25%' }}></div>
                </div>
                <span>Setup</span>
              </div>
            </motion.div>

            <motion.div className="act-card" variants={itemVariants}>
              <div className="act-number">02</div>
              <h3>The Game That Reveals Everything</h3>
              <p>
                Interactive experience where you deploy agents to solve complex problems. 
                Watch strategies emerge that no human programmed.
              </p>
              <div className="act-progress">
                <div className="progress-bar">
                  <div className="progress-fill" style={{ width: '50%' }}></div>
                </div>
                <span>Discovery</span>
              </div>
            </motion.div>

            <motion.div className="act-card" variants={itemVariants}>
              <div className="act-number">03</div>
              <h3>What This Actually Means</h3>
              <p>
                Mathematical insights become accessible. Connect patterns to deeper 
                principles - energy dynamics, coordination, emergent intelligence.
              </p>
              <div className="act-progress">
                <div className="progress-bar">
                  <div className="progress-fill" style={{ width: '25%' }}></div>
                </div>
                <span>Transformation</span>
              </div>
            </motion.div>
          </div>

          <motion.div className="cta-section" variants={itemVariants}>
            <Link to="/three-acts" className="btn btn-primary">
              Experience Agents in Action
            </Link>
            <p className="cta-subtitle">
              Transform your understanding in 30 minutes
            </p>
          </motion.div>
        </div>
      </motion.section>

      {/* Value Proposition */}
      <motion.section 
        className="value-section"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={containerVariants}
      >
        <div className="section-container">
          <motion.div className="value-grid" variants={itemVariants}>
            <div className="value-card">
              <div className="value-icon">🧠</div>
              <h3>Understanding, Not Just Information</h3>
              <p>
                Move beyond surface-level explanations to genuine comprehension 
                of how autonomous agents coordinate and learn.
              </p>
            </div>
            
            <div className="value-card">
              <div className="value-icon">🔬</div>
              <h3>Mathematical Foundation</h3>
              <p>
                Discover the rigorous mathematical principles underlying 
                emergent intelligence and agent coordination.
              </p>
            </div>
            
            <div className="value-card">
              <div className="value-icon">⚡</div>
              <h3>Immediate Application</h3>
              <p>
                Build your own basic agentic behaviors and see how they 
                interact in real-time simulations.
              </p>
            </div>
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
};

export default Homepage;