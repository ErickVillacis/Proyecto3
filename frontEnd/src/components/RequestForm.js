import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { jwtDecode } from 'jwt-decode';


const RequestForm = () => {
    const [monto, setMonto] = useState('');
    const [motivo, setMotivo] = useState('');
    const [duracion, setDuracion] = useState('');
    const [ingresosBrutos, setIngresosBrutos] = useState('');
    const [gastosMensuales, setGastosMensuales] = useState('');
    const [cantidadPropiedades, setCantidadPropiedades] = useState('');
    const [cedula, setCedula] = useState('');
    const [userId, setUserId] = useState('');

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            const decodedToken = jwtDecode(token);
            setUserId(decodedToken.id);
        }
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const solicitud = {
                userId,
                monto,
                motivo,
                duracion,
                ingresos_brutos: ingresosBrutos,
                gastos_mensuales: gastosMensuales,
                cantidad_propiedades: cantidadPropiedades,
                cedula,
            };
            await api.post('/solicitudes', solicitud);
            alert('Solicitud enviada correctamente');
        } catch (error) {
            console.error('Error al enviar solicitud', error);
        }
    };

    return (
        <form 
            onSubmit={handleSubmit} 
            style={{
                maxWidth: '500px', 
                margin: 'auto', 
                padding: '20px', 
                border: '1px solid #ccc', 
                borderRadius: '10px', 
                backgroundColor: '#f9f9f9',
                fontFamily: 'Arial, sans-serif'
            }}
        >
            <h2 style={{ color: '#333', marginBottom: '20px' }}>Solicitar Crédito</h2>
            
            <input
                type="number"
                placeholder="Monto"
                value={monto}
                onChange={(e) => setMonto(e.target.value)}
                style={{
                    width: '100%', 
                    padding: '10px', 
                    marginBottom: '15px', 
                    borderRadius: '5px', 
                    border: '1px solid #ccc'
                }}
            />
            
            <input
                type="text"
                placeholder="Motivo"
                value={motivo}
                onChange={(e) => setMotivo(e.target.value)}
                style={{
                    width: '100%', 
                    padding: '10px', 
                    marginBottom: '15px', 
                    borderRadius: '5px', 
                    border: '1px solid #ccc'
                }}
            />
            
            <input
                type="number"
                placeholder="Duración (meses)"
                value={duracion}
                onChange={(e) => setDuracion(e.target.value)}
                style={{
                    width: '100%', 
                    padding: '10px', 
                    marginBottom: '15px', 
                    borderRadius: '5px', 
                    border: '1px solid #ccc'
                }}
            />
            
            <input
                type="number"
                placeholder="Ingresos Brutos"
                value={ingresosBrutos}
                onChange={(e) => setIngresosBrutos(e.target.value)}
                style={{
                    width: '100%', 
                    padding: '10px', 
                    marginBottom: '15px', 
                    borderRadius: '5px', 
                    border: '1px solid #ccc'
                }}
            />
            
            <input
                type="number"
                placeholder="Gastos Mensuales"
                value={gastosMensuales}
                onChange={(e) => setGastosMensuales(e.target.value)}
                style={{
                    width: '100%', 
                    padding: '10px', 
                    marginBottom: '15px', 
                    borderRadius: '5px', 
                    border: '1px solid #ccc'
                }}
            />
            
            <input
                type="number"
                placeholder="Cantidad de Propiedades"
                value={cantidadPropiedades}
                onChange={(e) => setCantidadPropiedades(e.target.value)}
                style={{
                    width: '100%', 
                    padding: '10px', 
                    marginBottom: '15px', 
                    borderRadius: '5px', 
                    border: '1px solid #ccc'
                }}
            />
            
            <input
                type="text"
                placeholder="Cédula"
                value={cedula}
                onChange={(e) => setCedula(e.target.value)}
                style={{
                    width: '100%', 
                    padding: '10px', 
                    marginBottom: '15px', 
                    borderRadius: '5px', 
                    border: '1px solid #ccc'
                }}
            />

            <button 
                type="submit" 
                style={{
                    width: '100%', 
                    padding: '10px', 
                    backgroundColor: '#4CAF50', 
                    color: 'white', 
                    border: 'none', 
                    borderRadius: '5px', 
                    cursor: 'pointer',
                    fontSize: '16px'
                }}
            >
                Enviar Solicitud
            </button>
        </form>
    );
};

export default RequestForm;
