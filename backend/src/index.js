const express = require("express");
const dotenv = require("dotenv").config();
const mongoose = require("mongoose");
const cors = require("cors");
const dbConnection = require("./config/dbConnection");
const UserRouter = require("./routes/UserRoute");
const verifyEmail = require("./controllers/verifyEmail");
const ContactRouter = require("./routes/contactRoutes");
const LoginStatusCheck = require("./middlewares/LoginStatusCheck");

const app = express();
const PORT = process.env.PORT || 5001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

// Mongo DB Connection
dbConnection();

app.get("/", (req, res) => {
  return res.send("Hello from Server");
});

app.use("/api/auth", UserRouter);
app.use("/api/contact", ContactRouter);
app.get("/verify/:token", verifyEmail);

app.listen(PORT, (req, res) => {
  console.log(`Server Started at PORT ${PORT}`);
});
