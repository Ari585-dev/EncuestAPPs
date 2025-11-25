import { Router } from "express";
import { crearEmpresa } from "../controllers/empresa.controller.js";

const router = Router();

router.post("/", crearEmpresa);

export default router;