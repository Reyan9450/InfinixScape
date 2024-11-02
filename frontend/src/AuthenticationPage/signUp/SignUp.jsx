import "./indexSignUp.css";
import { registerUser } from "../../AuthService/authService";
import { useState } from "react";
import { useContext } from "react";
import { AuthContext } from "../../AuthContext/authContext";

export const Signup = () => {

  const { register } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    fullname: "",
    userName: "",  // Fixed the state to match 'userName' input name
    email: "",
    password: "",
    confirmPassword: "",
    gender: ""
  });
  
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value  // Updates the field based on input's name attribute
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Basic form validation
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (!formData.fullname || !formData.userName || !formData.email || !formData.gender) {
      setError("All fields are required");
      return;
    }

    try {
      console.log(formData);
       // Call your registration logic
      const response = await register(formData);
    } catch (err) {
      setError("Something went wrong during signup");
    }
  };

  return (
    <>
      <form className="signupForm" onSubmit={handleSubmit}>
        <input 
          type="text" 
          name="fullname"  
          id="fullname" 
          placeholder="Enter your full name" 
          onChange={handleChange} 
          value={formData.fullname}
        />
        <input 
          type="text" 
          name="userName"  
          id="userName" 
          placeholder="Username" 
          onChange={handleChange} 
          value={formData.userName}
        />
        <input 
          type="email" 
          name="email" 
          id="email" 
          placeholder="Email" 
          onChange={handleChange} 
          value={formData.email}
        />
        <input 
          type="password" 
          name="password" 
          id="password" 
          placeholder="Password" 
          onChange={handleChange} 
          value={formData.password}
        />
        <input 
          type="password" 
          name="confirmPassword" 
          id="confirmPassword" 
          placeholder="Confirm Password" 
          onChange={handleChange} 
          value={formData.confirmPassword}
        />
        <input 
          type="text"
          name="gender"
          id="gender"
          placeholder="Gender"
          onChange={handleChange}
          value={formData.gender}
        />
        <input 
          type="submit" 
          value="Signup" 
          className="submitBtn" 
        />

        {error && <p className="error">{error}</p>}  {/* Display error if present */}
        <a className="forLoginLink">Already have an account?</a>
      </form>
    </>
  );
};
