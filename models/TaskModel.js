import mongoose from "mongoose";

const TaskSchema = new mongoose.Schema(
  {
    taskName: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
      maxlength: 30,
    },
    dateInitiated: { type: Date, trim: true },
    dueDate: { type: Date, trim: true },
    assignedTo: { type: String, trim: true },
    priority: { type: String, enum: ["Low", "Medium", "High"] },
    assignStatus: { type: String, enum: ["To Do", "In Progress", "Done"] },
    actionItems: { type: String, trim: true, maxlength: 100 },
    materials: [
      {
        materialName: {
          type: String,
          required: true,
          trim: true,
          maxlength: 20,
        },
        materialQuantity: { type: Number, required: true, min: 1 },
        materialUnit: {
          type: String,
          required: true,
        },
      },
    ],
    description: { type: String, trim: true, maxlength: 100 },
  },
  { timestamps: true }
);

// Create model from schema
const Task = mongoose.model("Task", TaskSchema);

export default Task;
