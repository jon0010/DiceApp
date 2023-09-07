import { Request, Response } from "express";
import { sequelize } from "../../db";

export const crearJuego = async (req: Request, res: Response) => {
  try {
    const nuevoJuego = await sequelize.models.Juego.create({
      usuarioId: req.params.usuarioId,
      tipoJuego: req.body.tipoJuego,
      resultado: req.body.resultado,
    });
    res.json(nuevoJuego);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al crear juego" });
  }
};

export const borrarJuego = async (req: Request, res: Response) => {
  try {
    const juego = await sequelize.models.Juego.findByPk(req.params.juegoId);

    if (!juego) {
      return res.status(404).json({ message: "Juego no encontrado" });
    }

    await juego.update({ resultado: "borrado" });

    res.json({ message: "Juego borrado con éxito" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al borrar juego" });
  }
};
