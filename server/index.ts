import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import fetch from 'node-fetch';

dotenv.config();

const app = express();
const PORT = 4000;

app.use(cors());
app.use(express.json());

app.post('/generate', async (req, res) => {
  const { category, questionCount } = req.body;

  try {
    const response = await fetch('https://api.anthropic.com/v1/complete', {
      method: 'POST',
      headers: {
        'x-api-key': process.env.CLAUDE_API_KEY || '',
        'Content-Type': 'application/json',
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-3-haiku-20240307',
        max_tokens: 800,
        temperature: 0.7,
        prompt: `\n\nHuman: Generate ${questionCount} flashcard-style questions and answers for the topic: ${category}. Format as a JSON array of objects with "question" and "answer".\n\nAssistant:`,
      }),
    });

    const data = (await response.json()) as { completion: string };


    const start = data.completion.indexOf('[');
    const end = data.completion.lastIndexOf(']');
    const jsonChunk = data.completion.slice(start, end + 1);

    const parsed = JSON.parse(jsonChunk);

    res.json(parsed);
  } catch (err) {
    console.error('Claude proxy error:', err);
    res.status(500).json({ error: 'Failed to generate flashcards.' });
  }
});

app.listen(PORT, () => {
  console.log(`🧠 Claude proxy running on http://localhost:${PORT}`);
});
