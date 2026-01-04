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

  // Cloud shape as a single SVG path
  // Path creates a cloud outline using curves and arcs
  const cloudPath = `
    M ${x - 35} ${y + 5}
    Q ${x - 35} ${y - 10}, ${x - 25} ${y - 18}
    Q ${x - 15} ${y - 25}, ${x - 5} ${y - 30}
    Q ${x + 5} ${y - 38}, ${x + 15} ${y - 35}
    Q ${x + 25} ${y - 32}, ${x + 30} ${y - 25}
    Q ${x + 40} ${y - 18}, ${x + 42} ${y - 5}
    Q ${x + 44} ${y + 5}, ${x + 40} ${y + 12}
    L ${x + 35} ${y + 15}
    Q ${x + 20} ${y + 20}, ${x} ${y + 20}
    Q ${x - 20} ${y + 20}, ${x - 35} ${y + 15}
    Q ${x - 40} ${y + 12}, ${x - 35} ${y + 5}
    Z
  `;

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
          <motion.path
            d={cloudPath}
            className="vpn-cloud-glow"
            filter="url(#glow)"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            exit={{ opacity: 0 }}
          />
        )}

        {/* Cloud shape as a single path */}
        <motion.path
          d={cloudPath}
          className="vpn-cloud"
          variants={pulseVariants}
          animate={isHovered ? {} : "pulse"}
        />

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
