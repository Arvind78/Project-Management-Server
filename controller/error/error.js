/**
 * @function error
 * @description Creates a custom error object with specified status code and error message.
 * @param {number} status - The HTTP status code to be set in the error object.
 * @param {string} message - The error message to be included in the error object.
 * @returns {Error} - Returns a new Error object with the provided status and message.
 */
const error = (status, message) => {
    // Create a new Error object
    const err = new Error();
    
    // Set the status code and error message in the Error object
    err.status = status;
    err.message = message;
    
    // Return the customized error object
    return err;
  };
  
  // Export the 'error' function to be used in other modules
  module.exports = error;
  