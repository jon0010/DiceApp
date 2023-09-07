import { Router } from "express";
import usuarioRegisterHandler from "../handlers/registerHandlers/usuarioRegisterHandler";

export const usuarioRegisterRouter = Router();

usuarioRegisterRouter.post("/", usuarioRegisterHandler);

export default usuarioRegisterRouter;
