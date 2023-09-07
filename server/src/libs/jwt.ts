import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const { TOKEN_SECRET } = process.env;

if (!TOKEN_SECRET) {
  throw new Error("TOKEN_SECRET no está configurado en el archivo .env");
}

interface PayloadType {
  id: string | null;
  nombre: string;
  apellido: string;
  dni: number;
  email: string;
  telefono: number;
  contraseña: string;
  createdAt: Date | undefined;
  updatedAt: Date | undefined;
}

export const createAccessToken = (payload: PayloadType): Promise<string> => {
  return new Promise((resolve, reject) => {
    jwt.sign(
      payload,
      TOKEN_SECRET,
      {
        expiresIn: "1d",
      },
      (err: Error | null, token: string | undefined) => {
        if (err) {
          reject(err);
        } else {
          resolve(token ?? "");
        }
      }
    );
  });
};
