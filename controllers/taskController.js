import Task from "../models/TaskModel.js";

// @desc    create a task
// route    POST /api/tasks
export const createTask = async (req, res) => {
  try {
    // get data from body
    const {
      taskName,
      dateInitiated,
      dueDate,
      assignedTo,
      priority,
      assignStatus,
      actionItems,
      materials,
      description,
    } = req.body;
    // create new task
    const newTask = new Task({
      taskName,
      dateInitiated,
      dueDate,
      assignedTo,
      priority,
      assignStatus,
      actionItems,
      materials,
      description,
    });

    // Save new Task
    const savedTask = await newTask.save();
    res.status(201).json({ data: savedTask });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    All tasks(read task)
// route    GET /api/tasks
export const getAllTasks = async (req, res) => {
  try {
    // get page no
    const page = parseInt(req.query.page) || 1;
    // get limit
    const limit = parseInt(req.query.limit) || 10;
    //documets to be skipped
    const skip = (page - 1) * 10;

    // count all documents in collection
    const totalTasks = await Task.countDocuments();
    const tasks = await Task.find().skip(skip).limit(limit);

    const allTasks = await Task.find();
    res.status(200).json({
      page,
      limit,
      totalPages: Math.ceil(totalTasks / limit),
      totalTasks,
      tasks,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Task by id(read single task)
// route    GET /api/tasks/:id
export const getSingleTask = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Task.findById(id);

    if (!task) {
      return res.status(404).json({ message: "Task not Found" });
    }
    res.status(200).json({ data: task });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update a task by id
// route    PUT /api/tasks/:id
export const updateTask = async (req, res) => {
  try {
    const id = req.params.id;
    const taskNewData = req.body;

    const updatedTask = await Task.findByIdAndUpdate(id, taskNewData, {
      new: true,
      runValidators: true,
    });
    if (!updatedTask) {
      return res.status(404).json({ message: "Task Not Found to update" });
    }
    res.status(200).json({ data: updatedTask });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete a task by id
// route    DELETE /api/tasks/:id
export const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Task.findByIdAndDelete(id);

    if (!task) {
      return res.status(404).json({ message: "Task Not Found" });
    }
    res.status(200).json({ message: "Task deleted", id: id });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Search a task by title && status
// route    GET /api/tasks/search?title=...&status=...
export const searchTaskbyTitleAndStatus = async (req, res) => {
  try {
    const { title, status } = req.query;
    let query = {};

    if (title) query.taskName = { $regex: title, $options: "i" };
    if (status) query.assignStatus = status;

    const filteredTask = await Task.find(query);
    if (!filteredTask.length) {
      res.status(404).json({ message: "No matching tasks found" });
    }

    return res.status(200).json({ tasks: filteredTask });
  } catch (error) {
    console.error("Search error:", error);
    res.status(500).json({ message: "Server Error", error });
  }
};
