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
    '62BDG': bakerDesignGroup
};

// Assemble the areas with their clients
const networkData = {
    areas: areaDefinitions.map(area => ({
        id: area.id,
        name: area.name,
        description: area.description,
        clients: area.clientIds.map(clientId => clientsMap[clientId])
    }))
};

export default networkData;
