import { DataTypes, Sequelize } from "sequelize";

export default function defineJuegoModel(sequelize: Sequelize) {
  const Juego = sequelize.define(
    "Juego",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      tipoJuego: {
        type: DataTypes.ENUM("adivina", "desafio", "sin-juego"),
        defaultValue: "sin-juego",
        allowNull: false,
      },
      resultado: {
        type: DataTypes.ENUM(
          "gano",
          "perdio",
          "empate",
          "sin-juego",
          "borrado"
        ),
        defaultValue: "sin-juego",
        allowNull: false,
      },
    },
    {
      tableName: "Juego",
    }
  );

  return Juego;
}
