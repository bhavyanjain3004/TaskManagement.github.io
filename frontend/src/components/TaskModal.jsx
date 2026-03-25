import React, { useState, useEffect } from 'react';

const TaskModal = ({ show, onClose, onSave, task }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('Medium');
  const [status, setStatus] = useState('Todo');
  const [dueDate, setDueDate] = useState('');

  useEffect(() => {
    if (task) {
      setTitle(task.title || '');
      setDescription(task.description || '');
      setPriority(task.priority || 'Medium');
      setStatus(task.status || 'Todo');
      setDueDate(task.dueDate ? new Date(task.dueDate).toISOString().split('T')[0] : '');
    } else {
      setTitle('');
      setDescription('');
      setPriority('Medium');
      setStatus('Todo');
      setDueDate('');
    }
  }, [task, show]);

  if (!show) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ title, description, priority, status, dueDate });
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content glass-panel" style={{ animation: 'modalEnter 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards' }}>
        <h2 className="outfit-font" style={{ fontSize: '1.75rem', backgroundImage: 'linear-gradient(90deg, var(--ocean-accent), var(--ocean-secondary))', WebkitBackgroundClip: 'text', color: 'transparent' }}>
          {task ? 'Edit Fish' : 'Hatch New Fish'}
        </h2>
        <form onSubmit={handleSubmit}>
          <input 
            className="input-field"
            placeholder="Title"
            value={title}
            onChange={e => setTitle(e.target.value)}
            required
          />
          <textarea
            className="input-field"
            placeholder="Description"
            value={description}
            onChange={e => setDescription(e.target.value)}
            rows="3"
            required
          />
          <div style={{ display: 'flex', gap: '1rem' }}>
            <select 
              className="input-field"
              value={priority}
              onChange={e => setPriority(e.target.value)}
            >
              <option value="Low">Small Fish (Low)</option>
              <option value="Medium">Medium Fish (Medium)</option>
              <option value="High">Big Fish (High)</option>
            </select>
            <select 
              className="input-field"
              value={status}
              onChange={e => setStatus(e.target.value)}
            >
              <option value="Todo">Todo</option>
              <option value="In Progress">In Progress</option>
              <option value="Done">Done</option>
            </select>
          </div>
          <input 
            type="date"
            className="input-field"
            value={dueDate}
            onChange={e => setDueDate(e.target.value)}
          />
          <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
            <button type="submit" className="btn" style={{ flex: 1 }}>{task ? 'Update' : 'Create'}</button>
            <button type="button" className="btn" onClick={onClose} style={{ flex: 1, background: 'rgba(255,255,255,0.1)' }}>Cancel</button>
          </div>
        </form>
      </div>
      <style>{`
        .modal-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0,0,0,0.6);
          backdrop-filter: blur(4px);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 1000;
        }
        .modal-content {
          background: var(--glass-bg);
          padding: 2.5rem;
          border-radius: 16px;
          width: 90%;
          max-width: 500px;
          border: 1px solid var(--glass-border);
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.5), 0 0 20px rgba(0, 240, 255, 0.1);
          backdrop-filter: blur(16px);
        }
        .modal-content h2 {
          color: var(--ocean-accent);
          margin-bottom: 2rem;
          text-align: center;
        }
        @keyframes modalEnter {
          from { opacity: 0; transform: scale(0.9) translateY(20px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default TaskModal;
