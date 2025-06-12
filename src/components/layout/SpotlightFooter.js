import React from 'react';
import { Link } from 'react-router-dom';
import './SpotlightFooter.css';

const SpotlightFooter = () => {
  return (
    <footer className="spotlight-footer">
      <div className="footer-inner">
        {/* Main Footer Content */}
        <div className="footer-grid">
          {/* Brand Section */}
          <div className="footer-brand">
            <Link to="/" className="footer-logo">
              <img 
                src="/SpotlightAI-logo_new-04.png" 
                alt="SpotlightAI Logo" 
                className="footer-logo-image"
              />
              <span className="footer-logo-text">SpotlightAI</span>
            </Link>
            <p className="footer-description">
              Making agentic AI accessible through interactive mathematical exploration.
            </p>
          </div>

          {/* Navigation Links */}
          <div className="footer-section">
            <h4 className="footer-section-title">Navigation</h4>
            <ul className="footer-links">
              <li><Link to="/" className="footer-link">Home</Link></li>
              <li><Link to="/three-acts" className="footer-link">Experience</Link></li>
              <li><Link to="/about" className="footer-link">About</Link></li>
            </ul>
          </div>

          {/* Resources */}
          <div className="footer-section">
            <h4 className="footer-section-title">Learn</h4>
            <ul className="footer-links">
              <li><a href="#" className="footer-link">Documentation</a></li>
              <li><a href="#" className="footer-link">Research</a></li>
              <li><a href="#" className="footer-link">Case Studies</a></li>
            </ul>
          </div>

          {/* Connect */}
          <div className="footer-section">
            <h4 className="footer-section-title">Connect</h4>
            <ul className="footer-links">
              <li><a href="#" className="footer-link">GitHub</a></li>
              <li><a href="#" className="footer-link">Twitter</a></li>
              <li><a href="#" className="footer-link">LinkedIn</a></li>
            </ul>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="footer-bottom">
          <div className="footer-bottom-content">
            <p className="footer-copyright">
              © 2025 SpotlightAI. All rights reserved.
            </p>
            <div className="footer-bottom-links">
              <a href="#" className="footer-bottom-link">Privacy Policy</a>
              <span className="footer-divider">•</span>
              <a href="#" className="footer-bottom-link">Terms of Service</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default SpotlightFooter;