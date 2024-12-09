const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Users = require("../model/userModel");
const mailSentToUser = require("../config/sendMail");

async function register(req, res) {
  const { username, email, password } = req.body;
  if (!username || !email || !password)
    return res
      .status(400)
      .json({ message: "Please fills all details properly" });

  try {
    const hashedPassword = await bcrypt.hash(password, 6);
    const newUser = await Users.create({
      username,
      email,
      password: hashedPassword,
      isVerified: true,
    });

    // // Email Verification
    // const token = jwt.sign(
    //   {
    //     email: email,
    //   },
    //   process.env.JWT_SECRET_KEY,
    //   {
    //     expiresIn: "1hr",
    //   }
    // );
    // mailSentToUser(email, token);

    // End
    
    return res
      .status(200)
      .json({ message: "Please Verified Your Email First" });
  } catch (error) {
    console.log(error);
    return res
      .status(400)
      .json({ message: "Error While Register User", error });
  }
}

async function login(req, res) {
  const { email, password } = req.body;
  if (!email || !password)
    return res
      .status(400)
      .json({ message: "Please fills all details properly" });

  try {
    const findUserbyEmail = await Users.findOne({ email });
    if (!findUserbyEmail) {
      return res.status(400).json({
        message: "Can't find this email in our database Please Register First",
      });
    }
    if (!findUserbyEmail.isVerified) {
      return res
        .status(400)
        .json({ message: "Please First Verify Your Email" });
    }

    const decode = await bcrypt.compare(password, findUserbyEmail.password);
    if (!decode) {
      return res.status(400).json({ message: "Incorrect Password!" });
    }

    req.currUser = findUserbyEmail;
    

    const token = jwt.sign(
      {
        userID: findUserbyEmail._id,
        email: findUserbyEmail.email,
      },
      process.env.JWT_SECRET_KEY
    );
    return res
      .status(200)
      .json({ message: "User Logged In", username: findUserbyEmail.username, email, token });
  } catch (error) {
    console.error("Login Error: ", error);
    return res.status(500).json({
      message: "An error occurred while logging in",
      error: error.message,
    });
  }
}

module.exports = {
  login,
  register,
};
