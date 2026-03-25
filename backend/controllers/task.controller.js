const Task = require('../models/Task');

exports.getTasks = async (req, res, next) => {
  try {
    const reqQuery = { ...req.query, userId: req.user.id };
    const removeFields = ['select', 'sort', 'page', 'limit', 'search'];
    removeFields.forEach(param => delete reqQuery[param]);

    if (req.query.search) {
      reqQuery.title = { $regex: req.query.search, $options: 'i' };
    }

    let query = Task.find(reqQuery);

    if (req.query.sort) {
      const sortBy = req.query.sort.split(',').join(' ');
      query = query.sort(sortBy);
    } else {
      query = query.sort('-createdAt');
    }

    // Pagination
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 12; // 12 for aquarium grid feel
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const total = await Task.countDocuments(reqQuery);

    query = query.skip(startIndex).limit(limit);

    const tasks = await query;

    const pagination = {};
    if (endIndex < total) {
      pagination.next = { page: page + 1, limit };
    }
    if (startIndex > 0) {
      pagination.prev = { page: page - 1, limit };
    }

    res.status(200).json({ success: true, count: tasks.length, total, pagination, data: tasks });
  } catch (err) {
    next(err);
  }
};

exports.createTask = async (req, res, next) => {
  try {
    req.body.userId = req.user.id;
    const task = await Task.create(req.body);
    res.status(201).json({ success: true, data: task });
  } catch (err) {
    next(err);
  }
};

exports.updateTask = async (req, res, next) => {
  try {
    let task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).json({ success: false, error: 'Task not found' });
    }
    if (task.userId.toString() !== req.user.id) {
      return res.status(401).json({ success: false, error: 'Not authorized to update task' });
    }
    task = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    res.status(200).json({ success: true, data: task });
  } catch (err) {
    next(err);
  }
};

exports.deleteTask = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).json({ success: false, error: 'Task not found' });
    }
    if (task.userId.toString() !== req.user.id) {
      return res.status(401).json({ success: false, error: 'Not authorized to delete task' });
    }
    await task.deleteOne();
    res.status(200).json({ success: true, data: {} });
  } catch (err) {
    next(err);
  }
};

exports.getAnalytics = async (req, res, next) => {
  try {
    const stats = await Task.aggregate([
      { $match: { userId: req.user._id } },
      { $group: { _id: '$status', count: { $sum: 1 } } }
    ]);
    const total = await Task.countDocuments({ userId: req.user._id });
    res.status(200).json({ success: true, data: { total, stats }});
  } catch (err) {
    next(err);
  }
};
