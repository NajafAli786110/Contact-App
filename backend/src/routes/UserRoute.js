const express = require("express");
const { login, register } = require("../controllers/UserController");
const UsersRouter = express.Router();

UsersRouter.post("/login", login);
UsersRouter.post("/register", register);

module.exports = UsersRouter;