// ===== Emergency Controller =====

class EmergencyController {
    /**
     * Trigger emergency alert
     */
    static async triggerAlert(req, res) {
        try {
            const { reason, location, latitude, longitude } = req.body;

            if (!location) {
                return res.status(400).json({
                    error: 'Location is required for emergency alert'
                });
            }

            const alert = {
                id: 'emergency_' + Date.now(),
                reason: reason || 'Emergency Alert',
                location: { name: location, latitude, longitude },
                status: 'active',
                triggeredAt: new Date().toISOString(),
                recordingUrl: null,
                audioTranscript: null,
                notifiedContacts: []
            };

            res.status(201).json({
                message: 'Emergency alert triggered',
                alert,
                nextStep: 'Notifying emergency contacts...'
            });
        } catch (error) {
            res.status(500).json({
                error: 'Failed to trigger emergency alert',
                message: error.message
            });
        }
    }

    /**
     * Trigger alert with audio
     */
    static async triggerAlertWithAudio(req, res) {
        try {
            const { reason, location, latitude, longitude } = req.body;
            const audioFile = req.file;

            if (!location) {
                return res.status(400).json({
                    error: 'Location is required'
                });
            }

            if (!audioFile) {
                return res.status(400).json({
                    error: 'Audio file is required'
                });
            }

            const alert = {
                id: 'emergency_' + Date.now(),
                reason: reason || 'Emergency Alert with Audio',
                location: { name: location, latitude, longitude },
                status: 'active',
                triggeredAt: new Date().toISOString(),
                recordingUrl: `/uploads/emergency/${audioFile.filename}`,
                recordingDuration: '0:30',
                audioTranscript: 'Speech-to-text transcription would appear here',
                transcriptionStatus: 'processing',
                notifiedContacts: []
            };

            res.status(201).json({
                message: 'Emergency alert triggered with audio recording',
                alert,
                processingStatus: 'Converting speech to text...'
            });
        } catch (error) {
            res.status(500).json({
                error: 'Failed to trigger emergency alert with audio',
                message: error.message
            });
        }
    }

    /**
     * Get emergency contacts
     */
    static async getContacts(req, res) {
        try {
            const contacts = [
                {
                    id: 'contact_1',
                    name: 'Mother',
                    phone: '+1-555-0001',
                    email: 'mom@email.com',
                    relationship: 'Family',
                    verified: true,
                    lastNotified: null
                },
                {
                    id: 'contact_2',
                    name: 'Emergency Services',
                    phone: '911',
                    email: 'emergency@police.gov',
                    relationship: 'Emergency',
                    verified: true,
                    lastNotified: null
                }
            ];

            res.json({
                message: 'Emergency contacts retrieved',
                contacts,
                count: contacts.length
            });
        } catch (error) {
            res.status(500).json({
                error: 'Failed to get contacts',
                message: error.message
            });
        }
    }

    /**
     * Add emergency contact
     */
    static async addContact(req, res) {
        try {
            const { name, phone, email, relationship } = req.body;

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
                relationship: relationship || 'Other',
                verified: false,
                createdAt: new Date().toISOString()
            };

            res.status(201).json({
                message: 'Emergency contact added',
                contact,
                verificationRequired: true
            });
        } catch (error) {
            res.status(500).json({
                error: 'Failed to add contact',
                message: error.message
            });
        }
    }

    /**
     * Delete emergency contact
     */
    static async deleteContact(req, res) {
        try {
            const { id } = req.params;

            res.json({
                message: 'Emergency contact deleted',
                deletedContactId: id
            });
        } catch (error) {
            res.status(500).json({
                error: 'Failed to delete contact',
                message: error.message
            });
        }
    }

    /**
     * Get alert history
     */
    static async getAlertHistory(req, res) {
        try {
            const history = [
                {
                    id: 'emergency_1',
                    reason: 'Test Alert',
                    location: 'Central Station',
                    triggeredAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
                    status: 'resolved',
                    duration: '5 minutes',
                    contactsNotified: 2
                }
            ];

            res.json({
                message: 'Alert history retrieved',
                history,
                count: history.length
            });
        } catch (error) {
            res.status(500).json({
                error: 'Failed to get alert history',
                message: error.message
            });
        }
    }

    /**
     * Cancel alert
     */
    static async cancelAlert(req, res) {
        try {
            const { id } = req.params;

            res.json({
                message: 'Emergency alert cancelled',
                alertId: id,
                status: 'cancelled',
                cancelledAt: new Date().toISOString()
            });
        } catch (error) {
            res.status(500).json({
                error: 'Failed to cancel alert',
                message: error.message
            });
        }
    }

    /**
     * Verify contact
     */
    static async verifyContact(req, res) {
        try {
            const { id } = req.params;
            const { code } = req.body;

            if (!code) {
                return res.status(400).json({
                    error: 'Verification code is required'
                });
            }

            res.json({
                message: 'Contact verified successfully',
                contactId: id,
                verified: true,
                verifiedAt: new Date().toISOString()
            });
        } catch (error) {
            res.status(500).json({
                error: 'Failed to verify contact',
                message: error.message
            });
        }
    }

    /**
     * Send SMS
     */
    static async sendSMS(req, res) {
        try {
            const { phoneNumber, message } = req.body;

            if (!phoneNumber || !message) {
                return res.status(400).json({
                    error: 'Phone number and message are required'
                });
            }

            // In a real app, use Twilio or similar service
            res.json({
                message: 'SMS sent successfully',
                recipient: phoneNumber,
                status: 'sent',
                sentAt: new Date().toISOString()
            });
        } catch (error) {
            res.status(500).json({
                error: 'Failed to send SMS',
                message: error.message
            });
        }
    }

    /**
     * Send email
     */
    static async sendEmail(req, res) {
        try {
            const { email, subject, message } = req.body;

            if (!email || !subject || !message) {
                return res.status(400).json({
                    error: 'Email, subject, and message are required'
                });
            }

            // In a real app, use Nodemailer or similar service
            res.json({
                message: 'Email sent successfully',
                recipient: email,
                status: 'sent',
                sentAt: new Date().toISOString()
            });
        } catch (error) {
            res.status(500).json({
                error: 'Failed to send email',
                message: error.message
            });
        }
    }
}

module.exports = EmergencyController;
