import React from 'react';
import './LoadMoreButton.css';

const LoadMoreButton = ({ onClick, children, className = '', disabled = false }) => {
  return (
    <button 
      className={`load-more-btn ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children || 'Load More'}
    </button>
  );
};

export default LoadMoreButton;