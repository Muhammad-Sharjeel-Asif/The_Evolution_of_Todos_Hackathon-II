# Use Python 3.11 slim image for a small footprint
FROM python:3.11-slim

# Set working directory inside the container
WORKDIR /app

# Install system dependencies if needed (psycopg2-binary usually doesn't need them in slim, 
# but good to have build-essential if compiling from source)
# RUN apt-get update && apt-get install -y build-essential && rm -rf /var/lib/apt/lists/*

# Copy requirements first to leverage Docker cache
COPY requirements.txt .

# Install dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy the rest of the application code
COPY . .

# Hugging Face Spaces port is 7860 by default
ENV PORT=7860
EXPOSE 7860

# Command to run the application
# We use src.main:app because main.py is inside the src folder
CMD ["uvicorn", "src.main:app", "--host", "0.0.0.0", "--port", "7860"]
