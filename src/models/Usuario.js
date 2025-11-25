import connection from "../config/database.js";

export const UsuarioModel = {
  create: (data, callback) => {
    const query = `
      INSERT INTO usuario (nombre, apellidos, email, perfil, estado, passwd, idEmpresa)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `;

    connection.query(
      query,
      [
        data.nombre,
        data.apellidos,
        data.email,
        data.perfil,
        data.estado,
        data.passwd,   // ← AQUÍ estaba el error
        data.idEmpresa
      ],
      callback
    );
  },

  login: (email, passwd, callback) => {
    connection.query(
      `SELECT nombre, apellidos, email, perfil, estado FROM usuario WHERE email = ? AND passwd = ? AND estado = 'Activo'`,
      [email, passwd],
      callback
    );
  }
};