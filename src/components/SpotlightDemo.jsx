/* New SpotlightAI Color Scheme and Background */
:root {
  --primary-cyan: #00d4ff;
  --primary-magenta: #ff006e;
  --dark-space: #0a0a0a;
  --glass-bg: rgba(255, 255, 255, 0.1);
  --glass-border: rgba(255, 255, 255, 0.2);
}

/* Dark space-like background gradient */
body {
  margin: 0;
  padding: 0;
  min-height: 100vh;
  background: linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 25%, #16213e 50%, #0f3460 75%, #0a0a0a 100%);
  background-attachment: fixed;
  color: white;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
}

/* Animated background particles effect */
body::before {
  content: '';
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: 
    radial-gradient(circle at 20% 80%, rgba(0, 212, 255, 0.1) 0%, transparent 50%),
    radial-gradient(circle at 80% 20%, rgba(255, 0, 110, 0.1) 0%, transparent 50%);
  animation: backgroundShift 10s ease-in-out infinite alternate;
  z-index: -1;
}

@keyframes backgroundShift {
  0% { opacity: 0.3; }
  100% { opacity: 0.6; }
}

/* New logo design - circular gradient with center dot */
.logo {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--primary-cyan) 0%, var(--primary-magenta) 100%);
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  animation: logoGlow 3s ease-in-out infinite alternate;
}

.logo::after {
  content: '';
  width: 12px;
  height: 12px;
  background: white;
  border-radius: 50%;
  position: absolute;
}

@keyframes logoGlow {
  0% { box-shadow: 0 0 20px rgba(0, 212, 255, 0.5); }
  100% { box-shadow: 0 0 40px rgba(255, 0, 110, 0.8); }
}

/* Glass-morphism design elements */
.glass-card {
  background: var(--glass-bg);
  backdrop-filter: blur(20px);
  border: 1px solid var(--glass-border);
  border-radius: 16px;
  padding: 2rem;
  margin: 1rem;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  transition: all 0.3s ease;
}

.glass-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 12px 48px rgba(0, 0, 0, 0.4);
  border-color: rgba(0, 212, 255, 0.3);
}

/* Interactive demo section */
.demo-container {
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin: 4rem 0;
}

.chatbot-demo, .autonomous-ai-demo {
  width: 300px;
  height: 200px;
  position: relative;
  overflow: hidden;
}

/* Chatbot visualization */
.chatbot-visual {
  background: linear-gradient(45deg, rgba(100, 100, 100, 0.2) 0%, rgba(150, 150, 150, 0.1) 100%);
  border-radius: 12px;
  padding: 20px;
  position: relative;
}

.chatbot-messages {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.message-bubble {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 18px;
  padding: 8px 12px;
  max-width: 80%;
  animation: messageAppear 2s ease-in-out infinite;
}

@keyframes messageAppear {
  0%, 100% { opacity: 0.5; }
  50% { opacity: 1; }
}

/* Autonomous AI visualization */
.autonomous-ai-visual {
  background: linear-gradient(45deg, var(--primary-cyan) 0%, var(--primary-magenta) 100%);
  border-radius: 12px;
  padding: 20px;
  position: relative;
  overflow: hidden;
}

.ai-network {
  position: relative;
  width: 100%;
  height: 100%;
}

.ai-node {
  position: absolute;
  width: 12px;
  height: 12px;
  background: white;
  border-radius: 50%;
  animation: nodeGlow 2s ease-in-out infinite alternate;
}

.ai-node:nth-child(1) { top: 20%; left: 20%; animation-delay: 0s; }
.ai-node:nth-child(2) { top: 20%; right: 20%; animation-delay: 0.5s; }
.ai-node:nth-child(3) { bottom: 20%; left: 30%; animation-delay: 1s; }
.ai-node:nth-child(4) { bottom: 20%; right: 30%; animation-delay: 1.5s; }

@keyframes nodeGlow {
  0% { box-shadow: 0 0 10px rgba(255, 255, 255, 0.5); transform: scale(1); }
  100% { box-shadow: 0 0 20px rgba(255, 255, 255, 1); transform: scale(1.2); }
}

/* Connection lines between nodes */
.connection-line {
  position: absolute;
  height: 2px;
  background: linear-gradient(90deg, transparent 0%, white 50%, transparent 100%);
  animation: connectionPulse 3s ease-in-out infinite;
}

@keyframes connectionPulse {
  0%, 100% { opacity: 0.3; }
  50% { opacity: 1; }
}

/* Mobile responsive design */
@media (max-width: 768px) {
  .demo-container {
    flex-direction: column;
    gap: 2rem;
  }
  
  .chatbot-demo, .autonomous-ai-demo {
    width: 90%;
    max-width: 350px;
  }
  
  .glass-card {
    margin: 0.5rem;
    padding: 1.5rem;
  }
  
  .logo {
    width: 50px;
    height: 50px;
  }
}

@media (max-width: 480px) {
  .glass-card {
    padding: 1rem;
  }
  
  body {
    font-size: 14px;
  }
}
