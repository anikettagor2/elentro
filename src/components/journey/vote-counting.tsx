"use client";

import { motion } from "framer-motion";
import { useJourneyStore } from "@/stores/useJourneyStore";
import { Card, CardContent } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from "recharts";
import { useEffect, useState } from "react";
import { BarChart3, Lock, ShieldCheck } from "lucide-react";

const DATA = [
  { name: 'PARTY A', votes: 0, color: '#6366f1' },
  { name: 'PARTY B', votes: 0, color: '#ec4899' },
  { name: 'IND', votes: 0, color: '#10b981' },
  { name: 'NOTA', votes: 0, color: '#71717a' },
];

export function VoteCounting() {
  const { setStage, completeStage } = useJourneyStore();
  const [data, setData] = useState(DATA);
  const [isCounting, setIsCounting] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setData(prev => prev.map(item => ({
        ...item,
        votes: item.votes + Math.floor(Math.random() * 50)
      })));
    }, 100);

    setTimeout(() => {
      clearInterval(interval);
      setIsCounting(false);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <div className="text-center space-y-4">
        <h2 className="text-4xl font-black uppercase tracking-tighter">Vote Counting</h2>
        <p className="text-zinc-500 font-mono text-xs">Simulating Real-time ECI Tabulation // Stage 08</p>
      </div>

      <Card className="bg-zinc-950 border-white/5 p-8">
        <CardContent className="space-y-8">
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data} layout="vertical">
                <XAxis type="number" hide />
                <YAxis dataKey="name" type="category" stroke="#52525b" fontSize={10} width={80} />
                <Tooltip 
                  cursor={{ fill: 'transparent' }}
                  contentStyle={{ backgroundColor: '#09090b', border: '1px solid #27272a', borderRadius: '12px' }}
                />
                <Bar dataKey="votes" radius={[0, 4, 4, 0]}>
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="flex items-center justify-between p-6 bg-white/5 rounded-2xl border border-white/5">
            <div className="flex items-center gap-4">
              <BarChart3 className={cn("w-6 h-6", isCounting ? "animate-pulse text-indigo-400" : "text-emerald-500")} />
              <div>
                <p className="text-xs font-bold uppercase tracking-widest">
                  {isCounting ? "Tabulating Streams..." : "Counting Finalized"}
                </p>
                <p className="text-[10px] text-zinc-600 font-mono italic">
                  CHECKSUM_VERIFIED // SECURE_HANDSHAKE
                </p>
              </div>
            </div>
            {!isCounting && (
              <motion.button
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                onClick={() => {
                  completeStage('counting');
                  setStage('result');
                }}
                className="px-6 py-2 bg-emerald-600 text-white rounded-lg font-bold text-xs uppercase tracking-widest hover:bg-emerald-500 transition-all shadow-[0_0_20px_rgba(16,185,129,0.3)]"
              >
                Declare Result
              </motion.button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

const cn = (...classes: string[]) => classes.filter(Boolean).join(' ');
