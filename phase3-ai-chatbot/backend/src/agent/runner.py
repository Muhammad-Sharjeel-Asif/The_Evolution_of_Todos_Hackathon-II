import os
from dataclasses import dataclass
from typing import Any, Optional, List
from uuid import UUID

from agents import Runner, ToolCallItem, ToolCallOutputItem
from agents.models.multi_provider import MultiProvider
from agents.run import RunConfig
from sqlmodel import Session

from .todo_agent import AgentContext, create_todo_agent, TodoAgent
from .config import AgentConfig, get_agent_config, LLMProvider, AgentConfigError


@dataclass
class ToolCallInfo:
    """Information about a tool call made by the agent."""
    tool: str
    input: dict[str, Any]
    output: Any


@dataclass
class AgentResponse:
    """Response from the agent runner."""
    response: str
    tool_calls: list[ToolCallInfo]


class AgentRunner:
    """
    Runner for executing the TodoAssistant agent with multi-provider fallback.
    """

    def __init__(self, config: Optional[AgentConfig] = None):
        self.config = config or get_agent_config()

    def get_agent(self, model: str, user_name: Optional[str] = None) -> TodoAgent:
        """Create a fresh agent instance for a specific model."""
        return create_todo_agent(model, self.config, user_name=user_name)

    def _build_input(
        self,
        message: str,
        history: Optional[list[dict[str, str]]] = None,
    ) -> list[dict[str, Any]]:
        input_items = []
        if history:
            for msg in history:
                input_items.append({"role": msg["role"], "content": msg["content"]})
        input_items.append({"role": "user", "content": message})
        return input_items

    def _extract_tool_calls(self, new_items: list) -> list[ToolCallInfo]:
        tool_calls = []
        tool_inputs = {}

        def get_attr(obj: Any, key: str, default: Any = None) -> Any:
            if isinstance(obj, dict):
                return obj.get(key, default)
            return getattr(obj, key, default)

        for item in new_items:
            if isinstance(item, ToolCallItem):
                raw = item.raw_item
                item_id = get_attr(raw, 'id') or get_attr(raw, 'call_id')
                item_name = get_attr(raw, 'name') or get_attr(raw, 'function', {})
                if isinstance(item_name, dict):
                    item_name = item_name.get('name', 'unknown')
                item_args = get_attr(raw, 'arguments', {})
                if isinstance(item_args, str):
                    try:
                        import json
                        item_args = json.loads(item_args)
                    except:
                        item_args = {}
                if item_id:
                    tool_inputs[item_id] = {"tool": item_name, "input": item_args}
            elif isinstance(item, ToolCallOutputItem):
                raw = item.raw_item
                call_id = get_attr(raw, 'call_id') or get_attr(raw, 'tool_call_id')
                if call_id and call_id in tool_inputs:
                    info = tool_inputs[call_id]
                    tool_calls.append(ToolCallInfo(
                        tool=info["tool"],
                        input=info["input"],
                        output=item.output,
                    ))
        return tool_calls

    async def run(
        self,
        session: Session,
        user_id: UUID,
        message: str,
        history: Optional[list[dict[str, str]]] = None,
        user_name: Optional[str] = None,
    ) -> AgentResponse:
        """Run the agent with fallback logic across multiple providers."""
        if not self.config.providers:
            raise AgentConfigError("No valid AI keys found. Please check your .env file.")

        input_items = self._build_input(message, history)
        context = AgentContext(session=session, user_id=user_id)

        last_error = None
        
        for provider in self.config.providers:
            # FIX: Shield model names with '/' by prepending 'openai/'
            # This prevents MultiProvider from crashing on "Unknown prefix" errors
            model_name = provider.model
            if "/" in model_name and not model_name.startswith("openai/"):
                model_name = f"openai/{model_name}"

            print(f"[CHAT] Attempting {provider.name} with model {model_name}...")
            
            try:
                # FIX: Explicit Configuration
                # We create a FRESH MultiProvider and RunConfig for this specific request.
                # This bypasses all global os.environ caching and is thread-safe.
                model_provider = MultiProvider(
                    openai_api_key=provider.api_key,
                    openai_base_url=provider.base_url
                )
                
                run_config = RunConfig(
                    model_provider=model_provider
                )

                # Initialize agent with the shielded model name
                agent = self.get_agent(model_name, user_name)

                # Run
                result = await Runner.run(
                    starting_agent=agent,
                    input=input_items,
                    context=context,
                    run_config=run_config
                )

                # Success
                tool_calls = self._extract_tool_calls(result.new_items)
                response = result.final_output or ""
                print(f"[CHAT] {provider.name} responded successfully.")
                return AgentResponse(response=str(response), tool_calls=tool_calls)

            except Exception as e:
                err_str = str(e)
                print(f"[WARN] {provider.name} failed: {err_str[:200]}")
                
                # Check for 403/Forbidden which usually means No Balance
                if "403" in err_str or "credit" in err_str.lower() or "balance" in err_str.lower():
                    print(f"      -> Provider {provider.name} rejected our request (Likely $0 Balance).")
                
                last_error = e
                continue

        # If we got here, all providers failed
        print("[CHAT] All providers failed.")
        raise last_error or Exception("Assistant failed to respond. All providers exhausted.")


async def run_agent(
    session: Session,
    user_id: UUID,
    message: str,
    history: Optional[list[dict[str, str]]] = None,
    config: Optional[AgentConfig] = None,
    user_name: Optional[str] = None,
) -> AgentResponse:
    runner = AgentRunner(config=config)
    return await runner.run(session, user_id, message, history, user_name)
