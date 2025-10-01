// src/App.jsx
import React, { useState, useEffect } from "react";
import CodeEditor from "./components/CodeEditor";
import ScreenshotAnnotator from "./components/ScreenshotAnnotator";
import SuggestionsPanel from "./components/SuggestionsPanel";
import SignInModal from "./components/SignInModal"; // ✅ new

export default function App() {
  const [code, setCode] = useState("");       // code from editor
  const [ocrLogs, setOcrLogs] = useState(""); // logs from OCR
  const [pulseActive, setPulseActive] = useState(true);

  // ✅ dynamic stats
  const [stats, setStats] = useState({
    bugs: 0,
    warnings: 0,
    suggestions: 0,
  });

  // auth state
  const [showSignIn, setShowSignIn] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const interval = setInterval(() => setPulseActive((p) => !p), 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-900 via-gray-800 to-indigo-900 text-gray-100">
      {/* Animations */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideIn {
          from { opacity: 0; transform: translateX(-20px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
        .animate-fadeIn { animation: fadeIn 0.5s ease-out forwards; opacity: 0; }
        .animate-slideIn { animation: slideIn 0.5s ease-out forwards; opacity: 0; }
      `}</style>

      {/* Header */}
      <header className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 shadow-2xl p-5 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-pulse" />
        <div className="relative flex justify-between items-center">
          <div className="flex items-center gap-4">
            <div className="p-2 bg-white/10 rounded-xl backdrop-blur-md">
              <span className="text-3xl">⚡</span>
            </div>
            <div>
              <h1 className="text-3xl font-extrabold tracking-wide drop-shadow-lg flex items-center gap-2">
                Multimodal Debug Assistant
                <span
                  className={`w-2 h-2 bg-green-400 rounded-full ${
                    pulseActive ? "animate-pulse" : ""
                  }`}
                />
              </h1>
              <p className="text-sm text-indigo-200">
                AI-powered code debugging with real-time analysis
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            {user ? (
              <span className="text-sm text-white">👋 Hi, {user}</span>
            ) : (
              <button
                onClick={() => setShowSignIn(true)}
                className="px-4 py-2 bg-white/20 hover:bg-white/30 text-white rounded-lg backdrop-blur-md transition-all shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                Sign In
              </button>
            )}
          </div>
        </div>

        {/* ✅ Dynamic Stats bar */}
        <div className="relative mt-4 flex gap-4">
          <div className="flex-1 bg-white/10 rounded-lg p-3 border border-white/20">
            <p className="text-xs text-indigo-200">Active Bugs</p>
            <p className="text-2xl font-bold text-red-400">{stats.bugs}</p>
          </div>
          <div className="flex-1 bg-white/10 rounded-lg p-3 border border-white/20">
            <p className="text-xs text-indigo-200">Warnings</p>
            <p className="text-2xl font-bold text-yellow-400">{stats.warnings}</p>
          </div>
          <div className="flex-1 bg-white/10 rounded-lg p-3 border border-white/20">
            <p className="text-xs text-indigo-200">AI Suggestions</p>
            <p className="text-2xl font-bold text-green-400">{stats.suggestions}</p>
          </div>
        </div>
      </header>

      {/* Main grid */}
      <main className="flex-1 p-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left side: Code + Screenshot */}
        <section className="lg:col-span-2 space-y-6">
          {/* Code Editor */}
          <div className="bg-gray-900/70 border border-gray-700 rounded-2xl shadow-2xl p-5 backdrop-blur-md">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-xl">💻</span>
              <h2 className="text-lg font-semibold text-indigo-400">
                Code Editor
              </h2>
            </div>
            <CodeEditor onCodeChange={(val) => setCode(val)} />
          </div>

          {/* Screenshot Annotator */}
          <div className="bg-gray-900/70 border border-gray-700 rounded-2xl shadow-2xl p-5 backdrop-blur-md">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-xl">🖼️</span>
              <h2 className="text-lg font-semibold text-pink-400">
                Screenshot Annotator
              </h2>
            </div>
            <ScreenshotAnnotator onOcrComplete={(text) => setOcrLogs(text)} />
          </div>
        </section>

        {/* Right side: Suggestions */}
        <aside className="space-y-6">
          <div className="bg-gray-900/70 border border-gray-700 rounded-2xl shadow-2xl p-5 backdrop-blur-md">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-xl">🤖</span>
              <h2 className="text-lg font-semibold text-green-400">
                AI Suggestions
              </h2>
            </div>
            {/* ✅ pass callback to update stats */}
            <SuggestionsPanel
              code={code}
              logs={ocrLogs}
              onStatsUpdate={(newStats) => setStats(newStats)}
            />
          </div>
        </aside>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800/50 text-gray-400 text-center py-4 border-t border-gray-700 text-sm">
        <div className="flex items-center justify-center gap-2">
          Built with <span className="text-red-500 animate-pulse">❤️</span> using
          <span className="text-indigo-400 font-semibold"> React</span>,
          <span className="text-purple-400 font-semibold"> Tailwind</span> &
          <span className="text-green-400 font-semibold"> AI</span>
        </div>
      </footer>

      {/* Sign In modal */}
      {showSignIn && (
        <SignInModal
          onClose={() => setShowSignIn(false)}
          onLogin={(username) => setUser(username)}
        />
      )}
    </div>
  );
}
