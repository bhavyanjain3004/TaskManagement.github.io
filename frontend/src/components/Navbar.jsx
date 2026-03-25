import React, { useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { LogOut, BarChart2, Home, Plus } from 'lucide-react';

const Navbar = ({ onAddClick }) => {
  const { logout, user } = useContext(AuthContext);
  const location = useLocation();

  return (
    <div className="dashboard-nav">
      {location.pathname === '/' && (
        <button onClick={onAddClick} className="btn nav-btn btn-glow">
          <Plus size={20} /> <span className="nav-text">New Task</span>
        </button>
      )}
      <Link to="/" className={`btn nav-btn ${location.pathname === '/' ? 'active' : ''}`}>
        <Home size={20} /> <span className="nav-text">Aquarium</span>
      </Link>
      <Link to="/analytics" className={`btn nav-btn ${location.pathname === '/analytics' ? 'active' : ''}`}>
        <BarChart2 size={20} /> <span className="nav-text">Analytics</span>
      </Link>
      <button onClick={logout} className="btn nav-btn danger">
        <LogOut size={20} /> <span className="nav-text">Logout</span>
      </button>
      <style>{`
        .nav-btn {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          background: var(--glass-bg);
          border: 1px solid var(--glass-border);
          backdrop-filter: blur(12px);
          color: var(--text-muted);
          transition: all 0.3s ease;
          border-radius: 12px;
          padding: 0.8rem 1.2rem;
        }
        .nav-text {
          font-weight: 500;
          font-family: 'Outfit', sans-serif;
          font-size: 1.1rem;
        }
        .nav-btn:hover {
          background: rgba(255, 255, 255, 0.1);
          color: var(--text-light);
          transform: translateX(5px);
        }
        .nav-btn.active {
          background: var(--ocean-accent);
          color: #000;
          box-shadow: 0 0 15px var(--ocean-accent-glow);
          border-color: transparent;
        }
        .nav-btn.btn-glow {
          background: linear-gradient(135deg, var(--ocean-accent), var(--ocean-secondary));
          color: #fff;
          border: none;
        }
        .nav-btn.btn-glow:hover {
          box-shadow: 0 0 25px var(--ocean-accent-glow);
        }
        .nav-btn.danger:hover {
          background: #ef4444;
          color: #fff;
          border-color: transparent;
          box-shadow: 0 0 15px rgba(239, 68, 68, 0.4);
        }
      `}</style>
    </div>
  );
};

export default Navbar;
