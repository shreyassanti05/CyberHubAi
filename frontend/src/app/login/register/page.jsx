"use client";

import { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";

export default function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleRegister = async () => {
    try {
      const res = await axios.post("http://127.0.0.1:8000/auth/register", form);
      localStorage.setItem("token", res.data.token);
      alert("Registered Successfully!");
    } catch (err) {
      alert("Error");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-br from-black via-purple-900 to-blue-900">
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-gray-900 p-10 rounded-2xl shadow-xl w-96"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">
          Create Account
        </h2>

        <input
          placeholder="Name"
          className="w-full p-3 mb-3 bg-gray-800 rounded"
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />

        <input
          placeholder="Email"
          className="w-full p-3 mb-3 bg-gray-800 rounded"
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full p-3 mb-4 bg-gray-800 rounded"
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />

        <motion.button
          whileHover={{ scale: 1.05 }}
          onClick={handleRegister}
          className="w-full bg-purple-600 p-3 rounded-lg"
        >
          Register
        </motion.button>
      </motion.div>
    </div>
  );
}