"""
Agent module for Phase III AI Chatbot.

This module provides the OpenAI Agents SDK integration for the TodoAssistant agent.
The agent uses MCP tools to perform task operations based on natural language input.
"""
from .todo_agent import create_todo_agent, TodoAgent
from .runner import AgentRunner, run_agent
from .config import AgentConfig, get_agent_config

__all__ = [
    "create_todo_agent",
    "TodoAgent",
    "AgentRunner",
    "run_agent",
    "AgentConfig",
    "get_agent_config",
]
