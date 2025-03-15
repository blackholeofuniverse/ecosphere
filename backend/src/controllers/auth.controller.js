import bcrypt from 'bcryptjs';
import User from '../models/user.model.js';
import dotenv from "dotenv";
import { generateToken } from '../lib/utils.js';
dotenv.config();

export const signUp = async (req, res) => {
    const { fullName, email, password } = req.body;
    try {

        if (!fullName || !email || !password) return res.status(400).json({ message: "Please fill in all fields" });

        if (password < 6) return res.status(400).json({ message: "Password must be at least 6 characters long" });

        const user = await User.findOne({ email })

        if (user) return res.status(400).json({ message: "User already exists" });

        const salt = await bcrypt.genSalt(10);

        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = await User.create({ fullName, email, password: hashedPassword });

        if (newUser) {
            generateToken(newUser._id, res);
            await newUser.save();
            res.status(201).json({ message: "User created successfully", user: newUser });

        } else {
            res.status(400).json({ message: "Failed to create user" });
        }

    } catch (error) {
        console.log("Error in signUp controller: ", error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        if (!email || !password) return res.status(400).json({ message: "Please fill in all fields" });

        const user = await User.findOne({ email });

        if (!user) return res.status(400).json({ message: "Invalid credentials" });

        const isPasswordCorrect = await bcrypt.compare(password, user.password);

        if (!isPasswordCorrect) return res.status(400).json({ message: "Invalid credentials" });

        generateToken(user._id, res);

        res.status(200).json({ message: "Login successful", user });

    } catch (error) {
        console.log("Error in login controller: ", error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export const logout = (_req, res) => {
    try {
        // res.clearCookie("jwt");
        res.cookie("jwt", "", { maxAge: 0 });
        res.status(200).json({ message: "Logout successful" });
    } catch (error) {
        console.log("Error in logout controller: ", error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export const updateProfile = async (req, res) => {

}