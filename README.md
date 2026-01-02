# Network Diagram Explorer

A modern React-based web application for MSPs (Managed Service Providers) to visualize and document network topologies across multiple clients and locations. Built with React 18, Vite, and Framer Motion for a smooth, responsive user experience.

## Features

- **Interactive Network Diagrams** - SVG-based topology visualization with animated transitions
- **Multi-Level Navigation** - Browse by geographic area → client → location → diagram
- **Deep Linking & QR Codes** - Direct links to specific diagrams (perfect for equipment racks)
- **Real-time Search** - Filter clients and locations instantly
- **Mobile Optimized** - Responsive design with touch-friendly tooltips
- **Virtual Machine Support** - Expandable VM panels showing host details
- **Scalable Architecture** - Handles 100+ clients efficiently

## Live Demo

Visit the live application: [https://uraniumturtles.github.io/NetworkDiagram](https://uraniumturtles.github.io/NetworkDiagram)

## Technology Stack

- **React 18** - Modern component-based UI framework
- **Vite** - Fast build tool with hot module replacement
- **React Router** - HashRouter for GitHub Pages compatibility
- **Framer Motion** - Smooth page transitions and animations
- **ES6 Modules** - Modern JavaScript module system

## Getting Started

### Prerequisites

- Node.js 16+ and npm (for development)
- Modern web browser with JavaScript enabled

### Local Development

1. **Clone the repository**
   ```bash
   git clone https://github.com/UraniumTurtles/NetworkDiagram.git
   cd NetworkDiagram
   ```

2. **Navigate to React app directory**
   ```bash
   cd react-app
   ```

3. **Install dependencies**
   ```bash
   npm install
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   - Vite will display the local URL (typically `http://localhost:5173`)
   - Changes auto-reload with hot module replacement

### Production Build

```bash
cd react-app
npm run build
```

The production-ready files will be in `react-app/dist/`

## Project Structure

```
NetworkDiagram/
├── react-app/                    # Main React application
│   ├── src/
│   │   ├── main.jsx              # Application entry point
│   │   ├── App.jsx               # Router configuration
│   │   ├── pages/                # Page components
│   │   │   ├── AreaList.jsx      # Geographic area selection
│   │   │   ├── ClientList.jsx    # Client selection
│   │   │   ├── LocationList.jsx  # Location selection
│   │   │   └── DiagramView.jsx   # Network diagram display
│   │   ├── components/           # Reusable components
│   │   │   ├── Layout.jsx        # Page layout with breadcrumbs
│   │   │   ├── NetworkDiagram.jsx # SVG diagram renderer
│   │   │   ├── Device.jsx        # Individual device rendering
│   │   │   ├── Connection.jsx    # Network link rendering
│   │   │   ├── OptionCard.jsx    # Clickable navigation cards
│   │   │   ├── SearchInput.jsx   # Search functionality
│   │   │   └── VmPanel.jsx       # VM details panel
│   │   ├── data/                 # Network configuration data
│   │   │   ├── areas.js          # Geographic areas
│   │   │   ├── networkData.js    # Main data aggregator
│   │   │   └── clients/          # Individual client configs
│   │   ├── utils/
│   │   │   └── transformDiagram.js # Diagram data processing
│   │   └── index.css             # Global styles
│   ├── vite.config.js            # Vite build configuration
│   ├── package.json              # Dependencies
│   └── index.html                # HTML entry point
├── admin.html                    # Configuration generator tool
└── README.md                     # This file
```

## Usage

### Navigation Flow

1. **Select Geographic Area** - Start by choosing a region (Northeast, Southeast, Midwest, etc.)
2. **Choose Client** - Browse or search for a specific client
3. **Pick Location** - Select the physical site to view
4. **View Diagram** - Interactive network topology with device details

### Deep Linking

Access specific diagrams directly using URL patterns:

```
Base URL: https://uraniumturtles.github.io/NetworkDiagram

# View specific area
/#/northeast

# View client in area
/#/northeast/baxter-manufacturing

# View specific location diagram
/#/northeast/baxter-manufacturing/headquarters
```

**Perfect for QR Codes** - Generate QR codes linking directly to equipment rack diagrams.

### Device Information

- **Hover (Desktop)** - Hover over any device to see detailed tooltip
- **Tap (Mobile)** - Tap devices to display information panels
- **Virtual Machines** - Click VM hosts to expand/collapse virtual machine lists

### Search

Use the search box on client and location selection screens to filter options in real-time.

## Adding Network Data

### Using the Admin Tool

The easiest way to add clients and locations is using the included admin tool:

1. Open `admin.html` in your browser
2. Choose from three tabs:
   - **New Client** - Generate complete client configuration
   - **New Location** - Add location to existing client
   - **Add Device** - Generate single device configuration
3. Fill in the form fields
4. Copy the generated code
5. Follow the integration instructions provided

### Manual Data Entry

Client configurations are stored in `react-app/src/data/clients/` as JavaScript modules. Each client exports a default object:

```javascript
export default {
  id: 'client-slug',           // URL-safe identifier
  name: 'Client Display Name',
  summary: 'Brief description',
  locations: [
    {
      id: 'location-slug',
      name: 'Location Name',
      address: 'Physical address',
      description: 'Description',
      diagram: {
        size: { width: 960, height: 580 },
        firewalls: [...],      // Edge devices
        switches: [...],       // Network switches
        hosts: [...],          // Servers/hypervisors (can contain VMs)
        accessPoints: [...],   // Wireless APs
        links: [...]           // Connections between devices
      }
    }
  ]
};
```

See `CLAUDE.md` for detailed developer documentation.

## Device Types

All devices share common properties: `id`, `name`, `model`, `ip`, `position` (x, y coordinates)

- **Firewalls** - Edge security devices (red in diagrams)
- **Switches** - Network switches (blue in diagrams)
- **Hosts** - Servers/hypervisors (green in diagrams)
  - Can include `vms` array with virtual machine details
- **Access Points** - Wireless APs (orange in diagrams)

## Deployment

### GitHub Pages (Recommended)

The application is configured for automatic deployment to GitHub Pages:

1. Push changes to the `main` branch
2. GitHub Actions automatically builds and deploys
3. Changes appear at your GitHub Pages URL within minutes

### Other Hosting

The built application is a static site and can be hosted anywhere:

1. Build the production files: `npm run build`
2. Upload the contents of `react-app/dist/` to your web server
3. Configure your server to serve `index.html` for all routes

## Browser Compatibility

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari, Chrome Mobile)

