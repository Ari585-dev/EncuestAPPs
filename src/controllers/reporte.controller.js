import { Encuesta } from "../models/Encuesta.js";
import { RespuestaEncuesta } from "../models/RespuestaEncuesta.js";
import { RespuestaPregunta } from "../models/RespuestaPregunta.js";

export const obtenerReporte = async (req, res) => {
  const { encuestaId } = req.params;

  const respuestas = await RespuestaEncuesta.findAll({
    where: { EncuestumIdEncuesta: encuestaId },
    include: [RespuestaPregunta]
  });

  res.json(respuestas);
};