import express from "express";
import db from "./models/index.js";
import studentRoutes from "./routes/student.routes.js";
import certificateRoutes from "./routes/certificate.routes.js";

const app = express();
app.use(express.json());

// Routes
app.use("/students", studentRoutes);
app.use("/certificates", certificateRoutes);

// Sync DB (dev only, use migrations in prod)
db.sequelize.authenticate()
  .then(() => console.log("Database connected..."))
  .catch(err => console.error("DB connection error:", err));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
