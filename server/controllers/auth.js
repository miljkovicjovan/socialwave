import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

// Registration (new users)
export const register = async (req, res) => {
    try {
        const { username, firstName, lastName, email, password } =  req.body;

        if (!username || !firstName || !lastName || !email || !password) {
            return res.status(400).json({ error: "All fields are required" });
        }

        // Check if user with that email already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: "User already exists with this email" });
        }

        // Generating a salt and hashing password
        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(password, salt);

        // New user instance with hashed password
        const newUser =  new User({
            username,
            firstName, 
            lastName,
            email,
            password: passwordHash
        });

        const savedUser = await newUser.save();

        res.status(201).json(savedUser);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

// Logging in
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if email and password are provided
        if (!email || !password) {
            return res.status(400).json({ error: "Email and password are required" });
        }

        // Find user by email
        const user = await User.findOne({ email: email });
        if (!user) return res.status(400).json({msg: "User does not exist"});

        // Comparing the provided password with the stored hashed one
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({msg: "Invalid password"});

        // Generate JWT token with the user id as payload
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

        // We remove the password before sending the response
        delete user.password;
        res.status(200).json({ token, user});
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}