"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { useJourneyStore } from "@/stores/useJourneyStore";
import { JourneyProgress } from "@/components/journey/progress";
import { VoterRegistration } from "@/components/journey/voter-registration";
import { PollingMap } from "@/components/journey/polling-map";
import { GlobeScene } from "@/components/3d/scene";
import { Button } from "@/components/ui/button";
import { ChevronRight, ArrowLeft, RefreshCcw } from "lucide-react";

import { ManifestoGenerator } from "@/components/journey/manifesto-generator";
import { JourneyLoading } from "@/components/journey/loading-overlay";
import { useEffect, useState } from "react";

export default function JourneyPage() {
  const { currentStage, setStage, resetJourney } = useJourneyStore();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, [currentStage]);

  if (isLoading) return <JourneyLoading />;

  const renderStage = () => {
    switch (currentStage) {
      case 'overview':
        return (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center space-y-12 max-w-4xl mx-auto"
          >
            <div className="space-y-6">
              <h1 className="text-6xl md:text-8xl font-black tracking-tighter uppercase italic">
                Electoral <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-white to-indigo-500">Journey</span>
              </h1>
              <p className="text-zinc-500 text-xl font-medium font-mono uppercase tracking-tight">
                Step into the mechanics of the world's largest democracy. 
                From voter registration to the declaration of results.
              </p>
            </div>
            
            <Button 
              onClick={() => setStage('registration')}
              size="lg"
              className="bg-white text-black hover:bg-zinc-200 rounded-full h-16 px-12 font-black uppercase tracking-widest text-lg shadow-[0_0_40px_rgba(255,255,255,0.2)]"
            >
              Initialize Journey
            </Button>
          </motion.div>
        );
      case 'registration':
        return <VoterRegistration />;
      case 'manifesto':
        return <ManifestoGenerator />;
      case 'polling':
        return (
          <div className="space-y-8">
            <div className="text-center space-y-4">
              <h2 className="text-4xl font-black uppercase tracking-tighter">Locate Polling Station</h2>
              <p className="text-zinc-500 font-mono text-xs">Simulating Geographic Allocation // Stage 07</p>
            </div>
            <PollingMap />
            <div className="flex justify-center">
              <Button 
                onClick={() => setStage('counting')}
                className="bg-indigo-600 rounded-xl h-12 px-8 font-bold"
              >
                Continue to Counting
              </Button>
            </div>
          </div>
        );
      case 'counting':
        return <VoteCounting />;
      case 'result':
        return (
          <div className="text-center space-y-8 py-20">
             <motion.div
               initial={{ scale: 0.8, opacity: 0 }}
               animate={{ scale: 1, opacity: 1 }}
               className="space-y-4"
             >
               <h2 className="text-6xl font-black uppercase tracking-tighter text-emerald-500 italic">VICTORY</h2>
               <p className="text-zinc-400 font-mono">Election Cycle Completed Successfully</p>
             </motion.div>
             <Button 
               onClick={resetJourney}
               variant="outline"
               className="border-white/10 hover:bg-white/5 rounded-full px-8"
             >
               <RefreshCcw className="w-4 h-4 mr-2" /> Restart Simulation
             </Button>
          </div>
        );
      default:
        return (
          <div className="text-center space-y-8">
            <h2 className="text-3xl font-bold uppercase tracking-tighter text-zinc-500">Module Under Construction</h2>
            <p className="text-zinc-600 font-mono text-sm max-w-md mx-auto">
              Our engineering team is currently calibrating the high-fidelity simulation for this stage.
            </p>
            <div className="flex justify-center gap-4">
              <Button 
                variant="outline"
                onClick={() => setStage('polling')}
                className="rounded-xl"
              >
                Skip to Polling
              </Button>
              <Button 
                variant="outline"
                onClick={() => setStage('overview')}
                className="rounded-xl"
              >
                Back to Start
              </Button>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-black text-white selection:bg-primary/20 selection:text-primary relative overflow-hidden">
      {/* Background Ambience */}
      <div className="fixed inset-0 z-0 opacity-20 pointer-events-none">
        <GlobeScene />
      </div>

      <Navbar />
      <JourneyProgress />
      
      <main className="container relative z-10 mx-auto px-4 pt-48 pb-24 min-h-[70vh] flex flex-col items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStage}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="w-full"
          >
            {renderStage()}
          </motion.div>
        </AnimatePresence>

        {/* Global Controls */}
        <div className="fixed bottom-10 left-1/2 -translate-x-1/2 flex items-center gap-4 bg-zinc-900/50 backdrop-blur-md p-2 rounded-full border border-white/5">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => resetJourney()}
            className="text-zinc-500 hover:text-white rounded-full font-mono text-[10px]"
          >
            <RefreshCcw className="w-3 h-3 mr-2" /> RESET_EXP
          </Button>
        </div>
      </main>

      <Footer />
    </div>
  );
}
