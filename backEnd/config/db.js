const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('bd-bank', 'postgres', 'postgres', {
  host: 'localhost',
  dialect: 'postgres'
});

module.exports = sequelize;
