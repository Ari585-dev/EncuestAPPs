import connection from "../config/database.js";

export const EncuestaModel = {
  crear: (data, callback) => {
    const sql = `
      INSERT INTO encuesta (titulo, descripcion, fechaInicio, fechaFin, idEmpresa)
      VALUES (?, ?, ?, ?, ?)
    `;
    connection.query(
      sql,
      [data.titulo, data.descripcion, data.fechaInicio, data.fechaFin, data.idEmpresa],
      callback
    );
  },

  listarPorEmpresa: (idEmpresa, callback) => {
    connection.query(
      "SELECT * FROM encuesta WHERE idEmpresa = ?",
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
  }
};