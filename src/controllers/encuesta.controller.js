import { Encuesta } from "../models/Encuesta.js";
import { Pregunta } from "../models/Pregunta.js";
import { OpcionRespuesta } from "../models/OpcionRespuesta.js";

export const crearEncuesta = async (req, res) => {
  try {
    const { empresaId, titulo, descripcion, preguntas } = req.body;

    const encuesta = await Encuesta.create({
      EmpresaIdEmpresa: empresaId,
      titulo,
      descripcion,
      estado: "Activa"
    });

    for (const p of preguntas) {
      const pregunta = await Pregunta.create({
        texto: p.texto,
        tipo: p.tipo,
        orden: p.orden,
        EncuestumIdEncuesta: encuesta.idEncuesta
      });

      if (p.opciones) {
        for (const o of p.opciones) {
          await OpcionRespuesta.create({
            texto: o.texto,
            valor: o.valor,
            PreguntumIdPregunta: pregunta.idPregunta
          });
        }
      }
    }

    res.json({ message: "Encuesta creada", encuesta });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};