import { NextRequest } from 'next/server';
import { z } from 'zod';
import { generateAIResponseStream } from '@/lib/vertex-ai';

const chatSchema = z.object({
  prompt: z.string().min(1),
  history: z.array(z.object({
    role: z.enum(['user', 'model']),
    parts: z.array(z.object({ text: z.string() })),
  })),
  userProfile: z.object({
    age: z.number(),
    state: z.string(),
    registrationStatus: z.string(),
  }).optional(),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const validation = chatSchema.safeParse(body);

    if (!validation.success) {
      return new Response(
        JSON.stringify({ error: 'Invalid chat payload', details: validation.error.format() }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const { prompt, history, userProfile } = validation.data;

    // Default profile if not provided
    const profile = userProfile || {
      age: 25,
      state: 'Unknown',
      registrationStatus: 'Unknown'
    };

    try {
      const stream = await generateAIResponseStream(prompt, profile, history);

      return new Response(stream, {
        headers: {
          'Content-Type': 'text/plain; charset=utf-8',
          'Cache-Control': 'no-cache',
        },
      });
    } catch (aiError: any) {
      console.warn('[Chat] AI Generation failed, using fallback:', aiError.message);
      
      const fallbackMessage = "I apologize, but I'm currently experiencing high demand and can't provide a live response right now. However, I can tell you that in Indian elections, the Election Commission of India (ECI) ensures a free and fair process through mechanisms like the Model Code of Conduct (MCC), EVM security, and VVPAT verification. Please try again in a few moments!";
      
      return new Response(fallbackMessage, {
        headers: { 'Content-Type': 'text/plain; charset=utf-8' },
      });
    }
  } catch (error: any) {
    console.error('[Chat] Critical route error:', error);
    return new Response(
      JSON.stringify({ 
        error: 'Critical failure in chat route.',
        details: error?.message || 'Unknown error'
      }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
