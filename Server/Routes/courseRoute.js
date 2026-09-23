const express = require("express")
const { protect,authorize } = require("../Middleware/authMiddleware")
const { getCourse, createCourse, deleteCourse } = require("../Controllers/courseController")


const courseRoute = express.Router()

courseRoute.get("/get",protect,(req,res)=>{
    res.json({
        "Message":"Hi this is new get route checking it using protect . so we cant accept this api without login "
    })

})

courseRoute.get("/",getCourse)

courseRoute.post("/",createCourse)

courseRoute.get("/:id",getCourseById)

courseRoute.delete("/:id",deleteCourse)


module.exports=courseRoute;