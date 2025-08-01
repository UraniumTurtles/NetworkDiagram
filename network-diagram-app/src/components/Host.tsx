class Host {
    constructor(name, ipAddress) {
        this.name = name;
        this.ipAddress = ipAddress;
        this.vms = [];
    }

    addVM(vm) {
        this.vms.push(vm);
    }

    render() {
        return `
            <div class="host">
                <h3>${this.name}</h3>
                <p>IP Address: ${this.ipAddress}</p>
                <div class="vms">
                    ${this.vms.map(vm => vm.render()).join('')}
                </div>
            </div>
        `;
    }
}

export default Host;