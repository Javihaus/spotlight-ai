import React from 'react';
import { motion } from 'framer-motion';
import './AboutKonpo.css';

const About = () => {
  return (
    <div className="about-konpo">
      {/* Hero Section */}
      <section className="about-hero">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="about-hero-content"
          >
            <h1>About SpotlightAI</h1>
            <p className="lead-text">
              Making agentic AI accessible through interactive mathematical exploration. 
              Transforming misconceptions into deep understanding through experience.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="section">
        <div className="container-narrow">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2>Our Mission</h2>
            <p>
              Most people think agentic AI is just smarter chatbots or better automation. 
              This misconception limits our ability to build, deploy, and understand truly 
              intelligent systems. We believe in the power of interactive experience to 
              transform understanding from surface-level familiarity to mathematical intuition.
            </p>
            
            <p>
              Through our three-act experience, we guide you from common misconceptions 
              to the geometric necessity that drives real agent coordination. This isn't 
              just education—it's transformation that changes how you approach AI systems.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Values Section */}
      <section className="section" style={{ background: '#fafafa' }}>
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="values-content"
          >
            <h2>Our Approach</h2>
            <div className="values-grid">
              <div className="value-item">
                <h3>Interactive Learning</h3>
                <p>
                  Understanding emerges through experience, not explanation. 
                  Our simulations let you discover mathematical truths firsthand.
                </p>
              </div>
              
              <div className="value-item">
                <h3>Mathematical Foundation</h3>
                <p>
                  Real agent intelligence emerges from geometric constraints 
                  and mathematical optimization, not programming tricks.
                </p>
              </div>
              
              <div className="value-item">
                <h3>Practical Connection</h3>
                <p>
                  We bridge the gap between mathematical insights and real-world 
                  AI deployment decisions that determine success or failure.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Vision Section */}
      <section className="section">
        <div className="container-narrow">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2>Our Vision</h2>
            <p>
              A world where AI practitioners understand the mathematical foundations 
              of intelligence, where deployment decisions are based on geometric 
              insights rather than trial and error, and where the true potential 
              of agentic systems is unlocked through deep comprehension.
            </p>
            
            <p>
              When you complete our three-act journey, you don't just know about 
              agentic AI—you understand it at a fundamental level that changes 
              how you think about intelligence itself.
            </p>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section" style={{ background: '#f8f8f8' }}>
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="cta-section"
          >
            <h2>Ready to Transform Your Understanding?</h2>
            <p>
              Join thousands of AI practitioners who have discovered the mathematical 
              foundations of agentic intelligence.
            </p>
            <div className="cta-buttons">
              <a href="/three-acts" className="btn btn-primary">
                Start the Experience
              </a>
              <a href="/#newsletter" className="btn btn-secondary">
                Get Weekly Insights
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default About;