const bcrypt = require('bcryptjs');
const UserModel = require("../model/userModel.js");
const jwt = require('jsonwebtoken');

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
            return res.status(409).json({ success: false, message: "User account already exists !" });
        }

        // Hash the password before saving it in the database
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user
        const user = await UserModel.create({
            email,
            password: hashedPassword
        });

        // Return success response
        res.status(201).json({ success: true, message: "User account created successfully." });
    } catch (error) {
        // Handle errors and pass them to the error handling middleware
        next(error);
    }
};

/**
 * Controller function for user login
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {function} next - Express next middleware function 
 */
const userLogin = async (req, res, next) => {
    const { email, password } = req.body;
    try {
        // Find the user by email
        const user = await UserModel.findOne({ email });
        if (!user) {
            return res.status(404).json({ success: false, message: "Invalid Credentials !" });
        }

        // Compare the provided password with the stored hashed password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ success: false, message: "Invalid Email or Password." });
        }

        // Generate a login token based on user login status
        const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY);

        // Return success response with token
        res.status(200).json({ success: true, message: "Valid User .", token });
    } catch (error) {
        // Handle errors and pass them to the error handling middleware
        next(error);
    }
};

/**
 * Controller function for handling password reset and verification
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {function} next - Express next middleware function 
 */

const forgotPassword = async (req, res, next) => {
    const { email, userId, newPassword } = req.body;
    try {
        if (!userId) {
            // Logic for verification email check
            const user = await UserModel.findOne({ email });
            if (!user) {
                return res.status(404).json({ success: false, message: "Email doesn't ragistered !" });
            } else {
                return res.status(201).json({ userId: user._id, message: "User verification successful." });
            }
        } else {
            // Hash the new password before updating in the database
            const hashedPassword = await bcrypt.hash(newPassword, 10);
            // Update user password in the database using userId
            const updatedUser = await UserModel.findByIdAndUpdate(userId, { $set: { password: hashedPassword } }, { new: true });
            return res.status(201).json({ message: "User password reset successfully." });
        }
    } catch (error) {
        // Handle errors and pass them to the error handling middleware
        next(error);
    }
};

module.exports = { userSignup, userLogin, forgotPassword };
