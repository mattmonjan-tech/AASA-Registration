import express from 'express';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { GoogleGenAI } from '@google/genai';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const port = process.env.PORT || 8080;

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// Health Check for cloud platforms
app.get('/health', (req, res) => {
  res.status(200).send('OK');
});

// Serve static assets
app.use(express.static(__dirname));

// API Proxy for Gemini
app.post('/api/edit-image', async (req, res) => {
  try {
    const { image, prompt } = req.body;
    const apiKey = process.env.API_KEY;

    if (!apiKey) {
      return res.status(500).json({ error: 'API_KEY is not configured on the server.' });
    }

    const ai = new GoogleGenAI({ apiKey });
    const base64Data = image.includes('base64,') ? image.split('base64,')[1] : image;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [
          { inlineData: { data: base64Data, mimeType: 'image/png' } },
          { text: `Enhance this Nashville breakfast photo professionally based on: ${prompt}` },
        ],
      },
    });

    let imageUrl = '';
    const parts = response.candidates?.[0]?.content?.parts || [];
    for (const part of parts) {
      if (part.inlineData) {
        imageUrl = `data:image/png;base64,${part.inlineData.data}`;
        break;
      }
    }

    if (!imageUrl) throw new Error("No image data returned from AI");
    res.json({ imageUrl });
  } catch (error) {
    console.error('Server Gemini Error:', error);
    res.status(500).json({ error: error.message });
  }
});

// SPA catch-all
app.get('*', (req, res) => {
  res.sendFile(join(__dirname, 'index.html'));
});

// Explicitly bind to 0.0.0.0 for cloud environments
app.listen(port, '0.0.0.0', () => {
  console.log(`Server listening on 0.0.0.0:${port}`);
});