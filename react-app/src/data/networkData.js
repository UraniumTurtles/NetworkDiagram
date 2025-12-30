// Main network data file - imports and assembles data from modular client files
// This structure makes it easier to maintain individual client data

// Import area definitions
import areaDefinitions from './areas.js';

// Import all client data files
import baxterManufacturing from './clients/baxter-manufacturing.js';
import prairieHealth from './clients/prairie-health.js';
import xpressLogistics from './clients/xpress-logistics.js';
import milehighLogistics from './clients/milehigh-logistics.js';
import heartlandCreditUnion from './clients/heartland-credit-union.js';
import riverwalkHospitality from './clients/riverwalk-hospitality.js';
import gulfCoastShipping from './clients/gulf-coast-shipping.js';
import metroplexRetail from './clients/metroplex-retail.js';
import medicalProviderResources from './clients/medical-provider-resources.js';
import bakerDesignGroup from './clients/62BDG.js';
import ccredc from './clients/82CCRE.js';
import karnesCity from './clients/62KARN.js';

// Create a map of client ID to client data for easy lookup
const clientsMap = {
    'baxter-manufacturing': baxterManufacturing,
    'prairie-health': prairieHealth,
    'xpress-logistics': xpressLogistics,
    'milehigh-logistics': milehighLogistics,
    'heartland-credit-union': heartlandCreditUnion,
    'riverwalk-hospitality': riverwalkHospitality,
    'gulf-coast-shipping': gulfCoastShipping,
    'metroplex-retail': metroplexRetail,
    'medical-provider-resources': medicalProviderResources,
    '62BDG': bakerDesignGroup,
    '82CCRE': ccredc,
    '62KARN': karnesCity,
};

// Assemble the areas with their clients
const networkData = {
    areas: areaDefinitions.map(area => ({
        id: area.id,
        name: area.name,
        description: area.description,
        clients: area.clientIds.map(clientId => clientsMap[clientId]).filter(Boolean)
    }))
};

// Helper functions for data access
export const getArea = (areaId) => {
    return networkData.areas.find(area => area.id === areaId) || null;
};

export const getClient = (areaId, clientId) => {
    const area = getArea(areaId);
    if (!area) return null;
    return area.clients.find(client => client.id === clientId) || null;
};

export const getLocation = (areaId, clientId, locationId) => {
    const client = getClient(areaId, clientId);
    if (!client) return null;
    return client.locations.find(loc => loc.id === locationId) || null;
};

export default networkData;
