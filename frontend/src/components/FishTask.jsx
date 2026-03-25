import React, { useState, useEffect } from 'react';

const FishTask = ({ task, onClick, onComplete, onDelete }) => {
  const [isBubbling, setIsBubbling] = useState(false);
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const [direction, setDirection] = useState('swim-right');

  useEffect(() => {
    const initialTop = Math.random() * 60 + 20;
    const initialLeft = Math.random() * 80 + 10;
    const dir = Math.random() > 0.5 ? 'swim-right' : 'swim-left';
    setPosition({ top: initialTop, left: initialLeft });
    setDirection(dir);
  }, []);

  // Determine size and color based on priority
  const getSize = () => {
    if (task.priority === 'High') return 1.5;
    if (task.priority === 'Medium') return 1.1;
    return 0.8;
  };

  const getImage = () => {
    if (task.priority === 'High') return '/squid.png';
    if (task.priority === 'Medium') return '/fish.png';
    return '/shell.png';
  };

  const handleCompleteClick = (e) => {
    e.stopPropagation();
    onComplete(task._id);
  };

  const handleDeleteClick = (e) => {
    e.stopPropagation();
    if (window.confirm("Are you sure you want to delete this task?")) {
      onDelete(task._id);
    }
  };

  if (task.status === 'Done') {
    return (
      <div
        style={{
          position: 'absolute',
          top: `${position.top}%`,
          left: `${position.left}%`,
          animation: 'float 4s ease-in-out infinite',
          cursor: 'pointer',
          zIndex: 5
        }}
        onClick={() => onClick(task)}
      >
        <img src="/bubble.png" alt="Completed Task Bubble" style={{ width: '80px', height: 'auto', filter: 'drop-shadow(0 0 10px rgba(56, 189, 248, 0.6))' }} />
        <div style={{
          position: 'absolute',
          bottom: '-25px',
          left: '50%',
          transform: 'translateX(-50%)',
          background: 'rgba(0,0,0,0.4)',
          padding: '2px 6px',
          borderRadius: '4px',
          fontSize: '0.75rem',
          whiteSpace: 'nowrap',
          color: 'var(--ocean-accent)',
          pointerEvents: 'none'
        }}>
          {task.title}
        </div>
        <button
          onClick={handleDeleteClick}
          style={{
            position: 'absolute',
            top: '-10px',
            right: '-10px',
            background: '#ef4444',
            color: '#fff',
            border: 'none',
            borderRadius: '50%',
            width: '24px',
            height: '24px',
            cursor: 'pointer',
            boxShadow: '0 2px 4px rgba(0,0,0,0.3)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: 'bold',
            zIndex: 10
          }}
          title="Delete Task"
        >
          ✕
        </button>
      </div>
    );
  }

  return (
    <div
      className={`fish-wrapper ${direction}`}
      style={{
        top: `${position.top}%`,
        zIndex: 10,
        // The animation handles the horizontal translation entirely
      }}
      onClick={() => onClick(task)}
    >
      <div
        className="fish-inner"
        style={{
          transform: `scale(${getSize()})`,
        }}
      >
        <img
          src={getImage()}
          alt="Task Fish"
          style={{ 
            width: '150px', 
            height: 'auto', 
            display: 'block', 
            pointerEvents: 'none',
            transform: direction === 'swim-right' ? 'scaleX(-1)' : 'none'
          }}
          onError={(e) => {
            // Fallback if image isn't saved yet
            e.target.style.display = 'none';
            e.target.nextSibling.style.display = 'block';
          }}
        />
        {/* Fallback box if image is missing */}
        <div style={{ display: 'none', width: '150px', height: '100px', background: 'var(--ocean-accent)', borderRadius: '10px' }}></div>
        <button
          onClick={handleCompleteClick}
          style={{
            position: 'absolute',
            top: '-10px',
            right: '-10px',
            background: '#4ade80',
            color: '#fff',
            border: 'none',
            borderRadius: '50%',
            width: '24px',
            height: '24px',
            cursor: 'pointer',
            boxShadow: '0 2px 4px rgba(0,0,0,0.3)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: 'bold',
            zIndex: 10
          }}
          title="Mark Done"
        >
          ✓
        </button>
        <button
          onClick={handleDeleteClick}
          style={{
            position: 'absolute',
            top: '-10px',
            right: '22px',
            background: '#ef4444',
            color: '#fff',
            border: 'none',
            borderRadius: '50%',
            width: '24px',
            height: '24px',
            cursor: 'pointer',
            boxShadow: '0 2px 4px rgba(0,0,0,0.3)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: 'bold',
            zIndex: 10
          }}
          title="Delete Task"
        >
          ✕
        </button>
        <div style={{
          position: 'absolute',
          bottom: '-25px',
          left: '50%',
          transform: 'translateX(-50%)',
          background: 'rgba(0,0,0,0.7)',
          padding: '4px 8px',
          borderRadius: '6px',
          fontSize: '0.85rem',
          whiteSpace: 'nowrap',
          pointerEvents: 'none',
          color: '#fff'
        }}>
          {task.title}
        </div>
      </div>
    </div>
  );
};

export default FishTask;
