# 🌐 Animated Network Diagram - React Version

An interactive, animated network diagram built with **React** and **Framer Motion**. This is a modern rewrite of the vanilla JS network diagram with smooth animations and interactive elements.

## ✨ Features

- 🎨 **Animated Devices**: Devices spin in with spring animations
- 💫 **Data Flow Visualization**: Particles flow through connections
- 🌟 **Interactive Hover Effects**: Devices scale and glow on hover
- 📱 **Responsive Design**: Works on desktop and mobile
- 🎯 **Click Interactions**: Click devices to interact
- 🔄 **Smooth Transitions**: All animations powered by Framer Motion

## 🚀 Getting Started

### Install Dependencies
```bash
npm install
```

### Run Development Server
```bash
npm run dev
```

Visit `http://localhost:5173` to see the app!

### Build for Production
```bash
npm run build
```

The production build will be in the `dist/` folder, ready for GitHub Pages deployment.

## 📁 Project Structure

```
react-app/
├── src/
│   ├── components/
│   │   ├── Device.jsx          # Animated device component
│   │   ├── Device.css          # Device styling
│   │   ├── Connection.jsx      # Animated connection lines
│   │   ├── Connection.css      # Connection styling
│   │   ├── NetworkDiagram.jsx  # Main diagram container
│   │   └── NetworkDiagram.css  # Diagram styling
│   ├── utils/
│   │   └── dataTransformer.js  # Converts original data format to React format
│   ├── App.jsx                 # Main application
│   ├── App.css                 # App styling
│   └── main.jsx                # Entry point
├── vite.config.js              # Vite configuration
└── package.json
```

## 🎮 Using Your Own Data

### Option 1: Use Sample Data (Current Setup)

The app currently shows sample data in `App.jsx`. You can modify this directly:

```jsx
const sampleData = {
  viewBox: "0 0 960 560",
  devices: [
    {
      id: 'fw1',
      type: 'firewall',  // 'firewall', 'switch', 'host', 'ap'
      name: 'Main Firewall',
      x: 200,
      y: 280,
      model: 'FortiGate 60F',
      serial: 'FGT60F123456',
      ip: '192.168.1.1'
    }
    // ... more devices
  ],
  connections: [
    {
      from: { x: 200, y: 280 },
      to: { x: 480, y: 280 },
      label: 'WAN'
    }
    // ... more connections
  ]
};
```

### Option 2: Import Existing Data Files

To use the existing data files from `../data/clients/`, follow these steps:

1. **Copy a data file into the React app:**
```bash
cp ../data/clients/prairie-health.js src/data/prairie-health.js
```

2. **Import and transform in App.jsx:**
```jsx
import prairieHealthData from './data/prairie-health';
import { getLocationDiagram } from './utils/dataTransformer';

function App() {
  // Transform the data
  const diagramData = getLocationDiagram(prairieHealthData, 'prairie-clinic');

  return (
    <NetworkDiagram data={diagramData} />
  );
}
```

3. **Or create a data directory structure:**
```bash
mkdir src/data
# Copy all client files
cp -r ../data/clients/* src/data/
```

Then import multiple clients:
```jsx
import prairieHealth from './data/prairie-health';
import baxterMfg from './data/baxter-manufacturing';
import { transformClientData } from './utils/dataTransformer';

function App() {
  const [selectedClient, setSelectedClient] = useState(prairieHealth);
  const locations = transformClientData(selectedClient);

  return (
    <div>
      {/* Add client selector */}
      <select onChange={(e) => setSelectedClient(e.target.value)}>
        <option value={prairieHealth}>Prairie Health</option>
        <option value={baxterMfg}>Baxter Manufacturing</option>
      </select>

      <NetworkDiagram data={locations[0].diagram} />
    </div>
  );
}
```

## 🎨 Customizing Animations

### Device Animations

Edit `src/components/Device.jsx` to customize device animations:

```jsx
const deviceVariants = {
  initial: {
    scale: 0,
    opacity: 0,
    rotate: -180  // Change rotation
  },
  hover: {
    scale: 1.1,   // Change hover scale
    y: -5,        // Change hover lift
  }
};
```

### Connection Animations

Edit `src/components/Connection.jsx` to customize data flow:

```jsx
// Change particle speed
transition={{
  duration: 2,  // Lower = faster
  repeat: Infinity,
  ease: "linear"
}}
```

### Color Schemes

Edit `src/components/Device.css` to change device colors:

```css
.device-firewall {
  fill: rgba(255, 166, 58, 0.18);     /* Change fill color */
  stroke: rgba(255, 166, 58, 0.8);    /* Change border color */
}
```

## 🎯 Device Types

The following device types are supported:

- **`firewall`** - Orange rectangle (200x48px)
- **`switch`** - Teal rectangle (220x48px)
- **`host`** - Light teal rectangle (180x60px)
- **`ap`** - Green ellipse (rx=48, ry=28)

## 🌟 Animation Ideas to Try

Here are some fun animations you can experiment with:

1. **Pulsing Glow Effect**
```jsx
// In Device.jsx, add to device shape:
animate={{
  boxShadow: [
    "0 0 0px rgba(255,166,58,0)",
    "0 0 20px rgba(255,166,58,0.8)",
    "0 0 0px rgba(255,166,58,0)"
  ]
}}
transition={{ duration: 2, repeat: Infinity }}
```

2. **Bouncing Devices**
```jsx
// In Device.jsx:
animate={{
  y: [0, -10, 0]
}}
transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
```

3. **Rotating Connections**
```jsx
// In Connection.jsx, add animated gradient:
<linearGradient id="lineGradient">
  <stop offset="0%" stopColor="#006680" />
  <stop offset="100%" stopColor="#8DC63F" />
</linearGradient>
```

4. **Staggered Entry**
```jsx
// In NetworkDiagram.jsx, add stagger to devices:
{devices.map((device, index) => (
  <Device
    {...device}
    delay={index * 0.1}  // Pass delay prop
  />
))}
```

## 📦 Deployment to GitHub Pages

The project is configured for GitHub Pages deployment:

1. **Build the project:**
```bash
npm run build
```

2. **Deploy the `dist/` folder to GitHub Pages**

The `base` path in `vite.config.js` is set to `/NetworkDiagram/` for this repository.

## 🛠️ Technologies Used

- **React 19** - UI framework
- **Vite** - Build tool
- **Framer Motion** - Animation library
- **SVG** - Graphics rendering

## 📝 Notes

- The original vanilla JS version is still in the parent directory
- This React version is in a subfolder (`react-app/`) for testing
- All animations use GPU-accelerated transforms for smooth performance
- The data transformer utility makes it easy to use existing network data

## 🎓 Learning Resources

- [Framer Motion Docs](https://www.framer.com/motion/)
- [React Docs](https://react.dev)
- [SVG Tutorial](https://developer.mozilla.org/en-US/docs/Web/SVG/Tutorial)

---

Happy animating! 🎉
