el super chat me dio esto
CREATE TABLE Users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    password character varying(255) NOT NULL,
    createdAt timestamp without time zone DEFAULT "now"(),
    updatedAt timestamp without time zone DEFAULT "now"()
);
CREATE TABLE solicitudes (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    monto FLOAT NOT NULL,
    motivo VARCHAR(255) NOT NULL,
    duracion INTEGER NOT NULL,
    ingresos_brutos FLOAT NULL,
    gastos_mensuales FLOAT NULL,
    cantidad_propiedades INT NULL,
    cedula VARCHAR(255) NULL,
    fecha_solicitud TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE historiales (
    id SERIAL PRIMARY KEY,
    solicitud_id INTEGER REFERENCES solicitudes(id) ON DELETE CASCADE,
    estado VARCHAR(255) NOT NULL,
    justificacion TEXT NOT NULL
);