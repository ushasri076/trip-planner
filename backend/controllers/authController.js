// ===== Authentication Controller =====

class AuthController {
    /**
     * Register a new user
     */
    static async register(req, res) {
        try {
            const { name, email, password, phone, country } = req.body;

            // Validation
            if (!name || !email || !password) {
                return res.status(400).json({
                    error: 'Name, email, and password are required'
                });
            }

            // In a real app, hash password and save to database
            const user = {
                id: 'user_' + Date.now(),
                name,
                email,
                phone,
                country,
                createdAt: new Date().toISOString()
            };

            res.status(201).json({
                message: 'User registered successfully',
                user: {
                    id: user.id,
                    name: user.name,
                    email: user.email
                },
                token: 'mock_jwt_token_' + user.id
            });
        } catch (error) {
            res.status(500).json({
                error: 'Registration failed',
                message: error.message
            });
        }
    }

    /**
     * Login user
     */
    static async login(req, res) {
        try {
            const { email, password } = req.body;

            if (!email || !password) {
                return res.status(400).json({
                    error: 'Email and password are required'
                });
            }

            // In a real app, verify credentials against database
            const user = {
                id: 'user_123',
                name: 'John Traveler',
                email: email,
                createdAt: new Date().toISOString()
            };

            res.json({
                message: 'Login successful',
                user: {
                    id: user.id,
                    name: user.name,
                    email: user.email
                },
                token: 'mock_jwt_token_' + user.id,
                expiresIn: '24h'
            });
        } catch (error) {
            res.status(500).json({
                error: 'Login failed',
                message: error.message
            });
        }
    }

    /**
     * Refresh JWT token
     */
    static async refreshToken(req, res) {
        try {
            const { refreshToken } = req.body;

            if (!refreshToken) {
                return res.status(400).json({
                    error: 'Refresh token is required'
                });
            }

            res.json({
                message: 'Token refreshed',
                token: 'mock_jwt_token_new_' + Date.now(),
                expiresIn: '24h'
            });
        } catch (error) {
            res.status(500).json({
                error: 'Token refresh failed',
                message: error.message
            });
        }
    }

    /**
     * Logout user
     */
    static async logout(req, res) {
        try {
            res.json({
                message: 'Logout successful'
            });
        } catch (error) {
            res.status(500).json({
                error: 'Logout failed',
                message: error.message
            });
        }
    }

    /**
     * Request password reset
     */
    static async forgotPassword(req, res) {
        try {
            const { email } = req.body;

            if (!email) {
                return res.status(400).json({
                    error: 'Email is required'
                });
            }

            res.json({
                message: 'Password reset email sent',
                email: email
            });
        } catch (error) {
            res.status(500).json({
                error: 'Password reset request failed',
                message: error.message
            });
        }
    }

    /**
     * Reset password with token
     */
    static async resetPassword(req, res) {
        try {
            const { token, newPassword } = req.body;

            if (!token || !newPassword) {
                return res.status(400).json({
                    error: 'Token and new password are required'
                });
            }

            res.json({
                message: 'Password reset successful',
                redirect: '/login'
            });
        } catch (error) {
            res.status(500).json({
                error: 'Password reset failed',
                message: error.message
            });
        }
    }
}

module.exports = AuthController;
