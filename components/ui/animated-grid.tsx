"use client";

import { motion } from "framer-motion";

export function AnimatedGrid() {
  return (
    <div className="fixed inset-0 -z-10 h-full w-full bg-black">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:24px_24px]">
        <motion.div 
          className="absolute inset-0 bg-gradient-to-tr from-blue-900/30 via-transparent to-violet-900/30"
          animate={{
            opacity: [0.3, 0.5, 0.3],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>
    </div>
  );
}