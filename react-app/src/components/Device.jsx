import { motion } from 'framer-motion';
import { useState } from 'react';
import './Device.css';

const Device = ({ type, name, x, y, model, serial, ip, onClick }) => {
  const [isHovered, setIsHovered] = useState(false);

  // Device dimensions based on type
  const dimensions = {
    firewall: { width: 200, height: 48, shape: 'rect' },
    switch: { width: 220, height: 48, shape: 'rect' },
    host: { width: 180, height: 60, shape: 'rect' },
    ap: { rx: 48, ry: 28, shape: 'ellipse' }
  };

  const dim = dimensions[type] || dimensions.firewall;

  // Animation variants
  const deviceVariants = {
    initial: {
      scale: 0,
      opacity: 0,
      rotate: -180
    },
    animate: {
      scale: 1,
      opacity: 1,
      rotate: 0,
      transition: {
        type: "spring",
        stiffness: 260,
        damping: 20,
        delay: Math.random() * 0.3 // Stagger effect
      }
    },
    hover: {
      scale: 1.1,
      y: -5,
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

  // Pulsing animation for the device
  const pulseVariants = {
    pulse: {
      scale: [1, 1.05, 1],
      opacity: [0.7, 1, 0.7],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  return (
    <motion.g
      className="device-group"
      initial="initial"
      animate="animate"
      whileHover="hover"
      whileTap="tap"
      variants={deviceVariants}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      onClick={onClick}
      style={{ cursor: 'pointer' }}
    >
      {/* Glow effect when hovered */}
      {isHovered && (
        <motion.g
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.6 }}
          exit={{ opacity: 0 }}
        >
          {dim.shape === 'rect' ? (
            <rect
              x={x - dim.width / 2 - 5}
              y={y - dim.height / 2 - 5}
              width={dim.width + 10}
              height={dim.height + 10}
              rx={8}
              className={`device-glow device-glow-${type}`}
              filter="url(#glow)"
            />
          ) : (
            <ellipse
              cx={x}
              cy={y}
              rx={dim.rx + 5}
              ry={dim.ry + 5}
              className={`device-glow device-glow-${type}`}
              filter="url(#glow)"
            />
          )}
        </motion.g>
      )}

      {/* Main device shape */}
      {dim.shape === 'rect' ? (
        <motion.rect
          x={x - dim.width / 2}
          y={y - dim.height / 2}
          width={dim.width}
          height={dim.height}
          rx={6}
          className={`device device-${type}`}
          variants={pulseVariants}
          animate={isHovered ? {} : "pulse"}
        />
      ) : (
        <motion.ellipse
          cx={x}
          cy={y}
          rx={dim.rx}
          ry={dim.ry}
          className={`device device-${type}`}
          variants={pulseVariants}
          animate={isHovered ? {} : "pulse"}
        />
      )}

      {/* Device label */}
      <motion.text
        x={x}
        y={y}
        className="device-label"
        textAnchor="middle"
        dominantBaseline="middle"
        animate={{
          scale: isHovered ? 1.1 : 1
        }}
      >
        {name}
      </motion.text>

      {/* Device metadata (shown on hover) */}
      {isHovered && (
        <motion.g
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
        >
          <text
            x={x}
            y={y + dim.height / 2 + 20}
            className="device-meta"
            textAnchor="middle"
          >
            {model && `${model} | `}
            {serial && `S/N: ${serial} | `}
            {ip && `IP: ${ip}`}
          </text>
        </motion.g>
      )}
    </motion.g>
  );
};

export default Device;
