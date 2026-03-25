import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Login = () => {
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      navigate('/');
    } catch (err) {
      setError('Invalid credentials');
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>Task Aquarium</h2>
        {error && <p style={{ color: '#f87171' }}>{error}</p>}
        <form onSubmit={handleSubmit}>
          <input 
            type="email" 
            className="input-field" 
            placeholder="Email" 
            value={email}
            onChange={e => setEmail(e.target.value)}
            required 
          />
          <input 
            type="password" 
            className="input-field" 
            placeholder="Password" 
            value={password}
            onChange={e => setPassword(e.target.value)}
            required 
          />
          <button type="submit" className="btn">Dive In</button>
        </form>
        <p>New to the ocean? <Link to="/register">Sign up</Link></p>
      </div>
    </div>
  );
};

export default Login;
