# SafeWander - Quick Start Guide

## 🚀 Get Started in 5 Minutes

### Step 1: Open the Frontend (Immediate)

1. Simply open `index.html` in your web browser
2. You'll immediately see the SafeWander dashboard
3. Start using the app right away!

**No installation needed for the frontend!**

### Step 2: Set Up Mock Features (Frontend-Only)

The app works completely offline with these features:

#### ✅ What Works Without Backend:
- 📋 **Dashboard** - View stats and recent trips
- ✈️ **Trip Planning** - Generate AI itineraries with mock data
- 🛡️ **Safety Analysis** - Get risk scores and recommendations
- 🚨 **Emergency System** - Set up contacts and test alerts
- 👤 **User Profile** - Manage your account and preferences

**Try this now:**
1. Go to "Plan Trip" tab
2. Enter: Paris, April 15-22, $2500 budget, select interests
3. Click "Generate Itinerary"
4. Watch the AI generate your day-wise plan!

---

### Step 3: Add Emergency Contacts (Recommended)

1. Click on "Emergency" tab
2. Fill in contact details:
   - Name: "Mom"
   - Phone: "+1-555-0001"
   - Email: "mom@email.com"
3. Click "Add Contact"
4. Test the emergency alert button

---

### Step 4: Set Up Backend (Optional - For API Integration)

If you want to connect the backend services:

#### Install Backend:
```bash
cd backend
npm install
npm start
```

Backend will run at: `http://localhost:5000`

#### Test Backend APIs:
```bash
# Health check
curl http://localhost:5000/api/health

# Create a trip (requires authentication in real app)
curl -X POST http://localhost:5000/api/trips \
  -H "Content-Type: application/json" \
  -d '{"destination":"Paris","budget":2500}'
```

---

## 🎯 Feature Walkthroughs

### Dashboard Tab
- **Quick Stats** - Overview of active trips, safety score, and alerts
- **Recent Trips** - Last 3 trips you planned
- **Active Alerts** - Current safety alerts in your area

### Trip Planner Tab
- **Destination** - Auto-suggestions for major cities
- **Dates** - Pick start and end dates
- **Budget** - Per-person budget in USD
- **Travelers** - Number of people
- **Interests** - Select multiple interests
- **Generate** - Creates day-wise itinerary with:
  - Morning, afternoon, and evening activities
  - Estimated costs
  - Attraction recommendations
  - Safety levels per day

### Safety Dashboard Tab
- **Risk Gauge** - Real-time danger level (0-100%)
- **Location Analysis** - Enter any city to analyze
- **Crime Data** - Breakdown of different crime types
- **Safety Factors** - Shows individual risk metrics
- **Real-time Alerts** - Enable to see updates
- **Heatmap** - Visual crime data over 6 months

### Emergency Tab
- **Emergency Contacts** - Add your trusted people
- **Gesture Trigger** - Hold button 3 seconds to activate
- **Voice Activation** - Say "help" or "emergency"
- **Settings** - Enable audio recording, location capture, speech-to-text
- **Alert History** - View all past emergency alerts

### Profile Tab
- **Account Info** - Name, email, phone, country
- **Preferences** - Notifications, language, dark mode
- **Statistics** - Trip history and spending
- **Data & Privacy** - Download or delete your data

---

## 🔧 Data Storage

### Frontend Data (Local Storage):
```javascript
// Automatically saved:
- User profile
- Trips and itineraries
- Emergency contacts
- Alerts and history
- User preferences
```

### Access Your Data:
```javascript
// In browser console:
JSON.parse(localStorage.getItem('safewander_user'))
JSON.parse(localStorage.getItem('safewander_trips'))
JSON.parse(localStorage.getItem('safewander_contacts'))
```

### Clear Data:
```javascript
// In browser console:
localStorage.clear()
// Then refresh the page
```

---

## 🎨 Customize the App

### Change Theme Colors:
Edit `index.css` to modify:
```css
--primary-color: #00A699;        /* Main color */
--secondary-color: #FF6B6B;      /* Alert color */
--success-color: #06A77D;        /* Success color */
--warning-color: #F77F00;        /* Warning color */
--danger-color: #E63946;         /* Danger color */
```

### Add Your Destinations:
In `js/trip-planner.js`, update `mockDestinations`:
```javascript
'Barcelona': {
    country: 'Spain',
    lat: 41.3851,
    lng: 2.1734,
    attractions: [...]
}
```

### Modify Safety Scores:
In `js/safety-analyzer.js`, update `riskScores`:
```javascript
riskScores: {
    'Your City': 30  // Lower = Safer
}
```

---

## 🧪 Testing Features

### Test Emergency Alert:
1. Go to Emergency tab
2. Add a test contact
3. Press and hold "Emergency Alert" button
4. After 3 seconds, it triggers
5. Check browser console for logs

### Test Voice Recognition:
1. Click "Activate Voice Command"
2. Say "help" or "emergency"
3. System recognizes and triggers alert
4. Transcript appears on screen

### Test Safety Analysis:
1. Go to Safety Dashboard
2. Enter "New York" in location field
3. Click "Analyze"
4. View detailed risk breakdown

---

## 🐛 Troubleshooting

### Browser Issues:
- **Voice Recognition not working?**
  - Use Chrome, Edge, or Opera
  - Check microphone permissions
  - Must run on HTTPS or localhost

- **Geolocation not working?**
  - Check location permissions
  - Try in incognito/private mode
  - May require HTTPS in production

- **Data not saving?**
  - Check if localStorage is enabled
  - Clear browser cache
  - Check available storage space

### Backend Issues:
- **Port 5000 already in use?**
  ```bash
  PORT=5001 npm start
  ```

- **Dependencies not installing?**
  ```bash
  rm -rf node_modules package-lock.json
  npm install
  ```

---

## 📱 Mobile Testing

To test on mobile:

1. **Local Network**:
   ```bash
   # Get your local IP
   ipconfig getifaddr en0  # Mac
   ipconfig              # Windows
   
   # Access from phone on same network
   http://<YOUR-IP>:PORT
   ```

2. **Responsive Design**:
   - Open DevTools (F12)
   - Click responsive mode (Ctrl+Shift+M)
   - Test different screen sizes

---

## 📚 API Examples

### Using the Mock API:

```javascript
// From browser console
const app = window.app;

// Add a trip
app.addTrip({
    destination: 'Tokyo',
    startDate: '2024-05-01',
    endDate: '2024-05-10',
    budget: 3000
});

// Add emergency contact
app.addEmergencyContact({
    name: 'Sister',
    phone: '+1-555-0003',
    email: 'sister@email.com'
});

// Trigger alert
window.emergencySystemApp.triggerEmergencyAlert();

// View all data
console.log(app.trips);
console.log(app.emergencyContacts);
console.log(app.alerts);
```

---

## 🌟 Next Steps

1. **Explore all tabs** - Get familiar with each feature
2. **Add test data** - Create trips and contacts
3. **Test emergency features** - Try voice, gesture, audio
4. **Read full README** - For detailed documentation
5. **Customize** - Modify colors, destinations, data

---

## 📞 Support

For detailed information, see **README.md** in the project root.

---

**Enjoy using SafeWander! 🌍🛡️**
