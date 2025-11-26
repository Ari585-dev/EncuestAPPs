import connection from "../config/database.js";

export const EmpresaModel = {
  create: (data, callback) => {
    const query = `INSERT INTO empresa (nombre, nit, direccion, telefono)
                   VALUES (?, ?, ?, ?)`;

    connection.query(
      query,
      [data.nombre, data.nit, data.direccion, data.telefono],
      callback
    );
  },

  findAll: (callback) => {
    connection.query("SELECT * FROM empresa", callback);
  },

  findAll: (callback) => {
        connection.query(
      "SELECT * FROM empresa WHERE nombre = ?",
      [nombre],
      callback
        );
  }
  
};