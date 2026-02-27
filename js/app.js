// ===== Main Application JavaScript =====

class SafeWanderApp {
    constructor() {
        this.currentUser = null;
        this.trips = [];
        this.emergencyContacts = [];
        this.alerts = [];
        this.userPreferences = {
            notifications: true,
            sms: true,
            push: true,
            darkMode: false,
            language: 'en'
        };
        this.init();
    }

    init() {
        this.loadFromStorage();
        this.setupTabNavigation();
        this.setupEventListeners();
        this.initializeModules();
        this.updateDashboard();
    }

    loadFromStorage() {
        const storedUser = localStorage.getItem('safewander_user');
        const storedTrips = localStorage.getItem('safewander_trips');
        const storedContacts = localStorage.getItem('safewander_contacts');
        const storedPreferences = localStorage.getItem('safewander_preferences');

        if (storedUser) this.currentUser = JSON.parse(storedUser);
        if (storedTrips) this.trips = JSON.parse(storedTrips);
        if (storedContacts) this.emergencyContacts = JSON.parse(storedContacts);
        if (storedPreferences) this.userPreferences = JSON.parse(storedPreferences);

        // Mock user if none exists
        if (!this.currentUser) {
            this.currentUser = {
                id: 'user_001',
                name: 'John Traveler',
                email: 'john@safewander.com',
                phone: '+1-555-0123',
                country: 'United States'
            };
            this.saveToStorage();
        }

        this.updateUserInfo();
    }

    saveToStorage() {
        localStorage.setItem('safewander_user', JSON.stringify(this.currentUser));
        localStorage.setItem('safewander_trips', JSON.stringify(this.trips));
        localStorage.setItem('safewander_contacts', JSON.stringify(this.emergencyContacts));
        localStorage.setItem('safewander_preferences', JSON.stringify(this.userPreferences));
    }

