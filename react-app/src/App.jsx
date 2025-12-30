import { HashRouter, Routes, Route } from 'react-router-dom';
import AreaList from './pages/AreaList';
import ClientList from './pages/ClientList';
import LocationList from './pages/LocationList';
import DiagramView from './pages/DiagramView';
import './App.css';

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<AreaList />} />
        <Route path="/:areaId" element={<ClientList />} />
        <Route path="/:areaId/:clientId" element={<LocationList />} />
        <Route path="/:areaId/:clientId/:locationId" element={<DiagramView />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
