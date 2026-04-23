#!/bin/bash
set -e

echo "🧱 Starting BrickBot - LEGO Builder App!"
echo ""

# Check for .env file in backend
if [ ! -f "backend/.env" ]; then
  echo "⚠️  First-time setup: Creating backend/.env from template"
  cp backend/.env.example backend/.env
  echo ""
  echo "👉 ACTION REQUIRED:"
  echo "   Open backend/.env and add your Anthropic API key."
  echo "   Get one free at: https://console.anthropic.com"
  echo ""
  echo "   Then run ./start.sh again!"
  exit 1
fi

# Check API key is set
if grep -q "your_api_key_here" backend/.env; then
  echo "⚠️  You still need to add your Anthropic API key to backend/.env"
  echo "   Open that file and replace 'your_api_key_here' with your real key."
  echo "   Get one at: https://console.anthropic.com"
  exit 1
fi

# Install dependencies if needed
if [ ! -d "backend/node_modules" ]; then
  echo "📦 Installing backend dependencies..."
  cd backend && npm install && cd ..
fi

if [ ! -d "frontend/node_modules" ]; then
  echo "📦 Installing frontend dependencies..."
  cd frontend && npm install && cd ..
fi

echo ""
echo "🚀 Starting backend on port 3001..."
cd backend && node server.js &
BACKEND_PID=$!
cd ..

sleep 1

echo "🎨 Starting frontend on port 5173..."
cd frontend && npm run dev &
FRONTEND_PID=$!
cd ..

echo ""
echo "✅ BrickBot is running!"
echo ""
echo "   📱 Open on your phone: Check your terminal for the Network URL"
echo "   💻 Open on this computer: http://localhost:5173"
echo ""
echo "   Press Ctrl+C to stop."
echo ""

cleanup() {
  echo ""
  echo "👋 Stopping BrickBot..."
  kill $BACKEND_PID 2>/dev/null
  kill $FRONTEND_PID 2>/dev/null
}
trap cleanup EXIT

wait