    setupTabNavigation() {
        const navButtons = document.querySelectorAll('.nav-btn');
        navButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                // Remove active class from all tabs and buttons
                document.querySelectorAll('.tab-content').forEach(tab => {
                    tab.classList.remove('active');
                });
                document.querySelectorAll('.nav-btn').forEach(b => {
                    b.classList.remove('active');
                });

                // Add active class to clicked button and its tab
                const tabId = btn.dataset.tab;
                document.getElementById(tabId).classList.add('active');
                btn.classList.add('active');
            });
        });
    }

    setupEventListeners() {
        // Logout button
        document.querySelector('.logout-btn').addEventListener('click', () => {
            this.logout();
        });

        // Profile form
        const profileForm = document.getElementById('profile-form');
        if (profileForm) {
            profileForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.updateUserProfile();
            });
        }

        // Preferences form
        const prefsForm = document.getElementById('preferences-form');
        if (prefsForm) {
            prefsForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.updatePreferences();
            });
        }
    }

    initializeModules() {
        // Initialize specialized modules
        window.tripPlannerApp = new TripPlannerApp(this);
        window.safetyAnalyzerApp = new SafetyAnalyzerApp(this);
        window.emergencySystemApp = new EmergencySystemApp(this);
    }

    updateDashboard() {
        // Update quick stats
        document.getElementById('active-trips').textContent = this.trips.length;
        document.getElementById('days-planned').textContent = this.calculateTotalDays();
        document.getElementById('alert-count').textContent = this.alerts.length;
        document.getElementById('overall-safety').textContent = this.calculateSafetyScore() + '%';

        // Update recent trips
        this.updateRecentTripsList();

        // Update active alerts
        this.updateActiveAlertsList();

        // Update profile stats
        this.updateProfileStats();
    }

    updateRecentTripsList() {
        const list = document.getElementById('recent-trips-list');
        if (this.trips.length === 0) {
            list.innerHTML = '<p class="empty-state">No trips planned yet. Start by creating a new trip!</p>';
            return;
        }

        const recentTrips = this.trips.slice(-3).reverse();
        list.innerHTML = recentTrips.map(trip => `
            <div class="trip-item">
                <h4>${trip.destination}</h4>
                <p>${new Date(trip.startDate).toLocaleDateString()} - ${new Date(trip.endDate).toLocaleDateString()}</p>
                <p>Budget: $${trip.budget} | Safety Score: ${trip.safetyScore || 'Pending'}%</p>
            </div>
        `).join('');
    }

    updateActiveAlertsList() {
        const list = document.getElementById('active-alerts');
        const activeAlerts = this.alerts.filter(alert => alert.active && alert.timestamp > Date.now() - 24 * 60 * 60 * 1000);

        if (activeAlerts.length === 0) {
            list.innerHTML = '<p class="empty-state">No active alerts</p>';
            return;
        }

        list.innerHTML = activeAlerts.map(alert => `
            <div class="alert-item ${alert.severity}">
                <h4>${alert.title}</h4>
                <p>${alert.message}</p>
                <p style="font-size: 0.8rem;">${new Date(alert.timestamp).toLocaleString()}</p>
            </div>
        `).join('');
    }

    updateProfileStats() {
        document.getElementById('total-trips').textContent = this.trips.length;
        document.getElementById('countries-visited').textContent = new Set(this.trips.map(t => t.destination)).size;
        document.getElementById('days-traveled').textContent = this.calculateTotalDays();
        
        const totalSpent = this.trips.reduce((sum, trip) => sum + (trip.budget || 0), 0);
        document.getElementById('money-spent').textContent = '$' + totalSpent.toLocaleString();
    }

    calculateTotalDays() {
        return this.trips.reduce((total, trip) => {
            const start = new Date(trip.startDate);
            const end = new Date(trip.endDate);
            const days = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
            return total + days;
        }, 0);
    }

    calculateSafetyScore() {
        if (this.trips.length === 0) return 85;
        const avgScore = this.trips.reduce((sum, trip) => sum + (trip.safetyScore || 85), 0) / this.trips.length;
        return Math.round(avgScore);
    }

    updateUserInfo() {
        document.getElementById('user-name').textContent = `Welcome, ${this.currentUser.name}`;
    }

    updateUserProfile() {
        this.currentUser = {
            ...this.currentUser,
            name: document.getElementById('profile-name').value,
            email: document.getElementById('profile-email').value,
            phone: document.getElementById('profile-phone').value,
            country: document.getElementById('profile-country').value
        };

        this.saveToStorage();
        this.updateUserInfo();
        this.showNotification('Profile updated successfully!', 'success');
    }

    updatePreferences() {
        this.userPreferences = {
            notifications: document.getElementById('pref-notifications').checked,
            sms: document.getElementById('pref-sms').checked,
            push: document.getElementById('pref-push').checked,
            darkMode: document.getElementById('pref-dark-mode').checked,
            language: document.getElementById('pref-language').value
        };

        this.saveToStorage();

        // Apply dark mode if selected
        if (this.userPreferences.darkMode) {
            document.body.classList.add('dark-mode');
        } else {
            document.body.classList.remove('dark-mode');
        }

        this.showNotification('Preferences updated successfully!', 'success');
    }

    logout() {
        localStorage.clear();
        alert('You have been logged out. Redirecting to login page...');
        // In a real app, redirect to login page
        window.location.reload();
    }

    addTrip(tripData) {
        const trip = {
            id: 'trip_' + Date.now(),
            ...tripData,
            createdAt: new Date().toISOString(),
            safetyScore: 85
        };
        this.trips.push(trip);
        this.saveToStorage();
        this.updateDashboard();
        return trip;
    }

    addEmergencyContact(contact) {
        const newContact = {
            id: 'contact_' + Date.now(),
            ...contact
        };
        this.emergencyContacts.push(newContact);
        this.saveToStorage();
        return newContact;
    }

    addAlert(alert) {
        const newAlert = {
            id: 'alert_' + Date.now(),
            timestamp: Date.now(),
            active: true,
            ...alert
        };
        this.alerts.push(newAlert);
        this.saveToStorage();
        this.updateDashboard();

        // Trigger notification if enabled
        if (this.userPreferences.notifications) {
            this.sendNotification(alert.title, alert.message);
        }

        return newAlert;
    }

    showNotification(message, type = 'info') {
        // Create a simple notification element
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 1rem 1.5rem;
            background: ${type === 'success' ? '#06A77D' : type === 'error' ? '#E63946' : '#00A699'};
            color: white;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
            z-index: 10000;
            animation: slideIn 0.3s ease;
        `;
        notification.textContent = message;
        document.body.appendChild(notification);

        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }

    sendNotification(title, message) {
        if ('Notification' in window && Notification.permission === 'granted') {
            new Notification(title, {
                body: message,
                icon: '🌍'
            });
        }
    }

    requestNotificationPermission() {
        if ('Notification' in window && Notification.permission === 'default') {
            Notification.requestPermission();
        }
    }
}

// Add CSS animations to document
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }

    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }

    body.dark-mode {
        background-color: #1a1a1a;
        color: #f0f0f0;
    }

    body.dark-mode .card,
    body.dark-mode .navbar,
    body.dark-mode .trip-form {
        background-color: #2a2a2a;
        border-color: #444;
    }

    body.dark-mode .form-group input,
    body.dark-mode .form-group select {
        background-color: #3a3a3a;
        color: #f0f0f0;
        border-color: #555;
    }
`;
document.head.appendChild(style);

// Initialize app when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.app = new SafeWanderApp();
    window.app.requestNotificationPermission();
});
