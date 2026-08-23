"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function FeatureCard({ title, desc, link, icon, color, border }) {
  return (
    <Link href={link} className="block group">
      <div className={`glass-panel p-6 rounded-2xl border transition-all duration-300 relative overflow-hidden bg-gradient-to-br border-white/5 ${color} ${border}`}>
        
        {/* Glow effect on hover */}
        <div className="absolute -inset-2 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity blur-xl z-0"></div>
        
        <div className="relative z-10 flex items-start gap-5">
          <div className="p-4 rounded-xl bg-black/40 backdrop-blur-md border border-white/10 shrink-0">
            {icon}
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-bold text-white mb-2 flex items-center gap-2 group-hover:text-blue-400 transition-colors">
              {title}
            </h3>
            <p className="text-gray-400 text-sm leading-relaxed mb-4">
              {desc}
            </p>
            <div className="flex items-center text-sm font-semibold text-gray-500 group-hover:text-white transition-colors">
              Launch Module <ArrowRight size={16} className="ml-1 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}