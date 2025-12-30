import { motion } from 'framer-motion';
import './OptionCard.css';

const OptionCard = ({ title, subtitle, meta, onClick, delay = 0 }) => {
  return (
    <motion.button
      className="option-card"
      onClick={onClick}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{
        duration: 0.3,
        delay,
        type: "spring",
        stiffness: 300,
        damping: 25
      }}
      whileHover={{
        scale: 1.02,
        boxShadow: "0 8px 25px rgba(0, 0, 0, 0.12)"
      }}
      whileTap={{ scale: 0.98 }}
    >
      <strong className="option-card-title">{title}</strong>
      {subtitle && <p className="option-card-subtitle">{subtitle}</p>}
      {meta && <span className="option-card-meta">{meta}</span>}
    </motion.button>
  );
};

export default OptionCard;
