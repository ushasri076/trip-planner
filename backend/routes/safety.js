// ===== Safety Analysis Routes =====
const express = require('express');
const router = express.Router();
const safetyController = require('../controllers/safetyController');

/**
 * @route   POST /api/safety/analyze-location
 * @desc    Analyze risk score for a location
 * @access  Private
 */
router.post('/analyze-location', safetyController.analyzeLocation);

/**
 * @route   GET /api/safety/risk-score/:location
 * @desc    Get current risk score for location
 * @access  Public
 */
router.get('/risk-score/:location', safetyController.getRiskScore);

/**
 * @route   GET /api/safety/crime-data/:location
 * @desc    Get crime statistics for a location
 * @access  Public
 */
router.get('/crime-data/:location', safetyController.getCrimeData);

/**
 * @route   GET /api/safety/alerts
 * @desc    Get real-time safety alerts
 * @access  Private
 */
router.get('/alerts', safetyController.getAlerts);

/**
 * @route   POST /api/safety/alerts/subscribe
 * @desc    Subscribe to alerts for a location
 * @access  Private
 */
router.post('/alerts/subscribe', safetyController.subscribeToAlerts);

/**
 * @route   DELETE /api/safety/alerts/unsubscribe/:id
 * @desc    Unsubscribe from alerts
 * @access  Private
 */
router.delete('/alerts/unsubscribe/:id', safetyController.unsubscribeFromAlerts);

/**
 * @route   POST /api/safety/report-incident
 * @desc    Report a safety incident
 * @access  Private
 */
router.post('/report-incident', safetyController.reportIncident);

/**
 * @route   GET /api/safety/recommendations/:location
 * @desc    Get safety recommendations for a location
 * @access  Public
 */
router.get('/recommendations/:location', safetyController.getRecommendations);

/**
 * @route   GET /api/safety/time-based-risk/:location
 * @desc    Analyze time-based risk factors
 * @access  Public
 */
router.get('/time-based-risk/:location', safetyController.getTimeBasedRisk);

module.exports = router;
