import React from 'react';

interface AccessPointProps {
    id: string;
    location: string;
    settings: {
        ssid: string;
        security: string;
        channel: number;
    };
}

class AccessPoint extends React.Component<AccessPointProps> {
    render() {
        const { id, location, settings } = this.props;
        return (
            <div className="access-point" id={id}>
                <h3>Access Point: {settings.ssid}</h3>
                <p>Location: {location}</p>
                <p>Security: {settings.security}</p>
                <p>Channel: {settings.channel}</p>
            </div>
        );
    }
}

export default AccessPoint;