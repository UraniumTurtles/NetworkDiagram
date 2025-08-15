const networkData = {
    firewall: {
        id: 'firewall1',
        name: 'Main Firewall',
        connections: ['switch1', 'switch2']
    },
    switches: [
        { id: 'switch1', name: 'Switch 1', connections: ['host1', 'host2'] },
        { id: 'switch2', name: 'Switch 2', connections: ['host3', 'host4'] },
        { id: 'switch3', name: 'Switch 3', connections: ['ap1', 'ap2'] },
        { id: 'switch4', name: 'Switch 4', connections: ['ap3', 'ap4'] }
    ],
    hosts: [
        {
            id: 'host1',
            name: 'Host 1',
            vms: [
                { id: 'vm1-1', name: 'VM 1-1' },
                { id: 'vm1-2', name: 'VM 1-2' },
                { id: 'vm1-3', name: 'VM 1-3' },
                { id: 'vm1-4', name: 'VM 1-4' }
            ]
        },
        {
            id: 'host2',
            name: 'Host 2',
            vms: [
                { id: 'vm2-1', name: 'VM 2-1' },
                { id: 'vm2-2', name: 'VM 2-2' },
                { id: 'vm2-3', name: 'VM 2-3' },
                { id: 'vm2-4', name: 'VM 2-4' }
            ]
        },
        {
            id: 'host3',
            name: 'Host 3',
            vms: [
                { id: 'vm3-1', name: 'VM 3-1' },
                { id: 'vm3-2', name: 'VM 3-2' },
                { id: 'vm3-3', name: 'VM 3-3' },
                { id: 'vm3-4', name: 'VM 3-4' }
            ]
        },
        {
            id: 'host4',
            name: 'Host 4',
            vms: [
                { id: 'vm4-1', name: 'VM 4-1' },
                { id: 'vm4-2', name: 'VM 4-2' },
                { id: 'vm4-3', name: 'VM 4-3' },
                { id: 'vm4-4', name: 'VM 4-4' }
            ]
        }
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

export default networkData;