import connection from "../config/database.js";
import bcrypt from "bcrypt";

export const UsuarioModel = {

  create: async (data, callback) => {
    try {
      // 1. Buscar empresa por nombre
      const empresaQuery = `SELECT idEmpresa FROM empresa WHERE nombre = ? LIMIT 1`;

      connection.query(empresaQuery, [data.empresaNombre], async (err, rows) => {
        if (err) return callback(err);

        if (rows.length === 0) {
          return callback(new Error("La empresa no existe"));
        }

        const empresaId = rows[0].idEmpresa;

        // 🔐 2. Encriptar contraseña
        const hashedPassword = await bcrypt.hash(data.passwd, 10);

        // 3. Insertar usuario
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
            hashedPassword,
            empresaId
          ],
          callback
        );
      });

    } catch (error) {
      callback(error);
    }
  },

  login: (email, passwd, callback) => {
    const query = `
      SELECT idUsuario, nombre, apellidos, email, perfil, estado, idEmpresa, passwd
      FROM usuario
      WHERE email = ? AND estado = 'Activo'
      LIMIT 1
    `;

    connection.query(query, [email], async (err, rows) => {
      if (err) return callback(err);

      if (rows.length === 0) {
        return callback(null, []); // usuario no encontrado
      }

      const user = rows[0];

      // Comparar contraseña
      const isMatch = await bcrypt.compare(passwd, user.passwd);

      if (!isMatch) {
        return callback(null, []); // contraseña incorrecta
      }

      // Evitar devolver el hash
      delete user.passwd;

      callback(null, [user]);
    });
  }
};
