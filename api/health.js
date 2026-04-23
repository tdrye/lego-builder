export default function handler(req, res) {
  const key = process.env.ANTHROPIC_API_KEY;
  res.json({ ok: true, hasKey: !!key && key !== 'your_api_key_here' });
}
