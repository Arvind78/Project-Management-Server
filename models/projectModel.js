const mongoose = require('mongoose');

// Define the schema for the 'Project' model in MongoDB
const projectSchema = new mongoose.Schema({
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
  projectLeader:{ type: String, required: true },
  status: { type: String, default: 'Registered' }  
});

// Create and export the 'Project' model based on the defined schema
module.exports = mongoose.model('Project', projectSchema);
