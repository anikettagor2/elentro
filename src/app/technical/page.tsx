"use client";

import { motion } from "framer-motion";
import { Shield, Activity, Terminal, Layers, Search, Cpu, Database, BarChart3, Cloud } from "lucide-react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

const architectureSteps = [
  {
    title: "Dynamic AI Orchestration",
    description: "Utilizes Vertex AI with Gemini 1.5 Pro for strategic simulation and Gemini 1.5 Flash for low-latency chat interactions.",
    icon: Cpu,
  },
  {
    title: "Serverless Scalability",
    description: "Deployed via Google Cloud Run with container optimization ('standalone' mode) for < 2s cold starts and auto-scaling.",
    icon: Activity,
  },
  {
    title: "Security & Rate Limiting",
    description: "Middleware-based protection layer with IP-based rate limiting to ensure API sustainability and MCC compliance.",
    icon: Shield,
  },
  {
    title: "Data Intelligence & BigQuery",
    description: "Architected for BigQuery integration to analyze historical voter trends and provide real-world demographic context through Petabyte-scale analytics.",
    icon: Database,
  },
  {
    title: "GCP Operations Stack",
    description: "Integrated with Cloud Logging and Monitoring for real-time observability, error tracking, and performance tuning across the serverless stack.",
    icon: BarChart3,
  },
];

export default function TechnicalPage() {
  return (
    <div className="min-h-screen bg-black text-white selection:bg-indigo-500/30">
      <Navbar />
      
      <main className="pt-32 pb-20 container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto text-center mb-20"
        >
          <h1 className="text-5xl md:text-7xl font-bold font-space mb-8 bg-clip-text text-transparent bg-gradient-to-r from-white via-indigo-200 to-white/50">
            Technical Architecture
          </h1>
          <p className="text-xl text-zinc-400 font-jakarta leading-relaxed">
            Electron is built on a high-performance Google Cloud stack, designed for scalability, 
            security, and real-world electoral intelligence.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-24">
          {architectureSteps.map((step, index) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="p-8 rounded-3xl bg-zinc-900/50 border border-white/10 hover:border-indigo-500/30 transition-all duration-500 group"
            >
              <div className="w-12 h-12 rounded-xl bg-indigo-600/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <step.icon className="text-indigo-400" size={24} />
              </div>
              <h3 className="text-2xl font-bold mb-4 font-space">{step.title}</h3>
              <p className="text-zinc-400 font-jakarta">{step.description}</p>
            </motion.div>
          ))}
        </div>

        <section className="p-10 rounded-[2.5rem] bg-indigo-600/10 border border-indigo-500/20 mb-24">
          <div className="flex flex-col md:flex-row gap-12 items-center">
            <div className="flex-1">
              <h2 className="text-3xl font-bold mb-6 font-space flex items-center gap-3">
                <Terminal size={32} className="text-indigo-400" />
                Continuous Validation
              </h2>
              <div className="space-y-4">
                <p className="text-zinc-300 font-jakarta">
                  Our CI/CD pipeline via **Cloud Build** ensures that every commit is validated through:
                </p>
                <ul className="space-y-3 list-disc list-inside text-zinc-400 font-jakarta">
                  <li>Automated linting and type checking (TypeScript/ESLint)</li>
                  <li>Container vulnerability scanning via Artifact Registry</li>
                  <li>Optimized Next.js build tracing for minimal footprint</li>
                </ul>
              </div>
            </div>
            <div className="flex-1 w-full aspect-video rounded-2xl bg-black border border-white/10 p-6 font-mono text-sm overflow-hidden">
              <div className="text-green-400 mb-2">$ npm run build</div>
              <div className="text-zinc-500">▲ Next.js 16.1.3 (Turbopack)</div>
              <div className="text-zinc-500">✓ Compiled successfully</div>
              <div className="text-zinc-500">✓ Standalone output tracing enabled</div>
              <div className="text-blue-400 mt-4">$ gcloud run deploy electron --region us-central1</div>
              <div className="text-zinc-500">Deploying container to Cloud Run service [electron]...</div>
              <div className="text-zinc-500">Service [electron] has been deployed and has URL:</div>
              <div className="text-green-400">https://electron-xxxxxx.a.run.app</div>
              <div className="animate-pulse inline-block w-2 h-4 bg-zinc-500 ml-1" />
            </div>
          </div>
        </section>

        <section className="mb-24">
          <h2 className="text-4xl font-bold mb-12 font-space text-center">GCP Service Ecosystem</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { name: "Cloud Run", role: "Compute Engine for Serverless containers", status: "Active" },
              { name: "Vertex AI", role: "Gemini 1.5 API & Model Hosting", status: "Active" },
              { name: "Cloud Logging", role: "Centralized logs & Error Reporting", status: "Enabled" },
              { name: "BigQuery", role: "Electoral Data Analysis", status: "Configured" },
              { name: "Artifact Registry", role: "Secure Container Storage", status: "Active" },
              { name: "Secret Manager", role: "API Key Encryption", status: "Enabled" },
            ].map((service) => (
              <div key={service.name} className="p-6 rounded-2xl bg-zinc-900/30 border border-white/5 hover:bg-zinc-900/50 transition-colors">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-lg font-bold font-space">{service.name}</h3>
                  <span className="text-[10px] px-2 py-1 rounded-full bg-green-500/10 text-green-400 border border-green-500/20 uppercase tracking-widest">
                    {service.status}
                  </span>
                </div>
                <p className="text-sm text-zinc-500 font-jakarta">{service.role}</p>
              </div>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
