/**
 * Transforms network diagram data from the original format to React component format
 */

/**
 * Convert device type to short name used in React components
 */
const getDeviceType = (category) => {
  const typeMap = {
    'firewalls': 'firewall',
    'switches': 'switch',
    'hosts': 'host',
    'accessPoints': 'ap'
  };
  return typeMap[category] || category;
};

/**
 * Find a device by type and id in the diagram data
 */
const findDevice = (diagram, type, id) => {
  const category = diagram[type];
  if (!category) return null;
  return category.find(device => device.id === id);
};

/**
 * Transform a single location's diagram data to React format
 */
export const transformDiagram = (diagram) => {
  if (!diagram) return null;

  const devices = [];
  const devicePositions = new Map(); // Track positions for connections

  // Process all device types
  ['firewalls', 'switches', 'hosts', 'accessPoints'].forEach(category => {
    const deviceList = diagram[category] || [];
    deviceList.forEach(device => {
      const transformedDevice = {
        id: device.id,
        type: getDeviceType(category),
        name: device.name,
        x: device.position.x,
        y: device.position.y,
        model: device.model,
        serial: device.serial,
        ip: device.ip,
        vms: device.vms // Include VMs if present (for hosts)
      };

      devices.push(transformedDevice);

      // Store position for connection drawing
      devicePositions.set(`${category}-${device.id}`, {
        x: device.position.x,
        y: device.position.y
      });
    });
  });

  // Process connections
  const connections = (diagram.links || []).map(link => {
    const fromKey = `${link.from.type}-${link.from.id}`;
    const toKey = `${link.to.type}-${link.to.id}`;

    const fromPos = devicePositions.get(fromKey);
    const toPos = devicePositions.get(toKey);

    if (!fromPos || !toPos) {
      console.warn(`Connection missing position data: ${fromKey} -> ${toKey}`);
      return null;
    }

    return {
      from: { x: fromPos.x, y: fromPos.y },
      to: { x: toPos.x, y: toPos.y },
      label: link.label || link.port || ''
    };
  }).filter(Boolean); // Remove null connections

  // Calculate viewBox based on diagram size
  const viewBox = diagram.size
    ? `0 0 ${diagram.size.width} ${diagram.size.height}`
    : "0 0 960 560";

  return {
    viewBox,
    devices,
    connections
  };
};

/**
 * Transform client data to get all available diagrams
 */
export const transformClientData = (clientData) => {
  if (!clientData || !clientData.locations) return [];

  return clientData.locations.map(location => ({
    id: location.id,
    name: location.name,
    address: location.address,
    description: location.description,
    diagram: transformDiagram(location.diagram)
  })).filter(location => location.diagram);
};

/**
 * Get a specific location's diagram from client data
 */
export const getLocationDiagram = (clientData, locationId) => {
  if (!clientData || !clientData.locations) return null;

  const location = clientData.locations.find(loc => loc.id === locationId);
  if (!location || !location.diagram) return null;

  return transformDiagram(location.diagram);
};
