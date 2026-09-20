import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import { GoogleGenAI } from '@google/genai'
import { GoogleAuth } from 'google-auth-library'

const app = express();
const port = process.env.PORT || 3000;
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

app.post('/api/chat', async (req, res) => {
    try {
        const { messages } = req.body;
        const result = await ai.models.generateContent({
            model: 'gemini-3.6-flash',
            contents: messages,
            config: {
                systemInstruction: "Kamu adalah ahli percintaan (romance expert) yang berpengalaman, empatik, dan pengertian. Berikan nasihat, solusi, dan pandangan yang romantis, suportif, dan realistis mengenai hubungan, asmara, dan patah hati. Gunakan bahasa yang hangat, penuh kasih, dan sedikit puitis, tapi tetap jelas dan membantu.",
            }
        });
        res.json({ text: result.text });
    } catch (error) {
        console.error("Gemini Error:", error);
        res.status(500).json({ error: 'Terjadi kesalahan pada server.' });
    }
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});