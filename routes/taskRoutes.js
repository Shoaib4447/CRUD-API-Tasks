import express from "express";

const router = express.Router();

// GET All tasks(read task)
router.get("/", (req, res) => {});

// GET Task by id(read single task)
router.get("/:id", (req, res) => {});

// POST a task (create)
router.post("/", (req, res) => {});

// PUT a task by id (update)

router.put("/:id", (req, res) => {});

// DELETE a task by id (delete)

router.delete("/:id", (req, res) => {});

export default router;
