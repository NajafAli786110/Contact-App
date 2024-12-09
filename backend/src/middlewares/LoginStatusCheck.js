const jwt = require("jsonwebtoken");

function LoginStatusCheck(req, res, next) {
  // const token = req.headers.authorization?.split(" ")[1]?.trim();
  const token = JSON.parse(req.headers.authorization);

  try {
    const decode = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = decode;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized: Invalid Token" });
  }
}

module.exports = LoginStatusCheck;
