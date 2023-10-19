const express = require('express');
const { userLogin, userSignup ,forgotPassword} = require('../controller/userController');
const { addProject, getProjects, updateProject, searchProject, sortProject, getDepartmentSuccessPercentage } = require('../controller/projectController');
const router = express.Router(); // Use 'router' instead of 'routes' for consistency and clarity

// Route for user signup
router.post("/usersignup", userSignup); 

// Route for user login
router.post("/userlogin", userLogin);

// Route for user forgot password
router.post("/forget", forgotPassword);

//Route for new project
router.post("/newproject", addProject); 

//Route for all project
router.get("/allproject", getProjects); 

//Route for update project status
router.post("/update", updateProject); 

//Route for search project status
router.get("/search", searchProject ); 

//Route for sort project status
router.get("/sort",sortProject ); 
router.get("/success/data",getDepartmentSuccessPercentage); 


module.exports = router;
