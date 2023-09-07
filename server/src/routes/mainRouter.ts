import { Router } from "express";
import usuarioRouter from "./usuarioRouter";
import juegoRouter from "./juegoRouter";
import usuarioLoginRouter from "./usuarioLoginRouter";
import usuarioRegisterRouter from "./usuarioRegisterRouter";
import usuarioLogoutRouter from "./usuarioLogoutRouter";

const mainRouter = Router();

mainRouter.use("/usuario", usuarioRouter);
mainRouter.use("/api/login", usuarioLoginRouter);
mainRouter.use("/api/register", usuarioRegisterRouter);
mainRouter.use("/logout", usuarioLogoutRouter);
mainRouter.use("/juego", juegoRouter);

export default mainRouter;
