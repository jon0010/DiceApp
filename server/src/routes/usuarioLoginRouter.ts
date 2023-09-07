import { Router } from "express";
import LoginHandler from "../handlers/loginHandlers/loginHandler";

export const usuarioLoginRouter = Router();

usuarioLoginRouter.post("/", LoginHandler);

export default usuarioLoginRouter;
