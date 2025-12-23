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
                                "id": "BDG-71F-Main",
                                "name": "BDG-71F-Main",
                                "model": "FortiGate 71G",
                                "serial": "FGT71FTK22002202",
                                "ip": "10.255.251.1",
                                "position": {
                                        "x": 480,
                                        "y": 100
                                }
                            }
                ],
                switches: [
                            {
                                "id": "core",
                                "name": "BDG-148FPOE-MAIN",
                                "model": "FortiSwitch 148F-POE",
                                "serial": "S148FPTF21008196",
                                "ip": "10.255.251.20",
                                "position": {
                                    "x": 480,
                                    "y": 250
                                }
                            }
                ],
                accessPoints: [
                            {
                                
                                "id": "BDG-AP1",
                                "name": "BDG-431F-MAIN-AP1",
                                "model": "FortiAP 431F",
                                "ip": "10.255.251.3",
                                "serial": "FP431FTF22006920",
                                "position": {
                                    "x": 250,
                                    "y": 400
                                }
                            },
                            {
                                
                                "id": "BDG-AP2",
                                "name": "BDG-431F-MAIN-AP2",
                                "model": "FortiAP 431F",
                                "ip": "10.255.251.2",
                                "serial": "FP431FTF23003968",
                                "position": {
                                    "x": 650,
                                    "y": 400
                                }
                            }
                ],
                links: [
                    { from: { type: 'switches', id: 'core', port: 'Port1' }, to: { type: 'firewalls', id: 'BDG-71F-Main', port: 'Port1' } },
                    { from: { type: 'accessPoints', id: 'BDG-AP1', port: '' }, to: { type: 'switches', id: 'core', port: 'Port23' } },
                    { from: { type: 'accessPoints', id: 'BDG-AP2', port: '' }, to: { type: 'switches', id: 'core', port: 'Port24' } },
                ],
            }
        }
    ],
};
