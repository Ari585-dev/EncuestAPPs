import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";
import { Empresa } from "./Empresa.js";

export const Encuesta = sequelize.define("Encuesta", {
  idEncuesta: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  titulo: DataTypes.STRING,
  descripcion: DataTypes.STRING,
  fechaInicio: DataTypes.DATE,
  fechaFin: DataTypes.DATE,
  enlaceLargo: DataTypes.STRING,
  enlaceCorto: DataTypes.STRING,
  qrCode: DataTypes.STRING,
  estado: DataTypes.ENUM("Activa", "Inactiva"),
  canal: DataTypes.ENUM("Web", "WhatsApp")
});

Empresa.hasMany(Encuesta);
Encuesta.belongsTo(Empresa);