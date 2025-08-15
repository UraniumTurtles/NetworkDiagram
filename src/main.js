// filepath: network-diagram-app/network-diagram-app/src/main.js
document.addEventListener('DOMContentLoaded', () => {
    const root = document.getElementById('root');

    // Sample data for the network diagram
    const networkData = {
        firewall: { id: 'fw1', name: 'Firewall' },
        switches: [
            { id: 'sw1', name: 'Switch 1' },
            { id: 'sw2', name: 'Switch 2' },
            { id: 'sw3', name: 'Switch 3' },
            { id: 'sw4', name: 'Switch 4' }
        ],
        hosts: [
            { id: 'host1', name: 'Host 1', vms: [{ id: 'vm1', name: 'VM 1' }, { id: 'vm2', name: 'VM 2' }, { id: 'vm3', name: 'VM 3' }, { id: 'vm4', name: 'VM 4' }] },
            { id: 'host2', name: 'Host 2', vms: [{ id: 'vm5', name: 'VM 5' }, { id: 'vm6', name: 'VM 6' }, { id: 'vm7', name: 'VM 7' }, { id: 'vm8', name: 'VM 8' }] }
        ],
        accessPoints: [
            { id: 'ap1', name: 'Access Point 1' },
            { id: 'ap2', name: 'Access Point 2' },
            { id: 'ap3', name: 'Access Point 3' },
            { id: 'ap4', name: 'Access Point 4' },
            { id: 'ap5', name: 'Access Point 5' },
            { id: 'ap6', name: 'Access Point 6' }
        ]
    };

    // Function to render the network diagram
    function renderNetworkDiagram() {
        const diagram = document.createElement('div');
        diagram.className = 'network-diagram';

        // Render Firewall
        const firewall = document.createElement('div');
        firewall.className = 'firewall';
        firewall.innerText = networkData.firewall.name;
        diagram.appendChild(firewall);

        // Render Switches
        networkData.switches.forEach(switchItem => {
            const switchDiv = document.createElement('div');
            switchDiv.className = 'switch';
            switchDiv.innerText = switchItem.name;
            diagram.appendChild(switchDiv);
        });

        // Render Hosts and their VMs
        networkData.hosts.forEach(host => {
            const hostDiv = document.createElement('div');
            hostDiv.className = 'host';
            hostDiv.innerText = host.name;
            diagram.appendChild(hostDiv);

            host.vms.forEach(vm => {
                const vmDiv = document.createElement('div');
                vmDiv.className = 'vm';
                vmDiv.innerText = vm.name;
                hostDiv.appendChild(vmDiv);
            });
        });

        // Render Access Points
        networkData.accessPoints.forEach(ap => {
            const apDiv = document.createElement('div');
            apDiv.className = 'access-point';
            apDiv.innerText = ap.name;
            diagram.appendChild(apDiv);
        });

        root.appendChild(diagram);
    }

    renderNetworkDiagram();
});