// Import required modules
const express = require("express"); // Import Express.js for building the web server
const cors = require('cors'); // Import CORS for enabling Cross-Origin Resource Sharing
const connectToDatabase = require("./connection/dbConnection"); // Import function to establish database connection
const router = require("./router/router"); // Import API routes defined in router.js
const dotenv = require('dotenv').config(); // Load environment variables from .env file

// Create an Express application
const app = express();

// Middleware: Enable Cross-Origin Resource Sharing (CORS)
app.use(cors());

// Middleware: Parse JSON requests
app.use(express.json());

// Middleware: Define API routes
app.use("/api", router); // API routes will be prefixed with /api (e.g., /api/users)

// Error handling middleware
app.use((err, req, res, next) => {
    const success = false;
    const status = err.status || 500; // Set HTTP status code to the error status or 500 (Internal Server Error)
    const message = err.message || "Something went wrong"; // Use the error message provided or a default message
    res.status(status).json({ success, message }); // Send JSON response with error status and message
});

// Start the server and establish database connection
app.listen(process.env.PORT, () => {
    console.log(`Server is running on Port ${process.env.PORT}`);
    // Establish database connection
    connectToDatabase(); // Call the function to establish the database connection
});
