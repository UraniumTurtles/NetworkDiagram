import React from 'react';

interface VMProps {
    id: string;
    name: string;
    cpu: number;
    memory: number;
    storage: number;
}

class VM extends React.Component<VMProps> {
    render() {
        const { id, name, cpu, memory, storage } = this.props;
        return (
            <div className="vm">
                <h3>Virtual Machine: {name}</h3>
                <p>ID: {id}</p>
                <p>CPU: {cpu} cores</p>
                <p>Memory: {memory} GB</p>
                <p>Storage: {storage} GB</p>
            </div>
        );
    }
}

export default VM;