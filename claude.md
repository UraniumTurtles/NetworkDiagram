# Network Diagram Explorer - Claude Guide

## Project Overview

The Network Diagram Explorer is a pure static web application for MSPs (Managed Service Providers) to visualize network topologies across multiple clients and locations. It's designed to scale to 100+ clients efficiently with no build tooling required.

**Key Characteristics:**
- Pure static site - runs directly in browser with ES6 modules
- No npm dependencies or build process
- Deploys directly to GitHub Pages
- SVG-based network diagram rendering
- Mobile-optimized with interactive tooltips

## Architecture Principles

### 1. Static Site Design
- **No build step required** - All code runs directly in the browser
- Uses ES6 modules (`import`/`export`) - requires web server for local development
- Single Page Application (SPA) pattern in `main.js`
- GitHub Pages ready deployment

### 2. Modular Data Structure
- **One file per client** in `data/clients/`
- Prevents merge conflicts and enables team collaboration
- Each client file is self-contained and exports a default object
- Main assembly happens in `data/networkData.js`

### 3. Hierarchical Navigation
```
Geographic Areas → Clients → Locations → Network Diagrams
```

## File Structure

```
NetworkDiagram/
├── data/
│   ├── areas.js              # Area definitions & client assignments
│   ├── networkData.js        # Main data file (imports all clients)
│   └── clients/              # Individual client files
│       ├── baxter-manufacturing.js
│       ├── prairie-health.js
│       └── [client-name].js
├── styles/
│   └── main.css              # All styling
├── index.html                # Application entry point
├── admin.html                # Helper tool for generating configs
├── main.js                   # SPA logic and rendering
└── README.md                 # User-facing documentation
```

## Data Model

### Client File Structure (`data/clients/[name].js`)

```javascript
export default {
  id: 'client-slug',           // URL-safe identifier
  name: 'Client Display Name',
  summary: 'Brief description',
  locations: [
    {
      id: 'location-slug',     // URL-safe identifier
      name: 'Location Name',
      address: 'Physical address',
      description: 'Description',
      diagram: {
        size: { width: 960, height: 580 },
        firewalls: [...],
        switches: [...],
        hosts: [...],         // Can include VMs
        accessPoints: [...],
        links: [...]          // Connect devices
      }
    }
  ]
};
```

### Device Types

All devices share common properties:
- `id` - Unique identifier within the location
- `name` - Display name
- `model` - Device model/type
- `ip` - IP address (can be array for multiple IPs)
- `position` - `{ x, y }` coordinates for SVG rendering

**Device Categories:**
1. **Firewalls** - Edge security devices
2. **Switches** - Network switches
3. **Hosts** - Servers/hypervisors
   - Can include `vms` array: `[{ id, name, os, ip, role }]`
4. **Access Points** - Wireless APs

### Links

Links connect devices in the diagram:
```javascript
{
  from: { type: 'firewalls', id: 'fw-id' },
  to: { type: 'switches', id: 'sw-id' }
}
```

Valid `type` values: `'firewalls'`, `'switches'`, `'hosts'`, `'accessPoints'`

## Key Features

### Deep Linking / QR Codes
- **URL Pattern**: `#/area-id/client-id/location-id`
- Supports partial URLs (area only, area + client)
- Browser back/forward button support
- Perfect for QR codes on equipment racks

### Search Functionality
- Real-time search on client and location selection screens
- No backend required - pure client-side filtering

### Mobile Optimization
- Tooltips on hover (desktop) or tap (mobile)
- Clean diagrams with information on-demand
- Responsive breadcrumb navigation

## Working with the Codebase

### Adding a New Client

**Recommended**: Use `admin.html` in browser to generate code

**Manual Process**:
1. Create `data/clients/new-client.js`:
   ```javascript
   export default {
     id: 'new-client',
     name: 'New Client Name',
     summary: 'Description',
     locations: []
   };
   ```

2. Import in `data/networkData.js`:
   ```javascript
   import newClient from './clients/new-client.js';
   ```

3. Add to `clientsMap` in `data/networkData.js`:
   ```javascript
   const clientsMap = {
     // ... existing clients
     'new-client': newClient
   };
   ```

4. Assign to area in `data/areas.js`:
   ```javascript
   {
     id: 'area-id',
     name: 'Area Name',
     clientIds: ['existing-client', 'new-client']
   }
   ```

### Adding a Location

Add to the `locations` array in the client file:
```javascript
locations: [
  // ... existing locations
  {
    id: 'new-location',
    name: 'Location Name',
    address: 'Address',
    description: 'Description',
    diagram: { size: { width: 960, height: 580 }, /* devices */ }
  }
]
```

### Adding Devices

Use `admin.html` for automatic positioning, or manually add to the appropriate array:

```javascript
diagram: {
  switches: [
    {
      id: 'sw-01',
      name: 'Core Switch',
      model: 'Cisco C9300-48P',
      ip: '10.0.0.2',
      position: { x: 400, y: 300 }
    }
  ]
}
```

### Creating Links

Links connect devices visually in the diagram:
```javascript
links: [
  {
    from: { type: 'firewalls', id: 'fw-main' },
    to: { type: 'switches', id: 'sw-core' }
  }
]
```

## Development Workflow

### Local Development
```bash
# Start local server (required for ES6 modules)
python3 -m http.server 8080

# Open browser
open http://localhost:8080
```

### Testing Changes
1. Edit data files in `data/clients/`
2. Refresh browser to see changes
3. No build step required

