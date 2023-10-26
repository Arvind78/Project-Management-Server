const projectModel = require("../model/projectModel");

//Adds a new project to the database.
const addProject = async (req, res, next) => {
    try {
        const { project, reason, type, division, category, priority, department, startDate, endDate, location } = req.body;

        if (!project || !reason || !type || !division || !category || !priority || !department || !startDate || !endDate || !location) {
            return res.status(400).json({ message: "All fields are required!" });
        }

        const startdate = new Date(startDate);
        const start = startdate.toLocaleDateString('en-GB', {
            day: 'numeric', month: 'short', year: 'numeric'
        }).replace(/ /g, '-');

        const enddate = new Date(endDate);
        const end = enddate.toLocaleDateString('en-GB', {
            day: 'numeric', month: 'short', year: 'numeric'
        }).replace(/ /g, '-');

        const newProject = await projectModel.create({
            ...req.body,
            startDate: start,
            endDate: end
        });

        return res.status(201).json({ message: "New project registered successfully!" });
    } catch (error) {
        next(error);
    }
};

//Retrieves all projects from the database.
const getProjects = async (req, res, next) => {
    try {
        const projects = await projectModel.find({});
        return res.status(200).json({ projects });
    } catch (error) {
        next(error);
    }
};

//Updates the status of a project in the database.
const updateProject = async (req, res, next) => {
    try {
        const { status, id } = req.body;

        if (status) {
            const updatedProject = await projectModel.findByIdAndUpdate(id, { $set: { status: status } }, { new: true });
            return res.status(200).json({ message: "Project status updated successfully!" });
        }

        return res.status(400).json({ message: "Status field is required for update!" });
    } catch (error) {
        next(error);
    }
};

//Sorts projects based on specified query parameters.
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

//Retrieves department-wise success percentage data for generating a chart.
const getDepartmentSuccessPercentage = async (req, res, next) => {
    try {
        const departmentData = await projectModel.aggregate([
            {
                $group: {
                    _id: "$department",
                    totalProjects: { $sum: 1 },
                    closedProjects: {
                        $sum: {
                            $cond: [{ $eq: ["$status", "Closed"] }, 1, 0]
                        }
                    }
                }
            }
        ]);

        const chartData = departmentData.map(department => ({
            department: department._id,
            total: department.totalProjects,
            closed: department.closedProjects,
            successPercentage:
                department.totalProjects === 0
                    ? 0
                    : ((department.closedProjects / department.totalProjects) * 100).toFixed(2) + "%"
        }));

        return res.status(200).json({ departmentSuccessPercentage: chartData });
    } catch (error) {
        next(error);
    }
};


// Retrieves various statistics about the projects.
const projectCounter = async (req, res, next) => {
    try {
        const totalProjects = await projectModel.countDocuments();
        const totalClosedProjects = await projectModel.countDocuments({ status: 'Closed' });
        const totalRunningProjects = await projectModel.countDocuments({ status: 'Running' });
        const totalCancelledProjects = await projectModel.countDocuments({ status: 'Cancelled' });

        const currentDate = new Date();
        const year = currentDate.getFullYear();
        const month = String(currentDate.getMonth() + 1).padStart(2, '0');  
        const day = String(currentDate.getDate()).padStart(2, '0');
        const today = `${year}-${month}-${day}`; 

        const totalDelayedProjects = await projectModel.countDocuments({
            status: { $ne: 'Closed' },
            endDate: { $lt: today },
            startDate: { $lt: today }
        });

        return res.status(200).json({
            totalProjects,
            totalClosedProjects,
            totalRunningProjects,
            totalCancelledProjects,
            totalDelayedProjects
        });
    } catch (error) {
        next(error);
    }
};

// exports functions related to project management operations.
module.exports = {
    getDepartmentSuccessPercentage,
    addProject,
    getProjects,
    updateProject,
    sortProject,
    projectCounter
};
