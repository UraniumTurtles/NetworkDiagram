export default {
    id: 'milehigh-logistics',
    name: 'Mile High Logistics',
    summary: 'Transportation and distribution provider with hybrid cloud footprint.',
    locations: [
        {
            id: 'milehigh-distribution',
            name: 'Distribution Campus',
            address: '4800 Supply Chain Rd, Denver, CO',
            description: 'Campus network with redundant core and dedicated virtualization nodes.',
            diagram: {
                size: { width: 940, height: 560 },
                firewalls: [
                    {
                        id: 'milehigh-fw',
                        name: 'Next-Gen Firewall',
                        model: 'Palo Alto PA-3410',
                        ip: '198.51.100.210',
                        position: { x: 470, y: 110 }
                    }
                ],
                switches: [
                    {
                        id: 'milehigh-core',
                        name: 'Core Stack',
                        model: 'Cisco Nexus 9500',
                        ip: '10.40.0.2',
                        position: { x: 470, y: 230 }
                    },
                    {
                        id: 'milehigh-yard',
                        name: 'Yard Distribution Switch',
                        model: 'Cisco Catalyst 9300',
                        ip: '10.40.1.2',
                        position: { x: 280, y: 330 }
                    },
                    {
                        id: 'milehigh-office',
                        name: 'Office Distribution Switch',
                        model: 'Cisco Catalyst 9300',
                        ip: '10.40.2.2',
                        position: { x: 660, y: 330 }
                    }
                ],
                hosts: [
                    {
                        id: 'milehigh-vsphere-01',
                        name: 'vSphere-01',
                        model: 'Dell PowerEdge R740xd',
                        ip: '10.40.10.21',
                        position: { x: 360, y: 430 },
                        vms: [
                            { id: 'milehigh-wms', name: 'Warehouse Management', os: 'Windows Server 2019', ip: '10.40.50.11', role: 'Logistics operations' },
                            { id: 'milehigh-api', name: 'API Gateway', os: 'Red Hat Enterprise Linux 8', ip: '10.40.60.22', role: 'Integration services' }
                        ]
                    },
                    {
                        id: 'milehigh-vsphere-02',
                        name: 'vSphere-02',
                        model: 'Dell PowerEdge R740xd',
                        ip: '10.40.10.22',
                        position: { x: 580, y: 430 },
                        vms: [
                            { id: 'milehigh-edi', name: 'EDI Broker', os: 'Windows Server 2022', ip: '10.40.70.33', role: 'Partner integrations' },
                            { id: 'milehigh-monitor', name: 'Monitoring Stack', os: 'Ubuntu 22.04', ip: '10.40.80.44', role: 'Infrastructure monitoring' }
                        ]
                    }
                ],
                accessPoints: [
                    {
                        id: 'milehigh-ap-yard',
                        name: 'Yard Wi-Fi',
                        model: 'Aruba AP535',
                        ip: '10.40.120.10',
                        position: { x: 280, y: 510 }
                    },
                    {
                        id: 'milehigh-ap-office',
                        name: 'Office Wi-Fi',
                        model: 'Aruba AP535',
                        ip: '10.40.120.20',
                        position: { x: 660, y: 510 }
                    }
                ],
                links: [
                    { from: { type: 'firewalls', id: 'milehigh-fw' }, to: { type: 'switches', id: 'milehigh-core' } },
                    { from: { type: 'switches', id: 'milehigh-core' }, to: { type: 'switches', id: 'milehigh-yard' } },
                    { from: { type: 'switches', id: 'milehigh-core' }, to: { type: 'switches', id: 'milehigh-office' } },
                    { from: { type: 'switches', id: 'milehigh-yard' }, to: { type: 'hosts', id: 'milehigh-vsphere-01' } },
                    { from: { type: 'switches', id: 'milehigh-office' }, to: { type: 'hosts', id: 'milehigh-vsphere-02' } },
                    { from: { type: 'switches', id: 'milehigh-yard' }, to: { type: 'accessPoints', id: 'milehigh-ap-yard' } },
                    { from: { type: 'switches', id: 'milehigh-office' }, to: { type: 'accessPoints', id: 'milehigh-ap-office' } }
                ]
            }
        }
    ]
};
