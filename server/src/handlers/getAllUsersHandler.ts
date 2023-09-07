import { Request, Response, NextFunction } from "express";
import getAllUsersController from "../controllers/usersControllers/getAllUsersController";

const getAllUsersHandler = async (
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  try {
    await getAllUsersController(req, res);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error en el controlador");
  }
};

export default getAllUsersHandler;
