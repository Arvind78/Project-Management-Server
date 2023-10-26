const mongoose = require('mongoose');

// Define the schema for the 'User' model in MongoDB
const userSchema = new mongoose.Schema({
    email: { 
        type: String, 
        required: true, 
        trim: true 
    },
    password: { 
        type: String, 
        required: true 
    }
});

// Create and export the 'User' model based on the defined schema
module.exports = mongoose.model('Userdetails', userSchema);
