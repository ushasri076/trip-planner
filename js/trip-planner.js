// ===== Trip Planner Module =====

class TripPlannerApp {
    constructor(mainApp) {
        this.app = mainApp;
        this.mockDestinations = {
            'Paris': {
                country: 'France',
                lat: 48.8566,
                lng: 2.3522,
                attractions: ['Eiffel Tower', 'Louvre Museum', 'Notre-Dame', 'Champs-Élysées', 'Arc de Triomphe']
            },
            'Tokyo': {
                country: 'Japan',
                lat: 35.6762,
                lng: 139.6503,
                attractions: ['Tokyo Tower', 'Senso-ji Temple', 'Shibuya Crossing', 'Meiji Shrine', 'Akihabara']
            },
            'New York': {
                country: 'USA',
                lat: 40.7128,
                lng: -74.0060,
                attractions: ['Statue of Liberty', 'Central Park', 'Times Square', 'Empire State Building', 'Brooklyn Bridge']
            },
            'Dubai': {
                country: 'UAE',
                lat: 25.2048,
                lng: 55.2708,
                attractions: ['Burj Khalifa', 'Dubai Mall', 'Palm Jumeirah', 'Dubai Fountain', 'Gold Souk']
            },
            'Bangkok': {
                country: 'Thailand',
                lat: 13.7563,
                lng: 100.5018,
                attractions: ['Grand Palace', 'Wat Phra Kaew', 'Floating Markets', 'Lumphini Park', 'Tian Temple']
            }
        };

        this.init();
    }

    init() {
        this.setupForm();
        this.setupDestinationAutocomplete();
    }

