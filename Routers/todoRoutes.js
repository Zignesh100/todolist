const express = require("express");
const { addTask, getTasks,deleteTask ,editTask} = require("../Controllers/Todolist.controllers");
const { auth } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/todos", auth, addTask);
router.get("/todos", auth, getTasks);
router.delete('/tasks/:_id', auth, deleteTask);
router.put('/tasks/:_id',auth, editTask); 
module.exports = router;
