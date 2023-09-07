import server from "../src/server";
import { sequelize } from "./db";

sequelize
  .sync({ alter: true })
  .then(() => {
    console.log("Base de datos mysql sincronizada");
    server.listen(3001, () => {
      console.log("Server listening at port 3001");
    });
  })
  .catch((error) => {
    console.error("Error al sincronizar la base de datos:", error);
  });
