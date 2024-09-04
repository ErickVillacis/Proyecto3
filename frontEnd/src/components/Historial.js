import React, { useState, useEffect } from 'react';
import { gql, useQuery } from '@apollo/client';
import { jwtDecode } from 'jwt-decode';

import { ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
  uri: 'http://localhost:5000/graphql',
  cache: new InMemoryCache(),
});



const GET_SOLICITUDES = gql`
  query GetSolicitudesByUserAll($userId: ID!) {
    getSolicitudesByUserAll(userId: $userId) {
      id
      monto
      motivo
    }
  }
`;

const GET_HISTORIAL = gql`
  query GetHistorialBySolicitud($solicitudId: ID!) {
    getHistorialBySolicitud(solicitudId: $solicitudId) {
      estado
      justificacion
    }
  }
`;

const HistorialCreditos = () => {
  const [historiales, setHistoriales] = useState([]);
  const [solicitudes, setSolicitudes] = useState([]);

  const token = localStorage.getItem('token');
  const decoded = jwtDecode(token);
  const userId = decoded.id;

  // Obtener las solicitudes
  const { data: solicitudesData } = useQuery(GET_SOLICITUDES, {
    variables: { userId },
  });

  // Obtener historiales según las solicitudes
  const obtenerHistoriales = async () => {
    if (solicitudesData) {
      const solicitudes = solicitudesData.getSolicitudesByUserAll;
      setSolicitudes(solicitudes);

      const historialPromises = solicitudes.map((solicitud) =>
        client.query({
          query: GET_HISTORIAL,
          variables: { solicitudId: solicitud.id },
        })
      );

      const historialesData = await Promise.all(historialPromises);
      const historiales = historialesData.map(({ data }, index) => ({
        ...solicitudes[index],
        ...data.getHistorialBySolicitud[0],
      }));

      setHistoriales(historiales);
    }
  };

  useEffect(() => {
    obtenerHistoriales();
  }, [obtenerHistoriales]);

  return (
    <div>
        <h2 style={{ color: '#343a40', marginBottom: '20px' }}>Historial de Créditos</h2>
        {historiales.length > 0 ? (
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                <thead>
                    <tr style={{ backgroundColor: '#f8f9fa', color: '#495057' }}>
                        <th style={tableHeaderStyle}>Monto</th>
                        <th style={tableHeaderStyle}>Motivo</th>
                        <th style={tableHeaderStyle}>Estado</th>
                        <th style={tableHeaderStyle}>Justificación</th>
                    </tr>
                </thead>
                <tbody>
                    {historiales.map((historial, index) => (
                        <tr key={index} style={{ backgroundColor: index % 2 === 0 ? '#f1f3f5' : '#ffffff' }}>
                            <td style={tableCellStyle}>{historial.monto}</td>
                            <td style={tableCellStyle}>{historial.motivo}</td>
                            <td style={tableCellStyle}>{historial.estado}</td>
                            <td style={tableCellStyle}>{historial.justificacion}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        ) : (
            <p>No hay historial disponible.</p>
        )}
    </div>
);
};

const containerStyle = {
    backgroundColor: '#e9ecef', // Fondo suave
    padding: '20px',
    minHeight: '100vh', // Asegura que cubra toda la pantalla
};

const tableHeaderStyle = {
    padding: '12px',
    borderBottom: '2px solid #dee2e6',
};

const tableCellStyle = {
    padding: '12px',
    borderBottom: '1px solid #dee2e6',
};

export default HistorialCreditos;