const express = require("express");
const { registerUser, loginUser } = require("../Controllers/User.Controllers");
const { auth } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/user",auth , (req, res) => {
    res.json({ user: req.user });
  });
  
module.exports = router;
