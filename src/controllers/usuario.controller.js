import { UsuarioModel } from "../models/Usuario.js";

export const UsuarioController = {

  registrar: (req, res) => {
    UsuarioModel.create(req.body, (err, result) => {
      if (err) {
        return res.status(400).json({ error: err.message });
      }

      res.json({
        message: "Usuario registrado",
        id: result.insertId
      });
    });
  },

  login: (req, res) => {
    const { email, passwd } = req.body;

    UsuarioModel.login(email, passwd, (err, rows) => {
      if (err) return res.status(500).json({ error: err.message });

      if (rows.length === 0) {
        return res
          .status(401)
          .json({ error: "Credenciales inválidas o usuario inactivo" });
      }

      res.json({
        message: "Login exitoso",
        user: rows[0]
      });
    });
  }
};
