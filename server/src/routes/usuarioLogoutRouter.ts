import { Router } from "express";
import usuarioLogoutHandler from "../handlers/loginHandlers/logoutHandler";

export const usuarioLogoutRouter = Router();

usuarioLogoutRouter.post("/", usuarioLogoutHandler);

export default usuarioLogoutRouter;
