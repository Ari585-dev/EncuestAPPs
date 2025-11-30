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
    }
};
