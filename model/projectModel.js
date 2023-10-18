const mongoose = require('mongoose');

// Defining the project schema for MongoDB
const projectSchema = new mongoose.Schema({
  // Naming convention: Use camelCase for variable and property names
  project: { type: String, required: true }, 
  reason: { type: String, required: true },
  type: { type: String, required: true },
  division: { type: String, required: true },
  category: { type: String, required: true },
  priority: { type: String, required: true },
  department: { type: String, required: true },
  startDate: { type: String, required: true },
  endDate: { type: String, required: true },
  location: { type: String, required: true },
  status: { type: String, default: 'Registered' } // Default value for status property
});

// Creating and exporting mongoose model based on the defined schema
module.exports = mongoose.model('Project', projectSchema);
