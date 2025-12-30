import { useState, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Layout from '../components/Layout';
import OptionCard from '../components/OptionCard';
import SearchInput from '../components/SearchInput';
import { getArea } from '../data/networkData';
import './Pages.css';

const ClientList = () => {
  const { areaId } = useParams();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  const area = getArea(areaId);

  // Filter clients based on search
  const filteredClients = useMemo(() => {
    if (!area?.clients) return [];
    if (!searchTerm.trim()) return area.clients;

    const term = searchTerm.toLowerCase();
    return area.clients.filter(client =>
      client.name.toLowerCase().includes(term) ||
      client.summary?.toLowerCase().includes(term)
    );
  }, [area, searchTerm]);

  if (!area) {
    return (
      <Layout title="Area Not Found">
        <div className="content-card">
          <p>The requested area could not be found.</p>
          <button onClick={() => navigate('/')}>Return to Areas</button>
        </div>
      </Layout>
    );
  }

  const breadcrumbs = [
    { label: 'Areas', to: '/' },
    { label: area.name }
  ];

  return (
    <Layout
      title={area.name}
      subtitle={area.description}
      breadcrumbs={breadcrumbs}
      onBack={() => navigate('/')}
    >
      <motion.div
        className="content-card"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <p className="content-intro">
          Select a client to review their locations and visualize the complete network footprint.
        </p>

        {area.clients && area.clients.length > 0 && (
          <SearchInput
            value={searchTerm}
            onChange={setSearchTerm}
            placeholder="Search clients..."
          />
        )}

        {!area.clients || area.clients.length === 0 ? (
          <p className="empty-message">
            No clients have been configured for this area yet.
          </p>
        ) : filteredClients.length === 0 ? (
          <motion.p
            className="no-results"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            No clients match your search.
          </motion.p>
        ) : (
          <div className="button-grid">
            <AnimatePresence mode="popLayout">
              {filteredClients.map((client, index) => {
                const locationCount = client.locations?.length ?? 0;
                return (
                  <OptionCard
                    key={client.id}
                    title={client.name}
                    subtitle={client.summary}
                    meta={`${locationCount} location${locationCount === 1 ? '' : 's'}`}
                    onClick={() => navigate(`/${areaId}/${client.id}`)}
                    delay={index * 0.03}
                  />
                );
              })}
            </AnimatePresence>
          </div>
        )}
      </motion.div>
    </Layout>
  );
};

export default ClientList;
