import { EncuestaModel } from "../models/Encuesta.js";

export const EncuestaController = {
  crear: (req, res) => {
    EncuestaModel.crear(req.body, (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ message: "Encuesta creada", id: result.insertId });
    });
  },

  listarPorEmpresa: (req, res) => {
    const { idEmpresa } = req.params;

    EncuestaModel.listarPorEmpresa(idEmpresa, (err, rows) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json(rows);
    });
  },

  obtenerResultados: (req, res) => {
    const { idEncuesta } = req.params;

    EncuestaModel.obtenerResultados(idEncuesta, (err, rows) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json(rows);
    });
  }
};