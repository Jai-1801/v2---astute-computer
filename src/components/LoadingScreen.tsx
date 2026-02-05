import { useEffect } from 'react';
import { motion } from 'framer-motion';
import logo from '@/assets/logo.svg';

interface LoadingScreenProps {
  onComplete: () => void;
}

export function LoadingScreen({ onComplete }: LoadingScreenProps) {
  useEffect(() => {
    const timer = setTimeout(onComplete, 2000);
    return () => clearTimeout(timer);
  }, [onComplete]);

  const size = 140;
  const strokeWidth = 2;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: 'easeInOut' }}
      className="fixed inset-0 z-[100] bg-background flex flex-col items-center justify-center"
    >
      {/* Circular Progress with Logo */}
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
        className="relative"
      >
        {/* Animated Spinning Ring */}
        <motion.svg
          width={size}
          height={size}
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
        >
          {/* Background circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="currentColor"
            strokeWidth={strokeWidth}
            className="text-border opacity-20"
          />
          {/* Animated arc */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="currentColor"
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            className="text-primary"
            style={{
              strokeDasharray: `${circumference * 0.25} ${circumference * 0.75}`,
            }}
          />
        </motion.svg>

        {/* Secondary spinning ring (opposite direction) */}
        <motion.svg
          width={size}
          height={size}
          className="absolute inset-0"
          animate={{ rotate: -360 }}
          transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
        >
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius - 8}
            fill="none"
            stroke="currentColor"
            strokeWidth={1}
            strokeLinecap="round"
            className="text-primary opacity-40"
            style={{
              strokeDasharray: `${(circumference - 50) * 0.15} ${(circumference - 50) * 0.85}`,
            }}
          />
        </motion.svg>
        
        {/* Pulsing glow behind logo */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          animate={{ opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <div className="w-16 h-16 rounded-full bg-primary/20 blur-xl" />
        </motion.div>

        {/* Logo in center */}
        <motion.div 
          className="absolute inset-0 flex items-center justify-center"
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <img
            src={logo}
            alt="Astute Computer"
            className="h-12 sm:h-14 w-auto dark:invert"
          />
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
