import { Request, Response } from "express";
import { sequelize } from "../../db";

const getAllUsersController = async (_req: Request, res: Response) => {
  try {
    const usuarios = await sequelize.models.Usuario.findAll();

    if (usuarios.length > 0) {
      return res.json(usuarios);
    } else {
      return res.status(404).json({ error: "No se encontraron usuarios" });
    }
  } catch (error) {
    console.error("Error al obtener los usuarios:", error);
    return res
      .status(500)
      .json({ error: "Ocurrió un error al obtener los usuarios" });
  }
};

export default getAllUsersController;
