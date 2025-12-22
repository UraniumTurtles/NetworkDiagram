# Network Diagram Explorer

The Network Diagram Explorer is a scalable, client- and site-aware viewer for MSPs to visualize network topologies. It provides an interactive way to navigate from geographic areas, to clients, and finally to individual locations where firewall, switching, wireless, and virtualization assets are displayed.

**New Features:**
- 🔗 **QR Code / Direct URL Routing** - Deep links to specific sites for instant access
- 🔍 **Search functionality** - Quickly find clients and locations
- 📱 **Mobile-optimized tooltips** - Clean device info on hover (desktop) or tap (mobile)
- 🛠️ **Admin helper tool** - Visual form to generate new client/location configurations
- 📁 **Modular data structure** - Individual files per client for easier maintenance
- 📈 **Scalable architecture** - Designed to handle 100+ clients efficiently

## Project Structure

```
NetworkDiagram
├── data/
│   ├── areas.js                    # Area definitions and client assignments
│   ├── networkData.js              # Main data file (imports and assembles all data)
│   └── clients/                    # Modular client data files
│       ├── baxter-manufacturing.js
│       ├── prairie-health.js
│       ├── xpress-logistics.js
│       ├── milehigh-logistics.js
│       ├── heartland-credit-union.js
│       ├── riverwalk-hospitality.js
│       ├── gulf-coast-shipping.js
│       ├── metroplex-retail.js
│       └── medical-provider-resources.js
├── src/
│   └── components/                 # Legacy component prototypes (not currently used)
├── styles/
│   └── main.css                    # Styling for navigation and diagrams
├── index.html                      # Application entry point
├── admin.html                      # Admin helper tool for generating configs
├── main.js                         # Single-page application logic
└── README.md
```

## Getting Started

### Local Development

1. Clone or download the repository
2. Start a local web server (required for ES modules):
   ```bash
   python3 -m http.server 8080
   ```
3. Open http://localhost:8080 in a modern browser
4. Use the on-screen navigation to explore areas, clients, and site diagrams

### GitHub Pages Deployment

The application is designed to run on GitHub Pages with no build step required:
1. Push changes to your repository
2. Enable GitHub Pages in repository settings
3. The static site will be automatically deployed

No build tooling is required—the application runs as a pure static site.

## Data Model

The application uses a **modular data structure** where each client's data is stored in a separate file for easier maintenance and scalability.

### File Organization

- **`data/areas.js`** - Defines geographic areas and which clients belong to each area
- **`data/clients/*.js`** - Individual client files containing locations and network diagrams
- **`data/networkData.js`** - Main file that imports and assembles all client data

### Data Structure

Each client file (`data/clients/client-name.js`) exports a client object:

```js
export default {
  id: 'baxter-manufacturing',
  name: 'Baxter Manufacturing',
  summary: 'Multi-site manufacturing company with centralized data center',
  locations: [
    {
      id: 'baxter-hq',
      name: 'Baxter Headquarters',
      address: '123 Industrial Ave, Wichita, KS',
      description: 'Primary production facility',
      diagram: {
        size: { width: 960, height: 580 },
        firewalls: [ { id, name, model, ip, position: { x, y } } ],
        switches: [ { id, name, model, ip, position: { x, y } } ],
        hosts: [
          {
            id, name, model, ip, position: { x, y },
            vms: [ { id, name, os, ip, role } ]  // Virtual machines
          }
        ],
        accessPoints: [ { id, name, model, ip, position: { x, y } } ],
        links: [
          { from: { type: 'firewalls', id: 'fw-id' }, to: { type: 'switches', id: 'sw-id' } }
        ]
      }
    }
  ]
};
```

## Adding New Content

### Using the Admin Helper Tool (Recommended)

The easiest way to add new clients and locations is to use the **Admin Helper Tool**:

1. Open `admin.html` in your browser
2. Fill out the form for a new client or location
3. Click "Generate Code"
4. Copy the generated code and paste it into the appropriate file
5. Follow the on-screen instructions for where to save it

The admin helper automatically generates properly formatted configuration code with device positioning, making it much faster than manual editing.

### Manual Method

#### Adding a New Client

1. **Create a new client file** in `data/clients/`:
   ```bash
   # Example: data/clients/acme-corp.js
   ```

2. **Define the client data** using the structure above:
   ```js
   export default {
     id: 'acme-corp',
     name: 'Acme Corporation',
     summary: 'Brief description of the client',
     locations: [ /* ... */ ]
   };
   ```

