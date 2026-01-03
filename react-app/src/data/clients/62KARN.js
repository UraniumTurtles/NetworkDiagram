export default {
    id: '62KARN',
    name: 'City of Karnes City',
    summary: 'County Government',
    locations: [
        {
            id: 'CityHall',
            name: 'City Hall',
            description: '',   
            address: '1007 N Hwy 123 Karnes City, TX 78118',
            diagram: {
                size: { width: 960, height: 560 },
                firewalls: [
                    {
                        "id": "KARN-61F-CITYHALL",
                        "name": "KARN-61F-CITYHALL",
                        "model": "FortiGate 61F",
                        "serial": "FGT61FTK23004294",
                        "ip": "10.10.10.50",
                        "position": {
                                "x": 400,
                                "y": 80
                        }
                    }
                ],
                switches: [
                    {
                        "id": "KARN-USWPRO-CITYHALL-CORE",
                        "name": "KARN-USWPRO-CITYHALL-CORE",
                        "model": "USW-Pro-48-PoE",
                        "ip": "10.10.10.106",
                        "position": {
                            "x": 400,
                            "y": 200
                        }
                    },
                    {
                        "id": "KARN-USWPRO-CITYHALL-SW1",
                        "name": "KARN-USWPRO-CITYHALL-SW1",
                        "model": "USW-Pro-48-PoE",
                        "ip": "10.10.10.106",
                        "position": {
                            "x": 250,
                            "y": 350
                        }
                    },
                    {
                        "id": "KARN-USWPRO-CITYHALL-SW2",
                        "name": "KARN-USWPRO-CITYHALL-SW2",
                        "model": "USW-Pro-48-PoE",
                        "ip": "10.10.10.106",
                        "position": {
                            "x": 550,
                            "y": 350
                        }
                    }
                ],
                links: [
                    { from: { type: 'firewalls', id: 'KARN-61F-CITYHALL'}, to: { type: 'switches', id: 'KARN-USWPRO-CITYHALL-CORE'} },
                    { from: { type: 'switches', id: 'KARN-USWPRO-CITYHALL-CORE'}, to: { type: 'switches', id: 'KARN-USWPRO-CITYHALL-SW1'} },
                    { from: { type: 'switches', id: 'KARN-USWPRO-CITYHALL-CORE'}, to: { type: 'switches', id: 'KARN-USWPRO-CITYHALL-SW2'} }
                ]
            }
        }
    ],
};