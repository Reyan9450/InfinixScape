import "./index.css";
import { Signup } from "../signUp/SignUp";
import { Login } from "../Login/Login";
import { useState } from "react";

export const Box = () => {
    const [isLoginActive, setIsLoginActive] = useState(true); // Set default to login

    // Toggle between login and signup
    const toggleForm = () => {
        setIsLoginActive(!isLoginActive);
    };

    return (
        <>
            <div className="boxContainer">
                <div className="loginSignupSlider">
                    <button 
                        className={`loginbtn ${isLoginActive ? "active" : ""}`}
                        onClick={() => setIsLoginActive(true)}
                    >
                        Login
                    </button>
                    <button 
                        className={`signupbtn ${!isLoginActive ? "active" : ""}`} 
                        onClick={() => setIsLoginActive(false)}
                    >
                        Signup
                    </button>
                </div>
                <div className="formContainer">
                    {isLoginActive ? (
                        <Login toggleForm={toggleForm} /> // Pass the toggle function to Login
                    ) : (
                        <Signup />
                    )}
                </div>
            </div>
        </>
    );
};
