import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";
import { Pregunta } from "./Pregunta.js";

export const OpcionRespuesta = sequelize.define("OpcionRespuesta", {
  idOpcion: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  texto: DataTypes.STRING,
  valor: DataTypes.INTEGER
});

Pregunta.hasMany(OpcionRespuesta);
OpcionRespuesta.belongsTo(Pregunta);