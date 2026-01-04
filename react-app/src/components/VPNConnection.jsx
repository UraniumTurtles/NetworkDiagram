import { motion } from 'framer-motion';
import './VPNConnection.css';

const VPNConnection = ({ from, to, label, animated = true }) => {
  const { x: x1, y: y1 } = from;
  const { x: x2, y: y2 } = to;

  // Calculate midpoint for label
  const midX = (x1 + x2) / 2;
  const midY = (y1 + y2) / 2;

  // Create path data for line
  const pathData = `M ${x1} ${y1} L ${x2} ${y2}`;

  return (
    <g className="vpn-connection-group">
      {/* Outer dotted line (top) */}
      <motion.path
        d={pathData}
        className="vpn-connection-line-dotted vpn-connection-line-top"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 0.5 }}
        transition={{
          pathLength: { duration: 1.2, ease: "easeInOut" },
          opacity: { duration: 0.5 }
        }}
      />

      {/* Middle solid line */}
      <motion.path
        d={pathData}
        className="vpn-connection-line-solid"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 0.7 }}
        transition={{
          pathLength: { duration: 1.2, ease: "easeInOut", delay: 0.1 },
          opacity: { duration: 0.5, delay: 0.1 }
        }}
      />

      {/* Outer dotted line (bottom) */}
      <motion.path
        d={pathData}
        className="vpn-connection-line-dotted vpn-connection-line-bottom"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 0.5 }}
        transition={{
          pathLength: { duration: 1.2, ease: "easeInOut", delay: 0.2 },
          opacity: { duration: 0.5, delay: 0.2 }
        }}
      />

      {/* Animated data flow particles - encrypted data */}
      {animated && (
        <>
          <motion.circle
            r="4"
            className="vpn-connection-particle"
            initial={{ opacity: 0 }}
            animate={{
              opacity: [0, 1, 1, 0],
              cx: [x1, midX, x2],
              cy: [y1, midY, y2]
            }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              ease: "linear",
              times: [0, 0.1, 0.9, 1]
            }}
          />
          <motion.circle
            r="4"
            className="vpn-connection-particle"
            initial={{ opacity: 0 }}
            animate={{
              opacity: [0, 1, 1, 0],
              cx: [x1, midX, x2],
              cy: [y1, midY, y2]
            }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              ease: "linear",
              delay: 1.25,
              times: [0, 0.1, 0.9, 1]
            }}
          />
        </>
      )}

      {/* Connection label */}
      {label && (
        <motion.text
          x={midX}
          y={midY - 10}
          className="vpn-connection-label"
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

export default VPNConnection;
