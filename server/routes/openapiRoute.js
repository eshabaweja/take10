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
        max_completion_tokens: 100,
        temperature: 0.7,  
        messages: [
            {"role": "developer", "content": "You are an assistant that generates random 10-minute break activities. These activities should be a mix of practical, common ideas and quirky, unusually specific ideas. Some can be things like 'put together an outfit' or 'practice guitar,' while others should be more playful or unexpected. Each activity must be exactly 10 words or less."},
            {"role": "user", "content": prompt}
        ],
        });

        console.log(completion);
        res.json({ reply: completion.choices[0] });
    }
    catch(error){
        console.error(error.response ? error.response.data : error.message);
        res.status(500).json({ error: 'Something went wrong' });
    }
    
})

export default router; 