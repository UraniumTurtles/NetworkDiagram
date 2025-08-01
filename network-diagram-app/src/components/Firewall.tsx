import React from 'react';

interface FirewallProps {
    configuration: {
        name: string;
        ip: string;
        rules: string[];
    };
}

class Firewall extends React.Component<FirewallProps> {
    render() {
        const { name, ip, rules } = this.props.configuration;

        return (
            <div className="firewall">
                <h2>{name}</h2>
                <p>IP Address: {ip}</p>
                <h3>Rules:</h3>
                <ul>
                    {rules.map((rule, index) => (
                        <li key={index}>{rule}</li>
                    ))}
                </ul>
            </div>
        );
    }
}

export default Firewall;