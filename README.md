# BrickBot - LEGO Builder App

An AI-powered app that generates step-by-step LEGO building instructions from a photo or a text description. Powered by Claude (Anthropic).

---

## Live App

**https://lego-builder-beta.vercel.app**

---

## Repositories

- **Personal:** https://github.com/tdrye/lego-builder
- **Org:** https://github.com/Drye-Family-Projects/lego-builder

---

## Outstanding TODO

The app is deployed but generation won't work until the API key is added:

**Step 1 — Add the Anthropic API key to Vercel:**
```bash
npx vercel env add ANTHROPIC_API_KEY production
```
Paste your key from https://console.anthropic.com when prompted.

**Step 2 — Redeploy:**
```bash
npx vercel --prod
```

---

## Running Locally

```bash
./start.sh
```

First run will prompt you to add your Anthropic API key to `backend/.env`. Get one free at https://console.anthropic.com.

Once running:
- Frontend: http://localhost:5173
- Backend API: http://localhost:3001

---

## Project Structure

```
lego-builder/
├── api/                  # Vercel serverless functions
│   ├── generate.js       # POST /api/generate — calls Claude to make LEGO instructions
│   └── health.js         # GET /api/health — checks API key is configured
├── frontend/             # React + Vite app
│   └── src/components/   # HomeScreen, CategorySelect, PhotoCapture, InstructionsScreen
├── backend/              # Local dev Express server (not used on Vercel)
├── vercel.json           # Vercel deployment config
└── start.sh              # Local dev startup script
```

---

## How It Works

1. User picks a category or takes/uploads a photo
2. Frontend sends image (base64) or text to `/api/generate`
3. Serverless function calls Claude Sonnet with a structured prompt
4. Claude returns JSON with title, brick list, and step-by-step instructions
5. App displays illustrated building guide

---

## Tech Stack

- **Frontend:** React 18, Vite, Tailwind CSS (custom LEGO color palette)
- **AI:** Anthropic Claude Sonnet 4.6 with prompt caching
- **Hosting:** Vercel (frontend static + serverless API)
- **Local dev:** Express.js backend on port 3001

---

## Deployment

Pushes to `main` on GitHub auto-deploy to Vercel via the connected integration.

To manually deploy:
```bash
npx vercel --prod
```
