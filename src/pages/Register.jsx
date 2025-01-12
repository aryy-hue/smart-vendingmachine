import React, { useState } from 'react';
import '../css/style.css';

function Register() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);  // For error message display
    const [success, setSuccess] = useState(null);  // For success message display

    const handleRegister = async (e) => {
        e.preventDefault();

        // Data to be sent to the server
        const userData = {
            name,
            email,
            phone,
            password
        };

        try {
            // Sending a POST request to the API endpoint
            const response = await fetch('http://localhost:3000/api/customers/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
            });

            const result = await response.json();

            if (response.ok) {
                // Handle successful registration
                setSuccess('Registration successful! Please log in.');
                setError(null);  // Clear any previous error messages
                // Optionally, redirect the user to the login page after success
                // window.location.href = '/login'; // or use react-router for navigation
            } else {
                // Handle errors returned from the server
                setError(result.message || 'An error occurred during registration');
                setSuccess(null);  // Clear any previous success messages
            }
        } catch (error) {
            // Handle network errors
            console.error('Network error:', error);
            setError('A network error occurred. Please try again later.');
            setSuccess(null);  // Clear any previous success messages
        }
    };

    return (
        <div className="container">
            <div className="image-container">
                <img src="/images/register.jpg" alt="register" />
            </div>
            <div className="form-container">
                <h2>Create an Account</h2>
                <form onSubmit={handleRegister} className="forms">
                    {/* Show error message */}
                    {error && <p className="error-message">{error}</p>}

                    {/* Show success message */}
                    {success && <p className="success-message">{success}</p>}

                    <label>Name:</label>
                    <input 
                        type="text" 
                        value={name} 
                        onChange={(e) => setName(e.target.value)} 
                        required 
                    />

                    <label>Email:</label>
                    <input 
                        type="email" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                        required 
                    />

                    <label>Phone Number:</label>
                    <input 
                        type="text" 
                        value={phone} 
                        onChange={(e) => setPhone(e.target.value)} 
                        required 
                    />

                    <label>Password:</label>
                    <input 
                        type="password" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                        required 
                    />

                    <button type="submit" className="register-button">Register</button>
                    <p className="signup-link">
                        Already have an account? <a href="/login">Sign In</a>
                    </p>
                </form>
            </div>
        </div>
    );
}

export default Register;
