# SafeWander - AI-Powered Smart Travel Companion

## Overview

SafeWander is a comprehensive travel companion application that combines intelligent trip planning, dynamic safety intelligence, and rapid emergency response into one unified ecosystem. The app generates personalized day-wise itineraries while simultaneously analyzing real-time safety data, crowd patterns, and historical crime statistics to provide adaptive risk awareness and proactive alerts.

## Key Features

### 1. **AI-Powered Trip Planning**
- Generate complete itineraries based on destination, time, budget, and interests
- Day-wise activity plans with nearby attractions and estimated costs
- Personalized recommendations based on user preferences
- Budget tracking and cost optimization
- Itinerary sharing capabilities

### 2. **Dynamic Safety Intelligence**
- Real-time risk scoring for different areas
- Analysis of historical crime data (theft, violence, robbery, burglary)
- Time-based risk assessment (day/night variations)
- Crowd pattern analysis and anomaly detection
- Local event and rally notifications
- Comprehensive safety recommendations per location

### 3. **Emergency Response System**
- Gesture-based emergency alert triggers (3-second hold)
- Voice activation with emergency keyword recognition
- Automatic audio recording (up to 30 seconds)
- Live location capture and tracking
- Speech-to-text conversion of emergency statements
- Instant notifications to trusted emergency contacts
- SMS and Email alerts to emergency contacts

### 4. **User Profile Management**
- Personalized profile settings
- Emergency contact management
- Travel history and statistics
- Preference management (notifications, language, theme)
- Data privacy and export options

## Project Structure

```
travel/
├── index.html              # Main application UI
├── index.css               # Global styles
├── js/                     # Frontend JavaScript modules
│   ├── app.js             # Main app controller
│   ├── trip-planner.js    # Trip planning functionality
│   ├── safety-analyzer.js # Safety analysis engine
│   ├── emergency-system.js # Emergency response system
│   └── utils.js           # Utility functions
├── styles/                 # Additional stylesheets
│   ├── dashboard.css      # Dashboard styles
│   ├── trip-planner.css   # Trip planner styles
│   ├── safety-dashboard.css # Safety dashboard styles
│   └── emergency.css      # Emergency system styles
└── backend/               # Backend Node.js/Express server
    ├── server.js          # Server configuration
    ├── package.json       # Dependencies
    ├── routes/            # API routes
    │   ├── auth.js        # Authentication
    │   ├── users.js       # User management
    │   ├── trips.js       # Trip management
    │   ├── safety.js      # Safety analysis
    │   └── emergency.js   # Emergency response
    ├── controllers/       # Business logic
    │   ├── authController.js
    │   ├── userController.js
    │   ├── tripController.js
    │   ├── safetyController.js
    │   └── emergencyController.js
    └── models/           # Data models (MongoDB)
```

## Installation & Setup

### Frontend Setup

1. **Open the application**
   - Simply open `index.html` in a modern web browser
   - No build process required for the frontend
   - All data is stored in browser's localStorage

### Backend Setup

1. **Install Node.js** (if not already installed)
   - Download from https://nodejs.org/

2. **Navigate to backend directory**
   ```bash
   cd backend
   ```

3. **Install dependencies**
   ```bash
   npm install
   ```

4. **Create `.env` file** (optional for local development)
   ```
   PORT=5000
   FRONTEND_URL=http://localhost:3000
   ```

5. **Start the development server**
   ```bash
   npm start
   # or for development with auto-reload
   npm run dev
   ```

6. **Server will run at**
   ```
   http://localhost:5000
   ```

## API Documentation

### Authentication Endpoints

- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/refresh-token` - Refresh JWT token
- `POST /api/auth/logout` - Logout user
- `POST /api/auth/forgot-password` - Request password reset
- `POST /api/auth/reset-password` - Reset password

### User Endpoints

- `GET /api/users/profile` - Get user profile
- `PUT /api/users/profile` - Update profile
- `PUT /api/users/preferences` - Update preferences
- `GET /api/users/emergency-contacts` - Get emergency contacts
- `POST /api/users/emergency-contacts` - Add contact
- `DELETE /api/users/emergency-contacts/:id` - Delete contact
- `GET /api/users/statistics` - Get travel statistics
- `DELETE /api/users/account` - Delete account

### Trip Planning Endpoints

- `GET /api/trips` - Get all trips
- `GET /api/trips/:id` - Get specific trip
- `POST /api/trips` - Create new trip
- `POST /api/trips/generate-itinerary` - Generate AI itinerary
- `PUT /api/trips/:id` - Update trip
- `DELETE /api/trips/:id` - Delete trip
- `GET /api/trips/:id/attractions` - Get nearby attractions
- `POST /api/trips/:id/share` - Share trip
- `GET /api/trips/destinations/suggestions` - Get destination suggestions

### Safety Analysis Endpoints

- `POST /api/safety/analyze-location` - Analyze location risk
- `GET /api/safety/risk-score/:location` - Get risk score
- `GET /api/safety/crime-data/:location` - Get crime data
- `GET /api/safety/alerts` - Get alerts
- `POST /api/safety/alerts/subscribe` - Subscribe to alerts
- `DELETE /api/safety/alerts/unsubscribe/:id` - Unsubscribe
- `POST /api/safety/report-incident` - Report incident
- `GET /api/safety/recommendations/:location` - Get recommendations
- `GET /api/safety/time-based-risk/:location` - Get time-based risk

### Emergency Response Endpoints

- `POST /api/emergency/alert` - Trigger emergency alert
- `POST /api/emergency/alert/with-audio` - Trigger with audio
- `GET /api/emergency/contacts` - Get emergency contacts
- `POST /api/emergency/contacts` - Add contact
- `DELETE /api/emergency/contacts/:id` - Delete contact
- `GET /api/emergency/alert-history` - Get alert history
- `POST /api/emergency/cancel-alert/:id` - Cancel alert
- `POST /api/emergency/verify-contact/:id` - Verify contact
- `POST /api/emergency/send-sms` - Send SMS
- `POST /api/emergency/send-email` - Send email

## Usage Guide

### Trip Planning

1. **Select "Plan Trip"** from the navigation menu
2. **Fill in trip details**:
   - Destination (with autocomplete suggestions)
   - Start and end dates
   - Budget per person
   - Number of travelers
3. **Select interests**:
   - Culture & History, Adventure, Food & Cuisine, Nature & Outdoors
   - Nightlife, Shopping, Wellness & Spa, Family Activities
4. **Generate Itinerary**:
   - Click "Generate Itinerary with AI"
   - Review the day-wise plan with costs and activities
5. **Save and Share**:
   - Save trip to your dashboard
   - Share with friends and family

### Safety Analysis

1. **Access Safety Dashboard** from the navigation menu
2. **Analyze Locations**:
   - Enter any location to see risk analysis
   - View crime statistics and safety factors
   - Check time-based risk variations
3. **Subscribe to Alerts**:
   - Enable real-time alerts
   - Choose alert severity levels
   - Get notified of crowd patterns and events

### Emergency Response

1. **Set Up Emergency Contacts** first
   - Add at least one trusted contact
   - Include phone and email
2. **Trigger Emergency Alert**:
   - Hold the emergency button for 3 seconds
   - OR activate voice command (say "help" or "emergency")
3. **System Actions**:
   - Records audio automatically (if enabled)
   - Captures live location
   - Converts speech to text
   - Sends alerts to emergency contacts

## Browser Support

- Chrome/Chromium (v90+)
- Firefox (v88+)
- Safari (v14+)
- Edge (v90+)

## Features That Work Offline

- Trip planning and viewing
- Emergency contact management
- Stored alert history
- User profile management

## Tech Stack

### Frontend
- HTML5, CSS3, Vanilla JavaScript
- LocalStorage for data persistence
- Web Speech API for voice recognition
- Geolocation API for location tracking
- MediaRecorder API for audio recording

### Backend
- Node.js runtime
- Express.js web framework
- CORS for cross-origin requests
- Helmet for security
- Nodemon for development

### Optional Integrations (for production)
- MongoDB for database
- JWT for authentication
- Twilio for SMS notifications
- Nodemailer for email notifications
- Google Maps API for location services

## Security Considerations

1. **Frontend**:
   - All sensitive data should be encrypted
   - Use HTTPS in production
   - Implement proper authentication tokens

2. **Backend**:
   - Validate all input data
   - Implement rate limiting
   - Use environment variables for secrets
   - Enable CORS properly

3. **Emergency System**:
   - Verify emergency contact information
   - Ensure secure location data transmission
   - Comply with privacy regulations

## Future Enhancements

1. **AI Integration**:
   - ChatGPT API for smarter itineraries
   - ML models for predictive safety analysis
   - NLP for incident description analysis

2. **Real-Time Features**:
   - WebSocket integration for live alerts
   - Real-time crowd tracking
   - Live emergency contact communication

3. **Mobile App**:
   - React Native cross-platform app
   - Native geolocation and camera access
   - Background emergency alert triggers

4. **Advanced Safety**:
   - Integration with local authorities
   - Police API for crime statistics
   - Satellite imagery for area analysis

5. **Social Features**:
   - Group trip planning
   - Travel buddy matching
   - Community safety reviews

## License

MIT License - Feel free to use this project for personal or commercial purposes.

## Support

For issues, questions, or suggestions, please refer to the project documentation or contact the development team.

---

**Stay Safe. Travel Smart. With SafeWander.**
