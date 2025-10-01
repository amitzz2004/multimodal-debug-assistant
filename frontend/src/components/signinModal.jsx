// src/components/SignInModal.jsx
import React, { useState } from "react";
import axios from "axios";

const API_BASE = import.meta.env.VITE_BACKEND_URL || "http://localhost:4000";

export default function SignInModal({ onClose, onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isSignup, setIsSignup] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const endpoint = isSignup ? "/api/auth/signup" : "/api/auth/login";
      const res = await axios.post(`${API_BASE}${endpoint}`, {
        username,
        password,
      });

      if (res.data.token) {
        localStorage.setItem("token", res.data.token);
        onLogin(username); // pass username back to App
        onClose();
      }
    } catch (err) {
      setError(err.response?.data?.error || "Request failed");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-gray-900 border border-gray-700 rounded-lg p-6 w-96 shadow-xl">
        <h2 className="text-xl font-bold text-indigo-400 mb-4">
          {isSignup ? "Sign Up" : "Sign In"}
        </h2>

        {error && (
          <p className="text-red-400 text-sm mb-2">{error}</p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded text-white focus:ring focus:ring-indigo-500"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded text-white focus:ring focus:ring-indigo-500"
            required
          />
          <button
            type="submit"
            className="w-full py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-semibold"
          >
            {isSignup ? "Sign Up" : "Sign In"}
          </button>
        </form>

        <div className="flex justify-between items-center mt-4 text-sm">
          <button
            onClick={() => setIsSignup(!isSignup)}
            className="text-indigo-400 hover:underline"
          >
            {isSignup ? "Already have an account? Sign In" : "Need an account? Sign Up"}
          </button>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white"
          >
            Close ✖
          </button>
        </div>
      </div>
    </div>
  );
}
