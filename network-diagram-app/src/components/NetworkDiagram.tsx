import React from 'react';
import Firewall from './Firewall';
import Switch from './Switch';
import Host from './Host';
import AccessPoint from './AccessPoint';
import { networkData } from '../data/networkData';

class NetworkDiagram extends React.Component {
    render() {
        return (
            <div className="network-diagram">
                <Firewall config={networkData.firewall} />
                <div className="switches">
                    {networkData.switches.map((switchConfig, index) => (
                        <Switch key={index} config={switchConfig} />
                    ))}
                </div>
                <div className="hosts">
                    {networkData.hosts.map((hostConfig, index) => (
                        <Host key={index} config={hostConfig} />
                    ))}
                </div>
                <div className="access-points">
                    {networkData.accessPoints.map((apConfig, index) => (
                        <AccessPoint key={index} config={apConfig} />
                    ))}
                </div>
            </div>
        );
    }
}

export default NetworkDiagram;