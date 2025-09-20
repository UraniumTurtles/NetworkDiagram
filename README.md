# Network Diagram Explorer

The Network Diagram Explorer is a client- and site-aware viewer for visualizing network topologies. It provides an interactive way to navigate from geographic areas, to clients, and finally to individual locations where firewall, switching, wireless, and virtualization assets are displayed.

## Project Structure

```
NetworkDiagram
├── index.html                 # GitHub Pages entry point
├── src
│   ├── components/            # Legacy component prototypes (not currently used by the explorer)
│   ├── data/
│   │   └── networkData.js     # Hierarchical data describing areas, clients, locations, and devices
│   ├── main.js                # Single-page application logic
│   └── styles/
│       └── main.css           # Styling for navigation and diagrams
└── README.md
```

## Getting Started

1. Clone or download the repository.
2. Open `index.html` in a modern browser that supports ES modules (Chrome, Edge, Firefox, or Safari).
3. Use the on-screen navigation to drill into areas, clients, and site diagrams.

No build tooling is required—the application runs as a static site.

## Data Model

All network details are defined in `src/data/networkData.js`. The structure is intentionally hierarchical so it can scale with additional regions, clients, and locations:

```js
{
  areas: [
    {
      id: 'wichita',
      name: 'Wichita',
      description: 'Operations center overview',
      clients: [
        {
          id: 'baxter-manufacturing',
          name: 'Baxter Manufacturing',
          summary: 'High-level description',
          locations: [
            {
              id: 'baxter-hq',
              name: 'Baxter Headquarters',
              address: '123 Industrial Ave, Wichita, KS',
              description: 'Site overview',
              diagram: {
                size: { width: 960, height: 580 },
                firewalls: [ { id, name, model, ip, position } ],
                switches: [ { ... } ],
                hosts: [ { ..., vms: [ { id, name, os, ip, role } ] } ],
                accessPoints: [ { ... } ],
                links: [
                  { from: { type: 'firewalls', id: 'fw-id' }, to: { type: 'switches', id: 'switch-id' } }
                ]
              }
            }
          ]
        }
      ]
    }
  ]
}
```

### Adding New Content

- **Areas**: Append a new object to the `areas` array. Provide a unique `id`, `name`, and `description`.
- **Clients**: Within an area, add entries to the `clients` array. Each client should include a `summary` and a set of `locations`.
- **Locations**: Supply an address, description, and a `diagram` block that lists devices by type.
- **Devices**: Each device requires an `id`, `name`, optional metadata (`model`, `ip`), and a `position` object with `x`/`y` coordinates. Hosts may include a `vms` array to surface virtual machines in the UI.
- **Links**: Describe connections between devices using device type keys (`firewalls`, `switches`, `hosts`, `accessPoints`). The explorer will render cabling between the device centers.

## Features

- Responsive navigation across areas, clients, and locations.
- SVG-based diagrams generated entirely from declarative data.
- Automatic legends, breadcrumbs, and back navigation.
- Virtual machine panels summarizing host workloads.
- Tooltips (via native SVG `<title>` elements) that expose model and IP details.

## Extending the Explorer

- Adjust styling or layout in `src/styles/main.css`.
- Add new device types or metadata by extending the data model and the rendering helpers in `src/main.js`.
- Integrate additional interactivity (such as modals or editing flows) by attaching event handlers after the diagram is rendered.

## Browser Support

The explorer targets evergreen browsers that support ES modules, template literals, and modern CSS. For legacy browser support, consider adding a build step that transpiles `main.js` and bundles assets.

## Deploying to GitHub Pages

The repository layout is compatible with GitHub Pages out of the box:

1. Open the repository settings and enable **Pages** using the `main` (or default) branch and the `/ (root)` folder.
2. GitHub Pages will serve `index.html` from the repository root, and the relative asset paths will load JavaScript and styles from the `src/` directory.
3. If you prefer to publish from `docs/`, copy `index.html` and the `src/` directory into a `docs/` folder and point GitHub Pages at that directory instead.
