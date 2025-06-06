import React from 'react';
import './App.css';
import MathFramework from './components/MathFramework';

function App() {
  return (
    <div className="App">
      <header className="app-header">
        <div className="logo">
          <div className="logo-icon"></div>
          <h1>SpotlightAI</h1>
        </div>
        <p>Mathematical Foundation of Autonomous Intelligence</p>
      </header>
      
      <main>
        <section className="hero-section">
          <h2>How Agents Actually Coordinate</h2>
          <p>The mathematical framework behind emergent intelligence.</p>
        </section>
        
        <MathFramework />
      </main>
    </div>
  );
}

export default App;
