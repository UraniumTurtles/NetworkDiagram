export default {
    id: 'gulf-coast-shipping',
    name: 'Gulf Coast Shipping',
    summary: 'Port logistics company with vessel tracking workloads.',
    locations: [
        {
            id: 'gulfcoast-port',
            name: 'Port Operations',
            address: '800 Harbor Dr, Corpus Christi, TX',
            description: 'Harbor operations center with maritime tracking systems.',
            diagram: {
                size: { width: 900, height: 540 },
                firewalls: [
                    {
                        id: 'gulfcoast-fw',
                        name: 'Harbor Firewall',
                        model: 'Palo Alto PA-3220',
                        ip: '198.51.100.80',
                        position: { x: 450, y: 110 }
                    }
                ],
                switches: [
                    {
                        id: 'gulfcoast-core',
                        name: 'Core Switch',
                        model: 'Cisco Catalyst 9300',
                        ip: '10.70.0.2',
                        position: { x: 450, y: 220 }
                    },
                    {
                        id: 'gulfcoast-yard',
                        name: 'Yard Switch',
                        model: 'Cisco Catalyst 9300',
                        ip: '10.70.1.2',
                        position: { x: 300, y: 320 }
                    },
                    {
                        id: 'gulfcoast-office',
                        name: 'Office Switch',
                        model: 'Cisco Catalyst 9300',
                        ip: '10.70.2.2',
                        position: { x: 600, y: 320 }
                    }
                ],
                hosts: [
                    {
                        id: 'gulfcoast-hyperv',
                        name: 'Hyper-V Cluster',
                        model: 'Dell PowerEdge R740',
                        ip: '10.70.10.10',
                        position: { x: 450, y: 430 },
                        vms: [
                            { id: 'gulfcoast-tracking', name: 'Vessel Tracking', os: 'Ubuntu 22.04', ip: '10.70.60.15', role: 'AIS ingestion' },
                            { id: 'gulfcoast-billing', name: 'Billing', os: 'Windows Server 2019', ip: '10.70.60.30', role: 'Finance and billing' },
                            { id: 'gulfcoast-weather', name: 'Weather Analytics', os: 'Red Hat Enterprise Linux 8', ip: '10.70.60.45', role: 'Operational forecasting' }
                        ]
                    }
                ],
                accessPoints: [
                    {
                        id: 'gulfcoast-ap-yard',
                        name: 'Yard AP',
                        model: 'Aruba AP535',
                        ip: '10.70.120.10',
                        position: { x: 300, y: 500 }
                    },
                    {
                        id: 'gulfcoast-ap-office',
                        name: 'Office AP',
                        model: 'Aruba AP535',
                        ip: '10.70.120.20',
                        position: { x: 600, y: 500 }
                    }
                ],
                links: [
                    { from: { type: 'firewalls', id: 'gulfcoast-fw' }, to: { type: 'switches', id: 'gulfcoast-core' } },
                    { from: { type: 'switches', id: 'gulfcoast-core' }, to: { type: 'switches', id: 'gulfcoast-yard' } },
                    { from: { type: 'switches', id: 'gulfcoast-core' }, to: { type: 'switches', id: 'gulfcoast-office' } },
                    { from: { type: 'switches', id: 'gulfcoast-yard' }, to: { type: 'accessPoints', id: 'gulfcoast-ap-yard' } },
                    { from: { type: 'switches', id: 'gulfcoast-office' }, to: { type: 'accessPoints', id: 'gulfcoast-ap-office' } },
                    { from: { type: 'switches', id: 'gulfcoast-office' }, to: { type: 'hosts', id: 'gulfcoast-hyperv' } }
                ]
            }
        }
    ]
};
