export interface NetworkElement {
    id: string;
    name: string;
    type: string;
    position: { x: number; y: number };
}

export interface HostConfig {
    id: string;
    name: string;
    ipAddress: string;
    vms: VMConfig[];
}

export interface VMConfig {
    id: string;
    name: string;
    os: string;
    resources: {
        cpu: number;
        memory: number; // in MB
        storage: number; // in GB
    };
}

export interface FirewallConfig {
    id: string;
    name: string;
    rules: string[];
}

export interface SwitchConfig {
    id: string;
    name: string;
    ports: number;
}

export interface AccessPointConfig {
    id: string;
    name: string;
    ssid: string;
    security: string;
}