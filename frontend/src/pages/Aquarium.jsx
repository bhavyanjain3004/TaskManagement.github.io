import React, { useState, useEffect } from 'react';
import API from '../api';
import Navbar from '../components/Navbar';
import FishTask from '../components/FishTask';
import TaskModal from '../components/TaskModal';

const Aquarium = () => {
  const [tasks, setTasks] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [loading, setLoading] = useState(true);

  // Filter & Pagination States
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('');
  const [priority, setPriority] = useState('');
  const [sort, setSort] = useState('-createdAt');
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState({});

  useEffect(() => {
    fetchTasks();
  }, [search, status, priority, sort, page]);

  const fetchTasks = async () => {
    try {
      const params = {
        search,
        status,
        priority,
        sort,
        page,
        limit: 10
      };
      
      // Remove empty values
      Object.keys(params).forEach(key => params[key] === '' && delete params[key]);

      const res = await API.get('/tasks', { params });
      setTasks(res.data.data);
      setPagination(res.data.pagination || {});
    } catch (err) {
      console.error('Fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddClick = () => {
    setSelectedTask(null);
    setIsModalOpen(true);
  };

  const handleFishClick = (task) => {
    setSelectedTask(task);
    setIsModalOpen(true);
  };

  const handleSaveTask = async (taskData) => {
    try {
      if (selectedTask) {
        await API.put(`/tasks/${selectedTask._id}`, taskData);
      } else {
        await API.post('/tasks', taskData);
      }
      setIsModalOpen(false);
      fetchTasks();
    } catch (err) {
      console.error('Save error:', err);
    }
  };

  const handleCompleteTask = async (id) => {
    try {
      await API.put(`/tasks/${id}`, { status: 'Done' });
      fetchTasks();
    } catch (err) {
      console.error('Complete error:', err);
    }
  };

  const handleDeleteTask = async (id) => {
    try {
      await API.delete(`/tasks/${id}`);
      fetchTasks();
    } catch (err) {
      console.error('Delete error:', err);
    }
  };

  if (loading) {
    return <div className="ocean-container"><div className="loading">Warming up the water...</div></div>;
  }

  return (
    <div className="ocean-container">
      <Navbar onAddClick={handleAddClick} />

      {/* Controls Bar */}
      <div className="glass-panel" style={{ 
        position: 'absolute', 
        top: '2rem', 
        right: '2rem', 
        left: '15rem', 
        zIndex: 100, 
        padding: '0.75rem 1.5rem',
        display: 'flex',
        gap: '1rem',
        alignItems: 'center',
        border: '1px solid rgba(255,255,255,0.1)'
      }}>
        <div style={{ flex: 2, position: 'relative' }}>
          <input 
            className="input-field" 
            style={{ margin: 0, padding: '0.6rem 1rem' }} 
            placeholder="Search tasks..." 
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(1); }}
          />
        </div>
        <select 
          className="input-field" 
          style={{ margin: 0, flex: 1, padding: '0.6rem' }}
          value={status}
          onChange={(e) => { setStatus(e.target.value); setPage(1); }}
        >
          <option value="">All Progress</option>
          <option value="Todo">Todo</option>
          <option value="In Progress">In Progress</option>
          <option value="Done">Done</option>
        </select>
        <select 
          className="input-field" 
          style={{ margin: 0, flex: 1, padding: '0.6rem' }}
          value={priority}
          onChange={(e) => { setPriority(e.target.value); setPage(1); }}
        >
          <option value="">All Priority</option>
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
        <select 
          className="input-field" 
          style={{ margin: 0, flex: 1, padding: '0.6rem' }}
          value={sort}
          onChange={(e) => { setSort(e.target.value); setPage(1); }}
        >
          <option value="-createdAt">Newest</option>
          <option value="createdAt">Oldest</option>
          <option value="priority">Priority Low-High</option>
          <option value="-priority">Priority High-Low</option>
        </select>

        {/* Global Pagination Controls */}
        <div style={{ display: 'flex', gap: '0.5rem', marginLeft: '1rem' }}>
          <button 
            className="btn nav-btn" 
            style={{ padding: '0.5rem 0.75rem', width: 'auto' }}
            disabled={!pagination.prev}
            onClick={() => setPage(p => p - 1)}
          >
            ←
          </button>
          <button 
            className="btn nav-btn" 
            style={{ padding: '0.5rem 0.75rem', width: 'auto' }}
            disabled={!pagination.next}
            onClick={() => setPage(p => p + 1)}
          >
            →
          </button>
        </div>
      </div>

      {/* Aquarium Area */}
      <div style={{ position: 'relative', width: '100%', height: '100%', overflow: 'hidden' }}>
        {tasks.length === 0 ? (
          <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center', color: 'var(--text-muted)' }}>
            <h3 className="outfit-font">No tasks found in this part of the ocean.</h3>
            <p>Try clearing your filters or adding a new task!</p>
          </div>
        ) : (
          tasks.map(task => (
            <FishTask
              key={task._id}
              task={task}
              onClick={handleFishClick}
              onComplete={handleCompleteTask}
              onDelete={handleDeleteTask}
            />
          ))
        )}
      </div>

      <TaskModal
        show={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveTask}
        task={selectedTask}
      />
    </div>
  );
};

export default Aquarium;
