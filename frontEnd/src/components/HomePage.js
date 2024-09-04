import React from 'react';
import { useNavigate } from 'react-router-dom';

function HomePage() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div style={{ textAlign: 'center', padding: '50px', fontFamily: 'Arial, sans-serif', backgroundColor: '#f0f8ff', height: '100vh' }}>
      <h1 style={{ color: '#4682b4', marginBottom: '40px' }}>Bienvenido a la Gestión de Créditos</h1>
      <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', flexWrap: 'wrap' }}>
        <button
          onClick={() => navigate('/solicitud')}
          style={{
            padding: '15px 30px',
            backgroundColor: '#4CAF50',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            fontSize: '16px'
          }}
        >
          Solicitar Crédito
        </button>
        <button
          onClick={() => navigate('/estado-credito')}
          style={{
            padding: '15px 30px',
            backgroundColor: '#2196F3',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            fontSize: '16px'
          }}
        >
          Ver Estado de Crédito
        </button>
        <button
          onClick={() => navigate('/historial-credito')}
          style={{
            padding: '15px 30px',
            backgroundColor: '#FF9800',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            fontSize: '16px'
          }}
        >
          Ver Historial de Créditos
        </button>
        <button
          onClick={handleLogout}
          style={{
            padding: '15px 30px',
            backgroundColor: '#f44336',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            fontSize: '16px'
          }}
        >
          Cerrar Sesión
        </button>
      </div>
    </div>
  );
}

export default HomePage;
