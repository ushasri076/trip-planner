// ===== Trip Planning Routes =====
const express = require('express');
const router = express.Router();
const tripController = require('../controllers/tripController');

/**
 * @route   GET /api/trips
 * @desc    Get all trips for current user
 * @access  Private
 */
router.get('/', tripController.getTrips);

/**
 * @route   GET /api/trips/:id
 * @desc    Get specific trip details
 * @access  Private
 */
router.get('/:id', tripController.getTripById);

/**
 * @route   POST /api/trips
 * @desc    Create new trip
 * @access  Private
 */
router.post('/', tripController.createTrip);

/**
 * @route   POST /api/trips/generate-itinerary
 * @desc    Generate AI itinerary based on user input
 * @access  Private
 */
router.post('/generate-itinerary', tripController.generateItinerary);

/**
 * @route   PUT /api/trips/:id
 * @desc    Update trip details
 * @access  Private
 */
router.put('/:id', tripController.updateTrip);

/**
 * @route   DELETE /api/trips/:id
 * @desc    Delete trip
 * @access  Private
 */
router.delete('/:id', tripController.deleteTrip);

/**
 * @route   GET /api/trips/:id/attractions
 * @desc    Get nearby attractions for a destination
 * @access  Public
 */
router.get('/:id/attractions', tripController.getNearbyAttractions);

/**
 * @route   POST /api/trips/:id/share
 * @desc    Share trip with others
 * @access  Private
 */
router.post('/:id/share', tripController.shareTrip);

/**
 * @route   GET /api/trips/destinations/suggestions
 * @desc    Get destination suggestions
 * @access  Public
 */
router.get('/destinations/suggestions', tripController.getDestinationSuggestions);

module.exports = router;
