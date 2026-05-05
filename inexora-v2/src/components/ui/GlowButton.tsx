import React from 'react';
import { motion } from 'framer-motion';

const GlowButton = ({ children, onClick }) => {
  return (
    <motion.button
      onClick={onClick}
      className="relative inline-flex items-center justify-center p-4 overflow-hidden text-white bg-gradient-to-r from-violet-500 to-cyan-500 rounded-lg shadow-lg"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <span className="absolute inset-0 w-full h-full transition-all duration-300 transform bg-white rounded-lg opacity-10"></span>
      <span className="relative z-10">{children}</span>
    </motion.button>
  );
};

export default GlowButton;