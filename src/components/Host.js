class Host {
    constructor(name) {
        this.name = name;
        this.vms = [];
    }

    addVM(vm) {
        this.vms.push(vm);
    }

    render() {
        const hostElement = document.createElement('div');
        hostElement.className = 'host';
        hostElement.innerText = this.name;

        const vmContainer = document.createElement('div');
        vmContainer.className = 'vm-container';

        this.vms.forEach(vm => {
            vmContainer.appendChild(vm.render());
        });

        hostElement.appendChild(vmContainer);
        return hostElement;
    }
}

export default Host;