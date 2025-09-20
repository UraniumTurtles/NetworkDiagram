const networkData = {
    areas: [
        {
            id: 'wichita',
            name: 'Wichita',
            description: 'Manufacturing and healthcare clients served from the Wichita operations center.',
            clients: [
                {
                    id: 'baxter-manufacturing',
                    name: 'Baxter Manufacturing',
                    summary: 'Multi-site manufacturing company with a centralized data center.',
                    locations: [
                        {
                            id: 'baxter-hq',
                            name: 'Baxter Headquarters',
                            address: '123 Industrial Ave, Wichita, KS',
                            description: 'Primary production facility with redundant firewalls and hypervisor cluster.',
                            diagram: {
                                size: { width: 960, height: 580 },
                                firewalls: [
                                    {
                                        id: 'baxter-fw-primary',
                                        name: 'Edge Firewall',
                                        model: 'Fortinet FortiGate 100F',
                                        ip: '203.0.113.10',
                                        position: { x: 320, y: 110 }
                                    },
                                    {
                                        id: 'baxter-fw-secondary',
                                        name: 'VPN Firewall',
                                        model: 'Fortinet FortiGate 60F',
                                        ip: '198.51.100.22',
                                        position: { x: 640, y: 110 }
                                    }
                                ],
                                switches: [
                                    {
                                        id: 'baxter-core-sw',
                                        name: 'Core Switch',
                                        model: 'Cisco Catalyst 9300',
                                        ip: '10.10.0.2',
                                        position: { x: 480, y: 220 }
                                    },
                                    {
                                        id: 'baxter-idf-sw',
                                        name: 'Production IDF',
                                        model: 'Cisco Catalyst 9200',
                                        ip: '10.10.1.2',
                                        position: { x: 260, y: 320 }
                                    },
                                    {
                                        id: 'baxter-office-sw',
                                        name: 'Office IDF',
                                        model: 'Cisco Catalyst 9200',
                                        ip: '10.10.2.2',
                                        position: { x: 700, y: 320 }
                                    }
                                ],
                                hosts: [
                                    {
                                        id: 'baxter-esxi-01',
                                        name: 'ESXi-01',
                                        model: 'Dell PowerEdge R750',
                                        ip: '10.10.10.21',
                                        position: { x: 360, y: 420 },
                                        vms: [
                                            { id: 'baxter-erp', name: 'ERP', os: 'Windows Server 2019', ip: '10.10.50.10', role: 'Production ERP' },
                                            { id: 'baxter-sql', name: 'SQL Cluster Node', os: 'Windows Server 2019', ip: '10.10.50.15', role: 'Database' },
                                            { id: 'baxter-print', name: 'Print Server', os: 'Windows Server 2016', ip: '10.10.60.20', role: 'Print services' }
                                        ]
                                    },
                                    {
                                        id: 'baxter-esxi-02',
                                        name: 'ESXi-02',
                                        model: 'Dell PowerEdge R750',
                                        ip: '10.10.10.22',
                                        position: { x: 600, y: 420 },
                                        vms: [
                                            { id: 'baxter-vdi', name: 'VDI Pool', os: 'VMware Horizon', ip: '10.10.70.30', role: 'Virtual desktops' },
                                            { id: 'baxter-av', name: 'Avigilon NVR', os: 'Windows Server 2019', ip: '10.10.80.40', role: 'Video surveillance' },
                                            { id: 'baxter-backup', name: 'Veeam Backup', os: 'Windows Server 2022', ip: '10.10.90.50', role: 'Data protection' }
                                        ]
                                    }
                                ],
                                accessPoints: [
                                    {
                                        id: 'baxter-ap-production',
                                        name: 'Production Floor AP',
                                        model: 'Aruba AP515',
                                        ip: '10.10.120.10',
                                        position: { x: 200, y: 520 }
                                    },
                                    {
                                        id: 'baxter-ap-office',
                                        name: 'Office AP',
                                        model: 'Aruba AP515',
                                        ip: '10.10.121.10',
                                        position: { x: 760, y: 520 }
                                    }
                                ],
                                links: [
                                    { from: { type: 'firewalls', id: 'baxter-fw-primary' }, to: { type: 'switches', id: 'baxter-core-sw' } },
                                    { from: { type: 'firewalls', id: 'baxter-fw-secondary' }, to: { type: 'switches', id: 'baxter-core-sw' } },
                                    { from: { type: 'switches', id: 'baxter-core-sw' }, to: { type: 'switches', id: 'baxter-idf-sw' } },
                                    { from: { type: 'switches', id: 'baxter-core-sw' }, to: { type: 'switches', id: 'baxter-office-sw' } },
                                    { from: { type: 'switches', id: 'baxter-idf-sw' }, to: { type: 'hosts', id: 'baxter-esxi-01' } },
                                    { from: { type: 'switches', id: 'baxter-office-sw' }, to: { type: 'hosts', id: 'baxter-esxi-02' } },
                                    { from: { type: 'switches', id: 'baxter-idf-sw' }, to: { type: 'accessPoints', id: 'baxter-ap-production' } },
                                    { from: { type: 'switches', id: 'baxter-office-sw' }, to: { type: 'accessPoints', id: 'baxter-ap-office' } }
                                ]
                            }
                        },
                        {
                            id: 'baxter-warehouse',
                            name: 'Regional Warehouse',
                            address: '700 Logistics Way, Hutchinson, KS',
                            description: 'Warehouse site connected through VPN with lightweight infrastructure.',
                            diagram: {
                                size: { width: 860, height: 520 },
                                firewalls: [
                                    {
                                        id: 'baxter-warehouse-fw',
                                        name: 'Edge Firewall',
                                        model: 'Fortinet FortiGate 60F',
                                        ip: '203.0.113.44',
                                        position: { x: 430, y: 110 }
                                    }
                                ],
                                switches: [
                                    {
                                        id: 'baxter-warehouse-switch',
                                        name: 'Warehouse Switch',
                                        model: 'Cisco Catalyst 9200',
                                        ip: '10.20.0.2',
                                        position: { x: 430, y: 230 }
                                    }
                                ],
                                hosts: [
                                    {
                                        id: 'baxter-warehouse-host',
                                        name: 'Hyper-V Host',
                                        model: 'HPE ProLiant DL360',
                                        ip: '10.20.10.10',
                                        position: { x: 430, y: 360 },
                                        vms: [
                                            { id: 'baxter-warehouse-wms', name: 'Warehouse WMS', os: 'Windows Server 2019', ip: '10.20.50.11', role: 'Warehouse management' },
                                            { id: 'baxter-warehouse-rds', name: 'RDS Session Host', os: 'Windows Server 2019', ip: '10.20.50.20', role: 'Remote desktop services' }
                                        ]
                                    }
                                ],
                                accessPoints: [
                                    {
                                        id: 'baxter-warehouse-ap',
                                        name: 'Warehouse AP',
                                        model: 'Aruba AP505',
                                        ip: '10.20.60.10',
                                        position: { x: 430, y: 460 }
                                    }
                                ],
                                links: [
                                    { from: { type: 'firewalls', id: 'baxter-warehouse-fw' }, to: { type: 'switches', id: 'baxter-warehouse-switch' } },
                                    { from: { type: 'switches', id: 'baxter-warehouse-switch' }, to: { type: 'hosts', id: 'baxter-warehouse-host' } },
                                    { from: { type: 'switches', id: 'baxter-warehouse-switch' }, to: { type: 'accessPoints', id: 'baxter-warehouse-ap' } }
                                ]
                            }
                        }
                    ]
                },
                {
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
                }
            ]
        },
        {
            id: 'denver',
            name: 'Denver',
            description: 'Rocky Mountain hub supporting logistics and transportation clients.',
            clients: [
                {
                    id: 'milehigh-logistics',
                    name: 'Mile High Logistics',
                    summary: 'Transportation and distribution provider with hybrid cloud footprint.',
                    locations: [
                        {
                            id: 'milehigh-distribution',
                            name: 'Distribution Campus',
                            address: '4800 Supply Chain Rd, Denver, CO',
                            description: 'Campus network with redundant core and dedicated virtualization nodes.',
                            diagram: {
                                size: { width: 940, height: 560 },
                                firewalls: [
                                    {
                                        id: 'milehigh-fw',
                                        name: 'Next-Gen Firewall',
                                        model: 'Palo Alto PA-3410',
                                        ip: '198.51.100.210',
                                        position: { x: 470, y: 110 }
                                    }
                                ],
                                switches: [
                                    {
                                        id: 'milehigh-core',
                                        name: 'Core Stack',
                                        model: 'Cisco Nexus 9500',
                                        ip: '10.40.0.2',
                                        position: { x: 470, y: 230 }
                                    },
                                    {
                                        id: 'milehigh-yard',
                                        name: 'Yard Distribution Switch',
                                        model: 'Cisco Catalyst 9300',
                                        ip: '10.40.1.2',
                                        position: { x: 280, y: 330 }
                                    },
                                    {
                                        id: 'milehigh-office',
                                        name: 'Office Distribution Switch',
                                        model: 'Cisco Catalyst 9300',
                                        ip: '10.40.2.2',
                                        position: { x: 660, y: 330 }
                                    }
                                ],
                                hosts: [
                                    {
                                        id: 'milehigh-vsphere-01',
                                        name: 'vSphere-01',
                                        model: 'Dell PowerEdge R740xd',
                                        ip: '10.40.10.21',
                                        position: { x: 360, y: 430 },
                                        vms: [
                                            { id: 'milehigh-wms', name: 'Warehouse Management', os: 'Windows Server 2019', ip: '10.40.50.11', role: 'Logistics operations' },
                                            { id: 'milehigh-api', name: 'API Gateway', os: 'Red Hat Enterprise Linux 8', ip: '10.40.60.22', role: 'Integration services' }
                                        ]
                                    },
                                    {
                                        id: 'milehigh-vsphere-02',
                                        name: 'vSphere-02',
                                        model: 'Dell PowerEdge R740xd',
                                        ip: '10.40.10.22',
                                        position: { x: 580, y: 430 },
                                        vms: [
                                            { id: 'milehigh-edi', name: 'EDI Broker', os: 'Windows Server 2022', ip: '10.40.70.33', role: 'Partner integrations' },
                                            { id: 'milehigh-monitor', name: 'Monitoring Stack', os: 'Ubuntu 22.04', ip: '10.40.80.44', role: 'Infrastructure monitoring' }
                                        ]
                                    }
                                ],
                                accessPoints: [
                                    {
                                        id: 'milehigh-ap-yard',
                                        name: 'Yard Wi-Fi',
                                        model: 'Aruba AP535',
                                        ip: '10.40.120.10',
                                        position: { x: 280, y: 510 }
                                    },
                                    {
                                        id: 'milehigh-ap-office',
                                        name: 'Office Wi-Fi',
                                        model: 'Aruba AP535',
                                        ip: '10.40.120.20',
                                        position: { x: 660, y: 510 }
                                    }
                                ],
                                links: [
                                    { from: { type: 'firewalls', id: 'milehigh-fw' }, to: { type: 'switches', id: 'milehigh-core' } },
                                    { from: { type: 'switches', id: 'milehigh-core' }, to: { type: 'switches', id: 'milehigh-yard' } },
                                    { from: { type: 'switches', id: 'milehigh-core' }, to: { type: 'switches', id: 'milehigh-office' } },
                                    { from: { type: 'switches', id: 'milehigh-yard' }, to: { type: 'hosts', id: 'milehigh-vsphere-01' } },
                                    { from: { type: 'switches', id: 'milehigh-office' }, to: { type: 'hosts', id: 'milehigh-vsphere-02' } },
                                    { from: { type: 'switches', id: 'milehigh-yard' }, to: { type: 'accessPoints', id: 'milehigh-ap-yard' } },
                                    { from: { type: 'switches', id: 'milehigh-office' }, to: { type: 'accessPoints', id: 'milehigh-ap-office' } }
                                ]
                            }
                        }
                    ]
                }
            ]
        },
        {
            id: 'kansas-city',
            name: 'Kansas City',
            description: 'Financial services and professional clients supported from KC operations.',
            clients: [
                {
                    id: 'heartland-credit-union',
                    name: 'Heartland Credit Union',
                    summary: 'Credit union with dual data centers for resiliency.',
                    locations: [
                        {
                            id: 'heartland-hq',
                            name: 'Operations Center',
                            address: '900 Finance Ave, Overland Park, KS',
                            description: 'Primary operations center hosting core banking systems.',
                            diagram: {
                                size: { width: 940, height: 560 },
                                firewalls: [
                                    {
                                        id: 'heartland-fw-primary',
                                        name: 'Primary Firewall',
                                        model: 'Check Point Quantum 6200',
                                        ip: '203.0.113.160',
                                        position: { x: 340, y: 110 }
                                    },
                                    {
                                        id: 'heartland-fw-secondary',
                                        name: 'Secondary Firewall',
                                        model: 'Check Point Quantum 6200',
                                        ip: '198.51.100.170',
                                        position: { x: 600, y: 110 }
                                    }
                                ],
                                switches: [
                                    {
                                        id: 'heartland-core',
                                        name: 'Core Switch Cluster',
                                        model: 'Cisco Nexus 9500',
                                        ip: '10.50.0.2',
                                        position: { x: 470, y: 220 }
                                    },
                                    {
                                        id: 'heartland-branch',
                                        name: 'Branch Aggregation',
                                        model: 'Cisco Catalyst 9400',
                                        ip: '10.50.1.2',
                                        position: { x: 470, y: 330 }
                                    }
                                ],
                                hosts: [
                                    {
                                        id: 'heartland-esx-01',
                                        name: 'ESX-01',
                                        model: 'HPE Synergy Frame',
                                        ip: '10.50.10.11',
                                        position: { x: 360, y: 430 },
                                        vms: [
                                            { id: 'heartland-core-banking', name: 'Core Banking', os: 'Windows Server 2019', ip: '10.50.60.11', role: 'Banking core' },
                                            { id: 'heartland-auth', name: 'Authentication', os: 'Windows Server 2022', ip: '10.50.60.21', role: 'Identity services' }
                                        ]
                                    },
                                    {
                                        id: 'heartland-esx-02',
                                        name: 'ESX-02',
                                        model: 'HPE Synergy Frame',
                                        ip: '10.50.10.12',
                                        position: { x: 580, y: 430 },
                                        vms: [
                                            { id: 'heartland-dwh', name: 'Data Warehouse', os: 'Red Hat Enterprise Linux 8', ip: '10.50.70.30', role: 'Analytics' },
                                            { id: 'heartland-ivr', name: 'IVR System', os: 'Windows Server 2016', ip: '10.50.80.40', role: 'Call center' }
                                        ]
                                    }
                                ],
                                accessPoints: [
                                    {
                                        id: 'heartland-ap-ops',
                                        name: 'Operations AP',
                                        model: 'Aruba AP535',
                                        ip: '10.50.120.10',
                                        position: { x: 280, y: 510 }
                                    },
                                    {
                                        id: 'heartland-ap-guest',
                                        name: 'Guest Wi-Fi AP',
                                        model: 'Aruba AP535',
                                        ip: '10.50.120.20',
                                        position: { x: 660, y: 510 }
                                    }
                                ],
                                links: [
                                    { from: { type: 'firewalls', id: 'heartland-fw-primary' }, to: { type: 'switches', id: 'heartland-core' } },
                                    { from: { type: 'firewalls', id: 'heartland-fw-secondary' }, to: { type: 'switches', id: 'heartland-core' } },
                                    { from: { type: 'switches', id: 'heartland-core' }, to: { type: 'switches', id: 'heartland-branch' } },
                                    { from: { type: 'switches', id: 'heartland-branch' }, to: { type: 'hosts', id: 'heartland-esx-01' } },
                                    { from: { type: 'switches', id: 'heartland-branch' }, to: { type: 'hosts', id: 'heartland-esx-02' } },
                                    { from: { type: 'switches', id: 'heartland-branch' }, to: { type: 'accessPoints', id: 'heartland-ap-ops' } },
                                    { from: { type: 'switches', id: 'heartland-branch' }, to: { type: 'accessPoints', id: 'heartland-ap-guest' } }
                                ]
                            }
                        },
                        {
                            id: 'heartland-dr',
                            name: 'Disaster Recovery Site',
                            address: '400 Recovery Rd, Lee's Summit, MO',
                            description: 'Secondary site for DR with asynchronous replication.',
                            diagram: {
                                size: { width: 860, height: 520 },
                                firewalls: [
                                    {
                                        id: 'heartland-dr-fw',
                                        name: 'DR Firewall',
                                        model: 'Check Point Quantum 3600',
                                        ip: '203.0.113.190',
                                        position: { x: 430, y: 110 }
                                    }
                                ],
                                switches: [
                                    {
                                        id: 'heartland-dr-switch',
                                        name: 'DR Core',
                                        model: 'Cisco Nexus 9300',
                                        ip: '10.51.0.2',
                                        position: { x: 430, y: 230 }
                                    }
                                ],
                                hosts: [
                                    {
                                        id: 'heartland-dr-host',
                                        name: 'Replica Cluster',
                                        model: 'HPE Synergy Frame',
                                        ip: '10.51.10.10',
                                        position: { x: 430, y: 360 },
                                        vms: [
                                            { id: 'heartland-dr-core', name: 'Core Replica', os: 'Windows Server 2019', ip: '10.51.60.11', role: 'Core banking replica' },
                                            { id: 'heartland-dr-auth', name: 'Auth Replica', os: 'Windows Server 2022', ip: '10.51.60.21', role: 'Authentication replica' }
                                        ]
                                    }
                                ],
                                accessPoints: [],
                                links: [
                                    { from: { type: 'firewalls', id: 'heartland-dr-fw' }, to: { type: 'switches', id: 'heartland-dr-switch' } },
                                    { from: { type: 'switches', id: 'heartland-dr-switch' }, to: { type: 'hosts', id: 'heartland-dr-host' } }
                                ]
                            }
                        }
                    ]
                }
            ]
        },
        {
            id: 'san-antonio',
            name: 'San Antonio',
            description: 'Hospitality and entertainment customers coordinated from San Antonio.',
            clients: [
                {
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
                }
            ]
        },
        {
            id: 'corpus-christi',
            name: 'Corpus Christi',
            description: 'Coastal logistics clients managed through Corpus Christi support center.',
            clients: [
                {
                    id: 'gulf-coast-shipping',
                    name: 'Gulf Coast Shipping',
                    summary: 'Port logistics company with vessel tracking workloads.',
                    locations: [
                        {
                            id: 'gulfcoast-port',
                            name: 'Port Operations',
                            address: '800 Harbor Dr, Corpus Christi, TX',
                            description: 'Harbor operations center with maritime tracking systems.',
                            diagram: {
                                size: { width: 900, height: 540 },
                                firewalls: [
                                    {
                                        id: 'gulfcoast-fw',
                                        name: 'Harbor Firewall',
                                        model: 'Palo Alto PA-3220',
                                        ip: '198.51.100.80',
                                        position: { x: 450, y: 110 }
                                    }
                                ],
                                switches: [
                                    {
                                        id: 'gulfcoast-core',
                                        name: 'Core Switch',
                                        model: 'Cisco Catalyst 9300',
                                        ip: '10.70.0.2',
                                        position: { x: 450, y: 220 }
                                    },
                                    {
                                        id: 'gulfcoast-yard',
                                        name: 'Yard Switch',
                                        model: 'Cisco Catalyst 9300',
                                        ip: '10.70.1.2',
                                        position: { x: 300, y: 320 }
                                    },
                                    {
                                        id: 'gulfcoast-office',
                                        name: 'Office Switch',
                                        model: 'Cisco Catalyst 9300',
                                        ip: '10.70.2.2',
                                        position: { x: 600, y: 320 }
                                    }
                                ],
                                hosts: [
                                    {
                                        id: 'gulfcoast-hyperv',
                                        name: 'Hyper-V Cluster',
                                        model: 'Dell PowerEdge R740',
                                        ip: '10.70.10.10',
                                        position: { x: 450, y: 430 },
                                        vms: [
                                            { id: 'gulfcoast-tracking', name: 'Vessel Tracking', os: 'Ubuntu 22.04', ip: '10.70.60.15', role: 'AIS ingestion' },
                                            { id: 'gulfcoast-billing', name: 'Billing', os: 'Windows Server 2019', ip: '10.70.60.30', role: 'Finance and billing' },
                                            { id: 'gulfcoast-weather', name: 'Weather Analytics', os: 'Red Hat Enterprise Linux 8', ip: '10.70.60.45', role: 'Operational forecasting' }
                                        ]
                                    }
                                ],
                                accessPoints: [
                                    {
                                        id: 'gulfcoast-ap-yard',
                                        name: 'Yard AP',
                                        model: 'Aruba AP535',
                                        ip: '10.70.120.10',
                                        position: { x: 300, y: 500 }
                                    },
                                    {
                                        id: 'gulfcoast-ap-office',
                                        name: 'Office AP',
                                        model: 'Aruba AP535',
                                        ip: '10.70.120.20',
                                        position: { x: 600, y: 500 }
                                    }
                                ],
                                links: [
                                    { from: { type: 'firewalls', id: 'gulfcoast-fw' }, to: { type: 'switches', id: 'gulfcoast-core' } },
                                    { from: { type: 'switches', id: 'gulfcoast-core' }, to: { type: 'switches', id: 'gulfcoast-yard' } },
                                    { from: { type: 'switches', id: 'gulfcoast-core' }, to: { type: 'switches', id: 'gulfcoast-office' } },
                                    { from: { type: 'switches', id: 'gulfcoast-yard' }, to: { type: 'accessPoints', id: 'gulfcoast-ap-yard' } },
                                    { from: { type: 'switches', id: 'gulfcoast-office' }, to: { type: 'accessPoints', id: 'gulfcoast-ap-office' } },
                                    { from: { type: 'switches', id: 'gulfcoast-office' }, to: { type: 'hosts', id: 'gulfcoast-hyperv' } }
                                ]
                            }
                        }
                    ]
                }
            ]
        }
    ]
};

export default networkData;
