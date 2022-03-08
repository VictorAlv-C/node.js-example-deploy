const { status } = require("express/lib/response");
const { DataTypes } = require("sequelize");
const { sequelize } = require("../utils/database");

const Comment = sequelize.define("comment", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  text: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  postId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  status: {
    type: DataTypes.STRING(10),
    defaultValue: "active",
  },
});

module.exports = { Comment };
