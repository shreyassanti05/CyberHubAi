"use client";

import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import { motion } from "framer-motion";

export default function Layout({ children }) {
  return (
    <div className="flex bg-[#0A0A0B] min-h-screen text-gray-100 font-sans selection:bg-blue-500/30">
      <Sidebar />
      <div className="flex-1 flex flex-col relative overflow-hidden">
        {/* Background Gradients */}
        <div className="absolute top-[-10%] right-[-5%] w-96 h-96 bg-blue-600/20 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-[-10%] left-[-10%] w-96 h-96 bg-cyan-600/10 rounded-full blur-[100px] pointer-events-none" />
        
        <Navbar />
        <main className="p-8 pb-20 overflow-y-auto z-10">
           <motion.div 
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             transition={{ duration: 0.5 }}
           >
              {children}
           </motion.div>
        </main>
      </div>
    </div>
  );
}