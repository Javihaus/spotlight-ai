import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { TfiArrowRight, TfiTarget, TfiThought, TfiStatsUp } from 'react-icons/tfi';
import './HomepageSpotlight.css';

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

  // Animated dots background effect with grey dots
  useEffect(() => {
    const dotsContainer = document.getElementById('heroDotsBackground');
    if (!dotsContainer) return;

    // Create dots
    const createDots = () => {
      dotsContainer.innerHTML = '';
      const dotCount = 200;
      
      for (let i = 0; i < dotCount; i++) {
        const dot = document.createElement('div');
        dot.className = 'hero-animated-dot';
        dot.style.left = Math.random() * 100 + '%';
        dot.style.top = Math.random() * 100 + '%';
        dot.style.animationDelay = Math.random() * 3 + 's';
        dotsContainer.appendChild(dot);
      }
    };

    // Mouse move handler
    const handleMouseMove = (e) => {
      const rect = dotsContainer.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;
      
      const dots = dotsContainer.querySelectorAll('.hero-animated-dot');
      dots.forEach((dot, index) => {
        const dotX = parseFloat(dot.style.left) / 100;
        const dotY = parseFloat(dot.style.top) / 100;
        
        const distance = Math.sqrt((x - dotX) ** 2 + (y - dotY) ** 2);
        const influence = Math.max(0, 1 - distance * 2.5);
        
        if (influence > 0) {
          const moveX = (x - dotX) * influence * 25;
          const moveY = (y - dotY) * influence * 25;
          const scale = 1 + influence * 2.5;
          
          dot.style.transform = `translate(${moveX}px, ${moveY}px) scale(${scale})`;
          dot.style.opacity = 0.4 + influence * 0.6;
        } else {
          dot.style.transform = 'translate(0, 0) scale(1)';
          dot.style.opacity = 0.4;
        }
      });
    };

    createDots();
    dotsContainer.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      dotsContainer.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div className="homepage-spotlight" style={{ border: '5px solid #3c1199' }}>
      {/* Hero Section */}
      <section className="hero-spotlight">
        <div className="hero-container">
          <motion.div 
            className="hero-content"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="hero-animated-title-container">
              <h1 className="hero-animated-title">
                99% of AI's potential is agentic
              </h1>
              <div className="hero-dots-background" id="heroDotsBackground"></div>
            </div>
            <p className="hero-subtitle">
              Transform your understanding from misconception to mastery through our interactive three-act experience. Discover the geometric necessity that makes coordination inevitable.
            </p>
            
            <div className="hero-cta">
              <Link to="/three-acts" className="cta-primary">
                Start Transformation
                <TfiArrowRight />
              </Link>
              <a href="#newsletter" className="cta-secondary">
                Join Newsletter
              </a>
            </div>

          </motion.div>

          <motion.div 
            className="newsletter-spotlight"
            id="newsletter"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          >
            <div className="newsletter-header">
              <h2>SpotlightAI Insights</h2>
              <p>Weekly deep dives into agentic AI - 5 minute reads that transform understanding</p>
              
              <div className="social-proof">
                <div className="reader-avatars">
                  {[1, 2, 3, 4, 5].map(i => (
                    <div key={i} className="avatar"></div>
                  ))}
                </div>
                <span className="reader-count">Join 1,200+ AI practitioners</span>
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
                    <TfiArrowRight />
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
          </motion.div>
        </div>
      </section>

      {/* Three Acts Preview */}
      <section className="three-acts-preview">
        <div className="section-container">
          <motion.div 
            className="section-header"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="section-title">The Transformation Journey</h2>
            <p className="section-subtitle">
              Three acts that completely change how you understand AI systems
            </p>
          </motion.div>

          <div className="acts-grid">
            {[
              {
                number: "01",
                title: "Recognition",
                content: "Start with what everyone thinks agentic AI means - smarter chatbots, better automation. Then witness emergence that couldn't be programmed.",
                progress: 25,
                label: "Setup"
              },
              {
                number: "02", 
                title: "Experience",
                content: "Interactive simulation where you control real agent parameters. Watch coordination patterns emerge from pure geometric necessity.",
                progress: 50,
                label: "Discovery"
              },
              {
                number: "03",
                title: "Transformation", 
                content: "Mathematical insights become intuitive. Connect geometric patterns to real AI system behavior and deployment success.",
                progress: 100,
                label: "Mastery"
              }
            ].map((act, index) => (
              <motion.div 
                key={act.number}
                className="act-preview-card"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -8 }}
              >
                <div className="act-number">{act.number}</div>
                <h3>{act.title}</h3>
                <p>{act.content}</p>
                <div className="act-progress">
                  <div className="progress-bar">
                    <div className="progress-fill" style={{ width: `${act.progress}%` }}></div>
                  </div>
                  <span>{act.label}</span>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div 
            className="cta-section"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Link to="/three-acts" className="cta-primary">
              Begin Transformation
              <TfiArrowRight />
            </Link>
            <p className="cta-subtitle">
              Complete journey in under 30 minutes
            </p>
          </motion.div>
        </div>
      </section>

      {/* Value Proposition */}
      <section className="value-section">
        <div className="section-container">
          <div className="value-grid">
            {[
              {
                icon: <TfiTarget />,
                title: "Deep Understanding",
                content: "Move beyond surface explanations to genuine comprehension of how autonomous agents coordinate through mathematical necessity."
              },
              {
                icon: <TfiThought />,
                title: "Interactive Learning", 
                content: "Experience geometric constraints firsthand through real simulations that respond to your parameter adjustments."
              },
              {
                icon: <TfiStatsUp />,
                title: "Practical Application",
                content: "Connect mathematical insights to real AI deployment decisions. Understand why some systems succeed while others fail."
              }
            ].map((value, index) => (
              <motion.div 
                key={value.title}
                className="value-card"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -8 }}
              >
                <div className="value-icon">{value.icon}</div>
                <h3>{value.title}</h3>
                <p>{value.content}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Homepage;
