'use client';

import React from 'react';
import { motion } from 'motion/react';

interface AvatarProps {
  isThinking: boolean;
  size?: number;
}

export default function BotAvatar({ isThinking, size = 48 }: AvatarProps) {
  return (
    <div className="relative" style={{ width: size, height: size }}>
      <motion.div
        animate={{
          scale: isThinking ? [1, 1.1, 1] : 1,
          rotate: isThinking ? [0, 5, -5, 0] : 0,
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="w-full h-full rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white shadow-lg overflow-hidden"
      >
        <svg viewBox="0 0 100 100" className="w-[70%] h-[70%] fill-current">
          {/* Eyes */}
          <motion.ellipse
            cx="35" cy="45" rx="6" ry="6"
            animate={{
              height: [12, 1, 12],
              opacity: [1, 1, 1]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              times: [0, 0.1, 0.2]
            }}
          />
          <motion.ellipse
            cx="65" cy="45" rx="6" ry="6"
            animate={{
              height: [12, 1, 12],
              opacity: [1, 1, 1]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              times: [0, 0.1, 0.2]
            }}
          />
          
          {/* Mouth/Mouth Line */}
          <motion.path
            d={isThinking ? "M 35 70 Q 50 80 65 70" : "M 35 70 H 65"}
            stroke="white"
            strokeWidth="4"
            fill="none"
            strokeLinecap="round"
            animate={{
              d: isThinking ? "M 35 70 Q 50 60 65 70" : "M 35 70 H 65",
            }}
          />
        </svg>

        {/* Inner Ripples when thinking */}
        {isThinking && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0"
          >
            {[1, 2, 3].map((i) => (
              <motion.div
                key={i}
                animate={{
                  scale: [1, 2],
                  opacity: [0.5, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.6,
                }}
                className="absolute inset-0 border border-white/30 rounded-2xl"
              />
            ))}
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}
