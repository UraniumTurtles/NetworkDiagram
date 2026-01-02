# Network Diagram Explorer - Claude Guide

## Project Overview

The Network Diagram Explorer is a React-based web application for MSPs (Managed Service Providers) to visualize network topologies across multiple clients and locations. It's designed to scale to 100+ clients efficiently with modern React architecture and Vite build tooling.

**Key Characteristics:**
- React 18 with Vite build tooling
- Component-based architecture for maintainability
- HashRouter for GitHub Pages compatibility
- Framer Motion animations for smooth UX
- SVG-based network diagram rendering
- Mobile-optimized with interactive tooltips

## Architecture Principles

### 1. React + Vite Architecture
- **Modern build tooling** - Vite for fast development and optimized production builds
- Component-based design with React 18
- ES6 modules with React hooks (useState, useEffect, useParams)
- Single Page Application (SPA) with React Router HashRouter
- GitHub Pages ready deployment with base path configuration

### 2. Modular Data Structure
- **One file per client** in `react-app/src/data/clients/`
- Prevents merge conflicts and enables team collaboration
- Each client file is self-contained and exports a default object
- Main assembly happens in `react-app/src/data/networkData.js`

### 3. Hierarchical Navigation
```
Geographic Areas → Clients → Locations → Network Diagrams
```

## File Structure

```
NetworkDiagram/
├── react-app/                    # Main React application
│   ├── src/
│   │   ├── main.jsx              # React app entry point
│   │   ├── App.jsx               # Router configuration & routes
│   │   ├── pages/                # Page components (one per navigation level)
│   │   │   ├── AreaList.jsx      # Geographic areas selection
│   │   │   ├── ClientList.jsx    # Clients within an area
│   │   │   ├── LocationList.jsx  # Locations within a client
│   │   │   └── DiagramView.jsx   # Network diagram display
│   │   ├── components/           # Reusable components
│   │   │   ├── Layout.jsx        # Page layout with breadcrumbs
│   │   │   ├── NetworkDiagram.jsx # SVG diagram renderer
│   │   │   ├── Device.jsx        # Individual device rendering
│   │   │   ├── Connection.jsx    # Link/connection rendering
│   │   │   ├── OptionCard.jsx    # Card component for selections
│   │   │   ├── SearchInput.jsx   # Search functionality
│   │   │   └── VmPanel.jsx       # VM details panel
│   │   ├── data/
│   │   │   ├── areas.js          # Area definitions & client assignments
│   │   │   ├── networkData.js    # Main data file (imports all clients)
│   │   │   └── clients/          # Individual client files
│   │   │       ├── baxter-manufacturing.js
│   │   │       ├── prairie-health.js
│   │   │       └── [client-name].js
│   │   ├── utils/
│   │   │   └── transformDiagram.js # Diagram data transformation
│   │   └── index.css             # Global styles
│   ├── index.html                # HTML entry point
│   ├── vite.config.js            # Vite configuration (base path for GH Pages)
│   ├── package.json              # Dependencies and scripts
│   └── package-lock.json
├── admin.html                    # Helper tool for generating configs
└── README.md                     # User-facing documentation
```

## Data Model

### Client File Structure (`react-app/src/data/clients/[name].js`)

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

## Component Architecture

### Page Components

**AreaList.jsx** - Geographic area selection
- Displays all areas from `areas.js`
- Search functionality for filtering areas
- Links to ClientList for selected area
- Animated card layout with Framer Motion

**ClientList.jsx** - Client selection within area
- Gets areaId from React Router params
- Filters clients assigned to the area
- Search functionality for filtering clients
- Breadcrumb navigation back to areas
- Links to LocationList for selected client

**LocationList.jsx** - Location selection within client
- Gets areaId and clientId from React Router params
- Displays all locations for the client
- Search functionality for filtering locations
- Breadcrumb navigation to area and client
- Links to DiagramView for selected location

**DiagramView.jsx** - Network diagram display
- Gets areaId, clientId, locationId from React Router params
- Renders NetworkDiagram component with location data
- Displays location metadata (address, description)
- Breadcrumb navigation through entire hierarchy
- Handles deep linking via URL hash

### Reusable Components

**Layout.jsx** - Page layout wrapper
- Breadcrumb navigation component
- Consistent header and spacing
- Wraps all page components

**NetworkDiagram.jsx** - SVG diagram renderer
- Takes diagram data as props
- Renders Device and Connection components
- Handles SVG viewBox and scaling
- Manages tooltip state
- Uses Framer Motion for entrance animations

**Device.jsx** - Individual device rendering
- Renders device icon, name, model, IP
- Handles click events for VM panel
- Tooltip display on hover
- Different rendering for different device types

**Connection.jsx** - Link between devices
- Calculates SVG path between device positions
- Animated stroke drawing effect
- Properly handles device positioning

**OptionCard.jsx** - Clickable card component
- Used in area, client, and location lists
- Displays title and subtitle
- Hover effects and animations
- Navigate on click

