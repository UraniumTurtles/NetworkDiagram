export default {
    id: 'medical-provider-resources',
    name: 'Medical Provider Resources',
    summary: 'Healthcare support services assisting medical providers with essential resources.',
    locations: [
        {
            id: 'mpr-main',
            name: 'Main Office',
            address: 'Wichita, KS',
            description: 'Main office with cascading switch infrastructure.',
            diagram: {
                size: { width: 800, height: 600 },
                firewalls: [
                    {
                        id: 'mpr-fw',
                        name: 'Perimeter Firewall',
                        model: 'Fortinet FortiGate 60F',
                        ip: '198.51.100.150',
                        position: { x: 400, y: 80 }
                    }
                ],
                switches: [
                    {
                        id: 'mpr-sw-1',
                        name: 'Distribution Switch 1',
                        model: 'Cisco Catalyst 2960',
                        ip: '10.40.0.2',
                        position: { x: 250, y: 200 }
                    },
                    {
                        id: 'mpr-sw-2',
                        name: 'Distribution Switch 2',
                        model: 'Cisco Catalyst 2960',
                        ip: '10.40.0.3',
                        position: { x: 550, y: 200 }
                    },
                    {
                        id: 'mpr-sw-3',
                        name: 'Access Switch 1',
                        model: 'Cisco Catalyst 2960',
                        ip: '10.40.1.2',
                        position: { x: 550, y: 320 }
                    },
                    {
                        id: 'mpr-sw-4',
                        name: 'Access Switch 2',
                        model: 'Cisco Catalyst 2960',
                        ip: '10.40.1.3',
                        position: { x: 550, y: 440 }
                    }
                ],
                hosts: [],
                accessPoints: [],
                links: [
                    { from: { type: 'firewalls', id: 'mpr-fw' }, to: { type: 'switches', id: 'mpr-sw-1' } },
                    { from: { type: 'firewalls', id: 'mpr-fw' }, to: { type: 'switches', id: 'mpr-sw-2' } },
                    { from: { type: 'switches', id: 'mpr-sw-2' }, to: { type: 'switches', id: 'mpr-sw-3' } },
                    { from: { type: 'switches', id: 'mpr-sw-3' }, to: { type: 'switches', id: 'mpr-sw-4' } }
                ]
            }
        }
    ]
};
