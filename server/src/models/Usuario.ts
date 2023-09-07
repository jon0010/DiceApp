import { DataTypes, Model, Sequelize } from "sequelize";

export interface UsuarioAttributes {
  id?: string | null;
  nombre: string;
  apellido: string;
  dni: string;
  email: string;
  telefono: string | null;
  contraseña: string;
  createdAt?: Date | undefined;
  updatedAt?: Date | undefined;
}

export interface UsuarioInstance
  extends Model<UsuarioAttributes>,
    UsuarioAttributes {}

export default (sequelize: Sequelize) => {
  const Usuario = sequelize.define<UsuarioInstance>(
    "Usuario",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      nombre: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      apellido: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      dni: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      telefono: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      contraseña: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      tableName: "Usuario",
    }
  );

  return Usuario;
};
