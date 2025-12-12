export default {
    id: 'heartland-credit-union',
    name: 'Heartland Credit Union',
    summary: 'Credit union with dual data centers for resiliency.',
    locations: [
        {
            id: 'heartland-hq',
            name: 'Operations Center',
            address: '900 Finance Ave, Overland Park, KS',
            description: 'Primary operations center hosting core banking systems.',
            diagram: {
                size: { width: 940, height: 560 },
                firewalls: [
                    {
                        id: 'heartland-fw-primary',
                        name: 'Primary Firewall',
                        model: 'Check Point Quantum 6200',
                        ip: '203.0.113.160',
                        position: { x: 340, y: 110 }
                    },
                    {
                        id: 'heartland-fw-secondary',
                        name: 'Secondary Firewall',
                        model: 'Check Point Quantum 6200',
                        ip: '198.51.100.170',
                        position: { x: 600, y: 110 }
                    }
                ],
                switches: [
                    {
                        id: 'heartland-core',
                        name: 'Core Switch Cluster',
                        model: 'Cisco Nexus 9500',
                        ip: '10.50.0.2',
                        position: { x: 470, y: 220 }
                    },
                    {
                        id: 'heartland-branch',
                        name: 'Branch Aggregation',
                        model: 'Cisco Catalyst 9400',
                        ip: '10.50.1.2',
                        position: { x: 470, y: 330 }
                    }
                ],
                hosts: [
                    {
                        id: 'heartland-esx-01',
                        name: 'ESX-01',
                        model: 'HPE Synergy Frame',
                        ip: '10.50.10.11',
                        position: { x: 360, y: 430 },
                        vms: [
                            { id: 'heartland-core-banking', name: 'Core Banking', os: 'Windows Server 2019', ip: '10.50.60.11', role: 'Banking core' },
                            { id: 'heartland-auth', name: 'Authentication', os: 'Windows Server 2022', ip: '10.50.60.21', role: 'Identity services' }
                        ]
                    },
                    {
                        id: 'heartland-esx-02',
                        name: 'ESX-02',
                        model: 'HPE Synergy Frame',
                        ip: '10.50.10.12',
                        position: { x: 580, y: 430 },
                        vms: [
                            { id: 'heartland-dwh', name: 'Data Warehouse', os: 'Red Hat Enterprise Linux 8', ip: '10.50.70.30', role: 'Analytics' },
                            { id: 'heartland-ivr', name: 'IVR System', os: 'Windows Server 2016', ip: '10.50.80.40', role: 'Call center' }
                        ]
                    }
                ],
                accessPoints: [
                    {
                        id: 'heartland-ap-ops',
                        name: 'Operations AP',
                        model: 'Aruba AP535',
                        ip: '10.50.120.10',
                        position: { x: 280, y: 510 }
                    },
                    {
                        id: 'heartland-ap-guest',
                        name: 'Guest Wi-Fi AP',
                        model: 'Aruba AP535',
                        ip: '10.50.120.20',
                        position: { x: 660, y: 510 }
                    }
                ],
                links: [
                    { from: { type: 'firewalls', id: 'heartland-fw-primary' }, to: { type: 'switches', id: 'heartland-core' } },
                    { from: { type: 'firewalls', id: 'heartland-fw-secondary' }, to: { type: 'switches', id: 'heartland-core' } },
                    { from: { type: 'switches', id: 'heartland-core' }, to: { type: 'switches', id: 'heartland-branch' } },
                    { from: { type: 'switches', id: 'heartland-branch' }, to: { type: 'hosts', id: 'heartland-esx-01' } },
                    { from: { type: 'switches', id: 'heartland-branch' }, to: { type: 'hosts', id: 'heartland-esx-02' } },
                    { from: { type: 'switches', id: 'heartland-branch' }, to: { type: 'accessPoints', id: 'heartland-ap-ops' } },
                    { from: { type: 'switches', id: 'heartland-branch' }, to: { type: 'accessPoints', id: 'heartland-ap-guest' } }
                ]
            }
        },
        {
            id: 'heartland-dr',
            name: 'Disaster Recovery Site',
            address: '400 Recovery Rd, Lee\'s Summit, MO',
            description: 'Secondary site for DR with asynchronous replication.',
            diagram: {
                size: { width: 860, height: 520 },
                firewalls: [
                    {
                        id: 'heartland-dr-fw',
                        name: 'DR Firewall',
                        model: 'Check Point Quantum 3600',
                        ip: '203.0.113.190',
                        position: { x: 430, y: 110 }
                    }
                ],
                switches: [
                    {
                        id: 'heartland-dr-switch',
                        name: 'DR Core',
                        model: 'Cisco Nexus 9300',
                        ip: '10.51.0.2',
                        position: { x: 430, y: 230 }
                    }
                ],
                hosts: [
                    {
                        id: 'heartland-dr-host',
                        name: 'Replica Cluster',
                        model: 'HPE Synergy Frame',
                        ip: '10.51.10.10',
                        position: { x: 430, y: 360 },
                        vms: [
                            { id: 'heartland-dr-core', name: 'Core Replica', os: 'Windows Server 2019', ip: '10.51.60.11', role: 'Core banking replica' },
                            { id: 'heartland-dr-auth', name: 'Auth Replica', os: 'Windows Server 2022', ip: '10.51.60.21', role: 'Authentication replica' }
                        ]
                    }
                ],
                accessPoints: [],
                links: [
                    { from: { type: 'firewalls', id: 'heartland-dr-fw' }, to: { type: 'switches', id: 'heartland-dr-switch' } },
                    { from: { type: 'switches', id: 'heartland-dr-switch' }, to: { type: 'hosts', id: 'heartland-dr-host' } }
                ]
            }
        }
    ]
};