**SearchInput.jsx** - Search input field
- Debounced search input
- Updates parent component state
- Consistent styling across pages

**VmPanel.jsx** - Virtual machine details panel
- Displays VM information for a host
- Slide-in panel animation
- Close button functionality
- Lists all VMs with details (name, OS, IP, role)

## React Router Configuration

**HashRouter** - Used for GitHub Pages compatibility
- Routes defined in `App.jsx`
- Base path configured in `vite.config.js`
- Deep linking support: `#/area-id/client-id/location-id`

**Routes:**
```javascript
<Route path="/" element={<AreaList />} />
<Route path="/:areaId" element={<ClientList />} />
<Route path="/:areaId/:clientId" element={<LocationList />} />
<Route path="/:areaId/:clientId/:locationId" element={<DiagramView />} />
```

## Key Features

### Deep Linking / QR Codes
- **URL Pattern**: `#/area-id/client-id/location-id`
- Supports partial URLs (area only, area + client)
- Browser back/forward button support
- Perfect for QR codes on equipment racks
- React Router handles URL parsing and navigation

### Search Functionality
- Real-time search on client and location selection screens
- No backend required - pure client-side filtering
- Implemented in AreaList, ClientList, and LocationList components

### Mobile Optimization
- Tooltips on hover (desktop) or tap (mobile)
- Clean diagrams with information on-demand
- Responsive breadcrumb navigation
- Touch-friendly card interactions

### Animations
- Framer Motion for page transitions
- Staggered entrance animations for cards and lists
- Smooth diagram element rendering
- Connection stroke drawing effects

## Working with the Codebase

### Adding a New Client

**Recommended**: Use `admin.html` in browser to generate code

**Manual Process**:
1. Create `react-app/src/data/clients/new-client.js`:
   ```javascript
   export default {
     id: 'new-client',
     name: 'New Client Name',
     summary: 'Description',
     locations: []
   };
   ```

2. Import in `react-app/src/data/networkData.js`:
   ```javascript
   import newClient from './clients/new-client.js';
   ```

3. Add to `clientsMap` in `react-app/src/data/networkData.js`:
   ```javascript
   const clientsMap = {
     // ... existing clients
     'new-client': newClient
   };
   ```

4. Assign to area in `react-app/src/data/areas.js`:
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
# Navigate to React app directory
cd react-app

# Install dependencies (first time only)
npm install

# Start development server with hot reload
npm run dev

# Open browser to displayed URL (typically http://localhost:5173)
```

### Testing Changes
1. Edit data files in `react-app/src/data/clients/`
2. Edit components in `react-app/src/components/` or `react-app/src/pages/`
3. Hot reload automatically updates browser
4. Test navigation through all levels
5. Verify deep links work correctly

### Building for Production
```bash
cd react-app
npm run build
```

This creates optimized static files in `react-app/dist/` directory.

### Deployment to GitHub Pages

The project uses GitHub Actions for automatic deployment:

1. Push changes to main branch
2. GitHub Actions workflow runs automatically
3. Vite builds the project
4. Built files are deployed to gh-pages branch
5. Site updates at your GitHub Pages URL

**Important Configuration:**
- `vite.config.js` sets `base: '/NetworkDiagram/'` for GitHub Pages path
- `index.html` uses relative paths
- HashRouter ensures client-side routing works on GitHub Pages

## Important Conventions

### ID Naming
- **Always use kebab-case** for IDs: `client-name`, `location-name`
- IDs must be URL-safe (no spaces, special characters)
- IDs must be unique within their scope:
  - Client IDs unique across all clients
  - Location IDs unique within a client
  - Device IDs unique within a location

### File Naming
- Client files: `react-app/src/data/clients/[client-id].js`
- Use same ID as in the client object
- Example: `baxter-manufacturing.js` → `id: 'baxter-manufacturing'`

### Component Naming
- PascalCase for component files: `NetworkDiagram.jsx`, `OptionCard.jsx`
- Match filename to component name
- Pages in `pages/` directory, reusable components in `components/`

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

## React Component Patterns

### Using React Router Params
```javascript
import { useParams } from 'react-router-dom';

function DiagramView() {
  const { areaId, clientId, locationId } = useParams();
  // Use params to fetch data from networkData
}
```

### State Management
```javascript
import { useState } from 'react';

