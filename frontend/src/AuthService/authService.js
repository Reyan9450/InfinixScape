export const loginUser = async (formData) => {
    try {
        const response = await fetch('https://infinixscape-1.onrender.com/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
            credentials: 'include',
        });
         
        const data = await response.json();
        

        if (response.ok) {
            localStorage.setItem("user", JSON.stringify(data.user));
              // Store token securely if needed
            return data;  // Return response data (could be token or user info)
        } else {
            throw new Error(data.message);
        }
    } catch (error) {
        console.error('Login error:', error);
        throw error;
    }
};

export const registerUser = async (formData) => {
    try {
        const response = await fetch('https://infinixscape-1.onrender.com/api/auth/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
            credentials: 'include',
        });

        const data = await response.json();

        if (response.ok) {
            // Store token securely if needed
            return data;  // Return response data (could be token or user info) 
        } else {
            throw new Error(data.message);
        }
    } catch (error) {
        console.error('Registration error:', error);
        throw error;
    }
}