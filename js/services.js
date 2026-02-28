// ===== Services Hub Module =====

class ServicesApp {
    constructor(mainApp) {
        this.app = mainApp;
        // mocks for different service types
        this.mockData = {
            food: {
                pizza: [
                    { name: 'Tony\'s Pizzeria', location: 'Downtown', rating: 4.5 },
                    { name: 'Slice of Heaven', location: 'Uptown', rating: 4.2 }
                ],
                sushi: [
                    { name: 'Sakura Sushi', location: 'Midtown', rating: 4.8 },
                    { name: 'Roll & Go', location: 'Harbor District', rating: 4.1 }
                ],
                indian: [
                    { name: 'Masala Magic', location: 'Little India', rating: 4.6 },
                    { name: 'Curry Corner', location: 'East Side', rating: 4.3 }
                ],
                chinese: [
                    { name: 'Dragon Wok', location: 'Chinatown', rating: 4.4 },
                    { name: 'Wok This Way', location: 'West End', rating: 4.0 }
                ],
                default: [
                    { name: 'Local Bistro', location: 'Main Street', rating: 4.0 }
                ]
            },
            hotel: {
                '3-star': [
                    { name: 'Comfort Inn', location: 'City Center', stars: 3, price: '$80/night' },
                    { name: 'Budget Lodge', location: 'Suburbs', stars: 3, price: '$70/night' }
                ],
                '5-star': [
                    { name: 'Grand Palace Hotel', location: 'Downtown', stars: 5, price: '$250/night' },
                    { name: 'Luxury Suites', location: 'Waterfront', stars: 5, price: '$300/night' }
                ],
                default: [
                    { name: 'Traveller\'s Rest', location: 'Near Station', stars: 4, price: '$120/night' }
                ]
            },
            car: {
                sedan: [
                    { name: 'City Wheels', type: 'Sedan', price: '$40/day' },
                    { name: 'EasyRide', type: 'Sedan', price: '$45/day' }
                ],
                suv: [
                    { name: 'Mountain Movers', type: 'SUV', price: '$60/day' },
                    { name: 'Family Van Co', type: 'SUV', price: '$55/day' }
                ],
                default: [
                    { name: 'Local Rentals', type: 'Compact', price: '$35/day' }
                ]
            }
        };
        this.init();
    }

    init() {
        this.setupForm();
    }

    setupForm() {
        const form = document.getElementById('service-form');
        if (form) {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                this.searchServices();
            });
        }
    }

    searchServices() {
        const type = document.getElementById('service-type').value;
        const query = document.getElementById('service-query').value.trim().toLowerCase();
        const resultsDiv = document.getElementById('service-results');
        resultsDiv.innerHTML = 'Searching...';

        setTimeout(() => {
            let list = [];
            if (type === 'food') {
                list = this.mockData.food[query] || this.mockData.food.default;
            } else if (type === 'hotel') {
                list = this.mockData.hotel[query] || this.mockData.hotel.default;
            } else if (type === 'car') {
                list = this.mockData.car[query] || this.mockData.car.default;
            }

            if (!list || list.length === 0) {
                resultsDiv.innerHTML = `<p>No ${type} options found for "${query}".</p>`;
                return;
            }

            // build HTML based on type
            resultsDiv.innerHTML = list.map(item => {
                if (type === 'food') {
                    return `
                        <div class="service-item">
                            <span class="service-name">${item.name}</span>
                            <span class="service-info">${item.location} | ⭐ ${item.rating}</span>
                            <button class="btn btn-primary order-btn" data-name="${item.name}">Order 🛵</button>
                        </div>
                    `;
                } else if (type === 'hotel') {
                    return `
                        <div class="service-item">
                            <span class="service-name">${item.name}</span>
                            <span class="service-info">${item.location} | ⭐ ${item.stars} | ${item.price}</span>
                            <button class="btn btn-primary order-btn" data-name="${item.name}">Book 🛏️</button>
                        </div>
                    `;
                } else if (type === 'car') {
                    return `
                        <div class="service-item">
                            <span class="service-name">${item.name}</span>
                            <span class="service-info">${item.type} | ${item.price}</span>
                            <button class="btn btn-primary order-btn" data-name="${item.name}">Rent 🚗</button>
                        </div>
                    `;
                }
            }).join('');

            document.querySelectorAll('.order-btn').forEach(btn => {
                btn.addEventListener('click', () => {
                    const name = btn.dataset.name;
                    let action = 'Ordering';
                    if (type === 'hotel') action = 'Booking';
                    if (type === 'car') action = 'Renting';
                    this.app.showNotification(`${action} ${name}...`, 'success');
                });
            });
        }, 400);
    }
}
