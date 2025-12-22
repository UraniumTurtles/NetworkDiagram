// Area definitions with client assignments
// This file maps clients to their respective areas

export default [
    {
        id: 'wichita',
        name: 'Wichita',
        description: 'Manufacturing and healthcare clients served from the Wichita operations center.',
        clientIds: ['baxter-manufacturing', 'prairie-health', 'xpress-logistics', 'medical-provider-resources']
    },
    {
        id: 'denver',
        name: 'Denver',
        description: 'Rocky Mountain hub supporting logistics and transportation clients.',
        clientIds: ['milehigh-logistics']
    },
    {
        id: 'kansas-city',
        name: 'Kansas City',
        description: 'Financial services and professional clients supported from KC operations.',
        clientIds: ['heartland-credit-union']
    },
    {
        id: 'san-antonio',
        name: 'San Antonio',
        description: 'Hospitality and entertainment customers coordinated from San Antonio.',
        clientIds: ['riverwalk-hospitality']
    },
    {
        id: 'corpus-christi',
        name: 'Corpus Christi',
        description: 'Coastal logistics clients managed through Corpus Christi support center.',
        clientIds: ['gulf-coast-shipping']
    },
    {
        id: 'dallas',
        name: 'Dallas',
        description: 'Metroplex enterprises supported from the Dallas network operations center.',
        clientIds: ['metroplex-retail']
    }
];
