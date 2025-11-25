import { Empresa } from "../models/Empresa.js";
import { Usuario } from "../models/Usuario.js";
import bcrypt from "bcrypt";

export const crearEmpresa = async (req, res) => {
  try {
    const { nombre, nit, direccion, telefono, usuarioAdmin } = req.body;

    const empresa = await Empresa.create({ nombre, nit, direccion, telefono });

    const hash = await bcrypt.hash(usuarioAdmin.contraseña, 10);

    await Usuario.create({
      nombre: usuarioAdmin.nombre,
      email: usuarioAdmin.email,
      contraseña: hash,
      perfil: "supAdmin",
      rol: "supAdmin",
      estado: "Activo",
      EmpresaIdEmpresa: empresa.idEmpresa
    });

    res.json({ message: "Empresa creada", empresa });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};