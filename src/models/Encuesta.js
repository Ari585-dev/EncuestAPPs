import connection from "../config/database.js";

export const EncuestaModel = {
  crear: (data, callback) => {
    const sql = `
      INSERT INTO encuesta (titulo, descripcion, fechaInicio, fechaFin, idEmpresa, canal, Cant_Preguntas, estado)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;

    connection.query(
      sql,
      [
        data.titulo,
        data.descripcion,
        data.fechaInicio,
        data.fechaFin,
        data.idEmpresa,
        data.canal,
        data.Cant_Preguntas,
        data.estado
      ],
      callback
    );
  },

  listarPorEmpresa: (idEmpresa, callback) => {
    connection.query(
      "SELECT idEncuesta, titulo, estado, fechaInicio, fechaFin FROM encuesta WHERE idEmpresa = ?",
      [idEmpresa],
      callback
    );
  },

  obtenerResultados: (idEncuesta, callback) => {
    connection.query(
      `
        SELECT p.texto AS pregunta, rp.respuestaTexto, o.texto AS opcion
        FROM respuesta_encuesta re
        JOIN respuesta_pregunta rp ON rp.idRespuesta = re.idRespuesta
        JOIN pregunta p ON p.idPregunta = rp.idPregunta
        LEFT JOIN opcionrespuesta o ON o.idOpcion = rp.opcionSeleccionada
        WHERE re.idEncuesta = ?
      `,
      [idEncuesta],
      callback
    );
  },

getEncuestaConPreguntas: (idEncuesta, callback) => {
    const sql = `
        SELECT 
            e.idEncuesta,
            e.titulo,
            e.descripcion,
            e.fechaInicio,
            e.fechaFin,
            p.idPregunta,
            p.texto AS pregunta,
            p.tipo,
            o.idOpcionPregunta,
            o.texto AS opcionTexto
        FROM encuesta e
        LEFT JOIN pregunta p ON p.idEncuesta = e.idEncuesta
        LEFT JOIN opcionpregunta o ON o.idPregunta = p.idPregunta
        WHERE e.idEncuesta = ?;
    `;

    connection.query(sql, [idEncuesta], callback);
},

contarEncuestas: (idEmpresa, callback) => {
  const sql = `
    SELECT COUNT(*) AS total
    FROM encuesta
    WHERE idEmpresa = ?
  `;

  connection.query(sql, [idEmpresa], callback);
}

};
