import jwt from 'jsonwebtoken';
import config from '../config.js';

export default function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "No token provided" });
  }

  const token = authHeader.split(" ")[1];
  try {
    // Verifica el token usando la clave secreta definida en .env o en tu configuración
    const decoded = jwt.verify(token, process.env.SECRET_KEY || config.app.secretKey);
    // Añade la información decodificada a la request para usarla en rutas protegidas.
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
}
