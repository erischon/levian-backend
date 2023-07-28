import mongoose from "mongoose";

// Define a schema for a customer
const CustomerSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  name: {
    type: String,
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
});

// Define a schema for a project
const ProjectSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Customer",
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
    required: true,
    enum: ["in_progress", "completed", "canceled"],
  },
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
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

// Define a schema for Hours
const HoursSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true,
  },
  hours: {
    type: Number,
    required: true,
  },
  task: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Task",
    required: true,
  },
});

const customerModel = mongoose.model("Customer", CustomerSchema);
const projectModel = mongoose.model("Project", ProjectSchema);
const taskModel = mongoose.model("Task", TaskSchema);
const hoursModel = mongoose.model("Hours", HoursSchema);

export { customerModel, projectModel, taskModel, hoursModel };
