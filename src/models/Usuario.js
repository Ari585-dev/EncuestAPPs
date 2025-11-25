import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";
import { Empresa } from "./Empresa.js";

export const Usuario = sequelize.define("Usuario", {
  idUsuario: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  nombre: DataTypes.STRING,
  email: DataTypes.STRING,
  perfil: DataTypes.ENUM("supAdmin", "Creador", "Analista"),
  rol: DataTypes.ENUM("supAdmin", "Creador", "Analista"),
  estado: DataTypes.ENUM("Activo", "Inactivo"),
  contraseña: DataTypes.STRING
});

Empresa.hasMany(Usuario);
Usuario.belongsTo(Empresa);