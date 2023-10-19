// Import required modules
const express = require("express");
const cors = require('cors');
const connectToDatabase = require("./connection/dbConnection");
const router = require("./router/router");
const dotenv = require('dotenv').config();

// Create an Express application
const app = express();

// Middleware: Enable Cross-Origin Resource Sharing (CORS)
app.use(cors());

// Middleware: Parse JSON requests
app.use(express.json());

// Middleware: Define API routes
app.use("/api", router); // Use a forward slash (/) at the beginning of the route path


// Error handling middleware
app.use((err, req, res, next) => {
    const success = false;
    const status = err.status || 500;
    const message = err.message || "Something went wrong";
    res.status(status).json({ success, message });
});

// Start the server and establish database connection
app.listen(process.env.PORT, () => {
    console.log(`Server is running on Port ${process.env.PORT}`);
    // Establish database connection
    connectToDatabase()
         
});


