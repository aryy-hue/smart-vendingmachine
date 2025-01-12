import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Impor useNavigate
import '../css/style.css';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate(); // Deklarasikan navigate

    const handleLogin = async (e) => {
        e.preventDefault();

        // Mengirim data login ke API
        try {
            const response = await fetch('http://localhost:3000/api/customers/login', {  // Ganti dengan URL endpoint Anda
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (response.ok) {
                // Berhasil login
                alert('Login successful');
                // Arahkan pengguna ke halaman utama (misalnya home)
                navigate('/'); // Arahkan ke halaman '/'
            } else {
                // Gagal login
                setErrorMessage(data.message || 'Login failed');
            }
        } catch (err) {
            setErrorMessage('Error connecting to the server');
            console.error(err);
        }
    };

    return (
        <div className="container">
            <div className="form-container">
                <h2>Welcome Back</h2>
                <p>Please fill your data</p>
                <form onSubmit={handleLogin} className="forms">
                    <label>Email:</label>
                    <input 
                        type="email" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                        required 
                    />
                    <label>Password:</label>
                    <input 
                        type="password" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                        required 
                    />
                    <button type="submit" className="login-button">Log In</button>
                </form>
                {errorMessage && <p className="error-message">{errorMessage}</p>}
                <p className="signup-link">
                    Don’t have an account? <a href="/register">Sign Up</a>
                </p>
            </div>
            <div className="image-container">
                <img src="/images/login-image.jpg" alt="Login" />
            </div>
        </div>
    );
}

export default Login;
