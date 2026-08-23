"use client";

import Layout from "../../components/layout/Layout";
import FeatureCard from "../../components/ui/FeatureCard";
import { Link, Shield, MessageSquare, Activity, ShieldAlert, FileSearch } from "lucide-react";
import { motion } from "framer-motion";

export default function Dashboard() {
  const features = [
    {
      title: "Link Scanner",
      desc: "Detect zero-day phishing links and malicious URLs using Machine Learning.",
      link: "/features/link-scanner",
      icon: <Link size={32} className="text-blue-400" />,
      color: "from-blue-500/20 to-cyan-500/20",
      border: "hover:border-blue-500/50"
    },
    {
      title: "UPI Fraud Engine",
      desc: "Analyze transaction metadata and VPA IDs to detect payment scams.",
      link: "#",
      icon: <ShieldAlert size={32} className="text-purple-400" />,
      color: "from-purple-500/20 to-pink-500/20",
      border: "hover:border-purple-500/50"
    },
    {
      title: "Message Analyzer",
      desc: "Deep NLP analysis of SMS and WhatsApp messages to spot social engineering.",
      link: "#",
      icon: <MessageSquare size={32} className="text-green-400" />,
      color: "from-green-500/20 to-emerald-500/20",
      border: "hover:border-green-500/50"
    },
    {
      title: "File Sandboxing",
      desc: "Safely execute and monitor suspicious attachments in an isolated environment.",
      link: "#",
      icon: <FileSearch size={32} className="text-amber-400" />,
      color: "from-amber-500/20 to-orange-500/20",
      border: "hover:border-amber-500/50"
    }
  ];

  return (
    <Layout>
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-white mb-2 tracking-tight">System Global View</h1>
        <p className="text-gray-400">Select an AI module to begin deep threat analysis.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
        {features.map((feat, i) => (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            key={feat.title}
          >
            <FeatureCard {...feat} />
          </motion.div>
        ))}
      </div>
      
      <div className="mt-12 glass-panel p-6 rounded-2xl">
         <div className="flex items-center gap-3 mb-6">
            <Activity className="text-blue-500" />
            <h2 className="text-xl font-semibold">Real-time Threat Telemetry</h2>
         </div>
         <div className="h-48 border border-white/5 bg-black/50 rounded-lg flex items-center justify-center text-gray-500">
            [ Telemetry Graph Placeholder ]
         </div>
      </div>
    </Layout>
  );
}