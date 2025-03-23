
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const userRoutes =require("./Routers/User.routers")
const taskRoutes = require("./Routers/todoRoutes")
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());


app.use("/api", userRoutes);
app.use("/api",taskRoutes)


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

// --------- MongoDB Database Connection ------------
const DB =  process.env.MONGO_URI
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log(" MongoDB Connected Successfully!"))
  .catch((error) => console.error("MongoDB Connection Error:", error));
