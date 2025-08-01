# Network Diagram Application

This project is an interactive network diagram application that visualizes a network setup including a firewall, switches, hosts, virtual machines (VMs), and access points (APs).

## Project Structure

```
network-diagram-app
├── src
│   ├── components
│   │   ├── Firewall.tsx
│   │   ├── Switch.tsx
│   │   ├── Host.tsx
│   │   ├── VM.tsx
│   │   ├── AccessPoint.tsx
│   │   └── NetworkDiagram.tsx
│   ├── data
│   │   └── networkData.ts
│   ├── styles
│   │   └── main.css
│   ├── index.html
│   ├── main.tsx
│   └── types
│       └── index.ts
├── package.json
├── tsconfig.json
└── README.md
```

## Features

- **Firewall**: Represents the firewall component with configuration options.
- **Switches**: Includes four switches, each with customizable settings.
- **Hosts**: Contains two hosts, each hosting four virtual machines.
- **Access Points**: Six access points to represent wireless connectivity.

## Setup Instructions

1. Clone the repository:
   ```
   git clone <repository-url>
   ```

2. Navigate to the project directory:
   ```
   cd network-diagram-app
   ```

3. Install dependencies:
   ```
   npm install
   ```

4. Start the application:
   ```
   npm start
   ```

## Usage

Once the application is running, you will see an interactive network diagram that visualizes the components as specified. You can interact with the diagram to view details about each network element.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any enhancements or bug fixes.

## License

This project is licensed under the MIT License.