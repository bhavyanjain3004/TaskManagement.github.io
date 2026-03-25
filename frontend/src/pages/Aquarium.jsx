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

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const res = await API.get('/tasks');
      setTasks(res.data.data);
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

      {/* Aquarium Area */}
      <div style={{ position: 'relative', width: '100%', height: '100%' }}>
        {tasks.map(task => (
          <FishTask
            key={task._id}
            task={task}
            onClick={handleFishClick}
            onComplete={handleCompleteTask}
            onDelete={handleDeleteTask}
          />
        ))}
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
