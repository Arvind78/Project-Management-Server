const createError = (status, message) => {
    const error = new Error();
    error.status = status;
    error.message = message;
    return error;
  };
  
  // Export the createError function to be used in other modules.
  module.exports = createError;