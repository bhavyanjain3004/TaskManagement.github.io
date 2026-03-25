import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Register = () => {
  const { register } = useContext(AuthContext);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await register(name, email, password);
      navigate('/');
    } catch (err) {
      setError('Registration failed. Try again.');
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>Join the Aquarium</h2>
        {error && <p style={{ color: '#f87171' }}>{error}</p>}
        <form onSubmit={handleSubmit}>
          <input 
            type="text" 
            className="input-field" 
            placeholder="Name" 
            value={name}
            onChange={e => setName(e.target.value)}
            required 
          />
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
            minLength="6"
          />
          <button type="submit" className="btn">Create Account</button>
        </form>
        <p>Already have an account? <Link to="/login">Log in</Link></p>
      </div>
    </div>
  );
};

export default Register;
