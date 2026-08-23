"use client";

import Layout from "../../components/layout/Layout";
import { motion } from "framer-motion";

export default function Profile() {
  return (
    <Layout>
      <h1 className="text-2xl font-bold mb-6">Profile</h1>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-gray-900 p-6 rounded-xl"
      >
        <h2 className="text-lg mb-2">User Info</h2>
        <p>Email: user@example.com</p>

        <div className="mt-6">
          <h3 className="text-lg">Security Score</h3>
          <div className="w-full bg-gray-800 h-3 rounded mt-2">
            <div className="bg-green-500 h-3 w-3/4 rounded"></div>
          </div>
          <p className="mt-2 text-green-400">75 / 100</p>
        </div>
      </motion.div>
    </Layout>
  );
}