Modern browser required for ES6 modules and CSS features.

## Use Cases

- **MSP Documentation** - Centralized network topology documentation
- **Client Handoffs** - Visual network documentation for clients
- **Onboarding** - Quick reference for new technicians
- **Equipment Racks** - QR codes linking to specific site diagrams
- **Disaster Recovery** - Quick access to network layouts during incidents
- **Network Planning** - Visual reference for infrastructure changes

## Examples

The repository includes example client configurations:

- **Baxter Manufacturing** - Multi-site industrial client with ESXi hosts
- **Prairie Health Clinic** - Healthcare facility with isolated networks
- **62 Karn** - Residential setup with FortiGate and UniFi equipment

Explore these in `react-app/src/data/clients/` for configuration examples.

## Development

### Key npm Commands

```bash
npm run dev          # Start development server with hot reload
npm run build        # Build for production
npm run preview      # Preview production build locally
npm run lint         # Run ESLint code quality checks
```

### File Organization

- **Pages** (`src/pages/`) - Route-level components for each navigation level
- **Components** (`src/components/`) - Reusable UI components
- **Data** (`src/data/`) - Network configuration files
- **Utils** (`src/utils/`) - Helper functions and transformations

### Code Quality

The project uses ESLint for code quality. Run `npm run lint` before committing changes.

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes in the `react-app/src/` directory
4. Test locally with `npm run dev`
5. Run `npm run build` to ensure production build works
6. Commit your changes (`git commit -m 'Add amazing feature'`)
7. Push to the branch (`git push origin feature/amazing-feature`)
8. Open a Pull Request

## Troubleshooting

### Development Server Won't Start

```bash
# Clear node_modules and reinstall
cd react-app
rm -rf node_modules package-lock.json
npm install
npm run dev
```

### Build Failures

- Ensure Node.js 16+ is installed: `node --version`
- Check for syntax errors in data files
- Verify all device IDs in links exist in their respective arrays
- Review console output for specific error messages

### Diagrams Not Displaying

- Verify device positions are within diagram bounds (0,0 to width,height)
- Check that links reference valid device types: `'firewalls'`, `'switches'`, `'hosts'`, `'accessPoints'`
- Ensure device IDs in links match exactly (case-sensitive)

### GitHub Pages 404 Errors

- The app uses HashRouter specifically for GitHub Pages compatibility
- Links should use hash fragments: `/#/area/client/location`
- If seeing 404s, verify base path in `vite.config.js` matches repository name

## License

This project is available for use by MSPs and IT professionals. Please retain attribution when forking or adapting.

## Support

For issues, questions, or feature requests:
- Open an issue on GitHub
- Review `CLAUDE.md` for detailed developer documentation
- Check existing client files for configuration examples

## Acknowledgments

Built with modern web technologies for MSPs who need efficient, scalable network documentation tools.

---

**Version**: React 18 with Vite (Migrated from vanilla JavaScript 2024)
**Maintained by**: UraniumTurtles
**Last Updated**: December 2024
