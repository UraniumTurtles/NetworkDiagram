import { useState, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Layout from '../components/Layout';
import OptionCard from '../components/OptionCard';
import SearchInput from '../components/SearchInput';
import { getArea, getClient } from '../data/networkData';
import './Pages.css';

const LocationList = () => {
  const { areaId, clientId } = useParams();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  const area = getArea(areaId);
  const client = getClient(areaId, clientId);

  // Filter locations based on search
  const filteredLocations = useMemo(() => {
    if (!client?.locations) return [];
    if (!searchTerm.trim()) return client.locations;

    const term = searchTerm.toLowerCase();
    return client.locations.filter(location =>
      location.name.toLowerCase().includes(term) ||
      location.description?.toLowerCase().includes(term) ||
      location.address?.toLowerCase().includes(term)
    );
  }, [client, searchTerm]);

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

  if (!client) {
    return (
      <Layout title="Client Not Found">
        <div className="content-card">
          <p>The requested client could not be found.</p>
          <button onClick={() => navigate(`/${areaId}`)}>Return to Clients</button>
        </div>
      </Layout>
    );
  }

  const breadcrumbs = [
    { label: 'Areas', to: '/' },
    { label: area.name, to: `/${areaId}` },
    { label: client.name }
  ];

  return (
    <Layout
      title={client.name}
      subtitle={client.summary}
      breadcrumbs={breadcrumbs}
      onBack={() => navigate(`/${areaId}`)}
    >
      <motion.div
        className="content-card"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <p className="content-intro">
          Choose a location to open its detailed network diagram including connectivity,
          wireless coverage, and virtualization inventory.
        </p>

        {client.locations && client.locations.length > 0 && (
          <SearchInput
            value={searchTerm}
            onChange={setSearchTerm}
            placeholder="Search locations..."
          />
        )}

        {!client.locations || client.locations.length === 0 ? (
          <p className="empty-message">
            No locations are configured for this client yet.
          </p>
        ) : filteredLocations.length === 0 ? (
          <motion.p
            className="no-results"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            No locations match your search.
          </motion.p>
        ) : (
          <div className="button-grid">
            <AnimatePresence mode="popLayout">
              {filteredLocations.map((location, index) => (
                <OptionCard
                  key={location.id}
                  title={location.name}
                  subtitle={location.description}
                  meta={location.address || ''}
                  onClick={() => navigate(`/${areaId}/${clientId}/${location.id}`)}
                  delay={index * 0.03}
                />
              ))}
            </AnimatePresence>
          </div>
        )}
      </motion.div>
    </Layout>
  );
};

export default LocationList;
