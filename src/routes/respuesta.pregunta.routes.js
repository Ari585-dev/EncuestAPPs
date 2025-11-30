import express from "express";
import { RespuestaController } from "../controllers/respuesta.controller.js";

const router = express.Router();

router.post("/respuestas", RespuestaController.guardar);

export default router;
