const Task = require("../Models/Todolist");

exports.getTasks = async (req, res) => {
  try {
    if (!req.user || !req.user._id) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized: User ID not found",
      });
    }

    const tasks = await Task.find({ user: req.user._id });

    res.status(200).json({
      success: true,
      tasks,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching tasks",
      error: error.message,
    });
  }
};

exports.addTask = async (req, res) => {
  try {
    console.log("Incoming Request:", req.body);

    const { title, description, dueDate } = req.body;

    if (!title || !description || !dueDate) {
      return res.status(400).json({
        success: false,
        message: "All fields (title, description, dueDate) are required",
      });
    }

    if (!req.user || !req.user._id) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized: User ID not found in request",
      });
    }

    const newTask = new Task({
      title,
      description,
      dueDate,
      user: req.user._id,
    });

    await newTask.save();
    console.log("Task Saved Successfully:", newTask);

    res.status(201).json({
      success: true,
      message: "Task added successfully",
      task: newTask,
    });
  } catch (error) {
    console.error(" Error in addTask:", error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error: Could not add task",
      error: error.message,
    });
  }
};

exports.deleteTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params._id);

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    if (task.user.toString() !== req.user._id) {
      return res
        .status(403)
        .json({ message: "Unauthorized to delete this task" });
    }

    await task.deleteOne();
    res.json({ message: "Task deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting task" });
  }
};

exports.editTask = async (req, res) => {
  try {
    const taskId = req.params._id;
    const { title, description, dueDate } = req.body;
    console.log("reqbody", req.body);

    if (!title && !description && !dueDate) {
      return res.status(400).json({
        success: false,
        message:
          "At least one field (title, description, or dueDate) is required to update",
      });
    }

    if (!req.user || !req.user._id) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized: User ID not found in request",
      });
    }

    const task = await Task.findById(taskId);

    if (!task) {
      return res
        .status(404)
        .json({ success: false, message: "Task not found" });
    }

    if (task.user.toString() !== req.user._id.toString()) {
      return res
        .status(403)
        .json({
          success: false,
          message: "Unauthorized: You can't edit this task",
        });
    }

    if (title) task.title = title;
    if (description) task.description = description;
    if (dueDate) task.dueDate = dueDate;

    await task.save();

    res.status(200).json({
      success: true,
      message: "Task updated successfully",
      task,
    });
  } catch (error) {
    console.error("Error in editTask:", error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error: Could not update task",
      error: error.message,
    });
  }
};
