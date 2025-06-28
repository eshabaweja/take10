import OpenAI from "openai";
import 'dotenv/config';
import express from 'express';

const router = express.Router();

const openai = new OpenAI({
  apiKey:process.env.OPENAI_API_KEY,
});

router.post('/',async(req,res)=>{
    const { prompt } = req.body;
    
    try{
        const completion = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        max_completion_tokens: 20,
        temperature: 1,  
        messages: [
            {"role": "developer", "content": "No organizing chores. 10 minute, 15 words max. Format <task verb> <unique twist> <optional celebrity or famous character>"},
            {"role": "user", "content": prompt}
        ],
        });

        res.json({ reply: completion.choices[0].message.content });
    }
    catch(error){
        console.error(error.response ? error.response.data : error.message);
        res.status(500).json({ error: 'Something went wrong' });
    }
    
})

export default router; 