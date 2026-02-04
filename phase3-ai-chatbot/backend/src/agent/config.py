import os
from dataclasses import dataclass, field
from typing import Optional, List


class AgentConfigError(Exception):
    """Raised when agent configuration is invalid or missing."""
    pass


@dataclass
class LLMProvider:
    """Configuration for an LLM provider."""
    name: str
    api_key: str
    base_url: Optional[str] = None
    model: str = ""


@dataclass
class AgentConfig:
    """
    Configuration for the TodoAssistant agent with multi-provider support.

    Attributes:
        max_tokens: Maximum tokens for response (default: 1024)
        temperature: Sampling temperature (default: 0.3 for reliable tool calling)
        history_limit: Maximum messages to load for context (default: 50)
        providers: List of configured LLM providers in priority order
    """
    max_tokens: int = 1024
    temperature: float = 0.3
    history_limit: int = 50
    providers: List[LLMProvider] = field(default_factory=list)

    def __post_init__(self):
        """Initialize providers from environment variables."""
        if not self.providers:
            self.providers = self._load_providers()

    def _load_providers(self) -> List[LLMProvider]:
        """Load available providers from environment variables in priority order."""
        available_providers = []

        # 1. Groq (Fast & Reliable - NEW)
        groq_key = os.environ.get("GROQ_API_KEY")
        if groq_key and groq_key.strip() and not groq_key.startswith("your-"):
            available_providers.append(LLMProvider(
                name="Groq",
                api_key=groq_key.strip(),
                base_url=os.environ.get("GROQ_BASE_URL", "https://api.groq.com/openai/v1"),
                model=os.environ.get("GROQ_MODEL", "llama-3.3-70b-versatile")
            ))

        # 2. Grok (xAI)
        grok_key = os.environ.get("GROK_API_KEY")
        if grok_key and grok_key.strip() and not grok_key.startswith("your-") and len(grok_key) > 20:
            available_providers.append(LLMProvider(
                name="Grok",
                api_key=grok_key.strip(),
                base_url="https://api.x.ai/v1",
                model=os.environ.get("GROK_MODEL", "grok-beta")
            ))

        # 3. OpenRouter
        openrouter_key = os.environ.get("OPENROUTER_API_KEY")
        if openrouter_key and openrouter_key.strip() and not openrouter_key.startswith("sk-or-v1-bcde"):
            available_providers.append(LLMProvider(
                name="OpenRouter",
                api_key=openrouter_key.strip(),
                base_url="https://openrouter.ai/api/v1",
                model=os.environ.get("OPENROUTER_MODEL", "mistralai/mistral-7b-instruct:free")
            ))

        # 4. Gemini
        gemini_key = os.environ.get("GEMINI_API_KEY")
        if gemini_key and gemini_key.strip() and not gemini_key.startswith("AIzaSyBBAV"):
            available_providers.append(LLMProvider(
                name="Gemini",
                api_key=gemini_key.strip(),
                base_url="https://generativelanguage.googleapis.com/v1beta/openai/",
                model=os.environ.get("GEMINI_MODEL", "gemini-1.5-flash")
            ))

        # 5. OpenAI (Standard fallback)
        openai_key = os.environ.get("OPENAI_API_KEY")
        if openai_key and openai_key.strip() and not openai_key.startswith("your-"):
            available_providers.append(LLMProvider(
                name="OpenAI",
                api_key=openai_key.strip(),
                model=os.environ.get("OPENAI_MODEL", "gpt-4o-mini")
            ))

        # Log status to terminal for user
        print("\n" + "="*50)
        if not available_providers:
            print("[CRITICAL] NO VALID AI KEYS FOUND in .env!")
        else:
            print(f"[INFO] AI MULTI-PROVIDER SYSTEM INITIALIZED")
            for p in available_providers:
                masked_key = p.api_key[:8] + "..." + p.api_key[-4:]
                print(f"  -> {p.name:10} | Model: {p.model:30} | Key: {masked_key}")
        print("="*50 + "\n")

        return available_providers


def get_agent_config() -> AgentConfig:
    """Create an AgentConfig."""
    return AgentConfig()