function ClientList() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedVmHost, setSelectedVmHost] = useState(null);
  // Component-local state for UI
}
```

### Conditional Rendering
```javascript
{selectedVmHost && (
  <VmPanel
    host={selectedVmHost}
    onClose={() => setSelectedVmHost(null)}
  />
)}
```

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
3. ✅ **Test locally with `npm run dev`** before pushing to production
4. ✅ **Use descriptive names** for devices and locations
5. ✅ **Document IP addressing** in device names if helpful

### When Modifying Components
1. ✅ **Follow React best practices** - functional components with hooks
2. ✅ **Keep components focused** - single responsibility principle
3. ✅ **Use PropTypes or TypeScript** for type safety (if adding)
4. ✅ **Test on mobile** - responsive design is critical
5. ✅ **Validate data structure** - links must reference valid device IDs

### When Debugging
1. Check browser console for JavaScript errors
2. Verify device IDs match in links
3. Ensure client imports are added to `networkData.js`
4. Confirm area assignments in `areas.js`
5. Test URL routing with different hash paths
6. Check React DevTools for component state
7. Verify npm dependencies are installed (`npm install`)

## Scalability Considerations

The application is designed to handle **100+ clients**:

- ✅ **Modular files** prevent single-file bottlenecks
- ✅ **Search functionality** reduces need for scrolling
- ✅ **Component-based rendering** - only renders current view
- ✅ **Git-friendly** - smaller diffs, parallel development
- ✅ **Code splitting potential** - React lazy loading can be added
- ✅ **Vite optimizations** - fast builds and optimal bundle sizes

## Security Notes

- Pure static site - no server-side code
- No user authentication/authorization
- No data persistence or database
- Client-side only - all data in JavaScript files
- Suitable for internal MSP use or public documentation
- GitHub Pages hosting with HTTPS

## Performance Optimization

### Current Optimizations
- Vite's fast build process with tree-shaking
- Framer Motion animations use GPU acceleration
- SVG rendering is efficient for network diagrams
- Lazy component rendering (only current page)

### Future Optimization Ideas
- React.lazy() for code splitting by route
- Memoization of expensive diagram calculations
- Virtual scrolling for very large client lists
- Service worker for offline capability

## Future Extension Ideas

- Export diagrams as PNG/SVG
- Import/export data in JSON format
- Integration with monitoring tools
- Real-time status indicators
- Device inventory management
- Dark mode theme
- TypeScript migration for type safety
- Automated testing with Jest/Vitest

## Migration Notes

### From Vanilla JavaScript to React

The project was migrated from vanilla JavaScript to React 18:

**Before:**
- Single `main.js` file with all logic
- Direct DOM manipulation
- Manual event handling
- No build process

**After:**
- Component-based architecture
- React Router for navigation
- Declarative UI updates
- Vite build process with hot reload
- Modern ES6+ features

**Data Structure**: Remains the same - client files in `data/clients/` with same format

**Deep Linking**: Still uses hash-based routing for GitHub Pages compatibility

## Troubleshooting

**Common Issues:**

1. **npm install fails**
   - Delete `node_modules/` and `package-lock.json`
   - Run `npm install` again
   - Check Node.js version (v16+ recommended)

2. **Development server won't start**
   - Verify you're in `react-app/` directory
   - Check port 5173 isn't already in use
   - Run `npm install` to ensure dependencies

3. **Broken Links in Diagram**
   - Check device IDs match exactly in links
   - Verify device type is correct in link definition
   - Check browser console for errors

4. **Client Not Showing**
   - Ensure imported in `react-app/src/data/networkData.js`
   - Check added to area in `react-app/src/data/areas.js`
   - Verify client ID matches filename
   - Check for JavaScript syntax errors in client file

5. **Deep Link Not Working**
   - Verify IDs are correct in URL
   - Check spelling matches data exactly
   - URLs are case-sensitive
   - Ensure HashRouter is configured correctly

6. **GitHub Pages Deployment Issues**
   - Check `vite.config.js` has correct base path
   - Verify GitHub Actions workflow ran successfully
   - Ensure gh-pages branch was created
   - Check repository settings for Pages source

7. **Component Not Rendering**
   - Check React DevTools for component hierarchy
   - Verify props are being passed correctly
   - Check browser console for React errors
   - Ensure data structure matches expected format

## Getting Help

- Check `README.md` for user-facing documentation
- Use `admin.html` for guided configuration
- Review existing client files for examples
- Check React DevTools for component debugging
- Review Vite documentation for build issues
- See GitHub Actions logs for deployment problems

## Development Tools

### Recommended VS Code Extensions
- ES7+ React/Redux/React-Native snippets
- ESLint
- Prettier - Code formatter
- Auto Rename Tag
- Path Intellisense

### Browser Tools
- React Developer Tools
- Redux DevTools (if state management added)
- Chrome DevTools for debugging

### Package Scripts

```bash
npm run dev      # Start development server (port 5173)
npm run build    # Build for production
npm run preview  # Preview production build locally
npm run lint     # Run ESLint (if configured)
```

## Project Dependencies

**Core:**
- react: ^18.x - UI library
- react-dom: ^18.x - React DOM rendering
- react-router-dom: ^6.x - Routing
- framer-motion: ^10.x - Animations

**Build Tools:**
- vite: ^5.x - Build tool and dev server
- @vitejs/plugin-react: ^4.x - React plugin for Vite

See `react-app/package.json` for complete dependency list.
