const express = require('express');
const { userLogin, userSignup, forgotPassword } = require('../controller/userController');
const { addProject, getProjects, updateProject, sortProject, getDepartmentSuccessPercentage, projectCounter } = require('../controller/projectController');
const router = express.Router(); // Create an Express router for defining API routes

// Route for user signup
router.post("/usersignup", userSignup); // Handles user registration

// Route for user login
router.post("/userlogin", userLogin); // Handles user login

// Route for user forgot password
router.post("/forget", forgotPassword); // Handles user password recovery

// Route for adding a new project
router.post("/newproject", addProject); // Handles project creation

// Route for retrieving all projects
router.get("/allproject", getProjects); // Retrieves all projects

// Route for updating project status
router.post("/update", updateProject); // Handles project status update

// Route for sorting project status
router.get("/sort", sortProject); // Sorts projects based on status

// Route for retrieving department success percentage data
router.get("/chart/data", getDepartmentSuccessPercentage); // Retrieves success percentage data for departments

// Route for retrieving project statistics (total projects, closed projects, running projects, cancelled projects, delayed projects)
router.get("/project/counter", projectCounter);

module.exports = router; // Export the router for use in the application
