class AccessPoint {
    constructor(id, position) {
        this.id = id;
        this.position = position; // { x: number, y: number }
    }

    render() {
        const apElement = document.createElement('div');
        apElement.className = 'access-point';
        apElement.id = `ap-${this.id}`;
        apElement.style.left = `${this.position.x}px`;
        apElement.style.top = `${this.position.y}px`;
        apElement.innerText = `Access Point ${this.id}`;
        return apElement;
    }
}

export default AccessPoint;