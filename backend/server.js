// ===== SafeWander Backend Server =====
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// ===== Middleware =====
app.use(helmet()); // Security headers
app.use(cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    credentials: true
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

// ===== Request Logging =====
app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
    next();
});

// ===== Health Check Route =====
app.get('/api/health', (req, res) => {
    res.json({
        status: 'ok',
        timestamp: new Date().toISOString(),
        uptime: process.uptime()
    });
});

// ===== API Routes =====

// Authentication Routes
app.use('/api/auth', require('./routes/auth'));

// User Profile Routes
app.use('/api/users', require('./routes/users'));

// Trip Planning Routes
app.use('/api/trips', require('./routes/trips'));

// Safety Analysis Routes
app.use('/api/safety', require('./routes/safety'));

// Emergency System Routes
app.use('/api/emergency', require('./routes/emergency'));

// Local Cost Routes
app.use('/api/costs', require('./routes/costs'));

// ===== Error Handling Middleware =====
app.use((err, req, res, next) => {
    console.error('Error:', err);

    const status = err.status || 500;
    const message = err.message || 'Internal Server Error';

    res.status(status).json({
        error: {
            status,
            message,
            timestamp: new Date().toISOString()
        }
    });
});

// ===== 404 Handler =====
app.use((req, res) => {
    res.status(404).json({
        error: {
            status: 404,
            message: 'Route not found',
            path: req.path
        }
    });
});

// ===== Server Startup =====
app.listen(PORT, () => {
    console.log(`
    ╔══════════════════════════════════════════════╗
    ║      SafeWander Backend Server Running       ║
    ║               Port: ${PORT}                    ║
    ║      http://localhost:${PORT}                 ║
    ╚══════════════════════════════════════════════╝
    `);
});

module.exports = app;
