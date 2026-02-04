import agents
from agents import Agent, Runner
import inspect

def inspect_agent():
    print(f"Agents Library: {agents.__file__}")
    
    print("\n--- Agent Constructor Params ---")
    sig = inspect.signature(Agent.__init__)
    for name, param in sig.parameters.items():
        print(f"  {name}: {param.annotation} (default: {param.default})")

    print("\n--- Runner Params ---")
    sig = inspect.signature(Runner.run)
    for name, param in sig.parameters.items():
        print(f"  {name}: {param.annotation} (default: {param.default})")

if __name__ == "__main__":
    inspect_agent()