### Deployment
1. Push to GitHub repository
2. Enable GitHub Pages in settings
3. Automatic deployment - no configuration needed

## Important Conventions

### ID Naming
- **Always use kebab-case** for IDs: `client-name`, `location-name`
- IDs must be URL-safe (no spaces, special characters)
- IDs must be unique within their scope:
  - Client IDs unique across all clients
  - Location IDs unique within a client
  - Device IDs unique within a location

### File Naming
- Client files: `data/clients/[client-id].js`
- Use same ID as in the client object
- Example: `baxter-manufacturing.js` → `id: 'baxter-manufacturing'`

### Positioning
- SVG origin (0,0) is top-left
- Default diagram size: 960x580
- Devices positioned with `{ x, y }` coordinates
- Use `admin.html` to visually position devices

### IP Addresses
- Can be single string: `ip: '10.0.0.1'`
- Can be array: `ip: ['10.0.0.1', '192.168.1.1']`
- VMs inherit host's IP context

## Common Patterns

### Multi-Site Client
```javascript
export default {
  id: 'multi-site-corp',
  name: 'Multi-Site Corp',
  summary: 'Company with multiple locations',
  locations: [
    { id: 'hq', name: 'Headquarters', /* ... */ },
    { id: 'branch-1', name: 'Branch Office 1', /* ... */ },
    { id: 'branch-2', name: 'Branch Office 2', /* ... */ }
  ]
};
```

### Host with Virtual Machines
```javascript
{
  id: 'esx-01',
  name: 'ESXi Host 01',
  model: 'Dell PowerEdge R740',
  ip: '10.0.0.10',
  position: { x: 500, y: 400 },
  vms: [
    { id: 'vm-dc', name: 'DC01', os: 'Windows Server 2022', ip: '10.0.0.20', role: 'Domain Controller' },
    { id: 'vm-fs', name: 'FS01', os: 'Windows Server 2022', ip: '10.0.0.21', role: 'File Server' }
  ]
}
```

### Cascading Switches
```javascript
links: [
  { from: { type: 'firewalls', id: 'fw-main' }, to: { type: 'switches', id: 'sw-core' } },
  { from: { type: 'switches', id: 'sw-core' }, to: { type: 'switches', id: 'sw-floor-1' } },
  { from: { type: 'switches', id: 'sw-core' }, to: { type: 'switches', id: 'sw-floor-2' } }
]
```

## Rendering Logic (`main.js`)

The `main.js` file handles:
- URL routing and hash-based navigation
- Rendering area lists, client lists, location lists
- SVG diagram generation from data
- Search functionality
- Tooltip display
- Breadcrumb navigation

**Key Functions:**
- `renderAreaList()` - Display all geographic areas
- `renderClientList(areaId)` - Show clients in an area
- `renderLocationList(areaId, clientId)` - Show client's locations
- `renderDiagram(areaId, clientId, locationId)` - Generate SVG diagram

## Admin Helper Tool

The `admin.html` provides a visual form to generate configuration code:

**Three Tabs:**
1. **New Client** - Generate complete client file structure
2. **New Location** - Generate location with multiple devices
3. **Add Device** - Generate single device configuration

**Benefits:**
- Automatic device positioning
- Prevents syntax errors
- Provides step-by-step integration instructions
- Faster than manual editing

## Best Practices

### When Adding Content
1. ✅ **Always use `admin.html`** for generating new configurations
2. ✅ **Keep client IDs consistent** with filenames
3. ✅ **Test locally** before pushing to production
4. ✅ **Use descriptive names** for devices and locations
5. ✅ **Document IP addressing** in device names if helpful

### When Modifying Code
1. ✅ **Preserve the static architecture** - no build tools
2. ✅ **Maintain ES6 module structure** - keep imports/exports clean
3. ✅ **Test on mobile** - responsive design is critical
4. ✅ **Validate data structure** - links must reference valid device IDs

### When Debugging
1. Check browser console for JavaScript errors
2. Verify device IDs match in links
3. Ensure client imports are added to `networkData.js`
4. Confirm area assignments in `areas.js`
5. Test URL routing with different hash paths

## Scalability Considerations

The application is designed to handle **100+ clients**:

- ✅ **Modular files** prevent single-file bottlenecks
- ✅ **Search functionality** reduces need for scrolling
- ✅ **Lazy loading pattern** - only renders current view
- ✅ **Git-friendly** - smaller diffs, parallel development
- ✅ **No build complexity** - scales without tooling overhead

## Security Notes

- Pure static site - no server-side code
- No user authentication/authorization
- No data persistence or database
- Client-side only - all data in JavaScript files
- Suitable for internal MSP use or public documentation

## Future Extension Ideas

- Export diagrams as PNG/SVG
- Import/export data in JSON format
- Integration with monitoring tools
- Real-time status indicators
- Device inventory management
- Dark mode theme

## Troubleshooting

**Common Issues:**

1. **ES Module Error**
   - Must use web server (not `file://`)
   - Use `python3 -m http.server 8080`

2. **Broken Links in Diagram**
   - Check device IDs match exactly
   - Verify device type is correct

3. **Client Not Showing**
   - Ensure imported in `networkData.js`
   - Check added to area in `areas.js`
   - Verify client ID matches filename

4. **Deep Link Not Working**
   - Verify IDs are correct in URL
   - Check spelling matches data exactly
   - URLs are case-sensitive

## Getting Help

- Check `README.md` for user-facing documentation
- Use `admin.html` for guided configuration
- Review existing client files for examples
- See `QR_CODE_EXAMPLES.md` for valid URL patterns