    setupForm() {
        const form = document.getElementById('trip-form');
        if (form) {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                this.generateItinerary();
            });
        }

        // Set minimum start date to today
        const today = new Date().toISOString().split('T')[0];
        document.getElementById('start-date').min = today;
        
        // Update end date minimum when start date changes
        document.getElementById('start-date').addEventListener('change', (e) => {
            document.getElementById('end-date').min = e.target.value;
        });
    }

    setupDestinationAutocomplete() {
        const destinationInput = document.getElementById('destination');
        const suggestionsDiv = document.getElementById('destination-suggestions');

        destinationInput.addEventListener('input', (e) => {
            const value = e.target.value.toLowerCase();
            
            if (value.length === 0) {
                suggestionsDiv.innerHTML = '';
                return;
            }

            const matches = Object.keys(this.mockDestinations).filter(dest => 
                dest.toLowerCase().includes(value)
            );

            if (matches.length === 0) {
                suggestionsDiv.innerHTML = '';
                return;
            }

            suggestionsDiv.innerHTML = matches.map(dest => `
                <div class="suggestion-item" data-destination="${dest}">
                    🌍 ${dest}, ${this.mockDestinations[dest].country}
                </div>
            `).join('');

            document.querySelectorAll('.suggestion-item').forEach(item => {
                item.addEventListener('click', (e) => {
                    destinationInput.value = item.dataset.destination;
                    suggestionsDiv.innerHTML = '';
                });
            });
        });
    }

    generateItinerary() {
        const destination = document.getElementById('destination').value;
        const startDate = new Date(document.getElementById('start-date').value);
        const endDate = new Date(document.getElementById('end-date').value);
        const budget = parseFloat(document.getElementById('budget').value);
        const travelers = parseInt(document.getElementById('travelers').value);

        const interests = Array.from(document.querySelectorAll('input[name="interests"]:checked'))
            .map(cb => cb.value);

        if (!destination || interests.length === 0) {
            this.app.showNotification('Please select a destination and at least one interest', 'error');
            return;
        }

        // Show loading state
        const resultDiv = document.getElementById('generated-itinerary');
        document.getElementById('itinerary-content').innerHTML = '<p style="text-align: center; padding: 2rem;">Generating your AI-powered itinerary...</p>';
        resultDiv.style.display = 'block';

        // Simulate AI generation with timeout
        setTimeout(() => {
            const itinerary = this.createItinerary(destination, startDate, endDate, budget, travelers, interests);
            this.displayItinerary(itinerary, destination);
        }, 1500);
    }

    createItinerary(destination, startDate, endDate, budget, travelers, interests) {
        const days = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24)) + 1;
        const budgetPerDay = budget / days / travelers;

        const destData = this.mockDestinations[destination] || {
            attractions: ['Local Attraction 1', 'Local Attraction 2', 'Local Attraction 3'],
            country: 'Unknown'
        };

        const itinerary = [];

        for (let i = 0; i < days; i++) {
            const day = new Date(startDate);
            day.setDate(day.getDate() + i);

            const activities = this.generateDayActivities(i + 1, interests, destData.attractions, budgetPerDay);
            
            itinerary.push({
                dayNumber: i + 1,
                date: day.toLocaleDateString(),
                activities: activities,
                estimatedCost: Math.round(budgetPerDay),
                safetyLevel: this.calculateDaySafety(day)
            });
        }

        return {
            destination: destination,
            country: destData.country,
            startDate: startDate.toLocaleDateString(),
            endDate: endDate.toLocaleDateString(),
            totalDays: days,
            totalBudget: budget,
            budgetPerDay: budgetPerDay,
            travelers: travelers,
            interests: interests,
            days: itinerary
        };
    }

    generateDayActivities(dayNumber, interests, attractions, budgetPerDay) {
        const activityTemplates = {
            morning: [
                { time: '08:00', name: 'Breakfast at Local Café', category: 'food', estimated_cost: 15 },
                { time: '09:00', name: 'Museum Visit', category: 'culture', estimated_cost: 25 },
            ],
            afternoon: [
                { time: '12:30', name: 'Lunch at Traditional Restaurant', category: 'food', estimated_cost: 25 },
                { time: '14:00', name: 'Shopping at Local Market', category: 'shopping', estimated_cost: 50 },
                { time: '14:00', name: 'Outdoor Adventure', category: 'adventure', estimated_cost: 60 },
                { time: '14:00', name: 'Nature Hike', category: 'nature', estimated_cost: 20 },
            ],
            evening: [
                { time: '18:00', name: 'Sunset View', category: 'nature', estimated_cost: 0 },
                { time: '19:00', name: 'Dinner at Fine Restaurant', category: 'food', estimated_cost: 40 },
                { time: '20:00', name: 'Local Nightlife Experience', category: 'nightlife', estimated_cost: 50 },
                { time: '20:00', name: 'Spa & Wellness Session', category: 'wellness', estimated_cost: 70 },
            ]
        };

        const activities = [];
        
        // Add morning activity
        activities.push({
            ...activityTemplates.morning[Math.floor(Math.random() * activityTemplates.morning.length)],
            location: attractions[Math.floor(Math.random() * attractions.length)]
        });

        // Add afternoon activity based on interests
        let afternoonActivity;
        if (interests.includes('food')) {
            afternoonActivity = { time: '12:30', name: 'Lunch at Traditional Restaurant', category: 'food', estimated_cost: 25, location: 'Local Restaurant' };
        } else if (interests.includes('shopping')) {
            afternoonActivity = { time: '14:00', name: 'Shopping at Local Market', category: 'shopping', estimated_cost: 50, location: 'Street Market' };
        } else if (interests.includes('adventure')) {
            afternoonActivity = { time: '14:00', name: 'Adventure Activity', category: 'adventure', estimated_cost: 60, location: 'Adventure Hub' };
        } else {
            afternoonActivity = activityTemplates.afternoon[Math.floor(Math.random() * activityTemplates.afternoon.length)];
            afternoonActivity.location = attractions[Math.floor(Math.random() * attractions.length)];
        }
        activities.push(afternoonActivity);

        // Add evening activity
        let eveningActivity;
        if (interests.includes('nightlife')) {
            eveningActivity = { time: '20:00', name: 'Local Nightlife Experience', category: 'nightlife', estimated_cost: 50, location: 'Popular Nightclub' };
        } else if (interests.includes('food')) {
            eveningActivity = { time: '19:00', name: 'Dinner at Fine Restaurant', category: 'food', estimated_cost: 40, location: 'Upscale Restaurant' };
        } else {
            eveningActivity = activityTemplates.evening[Math.floor(Math.random() * activityTemplates.evening.length)];
            eveningActivity.location = attractions[Math.floor(Math.random() * attractions.length)];
        }
        activities.push(eveningActivity);

        return activities;
    }

    calculateDaySafety(date) {
        const hour = date.getHours();
        // Lower safety at night
        if (hour >= 22 || hour <= 6) {
            return 'Moderate - Nighttime Safety';
        }
        return 'High - Off-Peak Hours';
    }

    displayItinerary(itinerary, destination) {
        const resultDiv = document.getElementById('itinerary-content');
        
        const itineraryHTML = `
            <div style="margin-bottom: 2rem; padding: 1.5rem; background: var(--light-bg); border-radius: 8px;">
                <h3>Trip Summary</h3>
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem;">
                    <div>
                        <strong>📍 Destination:</strong> ${destination}
                    </div>
                    <div>
                        <strong>📅 Duration:</strong> ${itinerary.totalDays} days
                    </div>
                    <div>
                        <strong>💰 Total Budget:</strong> $${itinerary.totalBudget}
                    </div>
                    <div>
                        <strong>👥 Travelers:</strong> ${itinerary.travelers}
                    </div>
                </div>
            </div>

            <div style="margin-bottom: 2rem;">
                <h3>Daily Itinerary</h3>
                ${itinerary.days.map(day => `
                    <div class="day-plan">
                        <h3>Day ${day.dayNumber} - ${day.date}</h3>
                        <p style="color: var(--success-color); margin-bottom: 1rem;">🛡️ Safety Level: ${day.safetyLevel}</p>
                        
                        ${day.activities.map(activity => `
                            <div class="activity">
                                <div class="activity-time">${activity.time}</div>
                                <div class="activity-details">
                                    <h4>${activity.name}</h4>
                                    <p><strong>📍</strong> ${activity.location}</p>
                                    <p><strong>💰</strong> Est. Cost: $${activity.estimated_cost}</p>
                                    <p><strong>🏷️</strong> ${activity.category}</p>
                                </div>
                            </div>
                        `).join('')}
                        
                        <div style="margin-top: 1rem; padding: 1rem; background: var(--light-bg); border-radius: 8px;">
                            <strong>Estimated Daily Cost:</strong> $${day.estimatedCost} per person
                        </div>
                    </div>
                `).join('')}
            </div>

            <div style="text-align: center; gap: 1rem; display: flex; justify-content: center; flex-wrap: wrap;">
                <button class="btn btn-primary" onclick="window.tripPlannerApp.saveItinerary('${destination}', '${itinerary.startDate}', '${itinerary.endDate}', ${itinerary.totalBudget})">
                    💾 Save This Itinerary
                </button>
                <button class="btn btn-primary" onclick="window.tripPlannerApp.shareItinerary('${destination}')">
                    📤 Share Itinerary
                </button>
            </div>
        `;

        resultDiv.innerHTML = itineraryHTML;
    }

    saveItinerary(destination, startDate, endDate, budget) {
        const trip = this.app.addTrip({
            destination: destination,
            startDate: startDate,
            endDate: endDate,
            budget: budget,
            status: 'planned'
        });

        this.app.showNotification(`Itinerary saved! Trip ID: ${trip.id}`, 'success');
        
        // Clear form
        document.getElementById('trip-form').reset();
        document.getElementById('generated-itinerary').style.display = 'none';
    }

    shareItinerary(destination) {
        const text = `I'm planning an amazing trip to ${destination} using SafeWander! 🌍🛡️`;
        
        if (navigator.share) {
            navigator.share({
                title: 'SafeWander Trip',
                text: text,
                url: window.location.href
            }).catch(err => console.log('Share cancelled'));
        } else {
            // Fallback - copy to clipboard
            navigator.clipboard.writeText(text);
            this.app.showNotification('Trip details copied to clipboard!', 'success');
        }
    }
}
