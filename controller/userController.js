const createError = require("../error/errors");
const bcrypt = require('bcryptjs');
const UserModel = require("../model/userModel.js");

/**
 * Controller function for user signup
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {function} next - Express next middleware function 
 */

const userSignup = async (req, res, next) => {
    const { email, password } = req.body;
    try {
        // Check if the user already exists
        const existingUser = await UserModel.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ success: false, message: "User account already exists!" });
        }

        // Hash the password before saving it in the database
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user
        const user = await UserModel.create({
            email,
            password: hashedPassword
        });

        // Return success response
        res.status(201).json({ success: true, message: "User account created successfully!" });
    } catch (error) {
        // Handle errors and pass them to the error handling middleware
        next(error);
    }
};

 
const userLogin = async (req, res, next) => {
    console.log(req.body);
    const { email, password } = req.body;
    try {
        // Find the user by email
        const user = await UserModel.findOne({ email });
        if (!user) {
            return res.status(404).json({ success: false, message: "Invalid Credentials" });
        }

        // Compare the provided password with the stored hashed password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ success: false, message: "Invalid Email or Password" });
        }
      
        // login token based on user login status
        const token = user._id;

        // Return success response
        res.status(200).json({ success: true, message: "Valid User" ,token});
    } catch (error) {
        // Handle errors and pass them to the error handling middleware
        next(error);
    }
};

module.exports = { userSignup, userLogin };