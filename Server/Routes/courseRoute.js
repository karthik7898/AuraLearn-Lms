const express = require("express"); 
const { protect, authorize } = require("../Middleware/authMiddleware");
const { getCourses, createCourse, updateCourse, deleteCourse, getCourseById } = require("../Controllers/courseController");

const courseRoute = express.Router();

courseRoute.get("/", getCourses);

courseRoute.post("/", protect, authorize('instructor', 'trainer', 'admin'), createCourse);

courseRoute.get("/:id", getCourseById);

courseRoute.put("/:id", protect, authorize('instructor', 'trainer', 'admin'), updateCourse);

courseRoute.delete("/:id", protect, authorize('instructor', 'trainer', 'admin'), deleteCourse);

module.exports = courseRoute;
