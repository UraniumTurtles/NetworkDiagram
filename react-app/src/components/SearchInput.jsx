import { motion } from 'framer-motion';
import './SearchInput.css';

const SearchInput = ({ value, onChange, placeholder = "Search..." }) => {
  return (
    <motion.div
      className="search-container"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <input
        type="search"
        className="search-input"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
      />
    </motion.div>
  );
};

export default SearchInput;
