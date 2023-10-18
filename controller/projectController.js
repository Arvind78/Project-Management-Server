// Import the project model
const projectModel = require("../model/projectModel");

// Handler to add a new project
const addProject = async (req, res, next) => {
    try {
        // Extract project details from the request body
        const { project, reason, type, division, category, priority, department, startDate, endDate, location } = req.body;

        // Validate required fields
        if (!project || !reason || !type || !division || !category || !priority || !department || !startDate || !endDate || !location) {
            return res.status(400).json({ message: "All fields are required!" });
        }

        // Format start and end dates
        const startdate = new Date(startDate);
        const start = startdate.toLocaleDateString('en-GB', {
            day: 'numeric', month: 'short', year: 'numeric'
        }).replace(/ /g, '-');

        const enddate = new Date(endDate);
        const end = enddate.toLocaleDateString('en-GB', {
            day: 'numeric', month: 'short', year: 'numeric'
        }).replace(/ /g, '-');

        // Create a new project with formatted dates
        const newProject = await projectModel.create({
            ...req.body,
            startDate: start,
            endDate: end
        });

        // Send success response
        return res.status(201).json({ message: "New project registered successfully!" });
    } catch (error) {
        // Pass errors to the error handling middleware
        next(error);
    }
};

// Handler to get all projects
const getProjects = async (req, res, next) => {
    try {
        // Retrieve all projects from the database
        const projects = await projectModel.find({});
        // Send projects as a response
        return res.status(200).json({ projects });
    } catch (error) {
        // Pass errors to the error handling middleware
        next(error);
    }
};

// Handler to update project status
const updateProject = async (req, res, next) => {
    try {
        // Extract status and project ID from the request body
        const { status, id } = req.body;

        // Validate presence of status field
        if (status) {
            // Update project status in the database
            const updatedProject = await projectModel.findByIdAndUpdate(id, { $set: { status: status } }, { new: true });
            // Send success response
            return res.status(200).json({ message: "Project status updated successfully!" });
        }

        // If status field is missing, send a bad request response
        return res.status(400).json({ message: "Status field is required for update!" });
    } catch (error) {
        // Pass errors to the error handling middleware
        next(error);
    }
};

// Handler to sort projects based on query parameters
const sortProject = async (req, res, next) => {
    try {
        const { q } = req.query;
        const validSortFields = ["priority", "category", "reason", "division", "department", "location"];

        if (!validSortFields.includes(q)) {
            return res.status(400).json({ message: "Invalid sorting field" });
        }

        const sortField = {};
        sortField[q] = 1;

        const projects = await projectModel.find({}).sort(sortField);
        return res.status(200).json({ projects });
    } catch (error) {
        next(error);
    }
};

module.exports = sortProject;


// Handler to search for a specific project
const searchProject = async (req, res, next) => {
    try {
        // Extract search query from request parameters
        const queryParam = req.query.q;

        // Validate presence of search query
        if (queryParam) {
            // Search for projects with the specified project name
            const data = await projectModel.find({ project: queryParam });
            // Send search results as a response
            return res.status(200).json({ data });
        } else {
            // If search query is missing, send a bad request response
            return res.status(400).json({ message: "Query parameter is required for search!" });
        }
    } catch (error) {
        // Pass errors to the error handling middleware
        next(error);
    }
};

// Export the handlers for use in routes
module.exports = {
    addProject,
    searchProject,
    getProjects,
    updateProject,
    sortProject
};
