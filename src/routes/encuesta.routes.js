import express from "express";
import { EncuestaController } from "../controllers/encuesta.controller.js";

const router = express.Router();

// Crear encuesta
router.post("/", EncuestaController.crear);

// Listar encuestas de una empresa
router.get("/empresa/:idEmpresa", EncuestaController.listarPorEmpresa);

// Obtener resultados de una encuesta
router.get("/:idEncuesta/resultados", EncuestaController.obtenerResultados);

export default router;