import React, { useState, useEffect } from 'react';
import API from '../api';
import Navbar from '../components/Navbar';

const Analytics = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [tasks, setTasks] = useState([]);
  const [filterStr, setFilterStr] = useState('');

  useEffect(() => {
    fetchData();
  }, [filterStr]);

  const fetchData = async () => {
    try {
      const [analyticsRes, tasksRes] = await Promise.all([
        API.get('/tasks/analytics'),
        API.get(`/tasks?search=${filterStr}`)
      ]);
      
      const statsData = analyticsRes.data.data;
      const formattedStats = {
        total: statsData.total,
        todo: statsData.stats.find(s => s._id === 'Todo')?.count || 0,
        inProgress: statsData.stats.find(s => s._id === 'In Progress')?.count || 0,
        done: statsData.stats.find(s => s._id === 'Done')?.count || 0,
      };
      setStats(formattedStats);
      setTasks(tasksRes.data.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="ocean-container"><div className="loading">Crunching numbers...</div></div>;

  const completionPercentage = stats.total === 0 ? 0 : Math.round((stats.done / stats.total) * 100);

  return (
    <div className="ocean-container" style={{ overflowY: 'auto', paddingBottom: '2rem' }}>
      <Navbar />
      
      <div style={{ maxWidth: '1000px', margin: '80px auto 0', padding: '0 1rem' }}>
        <h1 style={{ color: 'var(--ocean-accent)', marginBottom: '2rem' }}>Analytics Dashboard</h1>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '3rem' }}>
          <StatCard title="Total Tasks" value={stats.total} color="#38bdf8" />
          <StatCard title="Completed" value={stats.done} color="#4ade80" />
          <StatCard title="Pending" value={stats.todo + stats.inProgress} color="#fbbf24" />
          <StatCard title="Completion" value={`${completionPercentage}%`} color="#c084fc" />
        </div>

        <h2 style={{ color: 'var(--ocean-accent)', marginBottom: '1rem' }}>Task List (List View)</h2>
        <input 
          type="text" 
          className="input-field"
          placeholder="Search tasks..."
          value={filterStr}
          onChange={e => setFilterStr(e.target.value)}
          style={{ maxWidth: '400px' }}
        />

        <div style={{ background: 'rgba(30, 41, 59, 0.5)', borderRadius: '12px', padding: '1rem' }}>
          {tasks.length === 0 ? (
            <p style={{ color: 'var(--text-muted)' }}>No tasks found.</p>
          ) : (
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                  <th style={{ padding: '1rem' }}>Title</th>
                  <th style={{ padding: '1rem' }}>Status</th>
                  <th style={{ padding: '1rem' }}>Priority</th>
                </tr>
              </thead>
              <tbody>
                {tasks.map(t => (
                  <tr key={t._id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                    <td style={{ padding: '1rem' }}>{t.title}</td>
                    <td style={{ padding: '1rem' }}>
                      <span style={{ 
                        padding: '4px 8px', 
                        borderRadius: '4px',
                        background: t.status === 'Done' ? 'rgba(74, 222, 128, 0.2)' : 'rgba(251, 191, 36, 0.2)',
                        color: t.status === 'Done' ? '#4ade80' : '#fbbf24'
                      }}>{t.status}</span>
                    </td>
                    <td style={{ padding: '1rem' }}>{t.priority}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ title, value, color }) => (
  <div style={{ 
    background: 'rgba(30, 41, 59, 0.7)', 
    padding: '1.5rem', 
    borderRadius: '12px',
    borderLeft: `4px solid ${color}`,
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
  }}>
    <h3 style={{ fontSize: '0.875rem', color: 'var(--text-muted)', textTransform: 'uppercase', tracking: 'wide' }}>{title}</h3>
    <p style={{ fontSize: '2.5rem', fontWeight: 'bold', color: color, marginTop: '0.5rem' }}>{value}</p>
  </div>
);

export default Analytics;
