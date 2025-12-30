export default {
    id: 'prairie-health',
    name: 'Prairie Health Clinics',
    summary: 'Regional healthcare provider with telehealth presence.',
    locations: [
        {
            id: 'prairie-clinic',
            name: 'Downtown Clinic',
            address: '200 Medical Plaza, Wichita, KS',
            description: 'Clinic network with redundant wireless coverage and virtualization cluster.',
            diagram: {
                size: { width: 920, height: 560 },
                firewalls: [
                    {
                        id: 'prairie-fw',
                        name: 'Perimeter Firewall',
                        model: 'Palo Alto PA-3220',
                        ip: '198.51.100.110',
                        position: { x: 460, y: 110 }
                    }
                ],
                switches: [
                    {
                        id: 'prairie-core-sw',
                        name: 'Core Switch Stack',
                        model: 'Cisco Catalyst 9400',
                        ip: '10.30.0.2',
                        position: { x: 460, y: 220 }
                    },
                    {
                        id: 'prairie-lab-sw',
                        name: 'Lab Switch',
                        model: 'Cisco Catalyst 9300',
                        ip: '10.30.1.2',
                        position: { x: 280, y: 320 }
                    },
                    {
                        id: 'prairie-clinic-sw',
                        name: 'Clinic Switch',
                        model: 'Cisco Catalyst 9300',
                        ip: '10.30.2.2',
                        position: { x: 640, y: 320 }
                    }
                ],
                hosts: [
                    {
                        id: 'prairie-hv-01',
                        name: 'Hyper-V-01',
                        model: 'Lenovo SR650',
                        ip: '10.30.10.11',
                        position: { x: 360, y: 420 },
                        vms: [
                            { id: 'prairie-emr', name: 'EMR Application', os: 'Windows Server 2019', ip: '10.30.60.15', role: 'Electronic medical records' },
                            { id: 'prairie-sql', name: 'SQL Backend', os: 'Windows Server 2019', ip: '10.30.60.20', role: 'Database' }
                        ]
                    },
                    {
                        id: 'prairie-hv-02',
                        name: 'Hyper-V-02',
                        model: 'Lenovo SR650',
                        ip: '10.30.10.12',
                        position: { x: 560, y: 420 },
                        vms: [
                            { id: 'prairie-tele', name: 'Telehealth Gateway', os: 'Ubuntu 22.04', ip: '10.30.70.25', role: 'Telehealth services' },
                            { id: 'prairie-pacs', name: 'PACS', os: 'Windows Server 2019', ip: '10.30.80.30', role: 'Radiology imaging' }
                        ]
                    }
                ],
                accessPoints: [
                    {
                        id: 'prairie-ap-north',
                        name: 'North Wing AP',
                        model: 'Aruba AP515',
                        ip: '10.30.120.10',
                        position: { x: 240, y: 510 }
                    },
                    {
                        id: 'prairie-ap-south',
                        name: 'South Wing AP',
                        model: 'Aruba AP515',
                        ip: '10.30.120.20',
                        position: { x: 680, y: 510 }
                    }
                ],
                links: [
                    { from: { type: 'firewalls', id: 'prairie-fw' }, to: { type: 'switches', id: 'prairie-core-sw' } },
                    { from: { type: 'switches', id: 'prairie-core-sw' }, to: { type: 'switches', id: 'prairie-lab-sw' } },
                    { from: { type: 'switches', id: 'prairie-core-sw' }, to: { type: 'switches', id: 'prairie-clinic-sw' } },
                    { from: { type: 'switches', id: 'prairie-lab-sw' }, to: { type: 'hosts', id: 'prairie-hv-01' } },
                    { from: { type: 'switches', id: 'prairie-clinic-sw' }, to: { type: 'hosts', id: 'prairie-hv-02' } },
                    { from: { type: 'switches', id: 'prairie-lab-sw' }, to: { type: 'accessPoints', id: 'prairie-ap-north' } },
                    { from: { type: 'switches', id: 'prairie-clinic-sw' }, to: { type: 'accessPoints', id: 'prairie-ap-south' } }
                ]
            }
        }
    ]
};
