import { useRef, useEffect, useState } from 'react';
import { motion, useInView, Variants } from 'framer-motion';

interface SplitTextProps {
  text: string;
  className?: string;
  delay?: number;
  duration?: number;
  splitType?: 'chars' | 'words';
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span';
}

export function SplitText({
  text,
  className = '',
  delay = 0.03,
  duration = 0.4,
  splitType = 'words',
  as: Tag = 'p',
}: SplitTextProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (isInView && !hasAnimated) {
      setHasAnimated(true);
    }
  }, [isInView, hasAnimated]);

  const items = splitType === 'chars' ? text.split('') : text.split(' ');

  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: delay,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { 
      opacity: 0, 
      y: 20,
    },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

  return (
    <motion.div
      ref={ref}
      variants={containerVariants}
      initial="hidden"
      animate={hasAnimated ? 'visible' : 'hidden'}
      className={className}
      aria-label={text}
    >
      <Tag className="inline">
        {items.map((item, index) => (
          <motion.span
            key={index}
            variants={itemVariants}
            className="inline-block"
            style={{ whiteSpace: splitType === 'words' ? 'pre' : 'normal' }}
          >
            {item}
            {splitType === 'words' && index < items.length - 1 ? ' ' : ''}
          </motion.span>
        ))}
      </Tag>
    </motion.div>
  );
}
