import express from "express";
import { RespuestaController } from "../controllers/respuesta.controller.js";

const router = express.Router();

router.post("/respuestas", RespuestaController.guardar);
router.get("/respuesta/empresa/:idEmpresa", RespuestaController.contar);
router.get("/respuesta/usuario/:idEmpresa", RespuestaController.contarUsuarios);


export default router;
