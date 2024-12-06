function LoginStatusCheck(req, res, next) {
  const currUser = req.currUser || null;
  console.log("Coming from Middleware", currUser);

  if (!currUser) {
    return res.status(400).json({ message: "Please log in first" });
  }

  console.log("Current User:", currUser);
  next();
}

module.exports = LoginStatusCheck;
