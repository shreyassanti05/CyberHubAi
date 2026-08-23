"use client";

import { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const res = await axios.post("http://127.0.0.1:8000/auth/login", {
        email,
        password,
      });

      localStorage.setItem("token", res.data.token);
      alert("Login Successful!");
    } catch (err) {
      alert("Login Failed");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-br from-black to-blue-900">
      
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-gray-900 p-10 rounded-2xl shadow-2xl w-96"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">
          CyberHub Login
        </h2>

        <input
          type="email"
          placeholder="Email"
          className="w-full p-3 mb-4 bg-gray-800 rounded"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full p-3 mb-4 bg-gray-800 rounded"
          onChange={(e) => setPassword(e.target.value)}
        />

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleLogin}
          className="w-full bg-blue-600 p-3 rounded-lg"
        >
          Login
        </motion.button>
      </motion.div>
    </div>
  );
}

useEffect(() => {
  /* global google */
  google.accounts.id.initialize({
    client_id: "YOUR_GOOGLE_CLIENT_ID",
    callback: handleGoogleResponse,
  });

  google.accounts.id.renderButton(
    document.getElementById("googleBtn"),
    { theme: "outline", size: "large" }
  );
}, []);

const handleGoogleResponse = async (response) => {
  const res = await axios.post("http://127.0.0.1:8000/auth/google", {
    token: response.credential,
  });

  localStorage.setItem("token", res.data.token);
};

<div id="googleBtn" className="mt-4"></div>