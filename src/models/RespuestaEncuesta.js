import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";
import { Encuesta } from "./Encuesta.js";

export const RespuestaEncuesta = sequelize.define("RespuestaEncuesta", {
  idRespuesta: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  fechaRespuesta: DataTypes.DATE,
  canal: DataTypes.ENUM("Web", "WhatsApp")
});

Encuesta.hasMany(RespuestaEncuesta);
RespuestaEncuesta.belongsTo(Encuesta);