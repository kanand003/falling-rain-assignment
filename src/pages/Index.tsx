// RainGrid game page!

import React from "react";
import { RainGrid } from "@/components/RainGrid";
import GameHUD from "@/components/GameHUD";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#13172c] via-[#11131e] to-[#00374a] flex flex-col items-center py-12 px-2">
      {/* Title */}
      <div className="flex flex-col items-center mb-2 animate-fade-in">
        <h1
          className="text-4xl md:text-5xl lg:text-6xl mb-2 font-bold tracking-tight font-mono text-cyan-200 drop-shadow-[0_2px_12px_rgba(0,255,255,0.60)]"
        >
          Falling Rain <span className="text-pink-400">Grid</span>
        </h1>
        {/* Subheader removed */}
      </div>
      {/* Layout: grid and HUD */}
      <div
        className="mt-8 md:mt-10 flex gap-12 items-start w-full justify-center flex-col md:flex-row"
      >
        <RainGrid rows={15} cols={20} cellSize={28} dropChance={0.11} msPerStep={55} />
        <GameHUD />
      </div>
    </div>
  );
};

export default Index;
