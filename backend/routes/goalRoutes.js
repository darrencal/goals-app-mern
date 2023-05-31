const express = require('express');
const router = express.Router();
const {
  getGoals,
  storeGoal,
  updateGoal,
  deleteGoal,
} = require('../controllers/goalController');

router.route('/').get(getGoals).post(storeGoal);
router.route('/:id').put(updateGoal).delete(deleteGoal);

module.exports = router;
