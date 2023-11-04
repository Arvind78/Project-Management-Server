// Import required modules and configurations
const express = require("express");
const cors = require('cors');
const connectToDatabase = require("./connection/dbConnection");
const router = require("./routers/router");
const dotenv = require('dotenv').config();

// Create an Express application
const app = express();

app.use(cors());
app.use(express.json());
app.use("/api", router);

// Error handling middleware
app.use((err, req, res, next) => {
    const success = false;
    const status = err.status || 500;
    const message = err.message || "Something went wrong";
    res.status(status).json({ status, message, success });
});

// Start the server and establish database connection
app.listen(process.env.PORT, () => {
    console.log(`Server is running on Port ${process.env.PORT}`);
    connectToDatabase();
});
