import React from 'react';
import { motion } from 'motion/react';
import { Asterisk } from 'lucide-react';

const LoadingScreen: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.8, ease: [0.43, 0.13, 0.23, 0.96] }}
      className="fixed inset-0 z-[9999] bg-forest flex flex-col items-center justify-center overflow-hidden"
    >
      {/* Background Decorative Elements */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 0.1, scale: 1.2 }}
        transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
        className="absolute w-[800px] h-[800px] rounded-full bg-mint/20 blur-[120px] pointer-events-none"
      />

      <div className="relative z-10 flex flex-col items-center">
        {/* Animated Icon */}
        <motion.div
          initial={{ rotate: 0, scale: 0.5, opacity: 0 }}
          animate={{ rotate: 180, scale: 1, opacity: 1 }}
          transition={{ 
            rotate: { duration: 2, repeat: Infinity, ease: "linear" },
            scale: { duration: 0.8, ease: "easeOut" },
            opacity: { duration: 0.8 }
          }}
          className="mb-8 p-6 bg-mint rounded-full shadow-[0_0_50px_rgba(197,241,215,0.3)]"
        >
          <Asterisk className="w-12 h-12 text-forest" />
        </motion.div>

        {/* Text Animation */}
        <div className="overflow-hidden flex flex-col items-center">
          <motion.h1
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="text-white text-4xl sm:text-6xl font-black tracking-tighter uppercase mb-2 flex items-center gap-2 font-serif"
          >
            knowledge<span className="text-mint font-light italic">petal</span>
          </motion.h1>
          
          <motion.div
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: "100%", opacity: 1 }}
            transition={{ duration: 1.5, delay: 0.5, ease: "easeInOut" }}
            className="h-[1px] bg-gradient-to-r from-transparent via-mint/40 to-transparent w-full"
          />
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            transition={{ duration: 0.5, delay: 1 }}
            className="text-mint text-[10px] sm:text-xs font-black uppercase tracking-[0.5em] mt-6"
          >
            Cultivating Digital Archive
          </motion.p>
        </div>
      </div>

      {/* Loading Progress Bar at the bottom */}
      <div className="fixed bottom-0 left-0 w-full h-1 bg-white/5">
        <motion.div
          initial={{ x: "-100%" }}
          animate={{ x: "0%" }}
          transition={{ duration: 2, ease: "easeInOut" }}
          className="h-full bg-mint shadow-[0_-4px_20px_rgba(197,241,215,0.5)]"
        />
      </div>
    </motion.div>
  );
};

export default LoadingScreen;
