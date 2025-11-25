import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";
import { Encuesta } from "./Encuesta.js";

export const Pregunta = sequelize.define("Pregunta", {
  idPregunta: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  texto: DataTypes.STRING,
  tipo: DataTypes.ENUM("ABIERTA", "OPCION", "MULTIPLE", "SI_NO"),
  orden: DataTypes.INTEGER
});

Encuesta.hasMany(Pregunta);
Pregunta.belongsTo(Encuesta);