const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Url = sequelize.define('Url', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  originalUrl: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  shortCode: {
    type: DataTypes.STRING(20),
    allowNull: false,
    unique: true,
  },
  clickCount: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
});

module.exports = Url;
