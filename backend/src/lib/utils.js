import jwt from 'jsonwebtoken';
import dotenv from "dotenv";
dotenv.config();

export const generateToken = (userId, res) => {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: "7d" });

    res.cookie("jwt", token, {
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: true, // prevents client side JS from reading the cookie
        sameSite: "strict", // cookie will only be set on the same site
        secure: process.env.NODE_ENV !== "development", // cookie will only be set on https
    });

    return token;
}   