const mongoose = require('mongoose');

// Establish a database connection using Mongoose
const connectToDatabase = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL)
        console.log('Database Connected Successfully!');
    } catch (error) {
        console.error('Error connecting to the database:', error.message);
        // You can choose to throw the error here or handle it in another way, such as exiting the application.
        // throw error;
        process.exit(1); // Exit the Node.js process with a failure code
    }
};

module.exports = connectToDatabase;


 
 
