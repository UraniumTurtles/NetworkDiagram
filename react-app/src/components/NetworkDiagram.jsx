import { motion } from 'framer-motion';
import Device from './Device';
import Connection from './Connection';
import VPNCloud from './VPNCloud';
import VPNConnection from './VPNConnection';
import './NetworkDiagram.css';

const NetworkDiagram = ({ data }) => {
  const { devices = [], connections = [], vpnClouds = [], vpnConnections = [], viewBox = "0 0 960 560" } = data;

  return (
    <div className="network-diagram-container">
      <svg className="network-svg" viewBox={viewBox}>
        {/* SVG Filters */}
        <defs>
          <filter id="glow">
            <feGaussianBlur stdDeviation="4" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Background */}
        <motion.rect
          width="100%"
          height="100%"
          fill="#fafafa"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        />

        {/* Connections layer */}
        <g className="connections">
          {connections.map((conn, index) => (
            <Connection
              key={`conn-${index}`}
              from={conn.from}
              to={conn.to}
              label={conn.label}
              animated={true}
            />
          ))}
        </g>

        {/* VPN Connections layer */}
        <g className="vpn-connections">
          {vpnConnections.map((conn, index) => (
            <VPNConnection
              key={`vpn-conn-${index}`}
              from={conn.from}
              to={conn.to}
              label={conn.label}
              animated={true}
            />
          ))}
        </g>

        {/* Devices layer */}
        <g className="devices">
          {devices.map((device, index) => (
            <Device
              key={device.id || `device-${index}`}
              type={device.type}
              name={device.name}
              x={device.x}
              y={device.y}
              model={device.model}
              serial={device.serial}
              ip={device.ip}
              onClick={() => console.log('Clicked:', device.name)}
            />
          ))}
        </g>

        {/* VPN Clouds layer */}
        <g className="vpn-clouds">
          {vpnClouds.map((cloud, index) => (
            <VPNCloud
              key={cloud.id || `vpn-cloud-${index}`}
              name={cloud.name}
              x={cloud.x}
              y={cloud.y}
              targetLocation={cloud.targetLocation}
              onClick={() => console.log('Clicked VPN:', cloud.name)}
            />
          ))}
        </g>
      </svg>
    </div>
  );
};

export default NetworkDiagram;
