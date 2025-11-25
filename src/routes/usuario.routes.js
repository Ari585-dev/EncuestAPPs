import express from "express";
import { UsuarioController } from "../controllers/usuario.controller.js";

const router = express.Router();

router.post("/usuario/registro", UsuarioController.registrar);
router.post("/usuario/login", UsuarioController.login);

export default router;