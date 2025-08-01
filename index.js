import express from "express";
import dotenv from "dotenv";
import connectDDB from "./config/db.js";
import taskRouter from "./routes/taskRoutes.js";
import cors from "cors";

dotenv.config();

const app = express();
app.use(express.json());

app.use(cors());
// Routes
app.use("/api/tasks", taskRouter);

// DB connection
connectDDB();
// PORT
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running at port ${PORT}`));
