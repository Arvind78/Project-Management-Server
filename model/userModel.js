const mongoose = require('mongoose');

// Define a schema for the user model
const userSchema = new mongoose.Schema({
    email: { 
        type: String, 
        required: true, // Specify that email is require  
        trim: true // Trim whitespace from the beginning and end of email
    },
    password: { 
        type: String, 
        required: true // Specify that password is required
    }
});

// Create and export the 'User' model based on the schema
module.exports = mongoose.model('Userdetails', userSchema);
