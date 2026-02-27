// ===== User Controller =====

class UserController {
    /**
     * Get user profile
     */
    static async getProfile(req, res) {
        try {
            const userId = req.userId; // From middleware

            const user = {
                id: userId,
                name: 'John Traveler',
                email: 'john@safewander.com',
                phone: '+1-555-0123',
                country: 'United States',
                profilePicture: null,
                joinedDate: new Date('2024-01-15').toISOString(),
                preferences: {
                    notifications: true,
                    sms: true,
                    push: true,
                    darkMode: false,
                    language: 'en'
                }
            };

            res.json({
                message: 'Profile retrieved successfully',
                user
            });
        } catch (error) {
            res.status(500).json({
                error: 'Failed to get profile',
                message: error.message
            });
        }
    }

    /**
     * Update user profile
     */
    static async updateProfile(req, res) {
        try {
            const { name, phone, country, profilePicture } = req.body;

            const updatedUser = {
                name: name || 'John Traveler',
                phone: phone || '+1-555-0123',
                country: country || 'United States',
                profilePicture: profilePicture || null,
                updatedAt: new Date().toISOString()
            };

            res.json({
                message: 'Profile updated successfully',
                user: updatedUser
            });
        } catch (error) {
            res.status(500).json({
                error: 'Failed to update profile',
                message: error.message
            });
        }
    }

    /**
     * Update user preferences
     */
    static async updatePreferences(req, res) {
        try {
            const { notifications, sms, push, darkMode, language } = req.body;

            const preferences = {
                notifications: notifications !== undefined ? notifications : true,
                sms: sms !== undefined ? sms : true,
                push: push !== undefined ? push : true,
                darkMode: darkMode || false,
                language: language || 'en',
                updatedAt: new Date().toISOString()
            };

            res.json({
                message: 'Preferences updated successfully',
                preferences
            });
        } catch (error) {
            res.status(500).json({
                error: 'Failed to update preferences',
                message: error.message
            });
        }
    }

    /**
     * Get emergency contacts
     */
    static async getEmergencyContacts(req, res) {
        try {
            const contacts = [
                {
                    id: 'contact_1',
                    name: 'Mom',
                    phone: '+1-555-0001',
                    email: 'mom@email.com',
                    verified: true,
                    addedDate: new Date('2024-01-20').toISOString()
                },
                {
                    id: 'contact_2',
                    name: 'Best Friend',
                    phone: '+1-555-0002',
                    email: 'friend@email.com',
                    verified: true,
                    addedDate: new Date('2024-01-22').toISOString()
                }
            ];

            res.json({
                message: 'Emergency contacts retrieved',
                contacts
            });
        } catch (error) {
            res.status(500).json({
                error: 'Failed to get emergency contacts',
                message: error.message
            });
        }
    }

    /**
     * Add emergency contact
     */
    static async addEmergencyContact(req, res) {
        try {
            const { name, phone, email } = req.body;

            if (!name || !phone || !email) {
                return res.status(400).json({
                    error: 'Name, phone, and email are required'
                });
            }

            const contact = {
                id: 'contact_' + Date.now(),
                name,
                phone,
                email,
                verified: false,
                addedDate: new Date().toISOString()
            };

            res.status(201).json({
                message: 'Emergency contact added successfully',
                contact
            });
        } catch (error) {
            res.status(500).json({
                error: 'Failed to add emergency contact',
                message: error.message
            });
        }
    }

    /**
     * Delete emergency contact
     */
    static async deleteEmergencyContact(req, res) {
        try {
            const { id } = req.params;

            res.json({
                message: 'Emergency contact deleted successfully',
                deletedContactId: id
            });
        } catch (error) {
            res.status(500).json({
                error: 'Failed to delete emergency contact',
                message: error.message
            });
        }
    }

    /**
     * Get user statistics
     */
    static async getStatistics(req, res) {
        try {
            const stats = {
                totalTripsPlanned: 5,
                countriesVisited: 3,
                daysTraveled: 28,
                moneySpent: 4250,
                emergencyAlertsTriggered: 0,
                safetyIncidentsReported: 0,
                averageTripDuration: 5.6,
                favoriteDestination: 'Paris'
            };

            res.json({
                message: 'Statistics retrieved successfully',
                statistics: stats
            });
        } catch (error) {
            res.status(500).json({
                error: 'Failed to get statistics',
                message: error.message
            });
        }
    }

    /**
     * Delete user account
     */
    static async deleteAccount(req, res) {
        try {
            const { password } = req.body;

            if (!password) {
                return res.status(400).json({
                    error: 'Password confirmation required'
                });
            }

            res.json({
                message: 'Account deleted successfully',
                dataExportUrl: '/api/users/export-data'
            });
        } catch (error) {
            res.status(500).json({
                error: 'Failed to delete account',
                message: error.message
            });
        }
    }
}

module.exports = UserController;
