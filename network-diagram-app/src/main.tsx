import React from 'react';
import ReactDOM from 'react-dom';
import NetworkDiagram from './components/NetworkDiagram';
import './styles/main.css';

const App = () => {
    return (
        <div>
            <NetworkDiagram />
        </div>
    );
};

ReactDOM.render(<App />, document.getElementById('root'));