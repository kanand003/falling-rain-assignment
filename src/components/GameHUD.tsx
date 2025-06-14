import React from "react";

export default function GameHUD() {
  // Only display Game Console title and basic info, per the request
  return (
    <div className="p-6 px-8 rounded-2xl flex flex-col gap-6 bg-gradient-to-b from-[rgba(15,23,42,0.97)] to-[rgba(38,48,68,0.93)] border-2 border-blue-400 shadow-[0_0_16px_0_#2489ff66] min-w-[220px] max-w-[320px]">
      <h2 className="text-lg font-bold text-cyan-400 uppercase tracking-widest mb-2">
        Game Console
      </h2>
      <div className="flex flex-col gap-3">
        <div className="flex justify-between items-center">
          <span className="text-gray-300 font-mono">Score</span>
          <span className="font-bold text-yellow-300 text-2xl neon-glow">∞</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-gray-300 font-mono">Raindrops/sec</span>
          <span className="text-pink-400 font-bold font-mono">Random</span>
        </div>
      </div>
    </div>
  );
}
