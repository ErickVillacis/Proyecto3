import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Login.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/users/login', { email, password });
      localStorage.setItem('token', response.data.token);
      navigate('/home');
    } catch (error) {
      console.error('Error en el login', error);
    }
  };

  return (
    <div className="login-container">
      <h2>Iniciar Sesión</h2>
      <input
        type="email"
        placeholder="Correo Electrónico"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="login-input"
      />
      <input
        type="password"
        placeholder="Contraseña"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="login-input"
      />
      <div className="button-group">
        <button onClick={handleLogin} className="login-button">Login</button>
        <button onClick={() => navigate('/register')} className="register-button">Registrarse</button>
      </div>
    </div>
  );
}

export default Login;
