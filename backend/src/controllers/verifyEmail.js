const jwt = require("jsonwebtoken");
const Users = require("../model/userModel");

async function verifyEmail(req, res) {
  const { token } = req.params;
  try {
    const decode = jwt.verify(token, process.env.JWT_SECRET_KEY);
    if (!decode) {
      return res.status(400).json({ message: "Invalid or expired token" });
    }
    const user = await Users.findOneAndUpdate({ isVerified: true });
    if (!user) return res.status(400).json({ message: "User not found" });
    return res.status(200).json({ message: "Email verified successfully" });
  } catch (error) {
    return res.status(400).json({ message: "Invalid or expired token" });
  }
}

module.exports = verifyEmail;
