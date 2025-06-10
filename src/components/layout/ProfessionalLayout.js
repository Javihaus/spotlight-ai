import React from 'react';
import ProfessionalHeader from './ProfessionalHeader';
import './ProfessionalLayout.css';

const ProfessionalLayout = ({ children, className = '' }) => {
  return (
    <div className={`professional-layout ${className}`}>
      <ProfessionalHeader />
      <main className="main-content">
        {children}
      </main>
    </div>
  );
};

export default ProfessionalLayout;