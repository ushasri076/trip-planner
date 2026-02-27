// ===== Safety Controller =====

class SafetyController {
    /**
     * Analyze location risk
     */
    static async analyzeLocation(req, res) {
        try {
            const { location, latitude, longitude } = req.body;

            if (!location) {
                return res.status(400).json({
                    error: 'Location is required'
                });
            }

            const analysis = {
                location,
                coordinates: { latitude, longitude },
                riskScore: Math.floor(Math.random() * 80) + 20,
                safetyLevel: 'Safe',
                crimeData: {
                    pettyTheft: 'Medium',
                    violentCrime: 'Low',
                    burglary: 'Medium',
                    robbery: 'Low'
                },
                timeBasedRisk: {
                    morning: 'Low',
                    afternoon: 'Low',
                    evening: 'Medium',
                    night: 'High'
                },
                crowdConditions: 'Normal',
                nearbyEvents: 'None',
                recommendations: [
                    'Avoid traveling alone at night',
                    'Keep valuables secure',
                    'Stay in well-lit areas'
                ],
                analyzedAt: new Date().toISOString()
            };

            res.json({
                message: 'Location analysis completed',
                analysis
            });
        } catch (error) {
            res.status(500).json({
                error: 'Failed to analyze location',
                message: error.message
            });
        }
    }

    /**
     * Get risk score
     */
    static async getRiskScore(req, res) {
        try {
            const { location } = req.params;

            const riskScore = {
                location,
                score: Math.floor(Math.random() * 60) + 30,
                level: 'Moderate',
                trend: 'stable',
                lastUpdated: new Date().toISOString()
            };

            res.json({
                message: 'Risk score retrieved',
                riskScore
            });
        } catch (error) {
            res.status(500).json({
                error: 'Failed to get risk score',
                message: error.message
            });
        }
    }

    /**
     * Get crime data
     */
    static async getCrimeData(req, res) {
        try {
            const { location } = req.params;

            const crimeData = {
                location,
                period: 'Last 6 months',
                incidents: [
                    { type: 'Petty Theft', count: 45, trend: 'up' },
                    { type: 'Violent Crime', count: 12, trend: 'down' },
                    { type: 'Burglary', count: 28, trend: 'stable' },
                    { type: 'Robbery', count: 8, trend: 'down' }
                ],
                dataSource: 'Local Police Records',
                lastUpdated: new Date().toISOString()
            };

            res.json({
                message: 'Crime data retrieved',
                crimeData
            });
        } catch (error) {
            res.status(500).json({
                error: 'Failed to get crime data',
                message: error.message
            });
        }
    }

    /**
     * Get alerts
     */
    static async getAlerts(req, res) {
        try {
            const alerts = [
                {
                    id: 'alert_1',
                    title: 'Crowd Alert',
                    message: 'Unusual gathering detected',
                    severity: 'high',
                    location: 'Downtown Plaza',
                    createdAt: new Date().toISOString()
                },
                {
                    id: 'alert_2',
                    title: 'Weather Warning',
                    message: 'Heavy rainfall expected',
                    severity: 'medium',
                    location: 'City-wide',
                    createdAt: new Date().toISOString()
                }
            ];

            res.json({
                message: 'Alerts retrieved',
                alerts,
                count: alerts.length
            });
        } catch (error) {
            res.status(500).json({
                error: 'Failed to get alerts',
                message: error.message
            });
        }
    }

    /**
     * Subscribe to alerts
     */
    static async subscribeToAlerts(req, res) {
        try {
            const { location } = req.body;

            if (!location) {
                return res.status(400).json({
                    error: 'Location is required'
                });
            }

            const subscription = {
                id: 'sub_' + Date.now(),
                location,
                subscribedAt: new Date().toISOString(),
                active: true
            };

            res.status(201).json({
                message: 'Subscribed to alerts',
                subscription
            });
        } catch (error) {
            res.status(500).json({
                error: 'Failed to subscribe',
                message: error.message
            });
        }
    }

    /**
     * Unsubscribe from alerts
     */
    static async unsubscribeFromAlerts(req, res) {
        try {
            const { id } = req.params;

            res.json({
                message: 'Unsubscribed from alerts',
                subscriptionId: id
            });
        } catch (error) {
            res.status(500).json({
                error: 'Failed to unsubscribe',
                message: error.message
            });
        }
    }

    /**
     * Report incident
     */
    static async reportIncident(req, res) {
        try {
            const { location, incidentType, description, latitude, longitude } = req.body;

            if (!location || !incidentType) {
                return res.status(400).json({
                    error: 'Location and incident type are required'
                });
            }

            const report = {
                id: 'report_' + Date.now(),
                location,
                incidentType,
                description,
                coordinates: { latitude, longitude },
                status: 'submitted',
                reportedAt: new Date().toISOString()
            };

            res.status(201).json({
                message: 'Incident reported successfully',
                report
            });
        } catch (error) {
            res.status(500).json({
                error: 'Failed to report incident',
                message: error.message
            });
        }
    }

    /**
     * Get recommendations
     */
    static async getRecommendations(req, res) {
        try {
            const { location } = req.params;

            const recommendations = {
                location,
                general: [
                    'Avoid traveling alone at night',
                    'Keep valuables out of sight',
                    'Use official transportation',
                    'Register with your embassy'
                ],
                nighttime: [
                    'Stay in well-lit areas',
                    'Travel in groups',
                    'Use registered taxis'
                ],
                emergency: [
                    'Save emergency numbers',
                    'Have travel insurance',
                    'Share location with contacts'
                ],
                generatedAt: new Date().toISOString()
            };

            res.json({
                message: 'Recommendations retrieved',
                recommendations
            });
        } catch (error) {
            res.status(500).json({
                error: 'Failed to get recommendations',
                message: error.message
            });
        }
    }

    /**
     * Get time-based risk
     */
    static async getTimeBasedRisk(req, res) {
        try {
            const { location } = req.params;

            const timeBasedRisk = {
                location,
                breakdown: {
                    '6:00-12:00 (Morning)': { score: 20, level: 'Low' },
                    '12:00-18:00 (Afternoon)': { score: 15, level: 'Low' },
                    '18:00-22:00 (Evening)': { score: 45, level: 'Medium' },
                    '22:00-6:00 (Night)': { score: 70, level: 'High' }
                },
                analysisDate: new Date().toISOString()
            };

            res.json({
                message: 'Time-based risk retrieved',
                timeBasedRisk
            });
        } catch (error) {
            res.status(500).json({
                error: 'Failed to get time-based risk',
                message: error.message
            });
        }
    }
}

module.exports = SafetyController;
