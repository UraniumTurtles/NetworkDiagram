import { motion } from 'framer-motion';
import { useState, useMemo } from 'react';
import './VPNCloud.css';

const VPNCloud = ({ name, x, y, targetLocation, onClick }) => {
  const [isHovered, setIsHovered] = useState(false);

  // Memoize the random delay to prevent re-calculation on each render
  const animationDelay = useMemo(() => Math.random() * 0.3, []);

  // Animation variants for entrance animation
  const cloudVariants = {
    initial: {
      scale: 0,
      opacity: 0,
    },
    animate: {
      scale: 1,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 260,
        damping: 20,
        delay: animationDelay
      }
    }
  };

  // Hover and tap variants
  const interactionVariants = {
    idle: {
      scale: 1
    },
    hover: {
      scale: 1.08,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10
      }
    },
    tap: {
      scale: 0.95
    }
  };

  // Pulsing animation for the cloud
  const pulseVariants = {
    pulse: {
      opacity: [0.7, 1, 0.7],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  // Cloud shape - created with circles to form a cloud
  const cloudWidth = 100;
  const cloudHeight = 60;

  return (
    <motion.g
      className="vpn-cloud-group-outer"
      initial="initial"
      animate="animate"
      variants={cloudVariants}
      style={{
        transformOrigin: `${x}px ${y}px`
      }}
    >
      <motion.g
        className="vpn-cloud-group"
        initial="idle"
        animate="idle"
        whileHover="hover"
        whileTap="tap"
        variants={interactionVariants}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        onClick={onClick}
        style={{
          cursor: 'pointer',
          transformOrigin: `${x}px ${y}px`
        }}
      >
        {/* Glow effect when hovered */}
        {isHovered && (
          <motion.g
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            exit={{ opacity: 0 }}
          >
            <circle cx={x - 25} cy={y} r="22" className="vpn-cloud-glow" filter="url(#glow)" />
            <circle cx={x + 25} cy={y} r="22" className="vpn-cloud-glow" filter="url(#glow)" />
            <circle cx={x} cy={y - 15} r="27" className="vpn-cloud-glow" filter="url(#glow)" />
            <circle cx={x} cy={y + 10} r="22" className="vpn-cloud-glow" filter="url(#glow)" />
          </motion.g>
        )}

        {/* Cloud shape made of overlapping circles */}
        <motion.g variants={pulseVariants} animate={isHovered ? {} : "pulse"}>
          {/* Left circle */}
          <circle cx={x - 25} cy={y} r="20" className="vpn-cloud" />
          {/* Right circle */}
          <circle cx={x + 25} cy={y} r="20" className="vpn-cloud" />
          {/* Top circle */}
          <circle cx={x} cy={y - 15} r="25" className="vpn-cloud" />
          {/* Bottom-center circle */}
          <circle cx={x} cy={y + 10} r="20" className="vpn-cloud" />
        </motion.g>

        {/* VPN label */}
        <motion.text
          x={x}
          y={y + 35}
          className="vpn-cloud-label"
          textAnchor="middle"
          dominantBaseline="middle"
          animate={{
            scale: isHovered ? 1.1 : 1
          }}
        >
          {name}
        </motion.text>

        {/* Target location info (shown on hover) */}
        {isHovered && targetLocation && (
          <motion.g
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
          >
            <text
              x={x}
              y={y + 50}
              className="vpn-cloud-meta"
              textAnchor="middle"
            >
              VPN to: {targetLocation}
            </text>
          </motion.g>
        )}
      </motion.g>
    </motion.g>
  );
};

export default VPNCloud;
