import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import './Layout.css';

const Layout = ({ children, breadcrumbs = [], title, subtitle, onBack }) => {
  const location = useLocation();

  return (
    <div className="app-layout">
      <header className="app-header">
        <div className="header-content">
          <div className="header-nav">
            {onBack && (
              <motion.button
                className="back-button"
                onClick={onBack}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Back
              </motion.button>
            )}
            {breadcrumbs.length > 0 && (
              <nav className="breadcrumbs" aria-label="Breadcrumb">
                {breadcrumbs.map((crumb, index) => (
                  <span key={index}>
                    {crumb.to ? (
                      <Link to={crumb.to}>{crumb.label}</Link>
                    ) : (
                      <span className="breadcrumb-current">{crumb.label}</span>
                    )}
                    {index < breadcrumbs.length - 1 && (
                      <span className="breadcrumb-separator">/</span>
                    )}
                  </span>
                ))}
              </nav>
            )}
          </div>
          <div className="header-titles">
            <motion.h1
              key={title}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              {title}
            </motion.h1>
            {subtitle && (
              <motion.p
                key={subtitle}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3, delay: 0.1 }}
                className="header-subtitle"
              >
                {subtitle}
              </motion.p>
            )}
          </div>
        </div>
      </header>

      <main className="app-main">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
};

export default Layout;
