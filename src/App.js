import React from 'react';
import './App.css';
import SpotlightDemo from './components/SpotlightDemo';

function App() {
  return (
    <div className="App">
      <header className="app-header">
        <div className="logo">
          <div className="logo-icon"></div>
          <h1>SpotlightAI</h1>
        </div>
        <p>Next-Generation Autonomous Intelligence</p>
      </header>
      
      <main>
        <SpotlightDemo />
        
        <section className="hero-section">
          <h2>The Future of AI is Autonomous</h2>
          <p>Experience intelligent agents that coordinate, learn, and adapt without human intervention.</p>
        </section>
      </main>
    </div>
  );
}

export default App;
