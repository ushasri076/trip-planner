// ===== User Routes =====
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

/**
 * @route   GET /api/users/profile
 * @desc    Get current user's profile
 * @access  Private
 */
router.get('/profile', userController.getProfile);

/**
 * @route   PUT /api/users/profile
 * @desc    Update user profile
 * @access  Private
 */
router.put('/profile', userController.updateProfile);

/**
 * @route   PUT /api/users/preferences
 * @desc    Update user preferences
 * @access  Private
 */
router.put('/preferences', userController.updatePreferences);

/**
 * @route   GET /api/users/emergency-contacts
 * @desc    Get user's emergency contacts
 * @access  Private
 */
router.get('/emergency-contacts', userController.getEmergencyContacts);

/**
 * @route   POST /api/users/emergency-contacts
 * @desc    Add emergency contact
 * @access  Private
 */
router.post('/emergency-contacts', userController.addEmergencyContact);

/**
 * @route   DELETE /api/users/emergency-contacts/:id
 * @desc    Delete emergency contact
 * @access  Private
 */
router.delete('/emergency-contacts/:id', userController.deleteEmergencyContact);

/**
 * @route   GET /api/users/statistics
 * @desc    Get user travel statistics
 * @access  Private
 */
router.get('/statistics', userController.getStatistics);

/**
 * @route   DELETE /api/users/account
 * @desc    Delete user account
 * @access  Private
 */
router.delete('/account', userController.deleteAccount);

module.exports = router;
