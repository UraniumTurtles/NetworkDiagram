export default {
    id: 'riverwalk-hospitality',
    name: 'Riverwalk Hospitality Group',
    summary: 'Boutique hotel chain with centralized network services.',
    locations: [
        {
            id: 'riverwalk-hq',
            name: 'Hospitality Operations Center',
            address: '155 Riverwalk Plaza, San Antonio, TX',
            description: 'Operations center supporting guest Wi-Fi and PMS systems.',
            diagram: {
                size: { width: 900, height: 540 },
                firewalls: [
                    {
                        id: 'riverwalk-fw',
                        name: 'Perimeter Firewall',
                        model: 'Fortinet FortiGate 80F',
                        ip: '198.51.100.60',
                        position: { x: 450, y: 110 }
                    }
                ],
                switches: [
                    {
                        id: 'riverwalk-core',
                        name: 'Core Switch',
                        model: 'Cisco Catalyst 9300',
                        ip: '10.60.0.2',
                        position: { x: 450, y: 230 }
                    },
                    {
                        id: 'riverwalk-guest',
                        name: 'Guest VLAN Switch',
                        model: 'Cisco Catalyst 9200',
                        ip: '10.60.20.2',
                        position: { x: 280, y: 330 }
                    },
                    {
                        id: 'riverwalk-backoffice',
                        name: 'Back Office Switch',
                        model: 'Cisco Catalyst 9200',
                        ip: '10.60.30.2',
                        position: { x: 620, y: 330 }
                    }
                ],
                hosts: [
                    {
                        id: 'riverwalk-host-01',
                        name: 'Hyper-V Cluster',
                        model: 'Dell PowerEdge R640',
                        ip: '10.60.10.10',
                        position: { x: 450, y: 430 },
                        vms: [
                            { id: 'riverwalk-pms', name: 'PMS Application', os: 'Windows Server 2019', ip: '10.60.50.11', role: 'Property management' },
                            { id: 'riverwalk-voip', name: 'VoIP Services', os: 'Ubuntu 20.04', ip: '10.60.50.40', role: 'Voice services' },
                            { id: 'riverwalk-analytics', name: 'Analytics', os: 'Windows Server 2022', ip: '10.60.60.60', role: 'Business intelligence' }
                        ]
                    }
                ],
                accessPoints: [
                    {
                        id: 'riverwalk-ap-lobby',
                        name: 'Lobby AP',
                        model: 'Aruba AP515',
                        ip: '10.60.120.10',
                        position: { x: 260, y: 500 }
                    },
                    {
                        id: 'riverwalk-ap-conference',
                        name: 'Conference AP',
                        model: 'Aruba AP515',
                        ip: '10.60.120.20',
                        position: { x: 640, y: 500 }
                    }
                ],
                links: [
                    { from: { type: 'firewalls', id: 'riverwalk-fw' }, to: { type: 'switches', id: 'riverwalk-core' } },
                    { from: { type: 'switches', id: 'riverwalk-core' }, to: { type: 'switches', id: 'riverwalk-guest' } },
                    { from: { type: 'switches', id: 'riverwalk-core' }, to: { type: 'switches', id: 'riverwalk-backoffice' } },
                    { from: { type: 'switches', id: 'riverwalk-guest' }, to: { type: 'accessPoints', id: 'riverwalk-ap-lobby' } },
                    { from: { type: 'switches', id: 'riverwalk-guest' }, to: { type: 'accessPoints', id: 'riverwalk-ap-conference' } },
                    { from: { type: 'switches', id: 'riverwalk-backoffice' }, to: { type: 'hosts', id: 'riverwalk-host-01' } }
                ]
            }
        }
    ]
};
