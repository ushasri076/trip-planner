// ===== Safety Analyzer Module =====

class SafetyAnalyzerApp {
    constructor(mainApp) {
        this.app = mainApp;
        this.riskScores = {
            'Paris': 35,
            'Tokyo': 15,
            'New York': 45,
            'Dubai': 25,
            'Bangkok': 40
        };

        this.crimeData = {
            'Paris': {
                pettyTheft: 'Medium',
                violentCrime: 'Low',
                burglary: 'Medium',
                robbery: 'Low'
            },
            'Tokyo': {
                pettyTheft: 'Very Low',
                violentCrime: 'Very Low',
                burglary: 'Very Low',
                robbery: 'Very Low'
            },
            'New York': {
                pettyTheft: 'High',
                violentCrime: 'Medium',
                burglary: 'Medium',
                robbery: 'Medium'
            },
            'Dubai': {
                pettyTheft: 'Low',
                violentCrime: 'Very Low',
                burglary: 'Low',
                robbery: 'Very Low'
            },
            'Bangkok': {
                pettyTheft: 'Medium',
                violentCrime: 'Low',
                burglary: 'Medium',
                robbery: 'Low'
            }
        };

        this.init();
    }

    init() {
        this.setupRiskAnalysis();
        this.setupAlertSystem();
        this.startRealTimeMonitoring();
    }

