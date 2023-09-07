import { Router } from "express";
import getAllUsersHandler from "../handlers/getAllUsersHandler";

export const usuarioRouter = Router();

usuarioRouter.get("/", getAllUsersHandler);

export default usuarioRouter;
