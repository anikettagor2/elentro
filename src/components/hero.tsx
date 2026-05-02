"use client";

import { Button } from "./ui/button";
import { motion, useScroll, useTransform } from "framer-motion";
import { ChevronRight, Zap } from "lucide-react";
import { useRef, Suspense } from "react";
import Link from "next/link";
import { GlobeScene } from "./3d/scene";

export function Hero() {
  const containerRef = useRef(null);
  const { scrollY } = useScroll();

  // Parallax effects
  const textY = useTransform(scrollY, [0, 500], [0, 100]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  return (
    <section ref={containerRef} className="relative min-h-screen flex items-center justify-center overflow-hidden pt-24 sm:pt-28 bg-black">
      {/* Background Atmosphere */}
      <div className="absolute inset-0 bg-radial-gradient from-indigo-500/10 via-transparent to-transparent opacity-40 z-0" />
      
      {/* 3D Scene Background */}
      <div className="absolute inset-0 z-0 opacity-60">
        <GlobeScene />
      </div>

      <div className="container relative z-10 px-4 sm:px-6">
        <div className="flex flex-col items-center text-center space-y-8 max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            style={{ y: textY, opacity }}
            className="space-y-6"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-indigo-400 text-xs font-bold uppercase tracking-[0.3em] mb-4 font-mono"
            >
              <Zap className="w-3 h-3 fill-indigo-400" />
              SYSTEM_INITIALIZED // VERSION_1.5_PRO
            </motion.div>

            <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black font-heading tracking-tighter leading-[0.85] uppercase italic italic italic">
              Electron <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-white to-indigo-500 drop-shadow-2xl">
                Intelligence
              </span>
            </h1>

            <p className="text-lg sm:text-xl md:text-2xl text-zinc-500 max-w-3xl mx-auto leading-relaxed font-medium font-sans uppercase tracking-tight">
              The world's most advanced AI engine for electoral simulation. 
              Predicting democratic mandates with mathematical precision.
            </p>

            <motion.div 
              className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-10"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <Link href="/simulate" className="w-full sm:w-auto group">
                <Button size="lg" className="w-full sm:min-w-[220px] bg-indigo-600 hover:bg-indigo-500 text-white rounded-full font-bold uppercase tracking-widest h-14 relative overflow-hidden transition-all duration-300">
                  <span className="relative z-10 flex items-center gap-2">
                    Start Simulation <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                </Button>
              </Link>
              <Link href="/technical" className="w-full sm:w-auto">
                <Button size="lg" variant="outline" className="w-full sm:min-w-[220px] rounded-full border-white/10 bg-white/5 hover:bg-white/10 text-white font-bold uppercase tracking-widest h-14">
                  View Architecture
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>
      
      {/* Bottom Interface Elements */}
      <div className="absolute bottom-10 left-10 hidden lg:block z-20">
        <div className="flex flex-col gap-2 font-mono text-[10px] text-zinc-600">
          <p>[ STATUS: OPERATIONAL ]</p>
          <p>[ LATENCY: 24MS ]</p>
          <p>[ CORE: GEMINI_1.5_PRO ]</p>
        </div>
      </div>

      <div className="absolute bottom-10 right-10 hidden lg:block z-20">
        <div className="flex items-center gap-4">
          <div className="w-32 h-px bg-zinc-800" />
          <p className="font-mono text-[10px] text-zinc-600 uppercase tracking-widest">Scroll to explore</p>
        </div>
      </div>
    </section>
  );
}
