import React from 'react';
import KonpoHeader from './KonpoHeader';
import KonpoFooter from './KonpoFooter';
import './KonpoLayout.css';

const KonpoLayout = ({ children, className = '' }) => {
  return (
    <div className={`konpo-layout ${className}`}>
      <KonpoHeader />
      <main className="main-content">
        {children}
      </main>
      <KonpoFooter />
    </div>
  );
};

export default KonpoLayout;