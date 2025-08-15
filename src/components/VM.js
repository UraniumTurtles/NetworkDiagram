class VM {
    constructor(name, host) {
        this.name = name;
        this.host = host;
    }

    render() {
        const vmElement = document.createElement('div');
        vmElement.className = 'vm';
        vmElement.innerText = this.name;
        return vmElement;
    }
}

export default VM;