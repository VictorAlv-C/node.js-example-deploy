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

app.listen(4000, () => {
  console.log("App express is runing!!");
});
