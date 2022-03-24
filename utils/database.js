const { Sequelize } = require("sequelize");
const dotenv = require("dotenv");

dotenv.config({ path: "./config.env" });

const sequelize = new Sequelize({
  host: process.env.DB_HOST,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  port: 5432,
  database: process.env.DB,
  dialect: "postgres",
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
  logging: false,
});

// Localhost connection

// const sequelize = new Sequelize({
//     hots: 'localhost',
//     username:'postgres',
//     password: 'ame123vic',
//     port: 5432,
//     database: 'example',
//     dialect: 'postgres',
// });

module.exports = { sequelize };
