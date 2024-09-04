import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import SolicitudResults from './components/SolicitudResults';
import Historial from './components/Historial';
import HomePage from './components/HomePage';
import RequestForm from './components/RequestForm';
import EstadoCredito from './components/CreditStatus';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/resultados" element={<SolicitudResults />} />
        <Route path="/historial-credito" element={<Historial />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/solicitud" element={<RequestForm />} />
        <Route path="/estado-credito" element={<EstadoCredito />} />
      </Routes>
    </Router>
  );
}

export default App;
