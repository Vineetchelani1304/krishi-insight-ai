import { Request, Response } from "express";
import axios from "axios";

const GEMINI_API_KEY = "AIzaSyD7R73GqzPGMQztO62zINncroeyZzItmiI";
const MODEL_NAME = "gemini-2.5-flash";

export const chatbot = async (req: Request, res: Response): Promise<void> => {
    try {
        const { message } = req.body;

        if (!message) {
            res.status(400).json({ error: "Message is required." });
            return;
        }

        // Few-Shot / Instruction Prompt
        const systemPrompt = `
You are KrishiMitra Chatbot, an agricultural assistant. 
Your role is to answer queries about crops, including:
- Crop trends
- Crop prices
- Crop diseases
- Crop cultivation methods

Answer only about crops. 
If the user asks anything outside crops or unrelated topics, respond: "I have no clues about that." 
Keep answers concise and accurate.
`;

        // Payload to Gemini API
        const payload = {
            contents: [
                {
                    parts: [
                        { text: systemPrompt }, // system instruction
                        { text: message }       // user message
                    ]
                }
            ],
        };

        const response = await axios.post(
            `https://generativelanguage.googleapis.com/v1beta/models/${MODEL_NAME}:generateContent?key=${GEMINI_API_KEY}`,
            payload,
            { headers: { "Content-Type": "application/json" } }
        );

        const data = response.data as {
            candidates?: Array<{
                content?: {
                    parts?: Array<{ text?: string }>;
                };
            }>;
        };

        const botResponse =
            data.candidates?.[0]?.content?.parts?.[0]?.text ??
            "Sorry, I couldn't generate a response.";

        res.status(200).json({ reply: botResponse });
    } catch (error: any) {
        console.error("Error calling Gemini 2.5 Flash API:", error.response?.data || error.message);
        res.status(500).json({
            error: "Failed to fetch response from Gemini API",
            details: error.response?.data || error.message,
        });
    }
};
