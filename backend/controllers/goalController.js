const asyncHandler = require('express-async-handler');
const Goal = require('../models/goal');

// @desc    Get goals
// @route   GET /api/goals
// @access  Private
const getGoals = asyncHandler(async (req, res) => {
  const goals = await Goal.find({ user: req.user.id });
  res.status(200).send(goals);
});

// @desc    Create a goal
// @route   POST /api/goals
// @access  Private
const storeGoal = asyncHandler(async (req, res) => {
  if (!req.body.text) {
    res.status(400);
    throw new Error('Please add a text field.');
  }

  const goal = await Goal.create({
    text: req.body.text,
    user: req.user.id,
  });

  res.status(200).send(goal);
});

// @desc    Update a goal
// @route   PUT /api/goals/:id
// @access  Private
const updateGoal = asyncHandler(async (req, res) => {
  const goal = await Goal.findById(req.params.id);

  // Check if goal exists
  if (!goal) {
    res.status(404);
    throw new Error('Goal not found.');
  }

  // Check if auth user is set
  if (!req.user) {
    res.status(401);
    throw new Error('User not found');
  }

  // Check if goal belongs to user
  if (goal.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error('User not authorized');
  }

  const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  res.status(200).send(updatedGoal);
});

// @desc    Delete a goal
// @route   DELETE /api/goals/:id
// @access  Private
const deleteGoal = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const goal = await Goal.findById(id);

  // Check if goal exists
  if (!goal) {
    res.status(404);
    throw new Error('Goal not found.');
  }

  // Check if auth user is set
  if (!req.user) {
    res.status(401);
    throw new Error('User not found');
  }

  // Check if goal belongs to user
  if (goal.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error('User not authorized');
  }

  await Goal.deleteOne({ _id: id });

  res.status(200).send({ id });
});

module.exports = {
  getGoals,
  storeGoal,
  updateGoal,
  deleteGoal,
};
