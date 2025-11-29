import express from "express";
import cors from "cors";
import empresaRoutes from "./src/routes/empresa.routes.js";
import usuarioRoutes from "./src/routes/usuario.routes.js";
import encuestaRoutes from "./src/routes/encuesta.routes.js";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
app.use(cors());
app.use(express.json());

app.use("/api", empresaRoutes);
app.use("/api", usuarioRoutes);
app.use("/api", encuestaRoutes);
// Servir el login
app.get("/login", (req, res) => {
  res.sendFile(path.join(__dirname, "src/views/login.html"));
});

app.get("/register", (req, res) => {
  res.sendFile(path.join(__dirname, "src/views/register.html"));
});

app.get("/dashboard", (req, res) => {
  res.sendFile(path.join(__dirname, "src/views/dashboard.html"));
});

app.get("/surveys", (req, res) => {
  res.sendFile(path.join(__dirname, "src/views/surveys.html"));
});

app.get("/reports", (req, res) => {
  res.sendFile(path.join(__dirname, "src/views/reports.html"));
});

app.get("/surveys/builder", (req, res) => {
  res.sendFile(path.join(__dirname, "src/views/survey-builder.html"));
});

app.get("/surveys/:id", (req, res) => {
    res.sendFile(path.join(__dirname, 'src/views/survey-view.html'));
});

app.listen(3000, () =>
  console.log("🚀 Server running on http://localhost:3000")
);