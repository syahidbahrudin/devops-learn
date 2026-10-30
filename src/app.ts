import express from "express";
import healthRoutes from "./routes/health.routes";
import taskRoutes from "./routes/tasks.routes";

const app = express();

app.use(express.json());

app.use("/health", healthRoutes);
app.use("/api/tasks", taskRoutes);

export default app;