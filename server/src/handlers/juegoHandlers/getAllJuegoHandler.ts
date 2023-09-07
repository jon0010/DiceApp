import { Request, Response, NextFunction } from "express";
import getAllJuegoController from "../../controllers/juegoControllers/getAllJuegoController";

const getAllJuegoHandler = async (
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  try {
    await getAllJuegoController(req, res);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error en el controlador");
  }
};

export default getAllJuegoHandler;
