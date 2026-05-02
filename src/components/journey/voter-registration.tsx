"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useJourneyStore } from "@/stores/useJourneyStore";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { UserPlus, QrCode, ShieldCheck } from "lucide-react";

export function VoterRegistration() {
  const { setStage, completeStage, updateUserData, userData } = useJourneyStore();
  const [name, setName] = useState(userData.candidateName || "");
  const [isGenerating, setIsGenerating] = useState(false);

  const handleRegister = () => {
    setIsGenerating(true);
    setTimeout(() => {
      updateUserData({ candidateName: name, voterId: `ECI-${Math.random().toString(36).substr(2, 9).toUpperCase()}` });
      completeStage('registration');
      setStage('nomination');
    }, 2000);
  };

  return (
    <div className="max-w-xl mx-auto space-y-8">
      <div className="text-center space-y-4">
        <h2 className="text-4xl font-black uppercase tracking-tighter">Voter Registration</h2>
        <p className="text-zinc-500 font-mono text-xs">Simulating the ECI Registration Protocol // Stage 02</p>
      </div>

      <Card className="bg-zinc-950 border-white/5 overflow-hidden">
        <CardHeader className="bg-indigo-500/10 p-8 border-b border-white/5">
          <div className="flex items-center gap-4">
            <UserPlus className="w-8 h-8 text-indigo-400" />
            <div>
              <h3 className="font-bold text-lg">Electronic Roll Entry</h3>
              <p className="text-xs text-zinc-500">Secure demographic mapping</p>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-8 space-y-6">
          <div className="space-y-2">
            <label className="text-[10px] uppercase font-bold text-zinc-600 tracking-widest">Full Legal Name</label>
            <Input 
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="ENTER NAME AS PER AADHAAR"
              className="bg-black border-white/10 h-12 rounded-xl focus:ring-indigo-500"
            />
          </div>

          <Button 
            onClick={handleRegister}
            disabled={!name || isGenerating}
            className="w-full h-14 bg-indigo-600 hover:bg-indigo-500 rounded-xl font-bold uppercase tracking-widest transition-all"
          >
            {isGenerating ? "Encrypting Data..." : "Generate Virtual Voter ID"}
          </Button>

          <Button
            onClick={() => setStage('manifesto')}
            className="w-full bg-white text-black hover:bg-zinc-200 mt-8 font-black uppercase tracking-widest h-12"
          >
            Proceed to Manifesto AI
          </Button>
        </CardContent>
      </Card>

      {isGenerating && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex items-center justify-center gap-4 text-indigo-400 font-mono text-[10px]"
        >
          <QrCode className="w-4 h-4 animate-pulse" />
          <span>ESTABLISHING SECURE HANDSHAKE WITH ECI_SERVERS...</span>
        </motion.div>
      )}
    </div>
  );
}
