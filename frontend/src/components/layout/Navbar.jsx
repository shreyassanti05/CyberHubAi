"use client";

import { usePathname } from "next/navigation";
import { Bell, Search, Hexagon } from "lucide-react";
import { motion } from "framer-motion";

export default function Navbar() {
  const pathname = usePathname();

  const getPageTitle = () => {
     if (pathname === "/dashboard") return "Global Overview";
     if (pathname.includes("/link-scanner")) return "AI Link Scanner";
     if (pathname === "/profile") return "Agent Profile";
     return "Cyber Dashboard";
  };

  return (
    <div className="h-20 bg-transparent border-b border-white/5 flex items-center justify-between px-8 backdrop-blur-md sticky top-0 z-50">
      <div className="flex items-center gap-3">
         <motion.div 
           initial={{ rotate: -90, opacity: 0 }}
           animate={{ rotate: 0, opacity: 1 }}
           className="text-blue-500"
         >
           <Hexagon size={24} />
         </motion.div>
         <h2 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-100 to-gray-400">
            {getPageTitle()}
         </h2>
      </div>

      <div className="flex items-center gap-6">
        <div className="relative group">
           <div className="absolute -inset-0.5 bg-white/5 rounded-full blur opacity-0 group-hover:opacity-100 transition duration-500"></div>
           <div className="relative flex items-center bg-[#11161d] rounded-full px-4 py-2 border border-white/5 shadow-inner">
              <Search size={16} className="text-gray-500 mr-2" />
              <input 
                 type="text" 
                 placeholder="Search logs, IPs..." 
                 className="bg-transparent text-sm text-gray-200 outline-none w-48 placeholder-gray-600 font-mono"
              />
              <div className="text-[10px] text-gray-500 font-mono bg-white/5 rounded px-1.5 py-0.5 ml-2 border border-white/10">⌘K</div>
           </div>
        </div>

        <button className="relative w-10 h-10 rounded-full bg-[#11161d] border border-white/5 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/5 transition-all">
           <Bell size={18} />
           <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-red-500 rounded-full animate-ping"></span>
           <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-red-500 rounded-full border border-[#0A0A0B]"></span>
        </button>
      </div>
    </div>
  );
}