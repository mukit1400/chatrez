import { NextApiRequest, NextApiResponse } from 'next';
import { OpenAI } from 'openai';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end();

  const { messages } = req.body;

  const chatResponse = await openai.chat.completions.create({
    model: 'gpt-4',
    messages: [
      {
        role: 'system',
        content: `You are RezaBot, an AI assistant that only answers questions based on Mir Reza's resume and achievements. Be concise, insightful, and witty when appropriate.`,
      },
      ...messages,
    ],
  });

  res.status(200).json({ reply: chatResponse.choices[0].message.content });
}
