import os

def search_files(path, quote="OpenAI"):
    for root, dirs, files in os.walk(path):
        for file in files:
            if file.endswith(".py"):
                full_path = os.path.join(root, file)
                try:
                    with open(full_path, "r", encoding="utf-8") as f:
                        if quote in f.read():
                            print(f"Found '{quote}' in {full_path}")
                except:
                    pass

search_files("venv/Lib/site-packages/agents")
