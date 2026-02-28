// ===== Services Hub Module =====

class ServicesApp {
    constructor(mainApp) {
        this.app = mainApp;
        this.currentServiceType = 'food';
        
        // Rich mock data with area, budget, and details
        this.mockData = {
            food: [
                { name: 'Tony\'s Pizzeria', cuisine: 'pizza', area: 'Downtown', rating: 4.5, budget: 'low', price: '$10-15', delivery: '30 mins' },
                { name: 'Slice of Heaven', cuisine: 'pizza', area: 'Uptown', rating: 4.2, budget: 'low', price: '$10-15', delivery: '35 mins' },
                { name: 'Sakura Sushi', cuisine: 'sushi', area: 'Midtown', rating: 4.8, budget: 'high', price: '$25-40', delivery: '45 mins' },
                { name: 'Roll & Go', cuisine: 'sushi', area: 'Harbor District', rating: 4.1, budget: 'medium', price: '$15-25', delivery: '40 mins' },
                { name: 'Masala Magic', cuisine: 'indian', area: 'Little India', rating: 4.6, budget: 'medium', price: '$12-20', delivery: '25 mins' },
                { name: 'Curry Corner', cuisine: 'indian', area: 'East Side', rating: 4.3, budget: 'low', price: '$10-18', delivery: '30 mins' },
                { name: 'Dragon Wok', cuisine: 'chinese', area: 'Chinatown', rating: 4.4, budget: 'low', price: '$12-18', delivery: '25 mins' },
                { name: 'Wok This Way', cuisine: 'chinese', area: 'West End', rating: 4.0, budget: 'medium', price: '$14-22', delivery: '35 mins' },
                { name: 'Local Bistro', cuisine: 'cafe', area: 'Main Street', rating: 4.0, budget: 'low', price: '$8-15', delivery: '15 mins' },
                { name: 'Burger Barn', cuisine: 'burgers', area: 'Downtown', rating: 4.3, budget: 'low', price: '$9-15', delivery: '20 mins' },
                { name: 'Fine Dining Co', cuisine: 'fusion', area: 'City Center', rating: 4.7, budget: 'high', price: '$30-50', delivery: '50 mins' }
            ],
            hotel: [
                { name: 'Comfort Inn', stars: 3, area: 'City Center', rating: 4.0, budget: 'low', price: '$80/night', amenities: 'WiFi, AC, Parking' },
                { name: 'Budget Lodge', stars: 3, area: 'Suburbs', rating: 3.8, budget: 'low', price: '$70/night', amenities: 'WiFi, Parking' },
                { name: 'Midtown Hotel', stars: 4, area: 'Midtown', rating: 4.4, budget: 'medium', price: '$120/night', amenities: 'WiFi, Pool, Gym' },
                { name: 'Business Stay', stars: 4, area: 'Downtown', rating: 4.3, budget: 'medium', price: '$110/night', amenities: 'WiFi, Conference Room' },
                { name: 'Grand Palace Hotel', stars: 5, area: 'Downtown', rating: 4.9, budget: 'high', price: '$250/night', amenities: 'WiFi, Pool, Spa, Restaurant' },
                { name: 'Luxury Suites', stars: 5, area: 'Waterfront', rating: 4.8, budget: 'high', price: '$300/night', amenities: 'WiFi, Ocean View, Spa' },
                { name: 'Traveller\'s Rest', stars: 4, area: 'Near Station', rating: 4.1, budget: 'medium', price: '$115/night', amenities: 'WiFi, Luggage Storage' },
                { name: 'Riverside Inn', stars: 3, area: 'Riverside', rating: 4.2, budget: 'low', price: '$85/night', amenities: 'WiFi, River View' }
            ],
            car: [
                { name: 'City Wheels', type: 'Sedan', area: 'Downtown', rating: 4.5, budget: 'medium', price: '$40/day', capacity: '5 persons' },
                { name: 'EasyRide', type: 'Sedan', area: 'Downtown', rating: 4.3, budget: 'medium', price: '$45/day', capacity: '5 persons' },
                { name: 'Mountain Movers', type: 'SUV', area: 'City Center', rating: 4.7, budget: 'high', price: '$60/day', capacity: '7 persons' },
                { name: 'Family Van Co', type: 'SUV', area: 'Suburbs', rating: 4.4, budget: 'high', price: '$55/day', capacity: '7 persons' },
                { name: 'Local Rentals', type: 'Compact', area: 'Suburbs', rating: 4.0, budget: 'low', price: '$35/day', capacity: '4 persons' },
                { name: 'Budget Cars', type: 'Compact', area: 'Outskirts', rating: 3.9, budget: 'low', price: '$30/day', capacity: '4 persons' },
                { name: 'Luxury Rides', type: 'Premium', area: 'Downtown', rating: 4.8, budget: 'high', price: '$100/day', capacity: '5 persons' },
                { name: 'Economy Plus', type: 'Sedan', area: 'Outskirts', rating: 4.1, budget: 'low', price: '$38/day', capacity: '5 persons' }
            ]
        };
        
        this.init();
    }

    init() {
        this.setupFormListeners();
        this.loadRecommendations('food'); // Load default recommendations
    }

