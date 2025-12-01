import { EncuestaModel } from "../models/Encuesta.js";
import connection from "../config/database.js";

export const EncuestaController = {

crear: (req, res) => {
    const data = req.body;
    const preguntas = data.preguntas || [];

    // 1. Crear encuesta
    EncuestaModel.crear(data, (err, result) => {
        if (err) return res.status(500).json({ error: err.message });

        const idEncuesta = result.insertId;

        if (preguntas.length === 0) {
            return res.json({ message: "Encuesta sin preguntas creada", idEncuesta });
        }

        // 2. Insertar preguntas
        const preguntasSQL = `
            INSERT INTO pregunta (texto, tipo, orden, idEncuesta)
            VALUES ?
        `;

        const valuesPreg = preguntas.map(p => [
            p.texto,
            p.tipo,
            p.orden,
            idEncuesta
        ]);

        connection.query(preguntasSQL, [valuesPreg], (errPreg, resultPreg) => {
            if (errPreg) return res.status(500).json({ error: errPreg.message });

            const insertedIds = resultPreg.insertId; 
            let currentId = insertedIds;

            // 3. Insertar opciones
            const opcionesQuery = `
                INSERT INTO opcionpregunta (idPregunta, texto)
                VALUES ?
            `;

            const opcionesValues = [];

            preguntas.forEach((pregunta, i) => {
                const idPregunta = currentId + i;

                if (pregunta.opciones && pregunta.opciones.length > 0) {
                    pregunta.opciones.forEach(op => {
                        opcionesValues.push([idPregunta, op]);
                    });
                }
            });

            if (opcionesValues.length === 0) {
                return res.json({
                    message: "Encuesta creada sin opciones",
                    idEncuesta
                });
            }

            connection.query(opcionesQuery, [opcionesValues], (errOpt) => {
                if (errOpt) return res.status(500).json({ error: errOpt.message });

                return res.json({
                    success: true,
                    message: "Encuesta, preguntas y opciones creadas correctamente",
                    idEncuesta
                });
            });
        });
    });
},

  listarPorEmpresa: (req, res) => {
    const { idEmpresa } = req.params;
          console.log("ID recibido:", idEmpresa);
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
  },

listaPorEncuesta: (req, res) => {
    const { idEncuesta } = req.params;

    EncuestaModel.getEncuestaConPreguntas(idEncuesta, (err, rows) => {
        if (err) {
            return res.status(500).json({
                error: "Error al obtener la encuesta",
                detalle: err
            });
        }

        if (!rows || rows.length === 0) {
            return res.status(404).json({ error: "Encuesta no encontrada" });
        }


        // Datos generales
        const encuesta = {
            idEncuesta: rows[0].idEncuesta,
            titulo: rows[0].titulo,
            descripcion: rows[0].descripcion || "",
            fechaInicio: rows[0].fechaInicio ? rows[0].fechaInicio.toISOString().split("T")[0] : null,
            fechaFin: rows[0].fechaFin ? rows[0].fechaFin.toISOString().split("T")[0] : null,
            preguntas: []
        };

        const preguntasMap = {};

        rows.forEach(r => {
            if (!r.idPregunta) return;

            if (!preguntasMap[r.idPregunta]) {
                preguntasMap[r.idPregunta] = {
                    idPregunta: r.idPregunta,
                    pregunta: r.pregunta,
                    tipo: r.tipo,
                    opciones: []
                };
            }


            if (r.idOpcionPregunta) {
                preguntasMap[r.idPregunta].opciones.push({
                    idOpcionPregunta: r.idOpcionPregunta,
                    texto: r.opcionTexto
                });
            }
        });


        encuesta.preguntas = Object.values(preguntasMap);

        res.json(encuesta);
    });
},

contarEncuestas: (req, res) => {
    const { idEmpresa } = req.params;

    if (!idEmpresa) {
        return res.status(400).json({ error: "Falta idEmpresa" });
    }

    EncuestaModel.contarEncuestas(idEmpresa, (err, result) => {
        if (err) return res.status(500).json({ error: err.message });

        const total = result[0]?.total ?? 0;

        res.json({ totalEncuestas: total });
    });
}




};
