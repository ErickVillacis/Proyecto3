import React, { useState } from 'react';
import api from '../services/api';

const CreditHistory = ({ userId }) => {
    const [solicitudes, setSolicitudes] = useState([]);

    const fetchSolicitudes = async () => {
        try {
            const response = await api.get(`/solicitudes/${userId}`);
            setSolicitudes(response.data);
        } catch (error) {
            console.error('Error al obtener el historial de solicitudes', error);
        }
    };

    useEffect(() => {
        fetchSolicitudes();
    }, [userId]);

    return (
        <div>
            <h2>Historial de Solicitudes</h2>
            <ul>
                {solicitudes.map((solicitud) => (
                    <li key={solicitud.id}>
                        Monto: {solicitud.monto} - Estado: {solicitud.estado}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default CreditHistory;
