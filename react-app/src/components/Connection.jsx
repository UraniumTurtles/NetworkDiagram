import { motion } from 'framer-motion';
import './Connection.css';

const Connection = ({ from, to, label, animated = true }) => {
  const { x: x1, y: y1 } = from;
  const { x: x2, y: y2 } = to;

  // Calculate midpoint for label
  const midX = (x1 + x2) / 2;
  const midY = (y1 + y2) / 2;

  // Calculate length for animation
  const length = Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);

  // Create path data for line (pathLength only works on path elements)
  const pathData = `M ${x1} ${y1} L ${x2} ${y2}`;

  return (
    <g className="connection-group">
      {/* Main connection line - using path for pathLength animation support */}
      <motion.path
        d={pathData}
        className="connection-line"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 0.6 }}
        transition={{
          pathLength: { duration: 1, ease: "easeInOut" },
          opacity: { duration: 0.5 }
        }}
      />

      {/* Animated data flow particles */}
      {animated && (
        <>
          <motion.circle
            r="3"
            className="connection-particle"
            initial={{ opacity: 0 }}
            animate={{
              opacity: [0, 1, 1, 0],
              cx: [x1, midX, x2],
              cy: [y1, midY, y2]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "linear",
              times: [0, 0.1, 0.9, 1]
            }}
          />
          <motion.circle
            r="3"
            className="connection-particle"
            initial={{ opacity: 0 }}
            animate={{
              opacity: [0, 1, 1, 0],
              cx: [x1, midX, x2],
              cy: [y1, midY, y2]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "linear",
              delay: 1,
              times: [0, 0.1, 0.9, 1]
            }}
          />
        </>
      )}

      {/* Port label */}
      {label && (
        <motion.text
          x={midX}
          y={midY - 10}
          className="connection-label"
          textAnchor="middle"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.7 }}
          transition={{ delay: 0.5 }}
        >
          {label}
        </motion.text>
      )}
    </g>
  );
};

export default Connection;
