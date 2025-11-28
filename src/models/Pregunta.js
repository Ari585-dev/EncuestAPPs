import connection from "../config/database.js";

export const PreguntaModel = {
  crear: (pregunta, callback) => {
    const sql = `
      INSERT INTO pregunta (texto, tipo, orden, idEncuesta)
      VALUES (?, ?, ?, ?)
    `;

    connection.query(
      sql,
      [pregunta.texto, pregunta.tipo, pregunta.orden, pregunta.idEncuesta],
      callback
    );
  }
};