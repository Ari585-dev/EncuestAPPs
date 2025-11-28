import { EncuestaModel } from "../models/Encuesta.js";
import connection from "../config/database.js";

export const EncuestaController = {

  crear: (req, res) => {
    const data = req.body;
    const preguntas = data.preguntas || [];

    // 1. Insertar encuesta
    EncuestaModel.crear(data, (err, result) => {
      if (err) return res.status(500).json({ error: err.message });

      const idEncuesta = result.insertId;

      if (preguntas.length === 0) {
        return res.json({ message: "Encuesta creada sin preguntas", idEncuesta });
      }

      // 2. Insertar preguntas
      const preguntasSQL = `
        INSERT INTO pregunta (texto, tipo, orden, idEncuesta)
        VALUES ?
      `;

      const values = preguntas.map(p => [
        p.texto,
        p.tipo,
        p.orden,
        idEncuesta
      ]);

      connection.query(preguntasSQL, [values], (err2) => {
        if (err2) return res.status(500).json({ error: err2.message });

        res.json({
          message: "Encuesta y preguntas creadas correctamente",
          idEncuesta,
          totalPreguntas: preguntas.length
        });
      });
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
