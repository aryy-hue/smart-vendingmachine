import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Hook untuk navigasi

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await axios.post("http://localhost:3000/api/admins/login", {
        email,
        password,
      });

      if (response.data) {
        // Login berhasil, simpan token di localStorage (opsional)
        localStorage.setItem("auth_token", response.data.token);

        // Redirect ke halaman Home Admin
        navigate("/admin");  // Arahkan ke halaman Home Admin
      }
    } catch (error) {
      setError("Email atau password salah.");
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        {error && <p className="error">{error}</p>}

        <button type="submit">Login</button>
      </form>

      <style jsx>{`
        body {
            background-color: #CAF3E4;
        }
        .login-container {
          width: 300px;
          margin: 0 auto;
          padding: 20px;
          border: 1px solid #ccc;
          border-radius: 8px;
          background-color: #f9f9f9;
        }

        h2 {
          text-align: center;
        }

        .form-group {
          margin-bottom: 10px;
        }

        label {
          display: block;
          font-weight: bold;
        }

        input {
          width: 100%;
          padding: 8px;
          margin-top: 5px;
          border: 1px solid #ccc;
          border-radius: 4px;
        }

        button {
          width: 100%;
          padding: 10px;
          background-color: #4caf50;
          color: white;
          border: none;
          border-radius: 4px;
          cursor: pointer;
        }

        button:hover {
          background-color: #45a049;
        }

        .error {
          color: red;
          text-align: center;
        }
      `}</style>
    </div>
  );
};

export default LoginPage;
