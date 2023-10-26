const express = require('express');
const { userLogin, userSignup, forgotPassword } = require('../controller/userController');
const { addProject, getProjects, updateProject, sortProject, getDepartmentSuccessPercentage, projectCounter } = require('../controller/projectController');
// Creating an Express router instance
const router = express.Router();  

// Routes for user-related operations
router.post("/usersignup", userSignup);  
router.post("/userlogin", userLogin);  
router.put("/forget", forgotPassword); 

// Routes for project-related operations
router.post("/newproject", addProject);  
router.get("/allproject", getProjects); 
router.put("/update", updateProject); 
router.get("/sort", sortProject); 
router.get("/chart/data", getDepartmentSuccessPercentage); 
router.get("/project/counter", projectCounter);

// Exporting the router for use in the main application
module.exports = router;