    setupFormListeners() {
        const form = document.getElementById('service-form');
        const serviceTypeSelect = document.getElementById('service-type');
        
        if (form) {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                this.searchAndFilterServices();
            });
        }

        if (serviceTypeSelect) {
            serviceTypeSelect.addEventListener('change', (e) => {
                this.currentServiceType = e.target.value;
                this.loadRecommendations(e.target.value);
            });
        }
    }

    loadRecommendations(serviceType) {
        const resultsDiv = document.getElementById('service-results');
        resultsDiv.innerHTML = '<p style="text-align: center; padding: 1rem; color: var(--text-light);">Loading recommendations...</p>';
        
        setTimeout(() => {
            const allItems = this.mockData[serviceType] || [];
            this.displayResults(allItems, serviceType, 'Recommended');
        }, 300);
    }

    searchAndFilterServices() {
        const serviceType = document.getElementById('service-type').value;
        const areaFilter = document.getElementById('area-filter').value.trim().toLowerCase();
        const budgetFilter = document.getElementById('budget-filter').value;
        const queryFilter = document.getElementById('service-query').value.trim().toLowerCase();

        const allItems = this.mockData[serviceType] || [];
        
        let filtered = allItems.filter(item => {
            // Filter by area
            if (areaFilter && !item.area.toLowerCase().includes(areaFilter)) {
                return false;
            }
            // Filter by budget
            if (budgetFilter && item.budget !== budgetFilter) {
                return false;
            }
            // Filter by search query
            if (queryFilter) {
                const queryableFields = [
                    item.name.toLowerCase(),
                    (item.cuisine || item.type || '').toLowerCase(),
                    (item.amenities || '').toLowerCase()
                ];
                const matches = queryableFields.some(field => field.includes(queryFilter));
                if (!matches) return false;
            }
            return true;
        });

        const resultsDiv = document.getElementById('service-results');
        if (filtered.length === 0) {
            resultsDiv.innerHTML = '<p style="color: var(--warning-color); padding: 1rem;">No results found. Try adjusting your filters.</p>';
            return;
        }

        this.displayResults(filtered, serviceType, 'Results');
    }

    displayResults(items, serviceType, resultType) {
        const resultsDiv = document.getElementById('service-results');
        
        let html = `<p style="margin-bottom: 1rem; font-weight: bold; color: var(--primary-color);">${resultType}: ${items.length} found</p>`;
        
        html += items.map(item => {
            if (serviceType === 'food') {
                return this.renderFoodItem(item);
            } else if (serviceType === 'hotel') {
                return this.renderHotelItem(item);
            } else if (serviceType === 'car') {
                return this.renderCarItem(item);
            }
        }).join('');

        resultsDiv.innerHTML = html;

        // Wire up all order buttons
        document.querySelectorAll('.order-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const name = btn.dataset.name;
                const type = btn.dataset.type;
                let action = 'Ordering';
                if (type === 'hotel') action = 'Booking';
                if (type === 'car') action = 'Renting';
                this.app.showNotification(`${action} from ${name}...`, 'success');
            });
        });
    }

    renderFoodItem(item) {
        const budgetIcon = item.budget === 'low' ? '$' : item.budget === 'medium' ? '$$' : '$$$';
        return `
            <div class="service-item">
                <div class="service-details">
                    <div class="service-name">${item.name}</div>
                    <div class="service-meta">
                        <span>${item.cuisine}</span> • 
                        <span>${item.area}</span> • 
                        <span>⭐ ${item.rating}</span> • 
                        <span>${budgetIcon} ${item.price}</span>
                    </div>
                    <div class="service-info">🚚 ${item.delivery}</div>
                </div>
                <button class="btn btn-primary order-btn" data-name="${item.name}" data-type="food">Order 🍽️</button>
            </div>
        `;
    }

    renderHotelItem(item) {
        const budgetIcon = item.budget === 'low' ? '$' : item.budget === 'medium' ? '$$' : '$$$';
        const starRating = '⭐'.repeat(item.stars);
        return `
            <div class="service-item">
                <div class="service-details">
                    <div class="service-name">${item.name}</div>
                    <div class="service-meta">
                        <span>${starRating}</span> • 
                        <span>${item.area}</span> • 
                        <span>Rating: ${item.rating}</span> • 
                        <span>${budgetIcon} ${item.price}</span>
                    </div>
                    <div class="service-info">✨ ${item.amenities}</div>
                </div>
                <button class="btn btn-primary order-btn" data-name="${item.name}" data-type="hotel">Book 🏨</button>
            </div>
        `;
    }

    renderCarItem(item) {
        const budgetIcon = item.budget === 'low' ? '$' : item.budget === 'medium' ? '$$' : '$$$';
        return `
            <div class="service-item">
                <div class="service-details">
                    <div class="service-name">${item.name}</div>
                    <div class="service-meta">
                        <span>${item.type}</span> • 
                        <span>${item.area}</span> • 
                        <span>⭐ ${item.rating}</span> • 
                        <span>${budgetIcon} ${item.price}</span>
                    </div>
                    <div class="service-info">👥 ${item.capacity}</div>
                </div>
                <button class="btn btn-primary order-btn" data-name="${item.name}" data-type="car">Rent 🚗</button>
            </div>
        `;
    }
}
