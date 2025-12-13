import type { Express } from "express";
import express from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  // DeepSeek API proxy endpoint to avoid CORS issues
  app.post("/api/ai/generate-plan", async (req: express.Request, res: express.Response) => {
    try {
      const { prompt } = req.body;

      if (!prompt) {
        return res.status(400).json({ error: "Prompt is required" });
      }

      const DEEPSEEK_API_KEY = process.env.VITE_DEEPSEEK_API_KEY;
      const DEEPSEEK_API_URL = process.env.VITE_DEEPSEEK_API_URL || 'https://api.deepseek.com/v1';

      if (!DEEPSEEK_API_KEY) {
        return res.status(500).json({ error: "DeepSeek API key not configured" });
      }

      // Make the request to DeepSeek API from the backend
      const response = await fetch(`${DEEPSEEK_API_URL}/chat/completions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${DEEPSEEK_API_KEY}`,
        },
        body: JSON.stringify({
          model: 'deepseek/deepseek-r1',
          messages: [
            {
              role: 'user',
              content: prompt,
            },
          ],
          temperature: 0.7,
          max_tokens: 4000,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        return res.status(response.status).json({
          error: errorData.error?.message || response.statusText
        });
      }

      const data = await response.json();
      res.json(data);
    } catch (error) {
      console.error('Error proxying to DeepSeek API:', error);
      res.status(500).json({
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  });

  return httpServer;
}
