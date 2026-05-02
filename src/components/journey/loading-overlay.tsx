"use client";

import { motion } from "framer-motion";

export function JourneyLoading() {
  return (
    <div className="fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center space-y-8">
      <div className="relative w-24 h-24">
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 border-t-2 border-indigo-500 rounded-full"
        />
        <motion.div 
          animate={{ rotate: -360 }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          className="absolute inset-2 border-b-2 border-white/20 rounded-full"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-2 h-2 bg-indigo-500 rounded-full animate-pulse shadow-[0_0_15px_#6366f1]" />
        </div>
      </div>
      
      <div className="text-center space-y-2">
        <h3 className="text-sm font-black uppercase tracking-[0.3em] text-white">ELENTRO_SYSTEMS</h3>
        <p className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest animate-pulse">
          Initializing Intelligence Handshake...
        </p>
      </div>
      
      <div className="absolute bottom-12 left-12 right-12 flex justify-between items-end">
        <div className="space-y-1">
          <div className="w-48 h-1 bg-white/5 rounded-full overflow-hidden">
            <motion.div 
              initial={{ x: "-100%" }}
              animate={{ x: "0%" }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-full h-full bg-gradient-to-r from-transparent via-indigo-500 to-transparent"
            />
          </div>
          <p className="text-[8px] font-mono text-zinc-700">KERNEL_READY // NETWORK_SECURE</p>
        </div>
        <div className="text-right">
          <p className="text-[8px] font-mono text-zinc-700 uppercase italic">© 2026 ELENTRO // ALL RIGHTS RESERVED</p>
        </div>
      </div>
    </div>
  );
}
