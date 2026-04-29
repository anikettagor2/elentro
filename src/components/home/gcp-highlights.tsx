"use client";

import { motion } from "framer-motion";
import { Cloud, Cpu, Database, Globe, Lock, Zap } from "lucide-react";

const services = [
  {
    title: "Vertex AI",
    description: "Orchestrating Gemini 1.5 Pro for multi-dimensional demographic simulation and strategic modeling.",
    icon: Cpu,
    color: "from-blue-500 to-cyan-500",
  },
  {
    title: "Cloud Run",
    description: "Serverless execution environment ensuring high availability and auto-scaling for simulation workloads.",
    icon: Cloud,
    color: "from-blue-600 to-indigo-600",
  },
  {
    title: "Cloud Storage",
    description: "Archiving massive electoral datasets and generated strategic intelligence reports with 99.99% durability.",
    icon: Database,
    color: "from-yellow-500 to-orange-500",
  },
  {
    title: "Cloud Load Balancing",
    description: "Global edge delivery for low-latency access to simulation dashboards across any geography.",
    icon: Globe,
    color: "from-green-500 to-emerald-500",
  },
  {
    title: "IAM & Security",
    description: "Enterprise-grade identity management and RBAC for sensitive political strategy data protection.",
    icon: Lock,
    color: "from-red-500 to-pink-500",
  },
  {
    title: "Cloud Build",
    description: "Fully managed CI/CD pipeline for rapid deployment of simulation engine updates.",
    icon: Zap,
    color: "from-purple-500 to-violet-500",
  },
];

export function GCPHighlights() {
  return (
    <section className="py-24 relative overflow-hidden bg-black">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-white/50 font-space">
            Powered by Google Cloud
          </h2>
          <p className="text-xl text-zinc-400 max-w-3xl mx-auto font-jakarta">
            Electron leverages the full power of Google Cloud Platform to deliver the most accurate 
            and scalable election simulation engine on the planet.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group relative p-8 rounded-3xl bg-zinc-900/50 border border-white/10 hover:border-white/20 transition-all duration-500"
            >
              <div className={`absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500 rounded-3xl bg-gradient-to-br ${service.color}`} />
              
              <div className="relative z-10">
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 bg-gradient-to-br ${service.color} text-white shadow-lg`}>
                  <service.icon size={28} />
                </div>
                
                <h3 className="text-2xl font-bold mb-4 font-space text-white group-hover:text-primary transition-colors">
                  {service.title}
                </h3>
                
                <p className="text-zinc-400 font-jakarta leading-relaxed">
                  {service.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Decorative background elements */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-blue-500/10 blur-[120px] rounded-full -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500/10 blur-[120px] rounded-full translate-x-1/2 translate-y-1/2" />
    </section>
  );
}
