const mongoose = require('mongoose');

// Establish a database connection using Mongoose
const connectToDatabase = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL)
        console.log('Database Connected Successfully!');
    } catch (error) {
        console.error('Error connecting to the database:', error.message);
        // Exit the Node.js process with a failure code
        process.exit(1); 
    }
};
// Export the function for use in other parts of the application
module.exports = connectToDatabase;


 
 