    setupRiskAnalysis() {
        const analyzeBtn = document.getElementById('analyze-risk-btn');
        const locationInput = document.getElementById('risk-location');

        if (analyzeBtn) {
            analyzeBtn.addEventListener('click', () => {
                const location = locationInput.value.trim();
                if (location) {
                    this.analyzeLocationRisk(location);
                }
            });

            locationInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    analyzeBtn.click();
                }
            });
        }

        // Set initial risk gauge
        this.updateRiskGauge(30);
    }

    setupAlertSystem() {
        const enableAlerts = document.getElementById('enable-alerts');
        if (enableAlerts) {
            enableAlerts.addEventListener('change', (e) => {
                if (e.target.checked) {
                    this.startRealTimeMonitoring();
                    this.app.showNotification('Real-time alerts enabled', 'success');
                } else {
                    this.stopRealTimeMonitoring();
                    this.app.showNotification('Real-time alerts disabled', 'info');
                }
            });
        }
    }

    analyzeLocationRisk(location) {
        const resultDiv = document.getElementById('risk-analysis-result');
        resultDiv.innerHTML = '<p style="text-align: center; padding: 1rem;">Analyzing location risk...</p>';

        // Simulate API call
        setTimeout(() => {
            const riskScore = this.riskScores[location] || Math.floor(Math.random() * 60) + 20;
            const crimeFactors = this.crimeData[location] || this.generateCrimeData();
            
            const safetyLevel = this.getSafetyLevel(riskScore);
            const riskFactors = this.calculateRiskFactors(location);

            const analysisHTML = `
                <div style="margin-bottom: 1.5rem; padding: 1rem; background: ${this.getRiskColor(riskScore)}; border-radius: 8px; color: white;">
                    <h4>📊 Risk Score: ${riskScore}%</h4>
                    <p><strong>Safety Level:</strong> ${safetyLevel}</p>
                </div>

                <div style="margin-bottom: 1.5rem;">
                    <h4>🔍 Crime Data Analysis</h4>
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
                        <div style="padding: 0.75rem; background: var(--light-bg); border-radius: 8px;">
                            <strong>Petty Theft:</strong> ${crimeFactors.pettyTheft}
                        </div>
                        <div style="padding: 0.75rem; background: var(--light-bg); border-radius: 8px;">
                            <strong>Violent Crime:</strong> ${crimeFactors.violentCrime}
                        </div>
                        <div style="padding: 0.75rem; background: var(--light-bg); border-radius: 8px;">
                            <strong>Burglary:</strong> ${crimeFactors.burglary}
                        </div>
                        <div style="padding: 0.75rem; background: var(--light-bg); border-radius: 8px;">
                            <strong>Robbery:</strong> ${crimeFactors.robbery}
                        </div>
                    </div>
                </div>

                <div style="margin-bottom: 1.5rem;">
                    <h4>⏰ Time-Based Risk Factors</h4>
                    <div style="display: flex; flex-direction: column; gap: 0.5rem;">
                        <div><strong>Morning (6 AM - 12 PM):</strong> Low Risk</div>
                        <div><strong>Afternoon (12 PM - 6 PM):</strong> Very Low Risk</div>
                        <div><strong>Evening (6 PM - 10 PM):</strong> Medium Risk</div>
                        <div><strong>Night (10 PM - 6 AM):</strong> High Risk ⚠️</div>
                    </div>
                </div>

                <div style="margin-bottom: 1.5rem;">
                    <h4>👥 Current Crowd Conditions</h4>
                    <div style="padding: 1rem; background: var(--light-bg); border-radius: 8px;">
                        <p><strong>Crowd Density:</strong> Normal</p>
                        <p><strong>Anomalies Detected:</strong> None</p>
                        <p><strong>Nearby Events:</strong> ${Math.random() > 0.7 ? 'Festival in Central Square (6 PM - 11 PM)' : 'No major events'}</p>
                    </div>
                </div>

                <div style="padding: 1rem; background: var(--light-bg); border-radius: 8px; border-left: 4px solid var(--primary-color);">
                    <h4>💡 Safety Recommendations</h4>
                    <ul style="margin-left: 1.5rem;">
                        <li>Avoid traveling alone at night</li>
                        <li>Keep valuables secured and out of sight</li>
                        <li>Stay in well-lit, populated areas</li>
                        <li>Use official transportation services</li>
                        <li>Register with your embassy if traveling internationally</li>
                    </ul>
                </div>
            `;

            resultDiv.innerHTML = analysisHTML;
            this.updateRiskGauge(riskScore);

            // Add alert if risk is high
            if (riskScore > 60) {
                this.app.addAlert({
                    title: `⚠️ High Risk Area: ${location}`,
                    message: `Risk score is ${riskScore}%. Exercise extra caution.`,
                    severity: 'high',
                    location: location
                });
            }
        }, 1000);
    }

    calculateRiskFactors(location) {
        const hour = new Date().getHours();
        const factors = {
            crime: this.riskScores[location] || 30,
            timeOfDay: hour >= 22 || hour <= 6 ? 70 : hour >= 18 ? 40 : 20,
            crowdAnomalies: Math.random() > 0.8 ? 45 : 15,
            events: Math.random() > 0.7 ? 35 : 10
        };
        return factors;
    }

    updateRiskGauge(score) {
        const gaugeDiv = document.getElementById('risk-gauge');
        const riskText = document.getElementById('risk-percentage');

        if (gaugeDiv && riskText) {
            // Calculate rotation for CSS conic-gradient
            const rotation = (score / 100) * 360;
            riskText.textContent = score + '%';
            gaugeDiv.style.background = `conic-gradient(
                var(--success-color) 0deg,
                var(--warning-color) ${rotation}deg,
                var(--danger-color) 360deg
            )`;
        }
    }

    getRiskColor(score) {
        if (score <= 25) return '#06A77D';
        if (score <= 50) return '#F77F00';
        return '#E63946';
    }

    getSafetyLevel(score) {
        if (score <= 20) return '✅ Very Safe';
        if (score <= 40) return '🟢 Safe';
        if (score <= 60) return '🟡 Caution Advised';
        if (score <= 80) return '🔴 Dangerous';
        return '⛔ Very Dangerous';
    }

    generateCrimeData() {
        const levels = ['Very Low', 'Low', 'Medium', 'High', 'Very High'];
        return {
            pettyTheft: levels[Math.floor(Math.random() * levels.length)],
            violentCrime: levels[Math.floor(Math.random() * levels.length)],
            burglary: levels[Math.floor(Math.random() * levels.length)],
            robbery: levels[Math.floor(Math.random() * levels.length)]
        };
    }

    startRealTimeMonitoring() {
        // Simulate real-time alerts every 5 minutes
        this.monitoringInterval = setInterval(() => {
            this.generateRandomAlert();
        }, 5 * 60 * 1000); // 5 minutes

        // Generate initial alert
        this.generateRandomAlert();
    }

    stopRealTimeMonitoring() {
        if (this.monitoringInterval) {
            clearInterval(this.monitoringInterval);
        }
    }

    generateRandomAlert() {
        const enableAlerts = document.getElementById('enable-alerts');
        if (!enableAlerts || !enableAlerts.checked) return;

        const alerts = [
            {
                title: '🎪 Crowd Alert',
                message: 'Unusual gathering detected near Central Station. Avoid the area.',
                severity: 'high',
                type: 'crowd'
            },
            {
                title: '🚨 Petty Theft Warning',
                message: 'Increased pickpocketing reports on public transit. Keep valuables secure.',
                severity: 'medium',
                type: 'theft'
            },
            {
                title: '⚡ Weather Alert',
                message: 'Heavy rainfall expected this evening. Reduced visibility on roads.',
                severity: 'low',
                type: 'weather'
            },
            {
                title: '🎉 Event Notification',
                message: 'Festival scheduled for tonight. Expect high crowds in downtown area.',
                severity: 'low',
                type: 'event'
            },
            {
                title: '🚗 Transportation Alert',
                message: 'Strike by taxi drivers scheduled. Recommend using metro instead.',
                severity: 'medium',
                type: 'transport'
            }
        ];

        // 40% chance of generating an alert
        if (Math.random() > 0.6) {
            const alert = alerts[Math.floor(Math.random() * alerts.length)];
            this.app.addAlert(alert);
            this.displayAlertInFeed(alert);
        }
    }

    displayAlertInFeed(alert) {
        const feedDiv = document.getElementById('alerts-feed');
        if (!feedDiv) return;

        // Remove empty state if present
        const emptyState = feedDiv.querySelector('.empty-state');
        if (emptyState) emptyState.remove();

        const alertElement = document.createElement('div');
        alertElement.className = `alert-item ${alert.severity}`;
        alertElement.innerHTML = `
            <h4>${alert.title}</h4>
            <p>${alert.message}</p>
            <p style="font-size: 0.8rem; margin-top: 0.5rem;">${new Date().toLocaleTimeString()}</p>
        `;

        feedDiv.insertBefore(alertElement, feedDiv.firstChild);

        // Keep only last 10 alerts
        const alertItems = feedDiv.querySelectorAll('.alert-item');
        if (alertItems.length > 10) {
            alertItems[alertItems.length - 1].remove();
        }
    }
}
