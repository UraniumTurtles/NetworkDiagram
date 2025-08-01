class Switch {
    constructor(name, settings) {
        this.name = name;
        this.settings = settings;
    }

    render() {
        return `
            <div class="switch">
                <h3>${this.name}</h3>
                <p>Settings: ${JSON.stringify(this.settings)}</p>
            </div>
        `;
    }
}

export default Switch;