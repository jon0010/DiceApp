import { Request, Response } from "express";
import { sequelize } from "../../db";
import { Op } from "sequelize";

const getAllProductsController = async (_req: Request, res: Response) => {
  try {
    const products = await sequelize.models.Juego.findAll({
      where: {
        resultado: {
          [Op.ne]: "borrado",
        },
      },
    });
    return res.json(products);
  } catch (error) {
    console.error("Error al obtener los productos:", error);
    return res
      .status(500)
      .json({ error: "Ocurrió un error al obtener los productos" });
  }
};

export default getAllProductsController;
