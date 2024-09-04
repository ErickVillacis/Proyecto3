import React, { useState, useEffect } from 'react';
import { useQuery, gql } from '@apollo/client';
import { jwtDecode } from 'jwt-decode';
import { FaHome } from 'react-icons/fa';
import { PieChart, Pie, Tooltip, Cell } from 'recharts';
import api from '../services/api';
import './CreditStatus.css';

const GET_ULTIMA_SOLICITUD = gql`
  query GetSolicitudesByUser($userId: ID!) {
    getSolicitudesByUser(userId: $userId) {
      id
      monto
      motivo
      ingresos_brutos
      gastos_mensuales
      cantidad_propiedades
      cedula
    }
  }
`;

const EstadoCredito = () => {
  const [solicitud, setSolicitud] = useState(null);

  const token = localStorage.getItem('token');
  const decoded = jwtDecode(token);
  const userId = decoded.id;

  const { data, error } = useQuery(GET_ULTIMA_SOLICITUD, { variables: { userId } });

  useEffect(() => {
    if (data) {
      const solicitudActual = data.getSolicitudesByUser[0];
      setSolicitud(solicitudActual);
      guardarHistorialAutomáticamente(solicitudActual);
    }
  }, [data]);

  const calcularEstado = (solicitud) => {
    if (solicitud) {
      const ratioIngresosGastos = solicitud.ingresos_brutos / solicitud.gastos_mensuales;
      return ratioIngresosGastos > 2 && solicitud.cantidad_propiedades > 0 ? 'Aprobado' : 'Rechazado';
    }
    return 'Indefinido';
  };

  const guardarHistorialAutomáticamente = async (solicitud) => {
    const estado = calcularEstado(solicitud);
    const justificacion = estado === 'Aprobado' ? 'Buen historial crediticio' : 'Mal historial crediticio';

    try {
      await api.post('/historiales', {
        solicitudId: solicitud.id,
        estado,
        justificacion,
      });
      console.log('Historial guardado automáticamente');
    } catch (error) {
      console.error('Error al guardar historial:', error);
    }
  };

  const dataGrafico = solicitud
    ? [
        { name: 'Ingresos', value: solicitud.ingresos_brutos },
        { name: 'Gastos', value: solicitud.gastos_mensuales },
      ]
    : [];

  const COLORS = ['#0088FE', '#00C49F'];

  if (error) {
    console.error('Error fetching solicitud:', error);
    return <p>Error al cargar la solicitud</p>;
  }

  return (
    <div className="credit-status-container">
      <h2 className="title">Estado de Crédito</h2>
      {solicitud ? (
        <>
          <div className="left-section">
            <p><strong>Monto:</strong> {solicitud.monto}</p>
            <p><strong>Motivo:</strong> {solicitud.motivo}</p>
            <p><strong>Estado:</strong> {calcularEstado(solicitud)}</p>

            <div className="additional-info">
              <h3>Ingresos vs Gastos</h3>
              <p className="status-icon">
                {solicitud.ingresos_brutos > solicitud.gastos_mensuales ? '↑' : '↓'} 
                {solicitud.ingresos_brutos}
              </p>

              <h3>Propiedades</h3>
              <div className="propiedades-info">
                <FaHome className="home-icon" />
                <p>{solicitud.cantidad_propiedades} Propiedades</p>
              </div>
            </div>
          </div>

          <div className="right-section">
            <PieChart width={400} height={400}>
              <Pie
                data={dataGrafico}
                cx={200}
                cy={200}
                innerRadius={60}
                outerRadius={100}
                fill="#8884d8"
                paddingAngle={5}
                dataKey="value"
              >
                {dataGrafico.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
            <div className="legend">
              <p><span className="ingresos-color"></span> Ingresos</p>
              <p><span className="gastos-color"></span> Gastos</p>
            </div>
          </div>
        </>
      ) : (
        <p>Cargando solicitud...</p>
      )}
    </div>
  );
};

export default EstadoCredito;