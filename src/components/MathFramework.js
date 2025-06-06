import React, { useState, useEffect } from 'react';

const MathFramework = () => {
  const [activeStep, setActiveStep] = useState(0);
  
  const steps = [
    {
      title: "Agent State Vector",
      equation: "S_i(t) = {goals_i, knowledge_i, constraints_i}",
      insight: "Each agent maintains independent state"
    },
    {
      title: "Communication Function", 
      equation: "C(i→j) = f(S_i, S_j, channel_ij)",
      insight: "Information exchange through mathematical protocols"
    },
    {
      title: "Collective Optimization",
      equation: "D* = argmax Σ U_i(S_i, S_-i)",
      insight: "Decisions emerge from collective utility maximization"
    },
    {
      title: "Emergent Coordination",
      equation: "E(t+1) = T(S_1(t), S_2(t), ..., S_n(t))",
      insight: "System behavior emerges from agent interactions"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % steps.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="glass-card" style={{ margin: '2rem' }}>
      <h2>Mathematical Foundation</h2>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
        <div>
          {steps.map((step, index) => (
            <div 
              key={index}
              style={{
                padding: '1rem',
                margin: '0.5rem 0',
                backgroundColor: activeStep === index ? 'rgba(0, 212, 255, 0.1)' : 'transparent',
                border: activeStep === index ? '1px solid var(--primary-cyan)' : '1px solid transparent',
                borderRadius: '8px',
                transition: 'all 0.3s ease'
              }}
            >
              <h4>{step.title}</h4>
              <code style={{ 
                display: 'block', 
                background: 'rgba(0,0,0,0.1)', 
                padding: '0.5rem',
                borderRadius: '4px',
                fontFamily: 'monospace',
                margin: '0.5rem 0'
              }}>
                {step.equation}
              </code>
              <p style={{ fontSize: '0.9rem', opacity: '0.8' }}>{step.insight}</p>
            </div>
          ))}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ 
            width: '200px', 
            height: '200px', 
            background: 'linear-gradient(45deg, var(--primary-cyan), var(--primary-magenta))',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative'
          }}>
            <div style={{ color: 'white', fontWeight: 'bold', fontSize: '1.2rem' }}>
              {steps[activeStep].title}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MathFramework;
