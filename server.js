import express from "express";
import cors from "cors";
import empresaRoutes from "./src/routes/empresa.routes.js";
import usuarioRoutes from "./src/routes/usuario.routes.js";
import encuestaRoutes from "./src/routes/encuesta.routes.js";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api", empresaRoutes);
app.use("/api", usuarioRoutes);
app.use("/api", encuestaRoutes);

app.listen(3000, () =>
  console.log("🚀 Server running on http://localhost:3000")
);