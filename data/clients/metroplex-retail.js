export default {
    id: 'metroplex-retail',
    name: 'Metroplex Retail Group',
    summary: 'Regional retail company with corporate HQ and fulfillment center.',
    locations: [
        {
            id: 'metroplex-hq',
            name: 'Corporate Headquarters',
            address: '2100 Commerce St, Dallas, TX',
            description: 'Dual-firewall campus with VMware cluster and pervasive Wi-Fi coverage.',
            diagram: {
                size: { width: 940, height: 560 },
                firewalls: [
                    {
                        id: 'metroplex-fw-primary',
                        name: 'Primary Firewall',
                        model: 'Fortinet FortiGate 200F',
                        ip: '203.0.113.210',
                        position: { x: 330, y: 110 }
                    },
                    {
                        id: 'metroplex-fw-secondary',
                        name: 'Secondary Firewall',
                        model: 'Fortinet FortiGate 200F',
                        ip: '198.51.100.220',
                        position: { x: 590, y: 110 }
                    }
                ],
                switches: [
                    {
                        id: 'metroplex-core',
                        name: 'Core Switch Stack',
                        model: 'Cisco Nexus 9500',
                        ip: '10.90.0.2',
                        position: { x: 460, y: 220 }
                    },
                    {
                        id: 'metroplex-idf-west',
                        name: 'West IDF',
                        model: 'Cisco Catalyst 9400',
                        ip: '10.90.1.2',
                        position: { x: 300, y: 320 }
                    },
                    {
                        id: 'metroplex-idf-east',
                        name: 'East IDF',
                        model: 'Cisco Catalyst 9400',
                        ip: '10.90.2.2',
                        position: { x: 620, y: 320 }
                    }
                ],
                hosts: [
                    {
                        id: 'metroplex-esxi-01',
                        name: 'vSphere-01',
                        model: 'Dell PowerEdge R750',
                        ip: '10.90.10.21',
                        position: { x: 340, y: 430 },
                        vms: [
                            { id: 'metroplex-pos', name: 'POS Services', os: 'Windows Server 2019', ip: '10.90.50.30', role: 'Point-of-sale platform' },
                            { id: 'metroplex-hr', name: 'HRIS', os: 'Windows Server 2019', ip: '10.90.50.40', role: 'Human resources' }
                        ]
                    },
                    {
                        id: 'metroplex-esxi-02',
                        name: 'vSphere-02',
                        model: 'Dell PowerEdge R750',
                        ip: '10.90.10.22',
                        position: { x: 580, y: 430 },
                        vms: [
                            { id: 'metroplex-erp', name: 'ERP Platform', os: 'Windows Server 2022', ip: '10.90.60.20', role: 'Operations ERP' },
                            { id: 'metroplex-analytics', name: 'Analytics', os: 'Ubuntu 22.04', ip: '10.90.60.35', role: 'Business intelligence' }
                        ]
                    }
                ],
                accessPoints: [
                    {
                        id: 'metroplex-ap-west',
                        name: 'West Wing AP',
                        model: 'Aruba AP555',
                        ip: '10.90.120.10',
                        position: { x: 280, y: 510 }
                    },
                    {
                        id: 'metroplex-ap-east',
                        name: 'East Wing AP',
                        model: 'Aruba AP555',
                        ip: '10.90.120.20',
                        position: { x: 640, y: 510 }
                    }
                ],
                links: [
                    { from: { type: 'firewalls', id: 'metroplex-fw-primary' }, to: { type: 'switches', id: 'metroplex-core' } },
                    { from: { type: 'firewalls', id: 'metroplex-fw-secondary' }, to: { type: 'switches', id: 'metroplex-core' } },
                    { from: { type: 'switches', id: 'metroplex-core' }, to: { type: 'switches', id: 'metroplex-idf-west' } },
                    { from: { type: 'switches', id: 'metroplex-core' }, to: { type: 'switches', id: 'metroplex-idf-east' } },
                    { from: { type: 'switches', id: 'metroplex-idf-west' }, to: { type: 'hosts', id: 'metroplex-esxi-01' } },
                    { from: { type: 'switches', id: 'metroplex-idf-east' }, to: { type: 'hosts', id: 'metroplex-esxi-02' } },
                    { from: { type: 'switches', id: 'metroplex-idf-west' }, to: { type: 'accessPoints', id: 'metroplex-ap-west' } },
                    { from: { type: 'switches', id: 'metroplex-idf-east' }, to: { type: 'accessPoints', id: 'metroplex-ap-east' } }
                ]
            }
        },
        {
            id: 'metroplex-fulfillment',
            name: 'Regional Fulfillment Center',
            address: '900 Logistics Pkwy, Dallas, TX',
            description: 'Distribution facility with edge security and Hyper-V workloads.',
            diagram: {
                size: { width: 900, height: 520 },
                firewalls: [
                    {
                        id: 'metroplex-fulfillment-fw',
                        name: 'Edge Firewall',
                        model: 'Fortinet FortiGate 100F',
                        ip: '198.51.100.230',
                        position: { x: 450, y: 120 }
                    }
                ],
                switches: [
                    {
                        id: 'metroplex-fulfillment-core',
                        name: 'Core Switch',
                        model: 'Cisco Catalyst 9300',
                        ip: '10.95.0.2',
                        position: { x: 450, y: 230 }
                    },
                    {
                        id: 'metroplex-fulfillment-yard',
                        name: 'Yard Switch',
                        model: 'Cisco Catalyst 9200',
                        ip: '10.95.1.2',
                        position: { x: 310, y: 330 }
                    },
                    {
                        id: 'metroplex-fulfillment-office',
                        name: 'Office Switch',
                        model: 'Cisco Catalyst 9200',
                        ip: '10.95.2.2',
                        position: { x: 590, y: 330 }
                    }
                ],
                hosts: [
                    {
                        id: 'metroplex-fulfillment-host',
                        name: 'Hyper-V Cluster',
                        model: 'HPE ProLiant DL380',
                        ip: '10.95.10.10',
                        position: { x: 450, y: 430 },
                        vms: [
                            { id: 'metroplex-wms', name: 'Warehouse WMS', os: 'Windows Server 2022', ip: '10.95.60.25', role: 'Warehouse management' },
                            { id: 'metroplex-scada', name: 'SCADA Gateway', os: 'Ubuntu 22.04', ip: '10.95.60.40', role: 'Dock controls' },
                            { id: 'metroplex-rdp', name: 'Remote Desktop', os: 'Windows Server 2019', ip: '10.95.60.55', role: 'Remote access' }
                        ]
                    }
                ],
                accessPoints: [
                    {
                        id: 'metroplex-ap-dock',
                        name: 'Dock AP',
                        model: 'Aruba AP535',
                        ip: '10.95.120.15',
                        position: { x: 310, y: 500 }
                    },
                    {
                        id: 'metroplex-ap-office-2',
                        name: 'Office AP',
                        model: 'Aruba AP535',
                        ip: '10.95.120.25',
                        position: { x: 590, y: 500 }
                    }
                ],
                links: [
                    { from: { type: 'firewalls', id: 'metroplex-fulfillment-fw' }, to: { type: 'switches', id: 'metroplex-fulfillment-core' } },
                    { from: { type: 'switches', id: 'metroplex-fulfillment-core' }, to: { type: 'switches', id: 'metroplex-fulfillment-yard' } },
                    { from: { type: 'switches', id: 'metroplex-fulfillment-core' }, to: { type: 'switches', id: 'metroplex-fulfillment-office' } },
                    { from: { type: 'switches', id: 'metroplex-fulfillment-yard' }, to: { type: 'accessPoints', id: 'metroplex-ap-dock' } },
                    { from: { type: 'switches', id: 'metroplex-fulfillment-office' }, to: { type: 'accessPoints', id: 'metroplex-ap-office-2' } },
                    { from: { type: 'switches', id: 'metroplex-fulfillment-office' }, to: { type: 'hosts', id: 'metroplex-fulfillment-host' } }
                ]
            }
        }
    ]
};
