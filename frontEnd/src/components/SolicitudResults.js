import React, { useEffect, useState } from 'react';
import axios from 'axios';

const SolicitudResults = () => {
  const [resultados, setResultados] = useState([]);

  useEffect(() => {
    const fetchResultados = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.post('http://localhost:5000/graphql', {
          query: `
            query {
              getSolicitudesByUser(userId: 1) {
                id
                monto
                motivo
                duracion
                ingresos_brutos
                gastos_mensuales
                cantidad_propiedades
                cedula
              }
            }
          `,
        }, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setResultados(response.data.data.getSolicitudesByUser);
      } catch (error) {
        console.error('Error fetching results:', error);
      }
    };
    fetchResultados();
  }, []);

  return (
    <div>
      <h1>Resultados de Solicitud</h1>
      <ul>
        {resultados.map((resultado) => (
          <li key={resultado.id}>
            Monto: {resultado.monto}, Motivo: {resultado.motivo}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SolicitudResults;
