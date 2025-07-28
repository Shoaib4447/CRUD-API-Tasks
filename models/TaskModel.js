import mongoose from "mongoose";

const TaskSchema = new mongoose.Schema(
  {
    taskName: { type: String, required: true },
    dateInitiated: { type: Date },
    dueDate: Date,
    assignedTo: String,
    priority: String,
    assignStatus: String,
    actionItems: String,
    materials: [
      {
        materialName: { type: String, required: true },
        materialQuantity: Number,
        materialUnit: String,
      },
    ],
  },
  { timestamps: true }
);

// Create model from schema
const Task = mongoose.model("Task", TaskSchema);

export default Task;
