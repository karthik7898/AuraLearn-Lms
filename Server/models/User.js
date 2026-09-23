const mongoose = require("mongoose"); 

const userSchema = new mongoose.Schema({ 
    name: { 
        type: String, 
        required: true 
    }, 
    email:{
        type:String,
        required: true,
         unique: true

    },

    role: { 
        type: String, 
        required: true,
        // Keep legacy values valid so existing users can still sign in.
        enum: {
            values: ["student", "instructor", "admin", "Student", "trainer"]
        }
    }, 
    password: { 
        type: String, 
        required: true 
    }
}, {
    timestamps: true 
}); 

const User = mongoose.model("User", userSchema); 

module.exports = User;
