import express from "express";
import {
  createTask,
  getAllTasks,
  getSingleTask,
  updateTask,
  deleteTask,
} from "../controllers/taskController.js";

const router = express.Router();

// POST a task (create)
router.post("/", createTask);

// GET All tasks(read task)
router.get("/", getAllTasks);

// GET Task by id(read single task)
router.get("/:id", getSingleTask);

// PUT a task by id (update)
router.put("/:id", updateTask);

// DELETE a task by id (delete)
router.delete("/:id", deleteTask);

export default router;
