const {DataTypes} = require('sequelize');
const {sequelize} = require('../utils/database');

const User = sequelize.define('user',{
    id:{
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    age: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    email:{
        type: DataTypes.STRING(200),
        allowNull: false,
        unique: true
    },
    status:{
        type: DataTypes.STRING(10),
        allowNull: false,
        defaultValue: 'active'
    }
});

module.exports = { User };