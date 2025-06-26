"use client";

import React, { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import {
  Slack,
  FileText,
  FileImage,
  Youtube,
  Database,
  Settings,
  Palette,
  Globe,
  Zap,
  GitBranch,
} from "lucide-react";
import { useScrollDirection } from "../hooks/useScrollDirection";

const icons = [
  { Icon: Slack, color: "bg-purple-600", size: 56 },
  { Icon: FileText, color: "bg-red-600", size: 48 },
  { Icon: FileImage, color: "bg-blue-600", size: 48 },
  { Icon: Youtube, color: "bg-green-600", size: 56 },
  { Icon: Database, color: "bg-indigo-600", size: 48 },
  { Icon: Settings, color: "bg-gray-600", size: 48 },
  { Icon: Palette, color: "bg-pink-600", size: 48 },
  { Icon: Globe, color: "bg-cyan-600", size: 48 },
  { Icon: Zap, color: "bg-yellow-500", size: 56 },
  { Icon: GitBranch, color: "bg-orange-600", size: 48 },
];

const verticalGap = 110;

export default function FloatingIcons() {
  const scrollDirection = useScrollDirection();
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });

  const leftIcons = icons.slice(0, 5);
  const rightIcons = icons.slice(5);

  useEffect(() => {
    function updateSize() {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    }
    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  // Calculate side Y positions stacked vertically centered
  const getSideY = (i: number, total: number) => {
    const totalHeight = (total - 1) * verticalGap;
    return windowSize.height / 2 - totalHeight / 2 + i * verticalGap;
  };

  // Center position (all icons overlap exactly at center)
  const centerPos = {
    x: windowSize.width / 2,
    y: windowSize.height / 2,
  };

  return (
    <div className="fixed inset-0 pointer-events-none select-none z-10">
      {/* Left icons */}
      {leftIcons.map(({ Icon, color, size }, i) => {
        const sideX = 40;
        const sideY = getSideY(i, leftIcons.length);

        // Animate to center and hidden on scroll down
        const isScrollingDown = scrollDirection === "down";

        return (
          <motion.div
            key={"left-" + i}
            initial={false}
            animate={{
              x: isScrollingDown ? centerPos.x : sideX,
              y: isScrollingDown ? centerPos.y : sideY,
              opacity: isScrollingDown ? 0 : 1,
              scale: isScrollingDown ? 0.3 : 1,
              zIndex: isScrollingDown ? 0 : 20,
              filter: isScrollingDown ? "blur(4px)" : "blur(0px)",
            }}
            transition={{ type: "spring", stiffness: 100, damping: 25, delay: isScrollingDown ? i * 0.05 : 0 }}
            className={`absolute rounded-full shadow-lg flex items-center justify-center cursor-pointer ${color}`}
            style={{
              width: size,
              height: size,
              top: 0,
              left: 0,
              willChange: "transform, opacity, filter",
            }}
            whileHover={{ scale: 1.2, opacity: 1, filter: "blur(0px)", zIndex: 30 }}
          >
            <Icon className="text-white" size={size * 0.5} />
          </motion.div>
        );
      })}

      {/* Right icons */}
      {rightIcons.map(({ Icon, color, size }, i) => {
        const sideX = windowSize.width - 40;
        const sideY = getSideY(i, rightIcons.length);

        const isScrollingDown = scrollDirection === "down";

        return (
          <motion.div
            key={"right-" + i}
            initial={false}
            animate={{
              x: isScrollingDown ? centerPos.x : sideX,
              y: isScrollingDown ? centerPos.y : sideY,
              opacity: isScrollingDown ? 0 : 1,
              scale: isScrollingDown ? 0.3 : 1,
              zIndex: isScrollingDown ? 0 : 20,
              filter: isScrollingDown ? "blur(4px)" : "blur(0px)",
            }}
            transition={{ type: "spring", stiffness: 100, damping: 25, delay: isScrollingDown ? i * 0.05 : 0 }}
            className={`absolute rounded-full shadow-lg flex items-center justify-center cursor-pointer ${color}`}
            style={{
              width: size,
              height: size,
              top: 0,
              left: 0,
              willChange: "transform, opacity, filter",
            }}
            whileHover={{ scale: 1.2, opacity: 1, filter: "blur(0px)", zIndex: 30 }}
          >
            <Icon className="text-white" size={size * 0.5} />
          </motion.div>
        );
      })}
    </div>
  );
}
