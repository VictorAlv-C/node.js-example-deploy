const { app } = require("./app");

//Util
const { sequelize } = require("./utils/database");
const { initModels } = require("./utils/initModels");

sequelize
  .authenticate()
  .then(() => console.log("Correct Conexion"))
  .catch((err) => console.log(err));

//Models Relations
initModels();

sequelize
  .sync()
  .then(() => console.log("Sincronizacion exitosa"))
  .catch((err) => console.log(err));

const PORT = process.env.PORT || 4001;

app.listen(PORT, () => {
  console.log("App express is runing!!");
});
