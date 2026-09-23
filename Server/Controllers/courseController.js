const Course = require("../models/Course");

async function getCourses(req, res) {


    try {
        const courses = await Course.find()
        return res.json(200).send(courses)
    }
    catch (error) {
        return res.status(500).send({
            message: "Unable to access Course"
        })
    }
}

async function createCourse(req, res) {
    try {
        const { title, description, category, level, price, duration, instructor } = req.body;


        if (!title || !description || !category || !level || price === undefined || !duration || !instructor) {
            return res.status(400).send({
                message: "Bad Request: Missing required fields"
            });
        }


        const existingCourse = await Course.findOne({ title: title });
        if (existingCourse) {
            return res.status(409).send({
                message: "Bad Request: A course with this title already exists"
            });
        }


        const course = new Course({
            title: title,
            description: description,
            category: category,
            level: level,
            price: price,
            duration: duration,
            instructor: req.user.id
        });

        await course.save();

        return res.status(201).send({
            message: "New Course Created",
            data: course
        });

    } catch (error) {
        return res.status(500).send({
            message: error.message || "Internal Server Error"
        });
    }
}


async function getCourseById(req, res) {
}

async function updateCourse(req, res) {
}

async function deleteCourse(req, res) {
}

module.exports = {
    getCourses,
    getCourseById,
    createCourse,
    updateCourse,
    deleteCourse
};
