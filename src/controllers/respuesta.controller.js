import { RespuestaPreguntaModel } from "../models/RespuestaPregunta.js";

export const RespuestaController = {
  // Guarda las respuestas (ya existente, ajustado para consistencia)
  guardar: (req, res) => {
    const { idEncuesta, idUsuario, respuestas } = req.body;

    if (!respuestas || !Array.isArray(respuestas)) {
      return res.status(400).json({ error: "Formato de respuestas inválido" });
    }

    if (!idUsuario) {
      return res.status(400).json({ error: "Falta idUsuario" });
    }

    RespuestaPreguntaModel.guardarRespuestas(idUsuario, respuestas, (err) => {
      if (err) return res.status(500).json({ error: err.message });

      res.json({ message: "Respuestas guardadas correctamente" });
    });
  },

  // Cuenta respuestas por idEmpresa
contar: (req, res) => {
    const { idEmpresa } = req.params;

    if (!idEmpresa) {
        return res.status(400).json({ error: "Falta idEmpresa" });
    }

    RespuestaPreguntaModel.contarRespuestas(idEmpresa, (err, result) => {
        if (err) return res.status(500).json({ error: err.message });

        const total = result[0]?.total ?? 0;

        res.json({ totalRespuestas: total });
    });
}

};
