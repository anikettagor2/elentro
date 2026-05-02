"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useJourneyStore } from "@/stores/useJourneyStore";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Sparkles, FileText, Download, Loader2 } from "lucide-react";

/**
 * ManifestoGenerator Component
 * 
 * An AI-powered tool that utilizes Gemini 1.5 Pro via Vertex AI to generate 
 * strategic election manifestos based on user-defined core values.
 * Features real-time state management and accessibility compliance.
 */
export function ManifestoGenerator() {
  const { completeStage, setStage } = useJourneyStore();
  const [prompt, setPrompt] = useState("");
  const [manifesto, setManifesto] = useState("");
  const [loading, setLoading] = useState(false);

  const generateManifesto = async () => {
    if (!prompt) return;
    setLoading(true);
    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: `Generate a professional election manifesto based on these core values: ${prompt}. Format it with sections: Vision, Education, Economy, and Environment. Use a formal, inspiring tone.`
        })
      });
      const data = await response.json();
      setManifesto(data.text);
    } catch (error) {
      console.error("Failed to generate manifesto", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8" role="region" aria-label="AI Manifesto Generator">
      <div className="text-center space-y-4">
        <h2 className="text-4xl font-black uppercase tracking-tighter">Manifesto AI</h2>
        <p className="text-zinc-500 font-mono text-xs">AI-Driven Political Strategy // Extra Feature</p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <Card className="bg-zinc-950 border-white/5 p-6 space-y-6">
          <div className="space-y-4">
            <label 
              htmlFor="manifesto-prompt"
              className="text-xs font-bold uppercase tracking-widest text-indigo-400 flex items-center gap-2"
            >
              <Sparkles className="w-3 h-3" /> Core Values & Vision
            </label>
            <Textarea 
              id="manifesto-prompt"
              placeholder="e.g., Sustainability, Universal Healthcare, Digital Infrastructure..."
              className="bg-black border-white/10 min-h-[150px] resize-none focus:border-indigo-500/50"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              aria-required="true"
            />
          </div>
          <Button 
            onClick={generateManifesto}
            disabled={loading || !prompt}
            className="w-full bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl h-14 font-black uppercase tracking-widest"
            aria-busy={loading}
          >
            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Generate with Gemini"}
          </Button>
        </Card>

        <Card className="bg-zinc-900/50 border-white/5 p-6 relative overflow-hidden min-h-[400px]" aria-live="polite">
          <AnimatePresence mode="wait">
            {manifesto ? (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-6"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-tighter">Manifesto_v1.0.pdf</span>
                  <Button variant="ghost" size="sm" className="h-8 text-zinc-400 hover:text-white">
                    <Download className="w-4 h-4 mr-2" /> Export
                  </Button>
                </div>
                <div className="prose prose-invert prose-sm max-w-none">
                  {manifesto.split('\n').map((line, i) => (
                    <p key={i} className="text-zinc-300 leading-relaxed">{line}</p>
                  ))}
                </div>
                <Button 
                  onClick={() => setStage('polling')}
                  className="w-full bg-white text-black hover:bg-zinc-200 mt-8"
                >
                  Confirm & Continue
                </Button>
              </motion.div>
            ) : (
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-8 space-y-4">
                <FileText className="w-12 h-12 text-zinc-800" />
                <p className="text-zinc-600 text-sm font-medium">
                  Enter your vision to generate a <br />strategic election manifesto.
                </p>
              </div>
            )}
          </AnimatePresence>
        </Card>
      </div>
    </div>
  );
}
