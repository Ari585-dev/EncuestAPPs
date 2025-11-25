import express from "express";
import { EmpresaController } from "../controllers/empresa.controller.js";

const router = express.Router();

router.post("/empresa", EmpresaController.crearEmpresa);
router.get("/empresa", EmpresaController.listarEmpresas);

export default router;