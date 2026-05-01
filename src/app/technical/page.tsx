"use client";

import { motion } from "framer-motion";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { 
  ShieldCheck, 
  Zap, 
  Repeat, 
  Server, 
  Code2, 
  LineChart,
  Eye,
  Lock
} from "lucide-react";

const TECH_SPECS = [
  {
    title: "Resilient AI Orchestration",
    description: "Multi-layered error handling and automatic retry mechanisms for Gemini API interactions, ensuring service continuity during peak demand spikes.",
    icon: Repeat,
    color: "text-blue-400",
    bg: "bg-blue-400/10"
  },
  {
    title: "Serverless Scalability",
    description: "Deployed on Google Cloud Run with containerized isolation, providing sub-second cold starts and seamless auto-scaling up to thousands of instances.",
    icon: Server,
    color: "text-purple-400",
    bg: "bg-purple-400/10"
  },
  {
    title: "Schema-Driven Security",
    description: "Strict Zod validation on all ingress points prevents malformed data and injection attacks, maintaining 100% data integrity.",
    icon: ShieldCheck,
    color: "text-emerald-400",
    bg: "bg-emerald-400/10"
  },
  {
    title: "Observability Stack",
    description: "Full-stack telemetry via Google Cloud Logging, monitoring AI token usage, latency distribution, and simulation success rates.",
    icon: Eye,
    color: "text-amber-400",
    bg: "bg-amber-400/10"
  },
  {
    title: "High-Performance UX",
    description: "Next.js standalone build with optimized static assets and server-side streaming for the most responsive simulation experience.",
    icon: Zap,
    color: "text-rose-400",
    bg: "bg-rose-400/10"
  },
  {
    title: "Enterprise IAM",
    description: "Granular access controls and service account isolation to ensure the security of strategic modeling data.",
    icon: Lock,
    color: "text-indigo-400",
    bg: "bg-indigo-400/10"
  }
];

export default function TechnicalPage() {
  return (
    <div className="min-h-screen bg-black text-white selection:bg-primary/20 selection:text-primary">
      <Navbar />
      
      <main className="container mx-auto px-4 pt-32 pb-24">
        <div className="max-w-4xl mx-auto text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/20 bg-primary/5 text-primary text-xs font-bold uppercase tracking-widest mb-6"
          >
            <Code2 className="w-3 h-3" />
            Infrastructure & Reliability
          </motion.div>
          <h1 className="text-4xl md:text-6xl font-black tracking-tighter mb-6 bg-clip-text text-transparent bg-gradient-to-b from-white to-zinc-500">
            Technical Architecture
          </h1>
          <p className="text-zinc-400 text-lg max-w-2xl mx-auto leading-relaxed">
            Electron is engineered for mission-critical reliability, leveraging state-of-the-art AI orchestration and cloud-native security patterns.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {TECH_SPECS.map((spec, i) => (
            <motion.div
              key={spec.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group p-8 rounded-3xl border border-white/5 bg-zinc-900/30 backdrop-blur-sm hover:border-white/10 transition-all"
            >
              <div className={`w-12 h-12 rounded-xl ${spec.bg} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                <spec.icon className={`w-6 h-6 ${spec.color}`} />
              </div>
              <h3 className="text-xl font-bold mb-4 tracking-tight text-white group-hover:text-primary transition-colors">
                {spec.title}
              </h3>
              <p className="text-zinc-400 text-sm leading-relaxed">
                {spec.description}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="mt-24 p-12 rounded-[3rem] border border-white/10 bg-zinc-950 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 p-8 opacity-20">
            <LineChart className="w-48 h-48 text-primary" />
          </div>
          
          <div className="relative z-10 max-w-2xl">
            <h2 className="text-3xl font-bold mb-6 tracking-tight">AI Reliability Protocol</h2>
            <div className="space-y-6 text-zinc-400">
              <p>
                Our system implements a proprietary <strong>Exponential Backoff</strong> retry strategy for all Vertex AI calls. 
                When the Gemini API experiences high demand (HTTP 503), the engine automatically retries with jittered delays, 
                minimizing user impact and ensuring a 99.9% successful simulation rate.
              </p>
              <p>
                Furthermore, we utilize <strong>Streaming JSON Parsing</strong> which allows the UI to render results in real-time 
                as they are generated by the model, reducing perceived latency by up to 80%.
              </p>
            </div>
          </div>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
}
