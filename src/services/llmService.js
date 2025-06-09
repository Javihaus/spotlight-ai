class LLMService {
  constructor() {
    this.config = this.loadConfig();
  }

  loadConfig() {
    const saved = localStorage.getItem('spotlightai-llm-config');
    return saved ? JSON.parse(saved) : {
      provider: 'claude',
      apiKey: '',
      model: 'claude-3-sonnet-20240229',
      maxTokens: 1000,
      temperature: 0.7
    };
  }

  isConfigured() {
    return this.config.apiKey && this.config.apiKey.trim().length > 0;
  }

  async sendMessage(prompt, context = {}) {
    if (!this.isConfigured()) {
      throw new Error('LLM not configured. Please set up your API key in settings.');
    }

    switch (this.config.provider) {
      case 'claude':
        return this.sendToClaude(prompt, context);
      case 'openai':
        return this.sendToOpenAI(prompt, context);
      case 'local':
        return this.sendToLocal(prompt, context);
      default:
        throw new Error(`Unsupported provider: ${this.config.provider}`);
    }
  }

  async sendToClaude(prompt, context) {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': this.config.apiKey,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: this.config.model,
        max_tokens: this.config.maxTokens,
        temperature: this.config.temperature,
        messages: [
          {
            role: 'user',
            content: this.buildAgentPrompt(prompt, context)
          }
        ]
      })
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(`Claude API Error: ${error.error?.message || 'Unknown error'}`);
    }

    const data = await response.json();
    return data.content[0].text;
  }

  async sendToOpenAI(prompt, context) {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.config.apiKey}`
      },
      body: JSON.stringify({
        model: this.config.model,
        max_tokens: this.config.maxTokens,
        temperature: this.config.temperature,
        messages: [
          {
            role: 'system',
            content: 'You are an autonomous agent in a multi-agent system. Respond concisely and focus on coordination.'
          },
          {
            role: 'user',
            content: this.buildAgentPrompt(prompt, context)
          }
        ]
      })
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(`OpenAI API Error: ${error.error?.message || 'Unknown error'}`);
    }

    const data = await response.json();
    return data.choices[0].message.content;
  }

  async sendToLocal(prompt, context) {
    // Placeholder for local model integration
    // This would typically connect to a local Ollama instance or similar
    throw new Error('Local model integration not yet implemented. Please use Claude or OpenAI.');
  }

  buildAgentPrompt(prompt, context) {
    const { agentName, agentRole, currentTask, otherAgents, systemState } = context;
    
    return `You are ${agentName}, an autonomous agent with the following role: ${agentRole}

CURRENT TASK: ${currentTask}

YOUR SPECIFIC ROLE: ${agentRole}

OTHER AGENTS IN THE SYSTEM:
${otherAgents ? otherAgents.map(agent => `- ${agent.name}: ${agent.role}`).join('\n') : 'None'}

SYSTEM STATE: ${systemState || 'Initializing'}

COMMUNICATION REQUEST: ${prompt}

Please respond as ${agentName} would, focusing on:
1. How you would approach your part of the task
2. What information you need from other agents
3. What information you can provide to other agents
4. Any coordination strategies you propose

Keep your response concise (1-3 sentences) and action-oriented. Focus on practical coordination rather than general discussion.`;
  }

  // Simulate agent communication workflow
  async simulateAgentConversation(task, agents) {
    if (!this.isConfigured()) {
      throw new Error('LLM not configured');
    }

    const communicationLog = [];
    const agentStates = {};

    // Initialize agent states
    Object.entries(agents).forEach(([id, agent]) => {
      agentStates[id] = {
        ...agent,
        status: 'initializing',
        lastMessage: '',
        receivedMessages: []
      };
    });

    try {
      // Phase 1: Each agent analyzes the task
      for (const [agentId, agent] of Object.entries(agents)) {
        const response = await this.sendMessage(
          `How do you approach this task: "${task}"?`,
          {
            agentName: agent.name,
            agentRole: agent.task,
            currentTask: task,
            otherAgents: Object.values(agents).filter(a => a.name !== agent.name),
            systemState: 'Task Analysis Phase'
          }
        );

        agentStates[agentId].lastMessage = response;
        agentStates[agentId].status = 'analyzed';

        communicationLog.push({
          id: Date.now() + Math.random(),
          timestamp: new Date(),
          from: agent.name,
          to: 'System',
          type: 'analysis',
          message: response,
          phase: 'Task Analysis'
        });
      }

      // Phase 2: Agents communicate with each other
      const agentList = Object.entries(agents);
      for (let i = 0; i < agentList.length; i++) {
        const [agentId, agent] = agentList[i];
        const targetAgent = agentList[(i + 1) % agentList.length];
        
        const response = await this.sendMessage(
          `Based on your analysis, what do you want to communicate to ${targetAgent[1].name}?`,
          {
            agentName: agent.name,
            agentRole: agent.task,
            currentTask: task,
            otherAgents: Object.values(agents).filter(a => a.name !== agent.name),
            systemState: 'Coordination Phase'
          }
        );

        communicationLog.push({
          id: Date.now() + Math.random(),
          timestamp: new Date(),
          from: agent.name,
          to: targetAgent[1].name,
          type: 'coordination',
          message: response,
          phase: 'Agent Coordination'
        });

        agentStates[agentId].status = 'coordinating';
      }

      // Phase 3: Collective decision
      const allAnalyses = Object.values(agentStates).map(state => 
        `${state.name}: ${state.lastMessage}`
      ).join('\n\n');

      const collectiveResponse = await this.sendMessage(
        `Based on all agent analyses, what is the optimal coordination strategy for the task: "${task}"?

Agent Analyses:
${allAnalyses}`,
        {
          agentName: 'System Coordinator',
          agentRole: 'Synthesize agent communications into optimal strategy',
          currentTask: task,
          systemState: 'Synthesis Phase'
        }
      );

      communicationLog.push({
        id: Date.now() + Math.random(),
        timestamp: new Date(),
        from: 'System',
        to: 'All Agents',
        type: 'synthesis',
        message: collectiveResponse,
        phase: 'Collective Strategy'
      });

      return {
        communicationLog,
        agentStates,
        finalStrategy: collectiveResponse,
        success: true
      };

    } catch (error) {
      communicationLog.push({
        id: Date.now() + Math.random(),
        timestamp: new Date(),
        from: 'System',
        to: 'Error',
        type: 'error',
        message: error.message,
        phase: 'Error'
      });

      return {
        communicationLog,
        agentStates,
        error: error.message,
        success: false
      };
    }
  }

  // Test connection
  async testConnection() {
    try {
      const response = await this.sendMessage(
        'Hello, can you respond with a brief confirmation that you are working?',
        {
          agentName: 'Test Agent',
          agentRole: 'Connection testing',
          currentTask: 'Verify API connectivity',
          systemState: 'Testing'
        }
      );
      return { success: true, message: response };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }
}

const llmServiceInstance = new LLMService();
export default llmServiceInstance;