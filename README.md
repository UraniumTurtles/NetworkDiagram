# Network Diagram App

This project is a simple network diagram application built using HTML and JavaScript. It visualizes a network consisting of various components such as firewalls, switches, hosts, virtual machines (VMs), and access points (APs).

## Project Structure

The project has the following structure:

```
network-diagram-app
├── src
│   ├── index.html          # Main HTML document
│   ├── main.js             # Main JavaScript logic
│   ├── components          # Contains component definitions
│   │   ├── Firewall.js     # Firewall component
│   │   ├── Switch.js       # Switch component
│   │   ├── Host.js         # Host component
│   │   ├── VM.js           # Virtual Machine component
│   │   └── AccessPoint.js   # Access Point component
│   ├── data                # Contains network data
│   │   └── networkData.js   # Network configuration data
│   └── styles              # Contains CSS styles
│       └── main.css        # Main stylesheet
└── README.md               # Project documentation
```

## Setup Instructions

1. Clone the repository to your local machine.
2. Navigate to the project directory.
3. Open `https://uraniumturtles.github.io/NetworkDiagram/src/index.html` in a web browser to view the network diagram.

## Functionality

- The application renders a network diagram based on the defined components.
- Each component (firewall, switch, host, VM, and access point) is represented visually.
- The relationships between components are defined in `src/data/networkData.js`.

## Technologies Used

- HTML
- JavaScript
- CSS

## Future Enhancements

- Add interactivity to the network diagram.
- Implement additional features for managing network components.
- Improve the styling and layout of the application.
