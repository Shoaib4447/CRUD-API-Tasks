import express from "express";
import dotenv from "dotenv";
import connectDDB from "./config/db.js";
import taskRouter from "./routes/taskRoutes.js";
import cors from "cors";

dotenv.config();

const app = express();
app.use(express.json());

const allowedOrigins = ["http://localhost:5173"];
app.use(cors({ origin: "https://fluent-ui-task-creation.vercel.app/" }));
// Routes
app.use("https://crud-api-tasks.vercel.app/api/tasks", taskRouter);

// DB connection
connectDDB();
// PORT
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running at port ${PORT}`));
