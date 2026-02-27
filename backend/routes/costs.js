// ===== Local Cost Routes =====
const express = require('express');
const router = express.Router();
const costController = require('../controllers/costController');

/**
 * @route   GET /api/costs/estimate
 * @desc    Get estimated local cost for an item at a destination
 * @access  Public
 * @query   destination, item
 */
router.get('/estimate', costController.estimateCost);

module.exports = router;
