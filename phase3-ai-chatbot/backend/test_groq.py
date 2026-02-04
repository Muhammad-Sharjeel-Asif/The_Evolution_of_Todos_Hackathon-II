import os
import requests
from dotenv import load_dotenv

# Load env in case we want to use existing ones, but we'll override for this test
load_dotenv(override=True)

def test_groq():
    key = os.environ.get("GROQ_API_KEY")
    if not key:
        print("Error: GROQ_API_KEY not found in environment variables.")
        return False
    base_url = "https://api.groq.com/openai/v1"
    
    print(f"Testing Groq key: {key[:10]}...")
    url = f"{base_url}/chat/completions"
    headers = {
        "Authorization": f"Bearer {key.strip()}",
        "Content-Type": "application/json"
    }
    # Using a standard model on Groq
    data = {
        "model": "llama-3.3-70b-versatile",
        "messages": [{"role": "user", "content": "Say 'Groq is active Sir'"}],
        "max_tokens": 20
    }
    
    try:
        response = requests.post(url, headers=headers, json=data)
        print(f"Status Code: {response.status_code}")
        if response.status_code == 200:
            print("SUCCESS!")
            print(f"Response: {response.json()['choices'][0]['message']['content']}")
            return True
        else:
            print(f"FAILED: {response.text}")
            return False
    except Exception as e:
        print(f"Error: {e}")
        return False

if __name__ == "__main__":
    test_groq()
