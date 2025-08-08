import express from "express";
import {
  createTask,
  getAllTasks,
  getSingleTask,
  updateTask,
  deleteTask,
  searchTaskbyTitleAndStatus,
} from "../controllers/taskController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

router.use(authMiddleware);
// POST a task (create)
router.post("/", createTask);

// GET All tasks(read task)
router.get("/", getAllTasks);

// GET filtered Tasks by title and status
router.get("/search", searchTaskbyTitleAndStatus);

// GET Task by id(read single task)
router.get("/:id", getSingleTask);

// PUT a task by id (update)
router.put("/:id", updateTask);

// DELETE a task by id (delete)
router.delete("/:id", deleteTask);

export default router;
