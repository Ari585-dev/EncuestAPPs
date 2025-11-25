import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";

export const Empresa = sequelize.define("Empresa", {
  idEmpresa: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  nombre: DataTypes.STRING,
  nit: DataTypes.STRING,
  direccion: DataTypes.STRING,
  telefono: DataTypes.STRING
});
