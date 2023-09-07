import { Router } from "express";
import getAllJuegoHandler from "../handlers/juegoHandlers/getAllJuegoHandler";
import {
  crearJuego,
  borrarJuego,
} from "../controllers/juegoControllers/createAndDeleteGameController";

export const juegoRouter = Router();

juegoRouter.get("/", getAllJuegoHandler);
juegoRouter.post("/:usuarioId", crearJuego);
juegoRouter.delete("/:juegoId", borrarJuego);

export default juegoRouter;
