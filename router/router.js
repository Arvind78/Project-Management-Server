const express = require('express');
const { userLogin, userSignup } = require('../controller/userController');
const router = express.Router(); // Use 'router' instead of 'routes' for consistency and clarity

// Route for user signup
router.post("/usersignup", userSignup); 

// Route for user login
router.post("/userlogin", userLogin);

//Route for new project
router.post("/newproject", userLogin); 

//Route for all project
router.post("/allproject", userLogin); 

//Route for update project status
router.post("/update", userLogin); 

//Route for update project status
router.post("/search/sort", userLogin); 




module.exports = router;
