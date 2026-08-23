"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { CopySlash, LayoutDashboard, User, Shield, Terminal, LogOut } from "lucide-react";

export default function Sidebar() {
  const pathname = usePathname();

  const menu = [
    { name: "Overview", path: "/dashboard", icon: LayoutDashboard },
    { name: "Scanner", path: "/features/link-scanner", icon: CopySlash },
    { name: "Incident Logs", path: "#", icon: Terminal },
    { name: "Global Profile", path: "/profile", icon: User },
  ];

  return (
    <div className="w-72 min-h-screen bg-[#0d1117]/80 backdrop-blur-3xl border-r border-white/5 flex flex-col p-6 sticky top-0">
      
      <div className="flex items-center gap-3 mb-12 mt-4 px-2">
         <div className="w-10 h-10 rounded-lg bg-blue-600 flex items-center justify-center shadow-[0_0_20px_rgba(37,99,235,0.5)]">
            <Shield size={24} className="text-white" />
         </div>
         <h1 className="text-2xl font-black tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-500">
           CyberHub<span className="text-blue-500">.</span>ai
         </h1>
      </div>

      <nav className="space-y-2 flex-1">
         <div className="text-xs font-semibold text-gray-500 uppercase tracking-widest px-2 mb-4">Core Modules</div>
        {menu.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.path;

          return (
             <Link href={item.path} key={item.name}>
               <motion.div 
                 whileHover={{ x: 4, backgroundColor: "rgba(255,255,255,0.05)" }}
                 whileTap={{ scale: 0.98 }}
                 className={`flex items-center gap-4 px-4 py-3 rounded-xl transition-all ${
                    isActive 
                      ? "bg-blue-600/10 text-blue-400 border border-blue-500/20" 
                      : "text-gray-400 hover:text-white border border-transparent"
                 }`}
               >
                 <Icon size={20} className={isActive ? "text-blue-400" : "text-gray-500"} />
                 <span className="font-medium">{item.name}</span>
               </motion.div>
             </Link>
          );
        })}
      </nav>

      <div className="mt-auto border-t border-white/5 pt-6">
         <div className="flex items-center gap-4 px-2 cursor-pointer group">
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-gray-800 to-gray-700 border border-white/10 flex items-center justify-center text-sm font-bold">
               A
            </div>
            <div className="flex-1">
               <div className="text-sm font-medium text-white group-hover:text-blue-400 transition-colors">Admin User</div>
               <div className="text-xs text-gray-500">Security Team</div>
            </div>
            <LogOut size={16} className="text-gray-600 hover:text-white transition-colors" />
         </div>
      </div>
    </div>
  );
}