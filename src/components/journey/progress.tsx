"use client";

import { useJourneyStore, JourneyStage } from "@/stores/useJourneyStore";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";
import { motion } from "framer-motion";

const STAGES: { id: JourneyStage; label: string }[] = [
  { id: 'overview', label: 'Start' },
  { id: 'registration', label: 'Voter' },
  { id: 'nomination', label: 'Candidate' },
  { id: 'campaign', label: 'Strategy' },
  { id: 'polling', label: 'Vote' },
  { id: 'result', label: 'Outcome' },
];

export function JourneyProgress() {
  const { currentStage, completedStages } = useJourneyStore();

  return (
    <div className="fixed top-24 left-1/2 -translate-x-1/2 z-50 w-[90vw] max-w-2xl bg-zinc-950/80 backdrop-blur-xl border border-white/5 rounded-full p-2 px-6 shadow-2xl">
      <div className="flex items-center justify-between relative">
        {/* Progress Line */}
        <div className="absolute top-1/2 left-0 w-full h-[1px] bg-zinc-800 -translate-y-1/2 z-0" />
        
        {STAGES.map((stage, idx) => {
          const isCompleted = completedStages.includes(stage.id);
          const isCurrent = currentStage === stage.id;
          
          return (
            <div key={stage.id} className="relative z-10 flex flex-col items-center gap-2 group">
              <div 
                className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center transition-all duration-500 border",
                  isCompleted ? "bg-indigo-500 border-indigo-500 text-white" : 
                  isCurrent ? "bg-white border-white text-black scale-110 shadow-[0_0_20px_rgba(255,255,255,0.3)]" : 
                  "bg-zinc-900 border-zinc-800 text-zinc-600"
                )}
              >
                {isCompleted ? <Check className="w-4 h-4" /> : <span className="text-[10px] font-bold">{idx + 1}</span>}
              </div>
              <span 
                className={cn(
                  "text-[9px] uppercase font-bold tracking-widest absolute -bottom-6 whitespace-nowrap transition-colors",
                  isCurrent ? "text-white" : "text-zinc-600"
                )}
              >
                {stage.label}
              </span>
              
              {isCurrent && (
                <motion.div 
                  layoutId="active-glow"
                  className="absolute inset-0 bg-white/10 rounded-full blur-lg"
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
