import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import LLMConfig from '../settings/LLMConfig';
import './Footer.css';

const Footer = () => {
  const [showLLMConfig, setShowLLMConfig] = useState(false);

  return (
    <>
      <LLMConfig isOpen={showLLMConfig} onClose={() => setShowLLMConfig(false)} />
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          {/* Logo and Description */}
          <div className="footer-section">
            <div className="footer-logo">
              <img 
                src="/SpotlightAI-logo-03.png" 
                alt="SpotlightAI" 
                className="footer-logo-image"
              />
            </div>
            <p className="footer-description">
              Understanding the mathematical foundation of autonomous intelligence 
              through three-act transformation.
            </p>
          </div>

          {/* Navigation Links */}
          <div className="footer-section">
            <h3>Navigate</h3>
            <div className="footer-links">
              <Link to="/">Home</Link>
              <Link to="/three-acts">Agents in 3 Acts</Link>
              <Link to="/newsletter">Newsletter</Link>
              <Link to="/resources">Resources</Link>
              <button 
                className="footer-link-btn"
                onClick={() => setShowLLMConfig(true)}
              >
                LLM Settings
              </button>
            </div>
          </div>

          {/* Contact */}
          <div className="footer-section">
            <h3>Connect</h3>
            <div className="footer-links">
              <a href="mailto:hello@spotlight-ai.com">Contact</a>
              <a href="https://github.com/Javihaus/spotlight-ai" target="_blank" rel="noopener noreferrer">
                GitHub
              </a>
              <a href="https://linkedin.com/company/spotlight-ai" target="_blank" rel="noopener noreferrer">
                LinkedIn
              </a>
            </div>
          </div>

          {/* Newsletter Signup */}
          <div className="footer-section">
            <h3>Stay Updated</h3>
            <p>Get insights on agentic AI delivered weekly.</p>
            <Link to="/newsletter" className="footer-cta">
              Join Newsletter
            </Link>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; 2024 SpotlightAI. All rights reserved.</p>
          <div className="footer-meta">
            <span>Made for</span>
            <div className="association-logo">
              <img 
                src="/GenAiA-Logo-Horizontal-1.png" 
                alt="Generative AI Association Spain" 
                className="genai-logo"
              />
            </div>
          </div>
        </div>
      </div>
    </footer>
    </>
  );
};

export default Footer;