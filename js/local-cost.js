// ===== Local Cost Estimator Module =====

class LocalCostApp {
    constructor(mainApp) {
        this.app = mainApp;
        this.mockCosts = {
            'Paris': {
                coffee: 4,
                taxi: 20,
                meal: 15
            },
            'Tokyo': {
                coffee: 3.5,
                taxi: 25,
                meal: 12
            },
            'New York': {
                coffee: 5,
                taxi: 30,
                meal: 20
            },
            'Dubai': {
                coffee: 3,
                taxi: 15,
                meal: 18
            },
            'Bangkok': {
                coffee: 2,
                taxi: 10,
                meal: 8
            }
        };
        this.init();
    }

    init() {
        this.setupForm();
    }

    setupForm() {
        const form = document.getElementById('cost-form');
        if (form) {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                this.calculateCost();
            });
        }
    }

    async calculateCost() {
        const dest = document.getElementById('cost-destination').value.trim();
        const item = document.getElementById('cost-item').value.trim().toLowerCase();
        const resultDiv = document.getElementById('cost-result');
        resultDiv.textContent = 'Calculating...';

        // try backend first
        try {
            const resp = await fetch(`/api/costs/estimate?destination=${encodeURIComponent(dest)}&item=${encodeURIComponent(item)}`);
            if (resp.ok) {
                const data = await resp.json();
                // show both currencies using API-provided INR if present
                const formatted = UtilityFunctions.formatUSDINR(data.estimatedCost, data.estimatedCostINR);
                resultDiv.innerHTML = `Estimated local cost for <strong>${data.item}</strong> in <strong>${data.destination}</strong>: <strong>${formatted}</strong> (${data.currency})`;
                return;
            }
        } catch (err) {
            // network error, fall back
            console.warn('API fetch failed, falling back to mock', err);
        }

        // fallback to local mock
        setTimeout(() => {
            const cityData = this.mockCosts[dest] || {};
            let cost = cityData[item];
            if (!cost) {
                cost = Math.round((Math.random() * 25 + 5) * 10) / 10; // random fallback
            }
            const formatted = UtilityFunctions.formatUSDINR(cost);
            resultDiv.innerHTML = `Estimated local cost for <strong>${item}</strong> in <strong>${dest}</strong>: <strong>${formatted}</strong>`;
        }, 200);
    }
}
