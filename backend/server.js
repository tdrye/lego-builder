import express from 'express';
import cors from 'cors';
import Anthropic from '@anthropic-ai/sdk';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json({ limit: '20mb' }));

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

const SYSTEM_PROMPT = `You are BrickBot, a friendly LEGO building instructor for kids and adults of all ages!

When given an image or a subject/category, create step-by-step LEGO building instructions.

Return ONLY valid JSON (no markdown, no extra text) in this exact format:
{
  "title": "LEGO [Thing Name]",
  "emoji": "[single relevant emoji]",
  "difficulty": "Easy",
  "estimatedTime": "15 minutes",
  "totalBricks": 24,
  "description": "A fun, friendly description for all ages (1-2 sentences)",
  "bricksList": [
    {
      "color": "Red",
      "colorHex": "#D01012",
      "size": "2x4",
      "quantity": 4,
      "description": "Long red bricks for the body"
    }
  ],
  "steps": [
    {
      "stepNumber": 1,
      "title": "Build the Base",
      "description": "Place 2 red 2x4 bricks side by side to make the bottom layer.",
      "bricksUsed": [
        {"color": "Red", "colorHex": "#D01012", "size": "2x4", "quantity": 2}
      ],
      "tip": "Make sure all the bumps (studs) face UP!"
    }
  ],
  "funFact": "A fun fact about this thing (1 sentence)"
}

Rules:
- Use ONLY these LEGO colors with exact hex codes:
  Red: #D01012, Yellow: #FFD700, Blue: #006CB7, Green: #00852B,
  White: #F2F3F2, Black: #1B1B1B, Orange: #FE8A18, Dark Blue: #003580,
  Light Blue: #9FC3E9, Tan: #DEB887, Gray: #9BA3A7, Purple: #7B2FBE,
  Lime Green: #95C11F, Pink: #FF69B4, Dark Red: #8B0000, Brown: #8B4513
- Keep steps between 6 and 10
- Use bricks that actually exist in LEGO (1x1, 1x2, 1x3, 1x4, 2x2, 2x3, 2x4, 2x6, 2x8, 1x6, 1x8)
- Make instructions clear for a 5-year-old, fun for a 99-year-old
- difficulty must be exactly "Easy", "Medium", or "Hard"
- tips are optional fun hints - make them encouraging and playful
- The model should be recognizable but achievable in under 30 minutes`;

app.post('/api/generate', async (req, res) => {
  const { imageBase64, imageMimeType, category, subject } = req.body;

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey || apiKey === 'your_api_key_here') {
    return res.status(500).json({ error: 'Please add your Anthropic API key to lego-builder/backend/.env — get one free at console.anthropic.com' });
  }

  const content = [];

  if (imageBase64) {
    content.push({
      type: 'image',
      source: {
        type: 'base64',
        media_type: imageMimeType || 'image/jpeg',
        data: imageBase64,
      },
    });
    content.push({
      type: 'text',
      text: 'Please create LEGO building instructions to recreate what you see in this image!',
    });
  } else {
    const thing = subject || category;
    content.push({
      type: 'text',
      text: `Please create LEGO building instructions for: ${thing}`,
    });
  }

  try {
    const response = await client.messages.create({
      model: 'claude-sonnet-4-6',
      max_tokens: 4000,
      system: [
        {
          type: 'text',
          text: SYSTEM_PROMPT,
          cache_control: { type: 'ephemeral' },
        },
      ],
      messages: [{ role: 'user', content }],
    });

    const text = response.content[0].text.trim();
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) throw new Error('No JSON found in response');

    const instructions = JSON.parse(jsonMatch[0]);
    res.json({ success: true, instructions });
  } catch (err) {
    console.error('Error generating instructions:', err);
    res.status(500).json({ error: err.message || 'Failed to generate instructions' });
  }
});

app.get('/api/health', (req, res) => {
  const key = process.env.ANTHROPIC_API_KEY;
  res.json({ ok: true, hasKey: !!key && key !== 'your_api_key_here' });
});

app.listen(PORT, () => {
  console.log(`🧱 LEGO Builder backend running on http://localhost:${PORT}`);
});
