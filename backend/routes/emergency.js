// ===== Emergency System Routes =====
const express = require('express');
const router = express.Router();
const emergencyController = require('../controllers/emergencyController');
const multer = require('multer');

const upload = multer({ dest: 'uploads/emergency/' });

/**
 * @route   POST /api/emergency/alert
 * @desc    Trigger emergency alert
 * @access  Private
 */
router.post('/alert', emergencyController.triggerAlert);

/**
 * @route   POST /api/emergency/alert/with-audio
 * @desc    Trigger emergency alert with audio recording
 * @access  Private
 */
router.post('/alert/with-audio', upload.single('audio'), emergencyController.triggerAlertWithAudio);

/**
 * @route   GET /api/emergency/contacts
 * @desc    Get emergency contacts
 * @access  Private
 */
router.get('/contacts', emergencyController.getContacts);

/**
 * @route   POST /api/emergency/contacts
 * @desc    Add emergency contact
 * @access  Private
 */
router.post('/contacts', emergencyController.addContact);

/**
 * @route   DELETE /api/emergency/contacts/:id
 * @desc    Delete emergency contact
 * @access  Private
 */
router.delete('/contacts/:id', emergencyController.deleteContact);

/**
 * @route   GET /api/emergency/alert-history
 * @desc    Get alert history
 * @access  Private
 */
router.get('/alert-history', emergencyController.getAlertHistory);

/**
 * @route   POST /api/emergency/cancel-alert/:id
 * @desc    Cancel emergency alert
 * @access  Private
 */
router.post('/cancel-alert/:id', emergencyController.cancelAlert);

/**
 * @route   POST /api/emergency/verify-contact/:id
 * @desc    Verify emergency contact
 * @access  Private
 */
router.post('/verify-contact/:id', emergencyController.verifyContact);

/**
 * @route   POST /api/emergency/send-sms
 * @desc    Send SMS to emergency contact
 * @access  Private
 */
router.post('/send-sms', emergencyController.sendSMS);

/**
 * @route   POST /api/emergency/send-email
 * @desc    Send email to emergency contact
 * @access  Private
 */
router.post('/send-email', emergencyController.sendEmail);

module.exports = router;
