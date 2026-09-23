const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

async function login(req, res) {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ message: "Invalid Input" });
    }
    const existingUser = await User.findOne({ email: email });
    if (!existingUser) {
        return res.status(400).json({ message: "Email not found. Please Register." });
    }
    const checkPassword = await bcrypt.compare(password, existingUser.password);
    if (!checkPassword) {
        return res.status(400).json({ message: "Invalid Password" });
    }
    const token = jwt.sign({ id: existingUser._id }, process.env.SECRET_KEY);
    return res.status(200).json({ message: "Login Successful", token: token });
}

async function register(req, res) {
    const { name, email, password, role } = req.body;
    if (!name || !email || !password || !role) {
        return res.status(400).json({ message: "Invalid Input" });
    }
    const existingUser = await User.findOne({ email: email });
    if (existingUser) {
        return res.status(400).json({ message: "Email Already Registered" });
    }
    const encryptpass = await bcrypt.hash(password, 10);
    const newUser = await User.create({
        name: name,
        email: email,
        password: encryptpass,
        role: role
    });
    return res.status(201).json({
        message: "user created successfully",
        user: {
            id: newUser._id,
            name: newUser.name,
            email: newUser.email,
            role: newUser.role
        }
    });
}

module.exports = { login, register };
