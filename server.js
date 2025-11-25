import app from "./app.js";
import { sequelize } from "./src/config/database.js";

await sequelize.sync({ alter: true });

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Servidor en puerto " + PORT));