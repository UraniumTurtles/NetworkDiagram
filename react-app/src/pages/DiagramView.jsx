import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Layout from '../components/Layout';
import NetworkDiagram from '../components/NetworkDiagram';
import VmPanel from '../components/VmPanel';
import { getArea, getClient, getLocation } from '../data/networkData';
import { transformDiagram } from '../utils/dataTransformer';
import './Pages.css';
import './DiagramView.css';

const legendConfig = [
  { label: 'Firewall', color: 'rgba(255, 166, 58, 0.45)' },
  { label: 'Switch', color: 'rgba(47, 111, 237, 0.35)' },
  { label: 'Hypervisor Host', color: 'rgba(0, 172, 193, 0.35)' },
  { label: 'Access Point', color: 'rgba(46, 204, 113, 0.35)' }
];

const DiagramView = () => {
  const { areaId, clientId, locationId } = useParams();
  const navigate = useNavigate();

  const area = getArea(areaId);
  const client = getClient(areaId, clientId);
  const location = getLocation(areaId, clientId, locationId);

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

  if (!location) {
    return (
      <Layout title="Location Not Found">
        <div className="content-card">
          <p>The requested location could not be found.</p>
          <button onClick={() => navigate(`/${areaId}/${clientId}`)}>Return to Locations</button>
        </div>
      </Layout>
    );
  }

  const breadcrumbs = [
    { label: 'Areas', to: '/' },
    { label: area.name, to: `/${areaId}` },
    { label: client.name, to: `/${areaId}/${clientId}` },
    { label: location.name }
  ];

  // Transform the diagram data for the NetworkDiagram component
  const diagramData = transformDiagram(location.diagram);

  return (
    <Layout
      title={location.name}
      subtitle={location.description}
      breadcrumbs={breadcrumbs}
      onBack={() => navigate(`/${areaId}/${clientId}`)}
    >
      {/* Location Summary Card */}
      <motion.div
        className="content-card location-summary"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <h2>{client.name} - {location.name}</h2>
        {location.address && (
          <p><strong>Address:</strong> {location.address}</p>
        )}
        {location.description && (
          <p>{location.description}</p>
        )}
      </motion.div>

      {/* Diagram Layout */}
      <div className="diagram-layout">
        <motion.div
          className="content-card diagram-card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          <div className="diagram-header">
            <h2>Network Topology</h2>
            <p>Visual representation of firewalls, switching, wireless, and hypervisor infrastructure.</p>
          </div>

          {diagramData ? (
            <NetworkDiagram data={diagramData} />
          ) : (
            <p className="empty-message">No diagram data available for this location.</p>
          )}

          {/* Legend */}
          <div className="diagram-legend">
            {legendConfig.map((item, index) => (
              <motion.span
                key={item.label}
                className="legend-item"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 + index * 0.1 }}
              >
                <span
                  className="legend-swatch"
                  style={{ background: item.color }}
                />
                {item.label}
              </motion.span>
            ))}
          </div>
        </motion.div>

        {/* VM Panel */}
        <VmPanel hosts={location.diagram?.hosts || []} />
      </div>
    </Layout>
  );
};

export default DiagramView;
