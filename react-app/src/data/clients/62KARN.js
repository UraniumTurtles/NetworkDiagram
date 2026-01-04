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
                size: { width: 1000, height: 800 },
                firewalls: [
                    {
                        "id": "KARN-61F-CITYHALL",
                        "name": "KARN-61F-CITYHALL",
                        "model": "FortiGate 61F",
                        "serial": "FGT61FTK23004294",
                        "ip": "10.10.10.50",
                        "position": {
                                "x": 500,
                                "y": 60
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
                            "x": 500,
                            "y": 150
                        }
                    },
                    {
                        "id": "KARN-USWPRO-CITYHALL-SW1",
                        "name": "KARN-USWPRO-CITYHALL-SW1",
                        "model": "USW-Pro-48-PoE",
                        "ip": "10.10.10.106",
                        "position": {
                            "x": 250,
                            "y": 250
                        }
                    },
                    {
                        "id": "KARN-USWPRO-CITYHALL-SW2",
                        "name": "KARN-USWPRO-CITYHALL-SW2",
                        "model": "USW-Pro-48-PoE",
                        "ip": "10.10.10.106",
                        "position": {
                            "x": 750,
                            "y": 250
                        }
                    }
                ],
                accessPoints: [
                    {
                        "id": "KARN-NANOHD-CITYHALL-FRONTDESK",
                        "name": "KARN-NANOHD-CITYHALL-FRONTDESK",
                        "model": "UAP-NanoHD",
                        "ip": "10.10.10.110",
                        "position": {
                            "x": 250,
                            "y": 400
                        }
                    },
                    {
                        "id": "KARN-NANOHD-CITYHALL-SERVERROOM",
                        "name": "KARN-NANOHD-CITYHALL-SERVERROOM",
                        "model": "UAP-NanoHD",
                        "ip": "10.10.10.131",
                        "position": {
                            "x": 750,
                            "y": 400
                        }
                    },
                    {
                        "id": "KARN-NANOHD-CITYHALL-CONFROOM",
                        "name": "KARN-NANOHD-CITYHALL-CONFROOM",
                        "model": "UAP-NanoHD",
                        "ip": "10.10.10.138",
                        "position": {
                            "x": 500,
                            "y": 450
                        }
                    }
                ],
                links: [
                    { from: { type: 'firewalls', id: 'KARN-61F-CITYHALL'}, to: { type: 'switches', id: 'KARN-USWPRO-CITYHALL-CORE'} },
                    { from: { type: 'switches', id: 'KARN-USWPRO-CITYHALL-CORE'}, to: { type: 'switches', id: 'KARN-USWPRO-CITYHALL-SW1'} },
                    { from: { type: 'switches', id: 'KARN-USWPRO-CITYHALL-CORE'}, to: { type: 'switches', id: 'KARN-USWPRO-CITYHALL-SW2'} },
                    { from: { type: 'switches', id: 'KARN-USWPRO-CITYHALL-CORE'}, to: { type: 'accessPoints', id: 'KARN-NANOHD-CITYHALL-FRONTDESK'} },
                    { from: { type: 'switches', id: 'KARN-USWPRO-CITYHALL-CORE'}, to: { type: 'accessPoints', id: 'KARN-NANOHD-CITYHALL-SERVERROOM'} },
                    { from: { type: 'switches', id: 'KARN-USWPRO-CITYHALL-SW2'}, to: { type: 'accessPoints', id: 'KARN-NANOHD-CITYHALL-CONFROOM'} }
                ],
                vpnClouds: [
                    {
                        "id": "vpn-police",
                        "name": "Police VPN",
                        "targetLocation": "Police Department",
                        "position": {
                            "x": 200,
                            "y": 60
                        }
                    }
                ],
                vpnLinks: [
                    { from: { type: 'firewalls', id: 'KARN-61F-CITYHALL'}, to: { id: 'vpn-police' }, label: 'IPSec' },
                    { from: { type: 'firewalls', id: 'KARN-61F-CITYHALL'}, to: { id: 'vpn-county' }, label: 'IPSec' }
                ]
            }
        },
        {
            id: 'police-department',
            name: 'Police Department',
            description: 'Karnes City Police Department main office.',
            address: '500 S Hwy 123 Karnes City, TX 78118',
            diagram: {
                size: { width: 960, height: 560 },
                firewalls: [
                    {
                        "id": "KARN-61F-PD",
                        "name": "KARN-61F-PD",
                        "model": "FortiGate 61F",
                        "serial": "FGT61FTK23004787",
                        "ip": "192.168.1.254",
                        "position": {
                                "x": 500,
                                "y": 80
                        }
                    }
                ],
                switches: [
                    {
                        "id": "KARN-124FFPOE-PD-SW1",
                        "name": "KARN-124FFPOE-PD-SW1",
                        "model": "FortiSwitch 124F FPoE",
                        "serial": "S124FFTF23038491",
                        "ip": "192.168.1.40",
                        "position": {
                                "x": 500,
                                "y": 150
                        }
                    },
                    {
                        "id": "KARN-124FFPOE-PD-SW2",
                        "name": "KARN-124FFPOE-PD-SW2",
                        "model": "FortiSwitch 124F FPoE",
                        "serial": "S124FFTF23038144",
                        "ip": "192.168.1.41",
                        "position": {
                                "x": 500,
                                "y": 200
                        }
                    }
                ],
                accessPoints: [],
                links: [
                    { from: { type: 'firewalls', id: 'KARN-61F-PD'}, to: { type: 'switches', id: 'KARN-124FFPOE-PD-SW1'} },
                    { from: { type: 'switches', id: 'KARN-124FFPOE-PD-SW1'}, to: { type: 'switches', id: 'KARN-124FFPOE-PD-SW2'} },
                ],
            }
        }
    ],
};