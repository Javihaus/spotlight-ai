import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import './LLMConfig.css';

const LLMConfig = ({ isOpen, onClose }) => {
  const [config, setConfig] = useState({
    provider: 'claude',
    apiKey: '',
    model: 'claude-3-sonnet-20240229',
    maxTokens: 1000,
    temperature: 0.7
  });

  const [isTestingConnection, setIsTestingConnection] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState(null);

  // Load config from localStorage on mount
  useEffect(() => {
    const savedConfig = localStorage.getItem('spotlightai-llm-config');
    if (savedConfig) {
      setConfig(JSON.parse(savedConfig));
    }
  }, []);

  // Save config to localStorage
  const saveConfig = () => {
    localStorage.setItem('spotlightai-llm-config', JSON.stringify(config));
    setConnectionStatus({ type: 'success', message: 'Configuration saved successfully!' });
    setTimeout(() => setConnectionStatus(null), 3000);
  };

  // Test API connection
  const testConnection = async () => {
    if (!config.apiKey.trim()) {
      setConnectionStatus({ type: 'error', message: 'Please enter an API key first.' });
      return;
    }

    setIsTestingConnection(true);
    setConnectionStatus({ type: 'info', message: 'Testing connection...' });

    try {
      // Simple test call to verify API key works
      const response = await fetch('/api/test-llm', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          provider: config.provider,
          apiKey: config.apiKey,
          model: config.model
        })
      });

      if (response.ok) {
        setConnectionStatus({ type: 'success', message: 'Connection successful! API is working.' });
      } else {
        setConnectionStatus({ type: 'error', message: 'Connection failed. Please check your API key.' });
      }
    } catch (error) {
      setConnectionStatus({ type: 'error', message: 'Network error. Please try again.' });
    } finally {
      setIsTestingConnection(false);
    }
  };

  const handleInputChange = (field, value) => {
    setConfig(prev => ({ ...prev, [field]: value }));
    setConnectionStatus(null); // Clear status when config changes
  };

  const providers = [
    { value: 'claude', label: 'Anthropic Claude', models: ['claude-3-sonnet-20240229', 'claude-3-haiku-20240307'] },
    { value: 'openai', label: 'OpenAI GPT', models: ['gpt-4', 'gpt-3.5-turbo'] },
    { value: 'local', label: 'Local Model', models: ['llama2', 'custom'] }
  ];

  if (!isOpen) return null;

  return (
    <div className="llm-config-overlay" onClick={onClose}>
      <motion.div 
        className="llm-config-modal"
        onClick={(e) => e.stopPropagation()}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.3 }}
      >
        <div className="config-header">
          <h2>LLM Configuration</h2>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>

        <div className="config-content">
          <div className="config-section">
            <label>AI Provider</label>
            <select 
              value={config.provider}
              onChange={(e) => handleInputChange('provider', e.target.value)}
              className="config-select"
            >
              {providers.map(provider => (
                <option key={provider.value} value={provider.value}>
                  {provider.label}
                </option>
              ))}
            </select>
          </div>

          <div className="config-section">
            <label>API Key</label>
            <input
              type="password"
              value={config.apiKey}
              onChange={(e) => handleInputChange('apiKey', e.target.value)}
              placeholder="Enter your API key..."
              className="config-input"
            />
            <small className="config-help">
              Your API key is stored locally and never sent to our servers.
            </small>
          </div>

          <div className="config-section">
            <label>Model</label>
            <select 
              value={config.model}
              onChange={(e) => handleInputChange('model', e.target.value)}
              className="config-select"
            >
              {providers
                .find(p => p.value === config.provider)?.models
                .map(model => (
                  <option key={model} value={model}>{model}</option>
                ))}
            </select>
          </div>

          <div className="config-row">
            <div className="config-section">
              <label>Max Tokens</label>
              <input
                type="number"
                value={config.maxTokens}
                onChange={(e) => handleInputChange('maxTokens', parseInt(e.target.value))}
                min="100"
                max="4000"
                className="config-input"
              />
            </div>

            <div className="config-section">
              <label>Temperature</label>
              <input
                type="number"
                value={config.temperature}
                onChange={(e) => handleInputChange('temperature', parseFloat(e.target.value))}
                min="0"
                max="1"
                step="0.1"
                className="config-input"
              />
            </div>
          </div>

          {connectionStatus && (
            <div className={`status-message status-${connectionStatus.type}`}>
              {connectionStatus.message}
            </div>
          )}

          <div className="config-actions">
            <button 
              className="test-btn"
              onClick={testConnection}
              disabled={isTestingConnection}
            >
              {isTestingConnection ? 'Testing...' : 'Test Connection'}
            </button>
            <button className="save-btn" onClick={saveConfig}>
              Save Configuration
            </button>
          </div>

          <div className="config-info">
            <h3>How to get API keys:</h3>
            <ul>
              <li><strong>Claude:</strong> Visit <a href="https://console.anthropic.com" target="_blank" rel="noopener noreferrer">console.anthropic.com</a></li>
              <li><strong>OpenAI:</strong> Visit <a href="https://platform.openai.com/api-keys" target="_blank" rel="noopener noreferrer">platform.openai.com/api-keys</a></li>
              <li><strong>Local:</strong> Set up your own model endpoint</li>
            </ul>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default LLMConfig;