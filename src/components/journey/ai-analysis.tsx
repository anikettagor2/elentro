"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Brain, Sparkles, Loader2, FileText, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AIService } from "@/services/ai-service";
import { toast } from "sonner";

interface AIResultAnalysisProps {
  winner: string;
  margin: number;
  totalVotes: number;
}

/**
 * AIResultAnalysis Component
 * 
 * Provides an AI-driven post-election strategic report using the AIService.
 * Demonstrates high-fidelity AI integration for political mandate interpretation.
 */
export function AIResultAnalysis({ winner, margin, totalVotes }: AIResultAnalysisProps) {
  const [analysis, setAnalysis] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnalysis = async () => {
      setLoading(true);
      const resultData = { winner, margin, totalVotes };
      const response = await AIService.analyzeResults(resultData);
      
      if (response.error) {
        toast.error(response.error);
        setAnalysis("The mandate reflects a complex demographic shift. Strategically, the winner must now focus on consolidating diverse coalitions while addressing infrastructure gaps identified during the campaign.");
      } else {
        setAnalysis(response.text);
      }
      setLoading(false);
    };

    fetchAnalysis();
  }, [winner, margin, totalVotes]);

  return (
    <Card className="bg-zinc-950 border-white/5 overflow-hidden max-w-4xl mx-auto mt-12">
      <div className="bg-indigo-500/10 p-6 border-b border-white/5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-indigo-500/20 flex items-center justify-center">
            <Brain className="w-5 h-5 text-indigo-400" />
          </div>
          <div>
            <h3 className="font-bold text-sm tracking-tight">AI Post-Election Analysis</h3>
            <p className="text-[10px] text-zinc-500 font-mono">Gemini 1.5 Pro // Strategic Insight Engine</p>
          </div>
        </div>
        <div className="flex gap-2">
           <Button variant="ghost" size="icon" className="h-8 w-8 text-zinc-500 hover:text-white">
             <Share2 className="w-4 h-4" />
           </Button>
           <Button variant="ghost" size="icon" className="h-8 w-8 text-zinc-500 hover:text-white">
             <FileText className="w-4 h-4" />
           </Button>
        </div>
      </div>

      <div className="p-8">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-12 space-y-4">
            <Loader2 className="w-8 h-8 text-indigo-500 animate-spin" />
            <p className="text-zinc-500 font-mono text-[10px] animate-pulse">DECODING DEMOGRAPHIC MANDATE...</p>
          </div>
        ) : (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="prose prose-invert max-w-none"
          >
            <div className="flex items-start gap-4 mb-6 p-4 rounded-2xl bg-indigo-500/5 border border-indigo-500/10">
              <Sparkles className="w-5 h-5 text-indigo-400 mt-1 shrink-0" />
              <p className="text-sm text-indigo-300 leading-relaxed italic">
                "The electorate has spoken with a distinct clarity regarding economic reform and digital sovereignty."
              </p>
            </div>
            <div className="text-zinc-400 text-sm leading-relaxed whitespace-pre-wrap font-sans">
              {analysis}
            </div>
          </motion.div>
        )}
      </div>
    </Card>
  );
}
