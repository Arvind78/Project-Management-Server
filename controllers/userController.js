const bcrypt = require("bcryptjs");
const UserModel = require("../models/userModel.js");
const jwt = require("jsonwebtoken");

//Controller function for user signup
const userSignup = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res
        .status(409)
        .json({ success: false, message: "User account already exists !" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await UserModel.create({
      email,
      password: hashedPassword,
    });
    res
      .status(201)
      .json({ success: true, message: "User account created successfully." });
  } catch (error) {
    next(error);
  }
};

// Controller function for user login
const userLogin = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "Invalid Credentials !" });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid Email or Password." });
    }
    const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY);
    res.status(200).json({ success: true, message: "Valid User .", token });
  } catch (error) {
    next(error);
  }
};

// Controller function for handling password reset and verification
const forgotPassword = async (req, res, next) => {
  const { email, userId, newPassword } = req.body;
  try {
    if (!userId) {
      const user = await UserModel.findOne({ email });
      if (!user) {
        return res
          .status(404)
          .json({ success: false, message: "Email doesn't ragistered !" });
      } else {
        return res
          .status(201)
          .json({ userId: user._id, message: "User verification successful." });
      }
    } else {
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      const updatedUser = await UserModel.findByIdAndUpdate(
        userId,
        { $set: { password: hashedPassword } },
        { new: true }
      );
      return res
        .status(201)
        .json({ message: "User password reset successfully." });
    }
  } catch (error) {
    next(error);
  }
};

// exports functions related to users management operations.
module.exports = { userSignup, userLogin, forgotPassword };
