import { EmpresaModel } from "../models/Empresa.js";

export const EmpresaController = {
  crearEmpresa: (req, res) => {
    EmpresaModel.create(req.body, (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ message: "Empresa registrada", id: result.insertId });
    });
  },

  listarEmpresas: (req, res) => {
    EmpresaModel.findAll((err, rows) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json(rows);
    });
  }
};