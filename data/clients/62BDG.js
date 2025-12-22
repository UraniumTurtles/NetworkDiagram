export default {
    id: '62BDG',
    name: 'Baker Design Group',
    summary: 'Architecture and design firm',
    locations: [
        {
            id: 'main',
            name: 'Main',
            description: '',
            address: '135 N Main, Wichita, KS 67202',
            diagram: {
                size: { width: 960, height: 560 },
                firewalls: [
                        {
                                    "id": "DBG-71F-Main",
                                    "name": "DBG-71F-Main",
                                    "model": "FortiGate 71G",
                                    "ip": "10.255.251.1",
                                    "position": {
                                            "x": 480,
                                            "y": 100
                                    }
                        }
                ],
                links: [
                    // Add connection links here, e.g.:
                    // { from: { type: 'firewalls', id: 'firewall-1' }, to: { type: 'switches', id: 'switch-1' } }
                ]
            }
        }
    ]
};