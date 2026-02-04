import os
import requests
from dotenv import load_dotenv

load_dotenv(override=True)

def test_grok():
    key = os.environ.get("GROK_API_KEY")
    if not key:
        print("No GROK_API_KEY found")
        return
    
    print(f"Testing Grok key: {key[:10]}...")
    url = "https://api.x.ai/v1/chat/completions"
    headers = {
        "Authorization": f"Bearer {key.strip()}",
        "Content-Type": "application/json"
    }
    data = {
        "model": "grok-beta",
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
    test_grok()
