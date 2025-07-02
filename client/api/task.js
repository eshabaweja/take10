import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { prompt } = req.body;

    try {
      const completion = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        max_completion_tokens: 20,
        temperature: 1,
        messages: [
          { role: "developer", content: "No organizing chores. 10 minute, 15 words max. Format <task verb> <unique twist> <optional celebrity or famous character>" },
          { role: "user", content: prompt }
        ],
      });

      res.status(200).json({ reply: completion.choices[0].message.content });
    } catch (error) {
      console.error(error.response ? error.response.data : error.message);
      res.status(500).json({ error: 'Something went wrong' });
    }

  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
