import express from "express";
import bcrypt from "bcryptjs"; // Use bcryptjs for compatibility
import jwt from "jsonwebtoken";
import User from "../models/user.js";
import generateToken from "../utils/genrateToken.js";

// Signup function
export const signup = async (req, res) => {
  try {
    const { fullname, userName, email, password, confirmPassword, gender } = req.body;

    // Check if all fields are provided
    if (!fullname || !userName || !email || !password || !confirmPassword || !gender) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check if passwords match
    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ userName });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Set profile picture based on gender
    const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${userName}`;
    const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${userName}`;
    const profilePic = gender === 'male' ? boyProfilePic : gender === 'female' ? girlProfilePic : 'default-profile-pic-url';

    // Create new user instance
    const newUser = new User({
      fullname,
      userName,
      email,
      password: hashedPassword,
      gender,
      profilePic,
    });

    // Save the new user to the database
    await newUser.save();

    // Generate JWT token
    const token = generateToken(newUser._id);

    // Set the token in an HttpOnly cookie
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production', // Use 'secure' only in production (HTTPS)
      sameSite: 'Strict', // Helps prevent CSRF attacks
      maxAge: 24 * 60 * 60 * 1000 // 24 hours expiration
    });

    // Send success response with user data including ID
    res.status(201).json({
      message: "User created successfully",
      user: {
        id: newUser._id,
        fullname: newUser.fullname,
        userName: newUser.userName,
        email: newUser.email,
        gender: newUser.gender,
        profilePic: newUser.profilePic
      }
    });

  } catch (err) {
    console.error(err); // Log error for debugging
    res.status(500).json({ message: "An error occurred: " + err.message });
  }
};

// Login function
export const login = async (req, res) => {
  try {
    const { userName, password } = req.body;

    if (!userName || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const user = await User.findOne({ userName });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Generate JWT token
    const token = generateToken(user._id);

    // Set the token in an HttpOnly cookie
    res.cookie('token', token, { // Changed 'jwt' to 'token' for consistency
      httpOnly: true, // Ensures the cookie is only accessible by the web server
      secure: process.env.NODE_ENV === 'production', // Use 'secure' only in production (HTTPS)
      sameSite: 'Strict', // Helps prevent CSRF attacks
      maxAge: 24 * 60 * 60 * 1000 // 24 hours expiration
    });

    // Send success response with user data including ID
    res.status(200).json({
      message: "Login successful",
      user: {
        id: user._id,
        fullname: user.fullname,
        userName: user.userName,
        email: user.email,
        gender: user.gender,
        profilePic: user.profilePic
      }
    });

  } catch (err) {
    console.error(err); // Log error for debugging
    res.status(500).json({ message: "An error occurred: " + err.message });
  }
};

// Logout function for token-based authentication
export const logout = (req, res) => {
  res.clearCookie('token', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'Strict'
  });

  res.status(200).json({ message: "Logout successful" });
};
