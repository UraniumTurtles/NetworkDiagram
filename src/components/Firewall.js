class Firewall {
    constructor(name) {
        this.name = name;
        this.connections = [];
    }

    addConnection(device) {
        this.connections.push(device);
    }

    render() {
        const firewallElement = document.createElement('div');
        firewallElement.className = 'firewall';
        firewallElement.innerText = this.name;

        this.connections.forEach(connection => {
            const connectionElement = document.createElement('div');
            connectionElement.className = 'connection';
            connectionElement.innerText = connection.name;
            firewallElement.appendChild(connectionElement);
        });

        return firewallElement;
    }
}

export default Firewall;