3. **Import the client** in `data/networkData.js`:
   ```js
   import acmeCorp from './clients/acme-corp.js';
   ```

4. **Add to the clientsMap** in `data/networkData.js`:
   ```js
   const clientsMap = {
     // ... existing clients
     'acme-corp': acmeCorp
   };
   ```

5. **Assign to an area** in `data/areas.js`:
   ```js
   {
     id: 'wichita',
     name: 'Wichita',
     description: '...',
     clientIds: ['baxter-manufacturing', 'prairie-health', 'acme-corp']  // Add here
   }
   ```

#### Adding a New Location

Simply add a new location object to the `locations` array in the client's file:

```js
locations: [
  // ... existing locations
  {
    id: 'new-location-id',
    name: 'Location Name',
    address: 'Physical address',
    description: 'Description',
    diagram: { /* ... */ }
  }
]
```

### Adding Devices and Links

- **Devices**: Each device needs `id`, `name`, `model`, `ip`, and `position: { x, y }`
- **Hosts**: Can include a `vms` array for virtual machines
- **Links**: Connect devices using `{ from: { type, id }, to: { type, id } }`
  - Valid types: `'firewalls'`, `'switches'`, `'hosts'`, `'accessPoints'`

## Features

### QR Code & Direct URL Routing
- **Deep linking** - Navigate directly to any area, client, or location diagram via URL
- **QR code friendly** - Generate QR codes for equipment racks that link directly to site diagrams
- **Shareable URLs** - Bookmark or share links to specific network diagrams
- **Smart fallback** - Invalid URLs gracefully redirect to the nearest valid view
- **Browser navigation** - Full support for browser back/forward buttons

**URL Pattern:**
```
# Direct to specific location diagram
https://your-domain.com/#/area-id/client-id/location-id

# Examples:
https://your-domain.com/#/wichita/baxter-manufacturing/baxter-hq
https://your-domain.com/#/wichita/baxter-manufacturing/baxter-warehouse

# Partial URLs also work:
https://your-domain.com/#/wichita                      # All clients in Wichita
https://your-domain.com/#/wichita/baxter-manufacturing  # All Baxter locations
```

See [QR_CODE_EXAMPLES.md](QR_CODE_EXAMPLES.md) for complete list of valid URLs for all clients and locations.

### Navigation & Search
- **Hierarchical navigation** - Areas → Clients → Locations → Network Diagrams
- **Search functionality** - Real-time search on client and location selection pages
- **Responsive breadcrumbs** - Easy navigation back to previous levels
- **Automatic back buttons** - Quick navigation to parent views

### Visualization
- **SVG-based diagrams** - Generated entirely from declarative data
- **Smart connection routing** - Automatic line routing to device edges
- **Device legends** - Color-coded legends for different device types
- **Virtual machine panels** - Detailed VM inventory for each hypervisor host
- **Interactive tooltips** - Popup tooltips on hover (desktop) or tap (mobile) showing device model and IP
- **Mobile-optimized** - Clean, uncluttered diagrams with information available on-demand

### Architecture
- **Modular data structure** - Individual files per client for easier maintenance
- **No build required** - Pure static site, runs directly in browser
- **ES6 modules** - Modern JavaScript with clean imports
- **Scalable design** - Handles 100+ clients efficiently
- **GitHub Pages ready** - Deploy directly without configuration

## Extending the Explorer

### Styling
- Adjust visual appearance in `styles/main.css`
- CSS variables for theming defined in `:root`
- Responsive design with media queries

### Data Model
- Add new device types by extending the data structures in client files
- Modify rendering logic in `main.js` for custom device rendering
- Add new metadata fields to devices as needed

### Functionality
- Add custom interactivity by extending event handlers in `main.js`
- Integrate with external APIs or data sources
- Add export/import functionality for diagrams

## Scalability

The application is optimized for MSP use with multiple clients:

- ✅ **100+ clients** - Modular file structure prevents performance issues
- ✅ **Search** - Quickly find clients and locations without scrolling
- ✅ **Maintainability** - Edit individual client files without touching others
- ✅ **Git workflow** - Smaller diffs, fewer merge conflicts
- ✅ **Team collaboration** - Multiple team members can work on different clients simultaneously

## Browser Support

The explorer targets evergreen browsers that support ES modules, template literals, and modern CSS. For legacy browser support, consider adding a build step that transpiles `main.js` and bundles assets.
