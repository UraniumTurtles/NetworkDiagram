export const networkData = {
  firewall: {
    id: 'firewall1',
    name: 'Main Firewall',
    configuration: {
      ip: '192.168.1.1',
      rules: [
        { action: 'allow', protocol: 'TCP', port: 80 },
        { action: 'allow', protocol: 'TCP', port: 443 },
        { action: 'deny', protocol: 'ALL', port: 'ALL' }
      ]
    }
  },
  switches: [
    { id: 'switch1', name: 'Switch 1', settings: { vlan: 10 } },
    { id: 'switch2', name: 'Switch 2', settings: { vlan: 20 } },
    { id: 'switch3', name: 'Switch 3', settings: { vlan: 30 } },
    { id: 'switch4', name: 'Switch 4', settings: { vlan: 40 } }
  ],
  hosts: [
    {
      id: 'host1',
      name: 'Host 1',
      vms: [
        { id: 'vm1-1', name: 'VM 1-1', specs: { cpu: 2, memory: '4GB' } },
        { id: 'vm1-2', name: 'VM 1-2', specs: { cpu: 2, memory: '4GB' } },
        { id: 'vm1-3', name: 'VM 1-3', specs: { cpu: 2, memory: '4GB' } },
        { id: 'vm1-4', name: 'VM 1-4', specs: { cpu: 2, memory: '4GB' } }
      ]
    },
    {
      id: 'host2',
      name: 'Host 2',
      vms: [
        { id: 'vm2-1', name: 'VM 2-1', specs: { cpu: 2, memory: '4GB' } },
        { id: 'vm2-2', name: 'VM 2-2', specs: { cpu: 2, memory: '4GB' } },
        { id: 'vm2-3', name: 'VM 2-3', specs: { cpu: 2, memory: '4GB' } },
        { id: 'vm2-4', name: 'VM 2-4', specs: { cpu: 2, memory: '4GB' } }
      ]
    }
  ],
  accessPoints: [
    { id: 'ap1', name: 'Access Point 1', settings: { ssid: 'Network1', security: 'WPA2' } },
    { id: 'ap2', name: 'Access Point 2', settings: { ssid: 'Network1', security: 'WPA2' } },
    { id: 'ap3', name: 'Access Point 3', settings: { ssid: 'Network1', security: 'WPA2' } },
    { id: 'ap4', name: 'Access Point 4', settings: { ssid: 'Network1', security: 'WPA2' } },
    { id: 'ap5', name: 'Access Point 5', settings: { ssid: 'Network1', security: 'WPA2' } },
    { id: 'ap6', name: 'Access Point 6', settings: { ssid: 'Network1', security: 'WPA2' } }
  ]
};