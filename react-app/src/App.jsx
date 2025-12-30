import { useState } from 'react';
import NetworkDiagram from './components/NetworkDiagram';
import './App.css';

function App() {
  // Sample network data for demonstration
  const sampleData = {
    viewBox: "0 0 960 560",
    devices: [
      {
        id: 'fw1',
        type: 'firewall',
        name: 'Main Firewall',
        x: 200,
        y: 280,
        model: 'FortiGate 60F',
        serial: 'FGT60F123456',
        ip: '192.168.1.1'
      },
      {
        id: 'sw1',
        type: 'switch',
        name: 'Core Switch',
        x: 480,
        y: 280,
        model: 'Cisco C9300',
        serial: 'FCW2145G0AB',
        ip: '192.168.1.2'
      },
      {
        id: 'host1',
        type: 'host',
        name: 'Hypervisor-01',
        x: 760,
        y: 180,
        model: 'Dell R740',
        serial: 'SVC123ABC',
        ip: '192.168.1.10'
      },
      {
        id: 'host2',
        type: 'host',
        name: 'Hypervisor-02',
        x: 760,
        y: 380,
        model: 'Dell R740',
        serial: 'SVC456DEF',
        ip: '192.168.1.11'
      },
      {
        id: 'ap1',
        type: 'ap',
        name: 'WiFi AP',
        x: 480,
        y: 450,
        model: 'UniFi AP',
        serial: 'UAP789XYZ',
        ip: '192.168.1.20'
      }
    ],
    connections: [
      {
        from: { x: 200, y: 280 },
        to: { x: 480, y: 280 },
        label: 'WAN'
      },
      {
        from: { x: 480, y: 280 },
        to: { x: 760, y: 180 },
        label: 'Port 1'
      },
      {
        from: { x: 480, y: 280 },
        to: { x: 760, y: 380 },
        label: 'Port 2'
      },
      {
        from: { x: 480, y: 280 },
        to: { x: 480, y: 450 },
        label: 'Port 3'
      }
    ]
  };

  const [showDiagram, setShowDiagram] = useState(true);

  return (
    <div className="app">
      <header className="app-header">
        <h1>🌐 Animated Network Diagram</h1>
        <p>Interactive network visualization with React + Framer Motion</p>
        <button
          className="toggle-button"
          onClick={() => setShowDiagram(!showDiagram)}
        >
          {showDiagram ? '🔄 Reload Animation' : '▶️ Show Diagram'}
        </button>
      </header>

      {showDiagram && (
        <div className="diagram-wrapper">
          <NetworkDiagram data={sampleData} />
        </div>
      )}

      <footer className="app-footer">
        <div className="features">
          <div className="feature">
            <strong>✨ Hover Effects:</strong> Hover over devices to see them animate
          </div>
          <div className="feature">
            <strong>💫 Data Flow:</strong> Watch particles flow through connections
          </div>
          <div className="feature">
            <strong>🎯 Interactive:</strong> Click devices to see console logs
          </div>
          <div className="feature">
            <strong>🎨 Customizable:</strong> Edit colors, animations, and more in the code!
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
