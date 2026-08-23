"use client";

import Layout from "../../../components/layout/Layout";
import axios from "axios";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Link as LinkIcon, AlertTriangle, CheckCircle, ShieldAlert } from "lucide-react";

export default function LinkScanner() {
  const [url, setUrl] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const scan = async (e) => {
    e?.preventDefault();
    if (!url) return;
    
    setLoading(true);
    setResult(null);
    setError("");

    try {
      const res = await axios.post("http://127.0.0.1:8000/scan-link", { url });
      setResult(res.data);
    } catch (err) {
      setError("Failed to connect to AI engine. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="max-w-3xl mx-auto mt-10">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300 mb-2">
            AI Link Scanner
          </h1>
          <p className="text-gray-400">Detect zero-day phishing links and malware URLs in real-time leveraging Machine Learning.</p>
        </motion.div>

        <form onSubmit={scan} className="relative group">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl blur opacity-30 group-hover:opacity-60 transition duration-500"></div>
          <div className="relative flex items-center bg-[#020617] rounded-xl overflow-hidden border border-gray-800 p-1">
            <div className="pl-4 text-gray-500">
              <LinkIcon size={20} />
            </div>
            <input
              type="url"
              className="input-field border-none bg-transparent ml-2 flex-1"
              placeholder="https://suspicious-link.com"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              required
            />
            <button
              type="submit"
              disabled={loading}
              className="btn-primary flex items-center gap-2 disabled:opacity-50 ml-2"
            >
              {loading ? (
                <div className="loader" />
              ) : (
                <>
                  <Search size={18} />
                  <span>Scan</span>
                </>
              )}
            </button>
          </div>
        </form>

        {error && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-6 p-4 bg-red-500/10 border border-red-500/50 rounded-lg text-red-400 flex items-center gap-3">
            <AlertTriangle size={20} />
            {error}
          </motion.div>
        )}

        <AnimatePresence>
          {result && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="mt-12"
            >
              <div className={`card relative overflow-hidden ${result.verdict === 'safe' ? 'glow-green' : 'glow-red'}`}>
                <div className={`absolute top-0 left-0 w-1 h-full ${result.verdict === 'phishing' ? 'bg-red-500' : 'bg-green-500'}`}></div>
                
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h3 className="text-gray-400 text-sm font-semibold uppercase tracking-wider mb-1">Analysis Result</h3>
                    <div className="flex items-center gap-3">
                      {result.verdict === 'safe' ? (
                        <CheckCircle className="text-green-400" size={28} />
                      ) : (
                        <ShieldAlert className="text-red-500 animate-pulse" size={28} />
                      )}
                      <span className={`text-3xl font-bold ${result.verdict === 'safe' ? 'text-green-400' : 'text-red-500'}`}>
                        {result.verdict === 'safe' ? 'Safe to Visit' : 'High Risk - Phishing Detected'}
                      </span>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className="text-gray-400 text-sm font-semibold mb-2">Risk Score</div>
                    <div className="text-4xl font-mono text-white mb-2">
                       {result.risk_score}
                      <span className="text-lg text-gray-500">/100</span>
                    </div>
                    {/* Incorporating the risk bar CSS */}
                    <div className="risk-bar w-32 ml-auto bg-gray-800">
                      <div 
                         className={`h-full ${result.risk_score < 40 ? 'risk-safe' : result.risk_score < 70 ? 'risk-medium' : 'risk-danger'}`}
                         style={{ width: `${Math.min(result.risk_score, 100)}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
                
                {result.details && (
                   <div className="grid grid-cols-2 gap-4 mt-8 pt-6 border-t border-white/10">
                      <div>
                        <h4 className="text-gray-400 text-sm mb-3">Model Features</h4>
                        <ul className="space-y-2 text-sm text-gray-300">
                           <li className="flex justify-between"><span>Length:</span> <span className="text-white font-mono">{result.details.features?.length || 0} chars</span></li>
                           <li className="flex justify-between"><span>Suspicious keywords:</span> <span className="text-white font-mono">{result.details.features?.suspicious ? 'Yes' : 'No'}</span></li>
                           <li className="flex justify-between"><span>IP used:</span> <span className="text-white font-mono">{result.details.features?.ip ? 'Yes' : 'No'}</span></li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="text-gray-400 text-sm mb-3">External Intelligence</h4>
                        <ul className="space-y-2 text-sm text-gray-300">
                           <li className="flex justify-between"><span>SSL Check:</span> <span className="text-white font-mono">{result.details.external?.ssl ? 'Valid' : 'Invalid'}</span></li>
                           <li className="flex justify-between"><span>Domain Age:</span> <span className="text-white font-mono">{result.details.external?.domain_age || 'Unknown'} days</span></li>
                        </ul>
                      </div>
                   </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </Layout>
  );
}