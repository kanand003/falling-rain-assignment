
import React, { useEffect, useState } from "react";

// Palette of bright neon-like hues (in hsla for easier modifications)
const LANE_COLORS = [
  "hsla(210, 93%, 54%, OPACITY)", // Bright Blue
  "hsla(8, 93%, 54%, OPACITY)",   // Bright Red
  "hsla(32, 93%, 54%, OPACITY)",  // Orange
  "hsla(60, 93%, 54%, OPACITY)",  // Yellow
  "hsla(120, 93%, 54%, OPACITY)", // Green
  "hsla(285, 93%, 54%, OPACITY)", // Purple
  "hsla(180, 93%, 54%, OPACITY)", // Cyan
  "hsla(340, 93%, 54%, OPACITY)", // Pink
];

// Each drop carries its current head position, its column, and its length.
type Drop = {
  col: number;
  headRow: number;
  length: number;
};

export function RainGrid({
  rows = 15,
  cols = 20,
  cellSize = 28,
  dropChance = 0.12,
  msPerStep = 64,
  minDropLen = 3,
  maxDropLen = 6,
}: {
  rows?: number;
  cols?: number;
  cellSize?: number;
  dropChance?: number;
  msPerStep?: number;
  minDropLen?: number;
  maxDropLen?: number;
}) {
  const [drops, setDrops] = useState<Drop[]>([]);
  const [dimensionKey, setDimensionKey] = useState([rows, cols].join("-"));

  // State: current global color index, cycles every 2.5 seconds
  const [currentColorIdx, setCurrentColorIdx] = useState(0);

  useEffect(() => {
    setDrops([]);
    setDimensionKey([rows, cols].join("-") + "-" + Date.now());
  }, [rows, cols]);

  // Animation: cycle color index every 2.5s
  useEffect(() => {
    const colorInterval = setInterval(() => {
      setCurrentColorIdx((prevIdx) => (prevIdx + 1) % LANE_COLORS.length);
    }, 2500);
    return () => clearInterval(colorInterval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setDrops(prevDrops => {
        let newDrops = prevDrops
          .map(d => ({ ...d, headRow: d.headRow + 1 }))
          .filter(d => d.headRow - d.length < rows);

        const activeCols = new Set<number>();
        for (const d of newDrops) {
          if (d.headRow - d.length < rows - 1) {
            activeCols.add(d.col);
          }
        }

        for (let c = 0; c < cols; c++) {
          if (!activeCols.has(c) && Math.random() < dropChance) {
            newDrops.push({
              col: c,
              headRow: 0,
              length: Math.floor(
                minDropLen + Math.random() * (maxDropLen - minDropLen + 1)
              ),
            });
          }
        }

        return newDrops;
      });
    }, msPerStep);

    return () => clearInterval(interval);
  }, [cols, rows, dropChance, msPerStep, minDropLen, maxDropLen, dimensionKey]);

  type CellState = { isDrop: boolean; opacity: number; color?: string };
  const grid: CellState[][] = Array.from({ length: rows }, () =>
    Array.from({ length: cols }, () => ({ isDrop: false, opacity: 0 }))
  );

  // Compute current global color from palette, with inserted opacity
  const getGlobalNeonColor = (opacity: number) =>
    LANE_COLORS[currentColorIdx].replace("OPACITY", `${opacity}`);

  // Render each drop into the grid, every cell uses global color
  drops.forEach(drop => {
    for (let i = 0; i < drop.length; i++) {
      const row = drop.headRow - i;
      if (row >= 0 && row < rows) {
        // Fade: head brightest, tail fades
        const opacity =
          i === 0 ? 1 : i === 1 ? 0.72 : i === 2 ? 0.48 : Math.max(0.17, 1 - i * 0.22);

        const color = getGlobalNeonColor(opacity);
        grid[row][drop.col] = { isDrop: true, opacity, color };
      }
    }
  });

  const gridWidth = cols * cellSize;
  const gridHeight = rows * cellSize;

  return (
    <div
      className="overflow-hidden bg-black rounded-xl border-2 border-gray-400 shadow-xl relative"
      style={{
        width: gridWidth,
        height: gridHeight,
        boxShadow: "0 0 28px 2px #bb05c42a,0 0 0 3px #ab1c7249",
        transition: "box-shadow .2s",
      }}
    >
      <div
        className="grid"
        style={{
          gridTemplateColumns: `repeat(${cols}, ${cellSize}px)`,
          gridTemplateRows: `repeat(${rows}, ${cellSize}px)`,
          width: "100%",
          height: "100%",
        }}
      >
        {grid.map((row, r) =>
          row.map((cell, c) => (
            <div
              key={`${r}-${c}-${dimensionKey}`}
              className={`relative flex items-center justify-center
                border border-gray-700
                bg-black
                transition-[background] duration-100`}
              style={{
                width: cellSize,
                height: cellSize,
                background: cell.isDrop && cell.color ? cell.color : "black",
              }}
            />
          ))
        )}
      </div>
    </div>
  );
}

export default RainGrid;

