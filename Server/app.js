const express = require("express")

const app = express()

app.get("/welcome",(req,res)=>{
    res.send("Welcome back")
})


app.listen(3000, ()=>{
    console.log("Listening to the PORT");
    
})