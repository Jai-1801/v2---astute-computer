import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import logo from '@/assets/logo.svg';

interface LoadingScreenProps {
  onComplete: () => void;
}

export function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(onComplete, 300);
          return 100;
        }
        return prev + Math.random() * 20;
      });
    }, 80);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: 'easeInOut' }}
      className="fixed inset-0 z-[100] bg-background flex flex-col items-center justify-center"
    >
      {/* Logo */}
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
        className="mb-6"
      >
        <img
          src={logo}
          alt="Astute Computer"
          className="h-12 sm:h-16 w-auto dark:invert"
        />
      </motion.div>

      {/* Company Name */}
      <motion.h1
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.4 }}
        className="text-xl sm:text-2xl font-semibold text-foreground mb-6 sm:mb-8"
      >
        Astute Computer
      </motion.h1>

      {/* Progress Bar */}
      <div className="w-40 sm:w-48 h-px bg-border overflow-hidden">
        <motion.div
          className="h-full bg-primary"
          initial={{ width: 0 }}
          animate={{ width: `${Math.min(progress, 100)}%` }}
          transition={{ duration: 0.1 }}
        />
      </div>

      {/* Loading Text */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="mt-4 text-xs sm:text-sm text-muted-foreground"
      >
        Loading...
      </motion.p>
    </motion.div>
  );
}
