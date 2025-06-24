import OpenAI from "openai";
import 'dotenv/config';

const openai = new OpenAI({
  apiKey:process.env.OPENAI_API_KEY,
});

const hobbies =["painting", "gardening", "cooking", "yoga", "stretching"];

const completion = openai.chat.completions.create({
  model: "gpt-4o-mini",
  store: true,
  max_tokens: 20,
  temperature: 0.7,  
  messages: [
    {"role": "developer", "content": "You are an assistant that generates random 10-minute break activities. These activities should be a mix of practical, common ideas and quirky, unusually specific ideas. Some can be things like 'put together an outfit' or 'practice guitar,' while others should be more playful or unexpected. Each activity must be exactly 10 words or less."},
    {"role": "user", "content": "Give me a random 10-minute break activity."}
  ],
});

completion.then((result) => console.log(result.choices[0].message));