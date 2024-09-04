const { DataTypes } = require('sequelize');
const db = require('../config/db');

const Solicitud = db.define('Solicitud', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'user_id'  // Esto asegura que Sequelize use el nombre correcto de la columna
    },
    monto: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    motivo: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    duracion: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    ingresos_brutos: {
        type: DataTypes.FLOAT,
        allowNull: true,
    },
    gastos_mensuales: {
        type: DataTypes.FLOAT,
        allowNull: true,
    },
    cantidad_propiedades: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    cedula: {
        type: DataTypes.STRING,
        allowNull: true,
    },
}, {
    tableName: 'solicitudes', // Esto asegura que Sequelize use el nombre correcto de la tabla
    timestamps: false
});

module.exports = Solicitud;
