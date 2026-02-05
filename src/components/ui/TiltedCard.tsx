'use client';
import { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'motion/react';
import './TiltedCard.css';

interface TiltedCardProps {
  imageSrc: string;
  altText?: string;
  captionText?: string;
  containerHeight?: string;
  containerWidth?: string;
  imageHeight?: string;
  imageWidth?: string;
  rotateAmplitude?: number;
  scaleOnHover?: number;
  showMobileWarning?: boolean;
  showTooltip?: boolean;
  displayOverlayContent?: boolean;
  overlayContent?: React.ReactNode;
  className?: string;
}

const TiltedCard: React.FC<TiltedCardProps> = ({
  imageSrc,
  altText = 'Tilted card image',
  captionText = '',
  containerHeight = '300px',
  containerWidth = '300px',
  imageHeight = '300px',
  imageWidth = '300px',
  rotateAmplitude = 12,
  scaleOnHover = 1.05,
  showMobileWarning = false,
  showTooltip = false,
  displayOverlayContent = false,
  overlayContent,
  className = '',
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const scale = useMotionValue(1);
  const tooltipX = useMotionValue(0);
  const tooltipY = useMotionValue(0);

  const springConfig = { stiffness: 300, damping: 30 };
  const rotateXSpring = useSpring(rotateX, springConfig);
  const rotateYSpring = useSpring(rotateY, springConfig);
  const scaleSpring = useSpring(scale, springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const mouseX = e.clientX - centerX;
    const mouseY = e.clientY - centerY;

    const percentX = mouseX / (rect.width / 2);
    const percentY = mouseY / (rect.height / 2);

    rotateX.set(-percentY * rotateAmplitude);
    rotateY.set(percentX * rotateAmplitude);

    tooltipX.set(e.clientX - rect.left);
    tooltipY.set(e.clientY - rect.top);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
    scale.set(scaleOnHover);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    rotateX.set(0);
    rotateY.set(0);
    scale.set(1);
  };

  return (
    <figure
      className={`tilted-card-figure ${className}`}
      style={{ height: containerHeight, width: containerWidth }}
    >
      {showMobileWarning && (
        <p className="tilted-card-mobile-alert">
          This effect is not available on mobile. Check it out on desktop!
        </p>
      )}

      <motion.div
        ref={cardRef}
        className="tilted-card-inner"
        style={{
          width: imageWidth,
          height: imageHeight,
          rotateX: rotateXSpring,
          rotateY: rotateYSpring,
          scale: scaleSpring,
        }}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <motion.img
          src={imageSrc}
          alt={altText}
          className="tilted-card-img"
          style={{
            width: imageWidth,
            height: imageHeight,
          }}
        />

        {displayOverlayContent && overlayContent && (
          <div
            className="tilted-card-overlay"
            style={{ width: imageWidth, height: imageHeight }}
          >
            {overlayContent}
          </div>
        )}

        {showTooltip && captionText && (
          <motion.figcaption
            className="tilted-card-caption"
            style={{
              x: tooltipX,
              y: tooltipY,
              opacity: isHovered ? 1 : 0,
            }}
          >
            {captionText}
          </motion.figcaption>
        )}
      </motion.div>
    </figure>
  );
};

export default TiltedCard;
