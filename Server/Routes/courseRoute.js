const express = require("express");
const { protect, authorize } = require("../Middleware/authMiddleware");
const { 
    getCourses, 
    createCourses, 
    deleteCourses, 
    updateCourses, 
    getCourseById 
} = require("../Controllers/courseController");

const courseRoute = express.Router();


courseRoute.get("/get", protect, (req, res) => {
    res.json({
        "Message": "Hi this is new get route checking it using protect . so we cant accept this api without login "
    });
});


courseRoute.get("/", getCourses);
courseRoute.post("/", createCourses);
courseRoute.get("/:id", getCourseById);
courseRoute.put("/:id", updateCourses);
courseRoute.delete("/:id", deleteCourses);

module.exports = courseRoute;
