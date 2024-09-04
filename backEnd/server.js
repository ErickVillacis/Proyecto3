const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');
const db = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const solicitudRoutes = require('./routes/solicitudRoutes');
const historialRoutes = require('./routes/historialRoutes');
const fs = require('fs');
const path = require('path');
const resolvers = require('./graphql/resolvers');
const cors = require('cors');

const app = express();

app.use(express.json());

app.use(cors());

// Conectar a la base de datos
// Conectar a la base de datos
db.authenticate()
  .then(() => console.log('Conexión a la base de datos establecida correctamente.'))
  .catch(err => console.error('Error al conectar con la base de datos:', err));


// Rutas REST
app.use('/api/users', userRoutes);
app.use('/api/solicitudes', solicitudRoutes);
app.use('/api/historiales', historialRoutes);

// Leer el esquema de GraphQL desde el archivo
const schema = buildSchema(
  fs.readFileSync(path.join(__dirname, './graphql/schema.graphqls'), 'utf8')
);

// Rutas GraphQL
app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: resolvers,
  graphiql: true,
}));

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Servidor iniciado en el puerto ${PORT}`));
