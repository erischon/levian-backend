import mongoose from "mongoose";

// Define a schema for a customer
const CustomerSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  projects: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project",
    },
  ],
});

// Define a schema for a project
const ProjectSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  name: {
    type: String,
    required: true,
    unique: true,
  },
  client: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Customer",
    required: true,
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
  },
  status: {
    type: String,
    required: true,
    enum: ["in_progress", "completed", "canceled"],
  },
  tasks: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Task",
    },
  ],
});

// Define a schema for a task
const TaskSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
  },
  status: {
    type: String,
    enum: ["in_progress", "completed", "canceled"],
  },
  project: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Project",
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  timeLogs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "TimeLog",
    },
  ],
});

// Define a schema for TimeLog
const TimeLogSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  task: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Task",
  },
});

const customerModel = mongoose.model("Customer", CustomerSchema);
const projectModel = mongoose.model("Project", ProjectSchema);
const taskModel = mongoose.model("Task", TaskSchema);
const timeLogModel = mongoose.model("TimeLog", TimeLogSchema);

export { customerModel, projectModel, taskModel, timeLogModel };