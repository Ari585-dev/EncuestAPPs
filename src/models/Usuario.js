import connection from "../config/database.js";

export const UsuarioModel = {

  create: (data, callback) => {
    // 1. Buscar empresa por nombre
    const empresaQuery = `SELECT idEmpresa FROM empresa WHERE nombre = ? LIMIT 1`;

    connection.query(empresaQuery, [data.empresaNombre], (err, rows) => {
      if (err) return callback(err);

      if (rows.length === 0) {
        return callback(new Error("La empresa no existe"));
      }

      const empresaId = rows[0].idEmpresa;

      // 2. Insertar usuario usando ese ID
      const insertQuery = `
        INSERT INTO usuario (nombre, apellidos, email, perfil, estado, passwd, idEmpresa)
        VALUES (?, ?, ?, ?, 'Activo', ?, ?)
      `;

      connection.query(
        insertQuery,
        [
          data.nombre,
          data.apellidos,
          data.email,
          data.perfil,
          data.passwd,
          empresaId
        ],
        callback
      );
    });
  },

  login: (email, passwd, callback) => {
    connection.query(
      `SELECT nombre, apellidos, email, perfil, estado, idEmpresa
       FROM usuario 
       WHERE email = ? AND passwd = ? AND estado = 'Activo'`,
      [email, passwd],
      callback
    );
  }
};
