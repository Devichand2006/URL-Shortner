const sequelize = require('../config/db');
const User = require('./User');
const Url = require('./Url');

User.hasMany(Url, { foreignKey: 'userId', as: 'urls', onDelete: 'CASCADE' });
Url.belongsTo(User, { foreignKey: 'userId', as: 'user' });

module.exports = { sequelize, User, Url };
