export default {
    id: 'xpress-logistics',
    name: 'Xpress Logistics',
    summary: 'GFK distribution hub supporting last-mile deliveries.',
    locations: [
        {
            id: 'xpress-gfk',
            name: 'GFK Distribution Center',
            address: '640 Envision Way, Wichita, KS',
            description: 'Single site warehouse with dual Hyper-V hosts and redundant wireless.',
            diagram: {
                size: { width: 920, height: 520 },
                firewalls: [
                    {
                        id: 'xpress-gfk-fw',
                        name: 'Edge Firewall',
                        model: 'SonicWall TZ370',
                        ip: '192.168.64.1',
                        position: { x: 460, y: 110 }
                    }
                ],
                switches: [
                    {
                        id: 'xpress-gfk-switch',
                        name: 'Core Switch',
                        model: 'Cisco CBS350',
                        ip: '10.64.0.2',
                        position: { x: 460, y: 220 }
                    }
                ],
                hosts: [
                    {
                        id: 'xpress-gfk-host-1',
                        name: 'Hyper-V Host 01',
                        model: 'Dell PowerEdge R640',
                        ip: '10.64.10.10',
                        position: { x: 350, y: 330 },
                        vms: [
                            { id: 'xpress-gfk-pos', name: 'Point of Sale', os: 'Windows Server 2019', ip: '10.64.50.20', role: 'Store POS' },
                            { id: 'xpress-gfk-print', name: 'Print Services', os: 'Windows Server 2016', ip: '10.64.50.30', role: 'Label printing' }
                        ]
                    },
                    {
                        id: 'xpress-gfk-host-2',
                        name: 'Hyper-V Host 02',
                        model: 'Dell PowerEdge R640',
                        ip: '10.64.10.11',
                        position: { x: 570, y: 330 },
                        vms: [
                            { id: 'xpress-gfk-wms', name: 'Warehouse WMS', os: 'Windows Server 2022', ip: '10.64.50.40', role: 'Warehouse management' },
                            { id: 'xpress-gfk-analytics', name: 'Analytics', os: 'Windows Server 2019', ip: '10.64.50.50', role: 'Reporting' }
                        ]
                    }
                ],
                accessPoints: [
                    {
                        id: 'xpress-gfk-ap-office',
                        name: 'Office AP',
                        model: 'Aruba AP515',
                        ip: '10.64.120.10',
                        position: { x: 300, y: 440 }
                    },
                    {
                        id: 'xpress-gfk-ap-warehouse',
                        name: 'Warehouse AP',
                        model: 'Aruba AP515',
                        ip: '10.64.120.20',
                        position: { x: 620, y: 440 }
                    }
                ],
                links: [
                    { from: { type: 'firewalls', id: 'xpress-gfk-fw' }, to: { type: 'switches', id: 'xpress-gfk-switch' } },
                    { from: { type: 'switches', id: 'xpress-gfk-switch' }, to: { type: 'hosts', id: 'xpress-gfk-host-1' } },
                    { from: { type: 'switches', id: 'xpress-gfk-switch' }, to: { type: 'hosts', id: 'xpress-gfk-host-2' } },
                    { from: { type: 'switches', id: 'xpress-gfk-switch' }, to: { type: 'accessPoints', id: 'xpress-gfk-ap-office' } },
                    { from: { type: 'switches', id: 'xpress-gfk-switch' }, to: { type: 'accessPoints', id: 'xpress-gfk-ap-warehouse' } }
                ]
            }
        }
    ]
};
