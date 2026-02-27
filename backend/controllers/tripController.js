// ===== Trip Controller =====

class TripController {
    /**
     * Get all trips
     */
    static async getTrips(req, res) {
        try {
            const trips = [
                {
                    id: 'trip_001',
                    destination: 'Paris',
                    country: 'France',
                    startDate: '2024-04-15',
                    endDate: '2024-04-22',
                    budget: 2500,
                    travelers: 2,
                    status: 'planned',
                    safetyScore: 78,
                    createdAt: new Date().toISOString()
                },
                {
                    id: 'trip_002',
                    destination: 'Tokyo',
                    country: 'Japan',
                    startDate: '2024-06-01',
                    endDate: '2024-06-10',
                    budget: 3000,
                    travelers: 1,
                    status: 'planned',
                    safetyScore: 92,
                    createdAt: new Date().toISOString()
                }
            ];

            res.json({
                message: 'Trips retrieved successfully',
                trips,
                count: trips.length
            });
        } catch (error) {
            res.status(500).json({
                error: 'Failed to get trips',
                message: error.message
            });
        }
    }

    /**
     * Get specific trip
     */
    static async getTripById(req, res) {
        try {
            const { id } = req.params;

            const trip = {
                id: id,
                destination: 'Paris',
                country: 'France',
                startDate: '2024-04-15',
                endDate: '2024-04-22',
                budget: 2500,
                budgetPerDay: 312.5,
                travelers: 2,
                status: 'planned',
                safetyScore: 78,
                interests: ['culture', 'food', 'shopping'],
                itinerary: [
                    {
                        day: 1,
                        date: '2024-04-15',
                        activities: [
                            {
                                time: '09:00',
                                name: 'Arrival at Charles de Gaulle Airport',
                                location: 'Paris Airport',
                                cost: 150
                            }
                        ]
                    }
                ],
                createdAt: new Date().toISOString()
            };

            res.json({
                message: 'Trip retrieved successfully',
                trip
            });
        } catch (error) {
            res.status(500).json({
                error: 'Failed to get trip',
                message: error.message
            });
        }
    }

    /**
     * Create new trip
     */
    static async createTrip(req, res) {
        try {
            const {
                destination,
                startDate,
                endDate,
                budget,
                travelers,
                interests
            } = req.body;

            if (!destination || !startDate || !endDate || !budget) {
                return res.status(400).json({
                    error: 'Destination, dates, and budget are required'
                });
            }

            const trip = {
                id: 'trip_' + Date.now(),
                destination,
                startDate,
                endDate,
                budget,
                travelers: travelers || 1,
                interests: interests || [],
                status: 'planned',
                safetyScore: 80,
                createdAt: new Date().toISOString()
            };

            res.status(201).json({
                message: 'Trip created successfully',
                trip
            });
        } catch (error) {
            res.status(500).json({
                error: 'Failed to create trip',
                message: error.message
            });
        }
    }

    /**
     * Generate itinerary using AI
     */
    static async generateItinerary(req, res) {
        try {
            const {
                destination,
                startDate,
                endDate,
                budget,
                travelers,
                interests
            } = req.body;

            // Simulate AI itinerary generation
            const days = Math.ceil(
                (new Date(endDate) - new Date(startDate)) / (1000 * 60 * 60 * 24)
            );

            const itinerary = Array.from({ length: days }, (_, i) => ({
                day: i + 1,
                date: new Date(new Date(startDate).getTime() + i * 24 * 60 * 60 * 1000)
                    .toISOString()
                    .split('T')[0],
                activities: [
                    {
                        time: '09:00',
                        name: 'Breakfast',
                        location: destination,
                        cost: 20
                    },
                    {
                        time: '14:00',
                        name: `${interests[0] || 'Local'} Activity`,
                        location: destination,
                        cost: 50
                    }
                ],
                estimatedCost: 150
            }));

            res.json({
                message: 'Itinerary generated successfully',
                itinerary,
                totalEstimatedCost: budget,
                safetyRecommendations: [
                    'Avoid traveling alone at night',
                    'Keep valuables secure',
                    'Register with your embassy'
                ]
            });
        } catch (error) {
            res.status(500).json({
                error: 'Failed to generate itinerary',
                message: error.message
            });
        }
    }

    /**
     * Update trip
     */
    static async updateTrip(req, res) {
        try {
            const { id } = req.params;
            const updates = req.body;

            res.json({
                message: 'Trip updated successfully',
                tripId: id,
                updates
            });
        } catch (error) {
            res.status(500).json({
                error: 'Failed to update trip',
                message: error.message
            });
        }
    }

    /**
     * Delete trip
     */
    static async deleteTrip(req, res) {
        try {
            const { id } = req.params;

            res.json({
                message: 'Trip deleted successfully',
                deletedTripId: id
            });
        } catch (error) {
            res.status(500).json({
                error: 'Failed to delete trip',
                message: error.message
            });
        }
    }

    /**
     * Get nearby attractions
     */
    static async getNearbyAttractions(req, res) {
        try {
            const { id } = req.params;
            const { latitude, longitude, radius } = req.query;

            const attractions = [
                {
                    id: 'attr_1',
                    name: 'Famous Monument',
                    type: 'landmark',
                    rating: 4.8,
                    distance: 2.5,
                    address: '123 Main Street'
                },
                {
                    id: 'attr_2',
                    name: 'Local Museum',
                    type: 'museum',
                    rating: 4.6,
                    distance: 1.2,
                    address: '456 Art Avenue'
                }
            ];

            res.json({
                message: 'Attractions retrieved successfully',
                attractions
            });
        } catch (error) {
            res.status(500).json({
                error: 'Failed to get attractions',
                message: error.message
            });
        }
    }

    /**
     * Share trip
     */
    static async shareTrip(req, res) {
        try {
            const { id } = req.params;
            const { email, message } = req.body;

            res.json({
                message: 'Trip shared successfully',
                tripId: id,
                sharedWith: email,
                shareUrl: `https://safewander.com/trips/${id}/shared`
            });
        } catch (error) {
            res.status(500).json({
                error: 'Failed to share trip',
                message: error.message
            });
        }
    }

    /**
     * Get destination suggestions
     */
    static async getDestinationSuggestions(req, res) {
        try {
            const { query } = req.query;

            const suggestions = [
                { name: 'Paris', country: 'France', popularity: 9.5 },
                { name: 'Tokyo', country: 'Japan', popularity: 9.3 },
                { name: 'New York', country: 'USA', popularity: 9.2 }
            ];

            res.json({
                message: 'Suggestions retrieved successfully',
                suggestions
            });
        } catch (error) {
            res.status(500).json({
                error: 'Failed to get suggestions',
                message: error.message
            });
        }
    }
}

module.exports = TripController;
