export default {
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
};
