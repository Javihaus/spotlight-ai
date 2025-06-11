import React from 'react';
import SpotlightHeader from './SpotlightHeader';
import SpotlightFooter from './SpotlightFooter';
import './SpotlightLayout.css';

const SpotlightLayout = ({ children, className = '' }) => {
  return (
    <div className={`spotlight-layout ${className}`}>
      <SpotlightHeader />
      <main className="main-content">
        {children}
      </main>
      <SpotlightFooter />
    </div>
  );
};

export default SpotlightLayout;