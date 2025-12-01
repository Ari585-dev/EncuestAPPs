import express from "express";
import { ReporteController } from "../controllers/reporte.controller.js";

const router = express.Router();

router.get("/exportar/:idEmpresa/excel", ReporteController.exportExcel);
router.get("/exportar/:idEmpresa/pdf", ReporteController.exportPDF);

export default router;