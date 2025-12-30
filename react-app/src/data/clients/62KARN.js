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
                        "ip": "10.10.10.50"
                    }
                ],
                Switches: [

                ]
            }
        }
    ],
};