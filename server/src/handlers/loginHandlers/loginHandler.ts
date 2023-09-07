import { Request, Response, NextFunction } from "express";
import { createAccessToken } from "../../libs/jwt";
import bcrypt from "bcrypt";
import { sequelize } from "../../db";
import { Model, ModelStatic } from "sequelize";

const Usuario: ModelStatic<Model<any, any>> = sequelize.models.Usuario;

const authLoginHandler = async (
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  try {
    const { email, contraseña } = req.body;

    const userFound: Model<any, any> | null = await Usuario.findOne({
      where: { email },
    });

    if (!userFound) return res.status(400).json({ message: "user not found" });

    const isMatch = await bcrypt.compare(
      contraseña,
      userFound.getDataValue("contraseña")
    );

    if (!isMatch)
      return res.status(400).json({ message: "contraseña incorrecta" });

    const token = await createAccessToken({
      id: userFound.getDataValue("id"),
      nombre: userFound.getDataValue("nombre"),
      apellido: userFound.getDataValue("apellido"),
      dni: userFound.getDataValue("dni"),
      email: userFound.getDataValue("email"),
      telefono: userFound.getDataValue("telefono"),
      contraseña: userFound.getDataValue("contraseña"),
      createdAt: userFound.getDataValue("createdAt"),
      updatedAt: userFound.getDataValue("updatedAt"),
    });
    res.cookie("token", token);
    return res.json({
      token,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send("Error en el servidor");
  }
};

export default authLoginHandler;
