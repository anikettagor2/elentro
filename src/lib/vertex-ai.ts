import { GoogleGenerativeAI } from '@google/generative-ai';

/**
 * Reusable function to generate AI response using Google Generative AI (Gemini Flash).
 */
export async function generateAIResponseStream(
  message: string,
  userProfile: { age: number; state: string; registrationStatus: string },
  history: { role: string; parts: { text: string }[] }[]
): Promise<ReadableStream> {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) throw new Error('GEMINI_API_KEY is not defined in environment variables.');

  const genAI = new GoogleGenerativeAI(apiKey);

  try {
    const model = genAI.getGenerativeModel({
      model: 'gemini-flash-latest',
      systemInstruction: "You are an Election Guide AI for India. Explain processes step-by-step in simple language. Ask follow-up questions if needed. Use Hinglish (Hindi + English mix). Avoid political bias."
    });

    const sanitizedHistory = history.map(m => ({
      role: m.role === 'model' ? 'model' : 'user',
      parts: m.parts.map(p => ({ text: p.text }))
    }));

    const firstUserIndex = sanitizedHistory.findIndex(m => m.role === 'user');
    const validHistory = firstUserIndex !== -1 ? sanitizedHistory.slice(firstUserIndex) : [];

    const chat = model.startChat({
      history: validHistory,
    });

    const profileContext = `[User Context: Age: ${userProfile.age}, State: ${userProfile.state}, Voter Registration: ${userProfile.registrationStatus}]`;
    const fullPrompt = `${profileContext}\n\nUser Query: ${message}`;

    const result = await chat.sendMessageStream(fullPrompt);

    return new ReadableStream({
      async start(controller) {
        try {
          for await (const chunk of result.stream) {
            const text = chunk.text();
            if (text) {
              controller.enqueue(new TextEncoder().encode(text));
            }
          }
        } catch (streamErr) {
          const err = streamErr as Error;
          console.error('[GoogleAI] Stream error:', err);
          controller.enqueue(new TextEncoder().encode(`\n\n[Error during streaming: ${err.message}]`));
        } finally {
          controller.close();
        }
      },
    });
  } catch (error) {
    console.error('[GoogleAI] Initialization/Start error:', error);
    throw error;
  }
}

/**
 * Simpler generation function for non-chat interactions (e.g. simulation results).
 * Includes automatic retry mechanism for 503/high-demand scenarios.
 */
export async function generateSimpleAIResponseStream(
  prompt: string,
  systemInstruction?: string,
  retryCount = 0
): Promise<ReadableStream> {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) throw new Error('GEMINI_API_KEY is not defined in environment variables.');

  const genAI = new GoogleGenerativeAI(apiKey);

  try {
    const model = genAI.getGenerativeModel({
      model: 'gemini-flash-latest',
      systemInstruction: systemInstruction || undefined
    });

    const result = await model.generateContentStream({
      contents: [{ role: 'user', parts: [{ text: prompt }] }],
    });

    return new ReadableStream({
      async start(controller) {
        try {
          for await (const chunk of result.stream) {
            const text = chunk.text();
            if (text) {
              controller.enqueue(new TextEncoder().encode(text));
            }
          }
        } catch (streamErr) {
          const err = streamErr as Error;
          console.error('[GoogleAI] Simple Stream error:', err);
          controller.enqueue(new TextEncoder().encode(`\n\n[Error during streaming: ${err.message}]`));
        } finally {
          controller.close();
        }
      },
    });
  } catch (error: any) {
    // If we hit a 503 or overload, retry up to 2 times with backoff
    if ((error.message?.includes('503') || error.message?.includes('429')) && retryCount < 2) {
      const delay = Math.pow(2, retryCount) * 1000;
      console.warn(`[GoogleAI] Retrying generation due to: ${error.message}. Attempt ${retryCount + 1}. Delay: ${delay}ms`);
      await new Promise(resolve => setTimeout(resolve, delay));
      return generateSimpleAIResponseStream(prompt, systemInstruction, retryCount + 1);
    }
    
    console.error('[GoogleAI] Simple Generation error:', error);
    throw error;
  }
}
