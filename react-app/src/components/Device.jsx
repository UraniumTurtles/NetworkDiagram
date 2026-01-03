import { motion, useAnimation } from 'framer-motion';
import { useState, useMemo, useEffect } from 'react';
import './Device.css';

const Device = ({ type, name, x, y, model, serial, ip, onClick }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isSpinning, setIsSpinning] = useState(false);

  // Animation controller for the celebration spin effect
  const spinControls = useAnimation();

  // Device dimensions based on type
  const dimensions = {
    firewall: { width: 200, height: 48, shape: 'rect' },
    switch: { width: 220, height: 48, shape: 'rect' },
    host: { width: 180, height: 60, shape: 'rect' },
    ap: { rx: 48, ry: 28, shape: 'ellipse' }
  };

  const dim = dimensions[type] || dimensions.firewall;

  // Memoize the random delay to prevent re-calculation on each render
  const animationDelay = useMemo(() => Math.random() * 0.3, []);

  // Animation variants for entrance animation
  const deviceVariants = {
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

  // Hover and tap variants for the inner group
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

  // Pulsing animation for the device shape
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

  // Initialize spin controls on mount
  useEffect(() => {
    spinControls.set({ rotate: 0, scale: 1 });
  }, [spinControls]);

  /**
   * Handles device click with a fun celebration animation
   * Device spins 360 degrees with a bouncy scale effect
   */
  const handleClick = async () => {
    // Prevent multiple spins from overlapping
    if (isSpinning) return;

    setIsSpinning(true);

    // Trigger the celebration spin animation with a little wind-up
    await spinControls.start({
      rotate: [0, -15, 375, 360],
      scale: [1, 1.1, 1.25, 0.85, 1.1, 1],
      transition: {
        duration: 0.8,
        ease: [0.34, 1.56, 0.64, 1],
        times: [0, 0.15, 0.7, 0.85, 0.95, 1]
      }
    });

    // Reset to clean state
    spinControls.set({ rotate: 0, scale: 1 });
    setIsSpinning(false);

    // Call the original onClick handler if provided
    if (onClick) {
      onClick();
    }
  };

  return (
    // Outer group: handles entrance animation
    <motion.g
      className="device-group-outer"
      initial="initial"
      animate="animate"
      variants={deviceVariants}
      style={{
        transformOrigin: `${x}px ${y}px`
      }}
    >
      {/* Middle group: handles the celebration spin */}
      <motion.g
        className={`device-group-spin ${isSpinning ? 'device-spinning' : ''}`}
        animate={spinControls}
        style={{
          transformOrigin: `${x}px ${y}px`
        }}
      >
        {/* Inner group: handles hover and tap interactions */}
        <motion.g
          className="device-group"
          initial="idle"
          animate="idle"
          whileHover={!isSpinning ? "hover" : undefined}
          whileTap={!isSpinning ? "tap" : undefined}
          variants={interactionVariants}
          onHoverStart={() => setIsHovered(true)}
          onHoverEnd={() => setIsHovered(false)}
          onClick={handleClick}
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
      </motion.g>
    </motion.g>
  );
};

export default Device;
