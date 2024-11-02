import React, { useState, useContext } from 'react';
import { AuthContext } from '../../AuthContext/authContext.jsx';
import "./index.css";

export const Login = ({ toggleForm }) => { // Accept toggleForm prop
    const { login } = useContext(AuthContext);
    const [formData, setFormData] = useState({
        userName: '',
        password: ''
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        login(formData);  // Call the login function from context
    };

    return (
        <form onSubmit={handleSubmit} className="loginForm">
            <input
                type="text"
                name="userName"
                placeholder="Username"
                value={formData.userName}
                onChange={handleChange}
                required
            />
            <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
            />
            <a href="#">Forgot Password</a>
            <input type="submit" value="Login" className="submitBtn" />
            <a href="#" className="forSignupLink" onClick={toggleForm}>Don't have an account?</a>
        </form>
    );
};
