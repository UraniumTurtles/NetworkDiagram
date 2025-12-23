export default {
    id: '82CCRE',
    name: 'CCREDC',
    summary: 'Non Profit',
    locations: [
            {
                id: 'main',
                name: 'Main',
                description: '',
                address: '800 N Shoreline Blvd, Suite 1300 S, Corpus Christi, TX 78401',
                diagram: {
                    size: { width: 960, height: 560 },
                    firewalls: [
                            {
                                "id": "CCRE-61F-Main",
                                "name": "CCRE-61F-Main",
                                "model": "FortiWifi 61F",
                                "ip": "192.168.0.254",
                                "position": {
                                        "x": 480,
                                        "y": 100
                                },
                                "serial": "FWF61FTK20003441"
                            }
                    ],
                    switches: [
                        {
                            "id": "CCRE-148FFPOE-MAIN-SW1",
                            "name": "CCRE-148FFPOE-MAIN-SW1",
                            "model": "FortiSwitch 148F-FPOE",
                            "serial": "S148FFTF23062706",
                            "position": {
                                "x": 300,
                                "y": 250
                            }
                        },
                        {
                            "id": "CCRE-108FFPOE-MAIN-SW2",
                            "name": "CCRE-108FFPOE-MAIN-SW2",
                            "model": "FortiSwitch 108F-FPOE",
                            "serial": "S108FFTV24012598",
                            "position": {
                                "x": 650,
                                "y": 250
                            }
                        }
                    ],
                    links: []
                }
            }
    ]
};