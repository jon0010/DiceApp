import { Request, Response } from "express";
import { createAccessToken } from "../../libs/jwt";
import bcrypt from "bcrypt";
import { ModelStatic } from "sequelize";
import { UsuarioInstance } from "../../models/Usuario";
import { sequelize } from "../../db";

const Usuario = sequelize.models.Usuario as ModelStatic<UsuarioInstance>;

const usuarioRegisterHandler = async (req: Request, res: Response) => {
  try {
    const { nombre, apellido, dni, email, telefono, contraseña } = req.body;

    const existingUser = await Usuario.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: "El usuario ya existe" });
    }

    const passwordHashed = await bcrypt.hash(contraseña, 10);

    const newUser: UsuarioInstance = await Usuario.create({
      nombre,
      apellido,
      dni,
      email,
      telefono,
      contraseña: passwordHashed,
    });

    const token = await createAccessToken({
      id: null,
      nombre,
      apellido,
      dni,
      email,
      telefono,
      contraseña: passwordHashed,
      createdAt: newUser.createdAt,
      updatedAt: newUser.updatedAt,
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

export default usuarioRegisterHandler;
