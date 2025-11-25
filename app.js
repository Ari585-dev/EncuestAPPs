import express from "express";
import cors from "cors";
import empresaRoutes from "./src/routes/empresa.routes.js";
//import encuestaRoutes from "./src/routes/encuesta.routes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/empresa", empresaRoutes);
//app.use("/encuesta", encuestaRoutes);

export default app;