const bcrypt = require("bcryptjs");
const User = require("../Models/User.models");
const jwt = require('jsonwebtoken')

exports.registerUser = async (req, res) => {
  try {
    const { fullname, email, password } = req.body;

   
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: "Email already exists" });


    const hashedPassword = await bcrypt.hash(password, 10);

  
    const newUser = new User({ fullname, email, password: hashedPassword });
    await newUser.save();


    res.status(201).json({
      message: "User registered successfully",
      user: { id: newUser._id, fullname, email },
    });

  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};



exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log("body", req.body);

    let user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });


    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" });


    const token = jwt.sign(
      { _id: user._id, email: user.email },
      "QWERTYUIO12345",
      { expiresIn: "1h" }
    );

    
    res.status(200).json({
      message: "Login successful",
      token,
      user,
    });
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};




