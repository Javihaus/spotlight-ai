import React, { useState } from 'react';
import { motion } from 'framer-motion';
import './Newsletter.css';

const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubscribed(true);
      setLoading(false);
      setEmail('');
    }, 1500);
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

  const recentPosts = [
    {
      title: "The Mathematics of Agent Coordination",
      preview: "Deep dive into the energy dynamics that enable autonomous agents to self-organize...",
      date: "Dec 2024",
      readTime: "5 min"
    },
    {
      title: "Why 99% of AI Startups Miss the Point",
      preview: "Most companies are building chatbots when they should be building coordination systems...",
      date: "Nov 2024", 
      readTime: "4 min"
    },
    {
      title: "Emergent Intelligence in Practice",
      preview: "Real-world examples of how agent systems develop unexpected capabilities...",
      date: "Nov 2024",
      readTime: "6 min"
    }
  ];

  return (
    <div className="newsletter-page">
      <motion.div 
        className="newsletter-container"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        {/* Hero Section */}
        <motion.section className="newsletter-hero" variants={itemVariants}>
          <h1>SpotlightAI Newsletter</h1>
          <p className="hero-subtitle">
            Weekly insights on agentic AI that actually matter. Join 5,300+ readers 
            understanding the mathematical foundations of autonomous intelligence.
          </p>
          
          <div className="value-props">
            <div className="value-prop">
              <span className="value-icon">🧠</span>
              <span>Deep insights, not surface trends</span>
            </div>
            <div className="value-prop">
              <span className="value-icon">⚡</span>
              <span>5-minute weekly reads</span>
            </div>
            <div className="value-prop">
              <span className="value-icon">🔬</span>
              <span>Mathematical foundations explained simply</span>
            </div>
          </div>
        </motion.section>

        {/* Newsletter Signup */}
        <motion.section className="signup-section" variants={itemVariants}>
          <div className="signup-card">
            {!isSubscribed ? (
              <>
                <h2>Join the Community</h2>
                <p>Get weekly insights delivered to your inbox</p>
                
                <div className="social-proof">
                  <div className="reader-avatars">
                    {[1, 2, 3, 4, 5, 6].map(i => (
                      <div key={i} className="avatar"></div>
                    ))}
                  </div>
                  <span className="reader-count">5,300+ weekly readers</span>
                </div>

                <form onSubmit={handleSubmit} className="newsletter-form">
                  <div className="form-group">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email address"
                      required
                      className="email-input"
                      disabled={loading}
                    />
                    <button 
                      type="submit" 
                      className="submit-btn"
                      disabled={loading}
                    >
                      {loading ? 'Joining...' : 'Join Newsletter'}
                    </button>
                  </div>
                  
                  <div className="signup-benefits">
                    <p>✓ No spam, ever</p>
                    <p>✓ Unsubscribe anytime</p>
                    <p>✓ Privacy-first approach</p>
                  </div>
                </form>
              </>
            ) : (
              <div className="success-state">
                <div className="success-icon">✓</div>
                <h2>Welcome to SpotlightAI!</h2>
                <p>
                  Check your email for confirmation and your first weekly insights. 
                  You'll receive deep dives into agentic AI every Tuesday.
                </p>
                <button 
                  className="btn btn-secondary"
                  onClick={() => setIsSubscribed(false)}
                >
                  Subscribe Another Email
                </button>
              </div>
            )}
          </div>
        </motion.section>

        {/* Recent Posts */}
        <motion.section className="recent-posts" variants={itemVariants}>
          <h2>Recent Insights</h2>
          <p>Get a taste of what you'll receive weekly</p>
          
          <div className="posts-grid">
            {recentPosts.map((post, index) => (
              <motion.article 
                key={index}
                className="post-card"
                variants={itemVariants}
                whileHover={{ y: -4 }}
              >
                <div className="post-meta">
                  <span className="post-date">{post.date}</span>
                  <span className="read-time">{post.readTime} read</span>
                </div>
                <h3>{post.title}</h3>
                <p>{post.preview}</p>
                <button className="read-more">Read More →</button>
              </motion.article>
            ))}
          </div>
        </motion.section>

        {/* Newsletter Stats */}
        <motion.section className="newsletter-stats" variants={itemVariants}>
          <h2>By the Numbers</h2>
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-number">5,300+</div>
              <div className="stat-label">Weekly Readers</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">47%</div>
              <div className="stat-label">Open Rate</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">5 min</div>
              <div className="stat-label">Avg Read Time</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">98%</div>
              <div className="stat-label">Retention Rate</div>
            </div>
          </div>
        </motion.section>

        {/* Testimonials */}
        <motion.section className="testimonials" variants={itemVariants}>
          <h2>What Readers Say</h2>
          <div className="testimonials-grid">
            <div className="testimonial-card">
              <p>
                "Finally, someone explaining agentic AI beyond the hype. 
                The mathematical insights are gold."
              </p>
              <div className="testimonial-author">
                <div className="author-avatar"></div>
                <div>
                  <strong>Dr. Sarah Chen</strong>
                  <span>AI Research Director</span>
                </div>
              </div>
            </div>
            
            <div className="testimonial-card">
              <p>
                "SpotlightAI helped me understand why our agent systems 
                were failing. Game-changing insights."
              </p>
              <div className="testimonial-author">
                <div className="author-avatar"></div>
                <div>
                  <strong>Marcus Rodriguez</strong>
                  <span>CTO, TechCorp</span>
                </div>
              </div>
            </div>
            
            <div className="testimonial-card">
              <p>
                "The three-act framework transformed how I think about 
                autonomous systems. Brilliant approach."
              </p>
              <div className="testimonial-author">
                <div className="author-avatar"></div>
                <div>
                  <strong>Dr. Elena Petrov</strong>
                  <span>ML Engineering Lead</span>
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Call to Action */}
        {!isSubscribed && (
          <motion.section className="final-cta" variants={itemVariants}>
            <div className="cta-card">
              <h2>Ready to Transform Your Understanding?</h2>
              <p>
                Join thousands of AI professionals getting weekly insights 
                that actually matter.
              </p>
              <button 
                className="btn btn-primary"
                onClick={() => document.querySelector('.email-input').focus()}
              >
                Join the Newsletter
              </button>
            </div>
          </motion.section>
        )}
      </motion.div>
    </div>
  );
};

export default Newsletter;