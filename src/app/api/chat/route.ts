import { NextRequest } from 'next/server';
import { generateSimpleAIResponseStream } from '@/lib/vertex-ai';

export async function POST(req: NextRequest) {
  try {
    const { message } = await req.json();

    const systemInstruction = "You are the Electron Strategic Advisor. You help users understand the election journey and simulation parameters. Keep responses concise, professional, and slightly technical (using words like protocols, data mapping, simulation clusters). Only answer questions related to elections, democracy, and the Electron platform.";

    // For the chatbot, we want a direct JSON response instead of a stream for simplicity in the UI component
    // But we reuse our resilient vertex-ai lib
    const prompt = `User Message: ${message}`;
    const stream = await generateSimpleAIResponseStream(prompt, systemInstruction);

    // Convert stream to string
    const reader = stream.getReader();
    let reply = "";
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      reply += value;
    }

    return new Response(JSON.stringify({ reply }), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Strategic uplink failed.' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
