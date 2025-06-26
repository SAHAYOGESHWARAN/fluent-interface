"use client";

import React, { useEffect, useState } from "react";
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

  const getSideY = (i: number, total: number) => {
    const totalHeight = (total - 1) * verticalGap;
    return windowSize.height / 2 - totalHeight / 2 + i * verticalGap;
  };

  const centerPos = {
    x: windowSize.width / 2,
    y: windowSize.height / 2,
  };

  const baseTransition = {
    type: "spring",
    mass: 0.6,
    stiffness: 70,
    damping: 22,
  };

  return (
    <div className="fixed inset-0 pointer-events-none select-none z-10">
      {[...leftIcons, ...rightIcons].map(({ Icon, color, size }, i) => {
        const isLeft = i < 5;
        const sideX = isLeft ? 40 : windowSize.width - 40;
        const sideY = getSideY(isLeft ? i : i - 5, 5);
        const isScrollingDown = scrollDirection === "down";

        return (
          <motion.div
            key={i}
            initial={false}
            animate={{
              x: isScrollingDown ? centerPos.x : sideX,
              y: isScrollingDown ? centerPos.y : sideY,
              opacity: isScrollingDown ? 0 : 1,
              scale: isScrollingDown ? 0.2 : 1,
              zIndex: isScrollingDown ? 0 : 20,
              filter: isScrollingDown ? "blur(4px)" : "blur(0px)",
            }}
            transition={{
              ...baseTransition,
              delay: isScrollingDown ? i * 0.07 : (10 - i) * 0.04,
            }}
            className={`absolute ${color} rounded-full shadow-lg flex items-center justify-center cursor-pointer`}
            style={{
              width: size,
              height: size,
              top: 0,
              left: 0,
              willChange: "transform, opacity, filter",
            }}
            whileHover={{
              scale: isScrollingDown ? 0.2 : 1.15,
              filter: "blur(0px)",
              zIndex: 30,
              transition: { duration: 0.2 },
            }}
          >
            <Icon className="text-white" size={size * 0.5} />
          </motion.div>
        );
      })}
    </div>
  );
}
