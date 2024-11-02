import { createContext, useState, useEffect } from 'react';
import { loginUser } from '../AuthService/authService.js';
import { registerUser } from '../AuthService/authService.js';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    // Load user from localStorage on component mount
    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser)); // Parse and set the user from local storage
        }
    }, []);

    const login = async (formData) => {
        try {
            const userData = await loginUser(formData);
            setUser(userData); // Save user info globally
            localStorage.setItem('user', JSON.stringify(userData)); // Store in localStorage
            console.log('User logged in:', userData);
        } catch (error) {
            console.error(error);
        }
    };

    const register = async (formData) => {
        try {
            const userData = await registerUser(formData);
            setUser(userData); // Save user info globally
            localStorage.setItem('user', JSON.stringify(userData)); // Store in localStorage
            console.log('User registered:', userData);
        } catch (error) {
            console.error(error);
        }
    };

    const logout = () => {
        setUser(null); // Clear user from state
        localStorage.removeItem('user'); // Remove user from localStorage
        console.log('User logged out');
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, register }}>
            {children}
        </AuthContext.Provider>
    );
};
