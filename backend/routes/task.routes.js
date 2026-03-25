const express = require('express');
const { getTasks, createTask, updateTask, deleteTask, getAnalytics } = require('../controllers/task.controller');
const { protect } = require('../middleware/auth.middleware');

const router = express.Router();

router.use(protect);

router.get('/analytics', getAnalytics);
router.route('/').get(getTasks).post(createTask);
router.route('/:id').put(updateTask).delete(deleteTask);

module.exports = router;
