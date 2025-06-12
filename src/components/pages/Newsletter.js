import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { TfiTarget, TfiThought, TfiStatsUp, TfiEmail, TfiArrowRight } from 'react-icons/tfi';
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

  const latestNews = [
    {
      title: "Tracing the thoughts of a large language model",
      description: "Anthropic researchers developed a new 'AI microscope' to understand Claude's internal mechanisms across languages and reasoning tasks.",
      url: "https://www.anthropic.com/news/tracing-thoughts-language-model",
      source: "Anthropic",
      date: "Dec 2024",
      image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&h=600&fit=crop"
    },
    {
      title: "Accenture Launches Distiller Agentic AI Framework",
      description: "Enterprise-grade platform to build, deploy, and scale advanced AI agents across various infrastructures with industrialized development tools.",
      url: "https://newsroom.accenture.com/news/2025/accenture-launches-distiller-agentic-ai-framework-to-accelerate-scalable-industry-ai-solutions",
      source: "Accenture",
      date: "Jan 2025",
      image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&h=600&fit=crop"
    },
    {
      title: "What's next for the future of computing",
      description: "IBM Research insights on emerging computational approaches including quantum computing and AI, featuring key industry leaders.",
      url: "https://www.ibm.com/think/videos/think-keynotes/computing-future",
      source: "IBM Think",
      date: "May 2025",
      image: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=800&h=600&fit=crop"
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
        {/* Latest News - Moved to beginning */}
        <motion.section className="latest-news" variants={itemVariants}>
          <h2>Latest in Agentic AI</h2>
          <p>Stay updated with cutting-edge developments in autonomous intelligence</p>
          
          <div className="news-grid">
            {latestNews.map((news, index) => (
              <motion.article 
                key={index}
                className="news-card"
                variants={itemVariants}
                whileHover={{ y: -8, scale: 1.02 }}
                onClick={() => window.open(news.url, '_blank')}
              >
                <h3 className="news-title">{news.title}</h3>
                <div className="news-image">
                  <img src={news.image} alt={news.title} />
                </div>
                <div className="news-content">
                  <div className="news-meta">
                    <span className="news-source">{news.source}</span>
                    <span className="news-date">{news.date}</span>
                  </div>
                  <p className="news-description">{news.description}</p>
                  <div className="news-action">
                    <span>Read Full Article</span>
                    <TfiArrowRight />
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </motion.section>

        {/* Newsletter Hero Section */}
        <motion.section className="newsletter-hero" variants={itemVariants}>
          <h2>SpotlightAI Observatory</h2>
          <p className="hero-subtitle">
            Weekly insights on agentic AI that actually matter. Join 5,300+ readers 
            understanding the mathematical foundations of autonomous intelligence.
          </p>
          
          <div className="value-props">
            <div className="value-prop">
              <TfiTarget className="value-icon" />
              <span>Deep insights, not surface trends</span>
            </div>
            <div className="value-prop">
              <TfiThought className="value-icon" />
              <span>5-minute weekly reads</span>
            </div>
            <div className="value-prop">
              <TfiStatsUp className="value-icon" />
              <span>Mathematical foundations explained simply</span>
            </div>
          </div>
        </motion.section>

        {/* Newsletter Signup - Simple Button */}
        <motion.section className="signup-section" variants={itemVariants}>
          <div className="simple-subscribe-section">
            <div className="subscribe-content">
              <p>Join 5,300+ readers getting weekly insights into agentic AI</p>
              {!isSubscribed ? (
                <button 
                  onClick={handleSubmit}
                  className="subscribe-button-simple"
                  disabled={loading}
                >
                  {loading ? 'Joining...' : 'Subscribe'}
                  <TfiArrowRight />
                </button>
              ) : (
                <div className="success-message-simple">
                  <span>✓ Successfully subscribed! Check your email.</span>
                </div>
              )}
            </div>
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