class Switch {
    constructor(id) {
        this.id = id;
        this.connections = [];
    }

    addConnection(device) {
        this.connections.push(device);
    }

    render() {
        const switchElement = document.createElement('div');
        switchElement.className = 'switch';
        switchElement.innerText = `Switch ${this.id}`;
        
        this.connections.forEach(connection => {
            const connectionElement = document.createElement('div');
            connectionElement.className = 'connection';
            connectionElement.innerText = `Connected to: ${connection.id}`;
            switchElement.appendChild(connectionElement);
        });

        return switchElement;
    }
}

export default Switch;