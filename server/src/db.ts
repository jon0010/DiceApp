import { Sequelize } from "sequelize";
import dotenv from "dotenv";
import defineUsuarioModel from "./models/Usuario";
import defineJuegoModel from "./models/Juego";

dotenv.config();
const { DB_USER, DB_PASSWORD, DB_HOST, DB_NAME } = process.env;

const sequelize = new Sequelize(
  `mysql://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}`,
  {
    logging: false,
  }
);

const Usuario = defineUsuarioModel(sequelize);

const Juego = defineJuegoModel(sequelize);

Usuario.hasMany(Juego, { foreignKey: "usuarioId" });
Juego.belongsTo(Usuario, { foreignKey: "usuarioId" });

export { sequelize, Usuario, Juego };
