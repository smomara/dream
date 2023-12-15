import * as dotenv from 'dotenv';
dotenv.config();

import OpenAI from 'openai';
const openai = new OpenAI(process.env.OPENAI_API_KEY);

import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

app.post('/dream', async (req, res) => {
    try {
        const prompt = req.body.prompt;

        const aiResponse = await openai.images.generate({
            model: "dall-e-3",
            prompt: prompt,
            size: "1024x1024",
            quality: "standard",
            n: 1,
        });

        const image = aiResponse.data[0].url;
        res.send({ image });
    } catch (error) {
        console.error(error);
        res.status(500).send(error?.response.data.error.message || 'Something went wrong');
    }
});

app.listen(8080, () => console.log('make art on http://localhost:8080/dream'));