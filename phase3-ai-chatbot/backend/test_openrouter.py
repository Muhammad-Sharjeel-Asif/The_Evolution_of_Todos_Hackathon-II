import os
import requests
from dotenv import load_dotenv

load_dotenv(override=True)

def test_openrouter():
    key = os.environ.get("OPENROUTER_API_KEY")
    if not key:
        print("No OPENROUTER_API_KEY found")
        return
    
    print(f"Testing OpenRouter key: {key[:10]}...")
    url = "https://openrouter.ai/api/v1/chat/completions"
    headers = {
        "Authorization": f"Bearer {key.strip()}",
        "Content-Type": "application/json"
    }
    data = {
        "model": "mistralai/mistral-7b-instruct:free",
        "messages": [{"role": "user", "content": "Say hello"}],
        "max_tokens": 10
    }
    
    try:
        response = requests.post(url, headers=headers, json=data)
        print(f"Status Code: {response.status_code}")
        print(f"Response: {response.text}")
    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    test_openrouter()
