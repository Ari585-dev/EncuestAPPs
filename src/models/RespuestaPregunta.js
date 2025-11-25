import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";
import { Pregunta } from "./Pregunta.js";
import { OpcionRespuesta } from "./OpcionRespuesta.js";
import { RespuestaEncuesta } from "./RespuestaEncuesta.js";

export const RespuestaPregunta = sequelize.define("RespuestaPregunta", {
  idRespPregunta: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  respuestaTexto: DataTypes.STRING
});

RespuestaEncuesta.hasMany(RespuestaPregunta);
RespuestaPregunta.belongsTo(RespuestaEncuesta);

Pregunta.hasMany(RespuestaPregunta);
RespuestaPregunta.belongsTo(Pregunta);

OpcionRespuesta.hasMany(RespuestaPregunta);
RespuestaPregunta.belongsTo(OpcionRespuesta);