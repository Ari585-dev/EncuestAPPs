import connection from "../config/database.js";

export const RespuestaPreguntaModel = {
    guardarRespuestas: (idUsuario, respuestas, callback) => {
        const sql = `
            INSERT INTO respuesta_pregunta (respuestaTexto, idPregunta, idUsuario)
            VALUES ?
        `;

        const values = respuestas.map(r => [
            r.respuestaTexto,
            r.idPregunta,
            idUsuario
        ]);

        connection.query(sql, [values], callback);
    },

contarRespuestas: (idEmpresa, callback) => {
  const sql = `
    SELECT COUNT(*) AS total
    FROM respuesta_pregunta rp
    INNER JOIN pregunta p ON rp.idPregunta = p.idPregunta
    INNER JOIN encuesta e ON p.idEncuesta = e.idEncuesta
    WHERE e.idEmpresa = ?;
  `;

  connection.query(sql, [idEmpresa], callback);
}


};
