const {DataTypes} = require('sequelize');
const {sequelize} = require('../utils/database');

const Post = sequelize.define('post',{
    id:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    title: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    content: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    author:{
        type: DataTypes.STRING(150),
        allowNull: false
    }

});

module.exports = {Post};