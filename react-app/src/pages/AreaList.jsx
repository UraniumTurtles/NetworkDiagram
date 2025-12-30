import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Layout from '../components/Layout';
import OptionCard from '../components/OptionCard';
import networkData from '../data/networkData';
import './Pages.css';

const AreaList = () => {
  const navigate = useNavigate();
  const areas = networkData.areas || [];

  return (
    <Layout
      title="Network Diagram Explorer"
      subtitle="Start by selecting an operational area to drill into clients and site-specific network diagrams."
    >
      <motion.div
        className="content-card"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <p className="content-intro">
          Each area contains clients with one or more locations. Choose an area to explore
          the underlying network topology and virtualization assets.
        </p>

        {areas.length === 0 ? (
          <p className="empty-message">
            No areas have been configured yet. Add areas to the data files to begin.
          </p>
        ) : (
          <div className="button-grid">
            {areas.map((area, index) => {
              const clientCount = area.clients?.length ?? 0;
              return (
                <OptionCard
                  key={area.id}
                  title={area.name}
                  subtitle={area.description}
                  meta={`${clientCount} client${clientCount === 1 ? '' : 's'}`}
                  onClick={() => navigate(`/${area.id}`)}
                  delay={index * 0.05}
                />
              );
            })}
          </div>
        )}
      </motion.div>
    </Layout>
  );
};

export default AreaList;
