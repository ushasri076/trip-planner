// ===== Utility Functions =====

class UtilityFunctions {
    /**
     * Format date to readable string
     */
    static formatDate(date) {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(date).toLocaleDateString('en-US', options);
    }

    /**
     * Format time to HH:MM format
     */
    static formatTime(date) {
        return new Date(date).toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit'
        });
    }

    /**
     * Calculate distance between two coordinates using Haversine formula
     */
    static calculateDistance(lat1, lon1, lat2, lon2) {
        const R = 6371; // Earth's radius in km
        const dLat = (lat2 - lat1) * Math.PI / 180;
        const dLon = (lon2 - lon1) * Math.PI / 180;
        const a = 
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return R * c;
    }

    /**
     * Generate UUID
     */
    static generateUUID() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            const r = Math.random() * 16 | 0;
            const v = c === 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }

    /**
     * Validate email format
     */
    static isValidEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    /**
     * Validate phone number (basic)
     */
    static isValidPhone(phone) {
        const re = /^[\d\s\-\+\(\)]+$/;
        return re.test(phone) && phone.replace(/\D/g, '').length >= 10;
    }

    /**
     * Get time-based greeting
     */
    static getGreeting() {
        const hour = new Date().getHours();
        if (hour < 12) return 'Good Morning';
        if (hour < 18) return 'Good Afternoon';
        return 'Good Evening';
    }

    /**
     * Calculate days between two dates
     */
    static daysBetween(date1, date2) {
        const ms = Math.abs(date2 - date1);
        return Math.ceil(ms / (1000 * 60 * 60 * 24));
    }

    /**
     * Format currency
     */
    static formatCurrency(amount, currency = 'USD') {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: currency
        }).format(amount);
    }

    /**
     * Format both USD and INR together using a fixed exchange rate (can be extended later)
     */
    static formatUSDINR(amountUSD, amountINR = null) {
        // simple conversion rate; in real use, call an API
        const rate = 83; // 1 USD = 83 INR (approximate)
        const inr = amountINR !== null ? amountINR : Math.round(amountUSD * rate);
        return `$${amountUSD} (₹${inr})`;
    }

    /**
     * Decode JWT token (basic)
     */
    static decodeJWT(token) {
        try {
            const base64Url = token.split('.')[1];
            const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
            const jsonPayload = decodeURIComponent(atob(base64).split('').map((c) => {
                return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
            }).join(''));
            return JSON.parse(jsonPayload);
        } catch (e) {
            return null;
        }
    }

    /**
     * Debounce function
     */
    static debounce(func, delay) {
        let timeoutId;
        return function(...args) {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => func.apply(this, args), delay);
        };
    }

    /**
     * Throttle function
     */
    static throttle(func, limit) {
        let inThrottle;
        return function(...args) {
            if (!inThrottle) {
                func.apply(this, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }

    /**
     * Check if user is online
     */
    static isOnline() {
        return navigator.onLine;
    }

    /**
     * Request full screen (for emergency mode)
     */
    static requestFullScreen() {
        const elem = document.documentElement;
        if (elem.requestFullscreen) {
            elem.requestFullscreen();
        } else if (elem.webkitRequestFullscreen) {
            elem.webkitRequestFullscreen();
        } else if (elem.mozRequestFullScreen) {
            elem.mozRequestFullScreen();
        } else if (elem.msRequestFullscreen) {
            elem.msRequestFullscreen();
        }
    }

    /**
     * Exit full screen
     */
    static exitFullScreen() {
        if (document.fullscreenElement || document.webkitFullscreenElement) {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            } else if (document.webkitExitFullscreen) {
                document.webkitExitFullscreen();
            } else if (document.mozCancelFullScreen) {
                document.mozCancelFullScreen();
            } else if (document.msExitFullscreen) {
                document.msExitFullscreen();
            }
        }
    }

    /**
     * Get current location with fallback
     */
    static getCurrentLocation() {
        return new Promise((resolve, reject) => {
            if ('geolocation' in navigator) {
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        resolve({
                            latitude: position.coords.latitude,
                            longitude: position.coords.longitude,
                            accuracy: position.coords.accuracy
                        });
                    },
                    (error) => {
                        reject(error);
                    }
                );
            } else {
                reject(new Error('Geolocation not supported'));
            }
        });
    }

    /**
     * Get device information
     */
    static getDeviceInfo() {
        return {
            userAgent: navigator.userAgent,
            platform: navigator.platform,
            language: navigator.language,
            onLine: navigator.onLine,
            screenResolution: `${window.innerWidth}x${window.innerHeight}`,
            timezone: Intl.DateTimeFormat().resolvedOptions().timeZone
        };
    }

    /**
     * Storage wrapper with expiration
     */
    static setStorageWithExpiry(key, value, expiryMs) {
        const item = {
            value: value,
            expiry: Date.now() + expiryMs
        };
        localStorage.setItem(key, JSON.stringify(item));
    }

    static getStorageWithExpiry(key) {
        const item = localStorage.getItem(key);
        if (!item) return null;

        const data = JSON.parse(item);
        if (Date.now() > data.expiry) {
            localStorage.removeItem(key);
            return null;
        }

        return data.value;
    }

    /**
     * Log error with context
     */
    static logError(context, error) {
        console.error(`[${context}]`, error);
        
        // In a real app, send to error tracking service
        // try {
        //     fetch('/api/errors', {
        //         method: 'POST',
        //         headers: { 'Content-Type': 'application/json' },
        //         body: JSON.stringify({
        //             context,
        //             error: error.message,
        //             stack: error.stack,
        //             timestamp: new Date().toISOString()
        //         })
        //     });
        // } catch (e) {
        //     console.error('Failed to report error', e);
        // }
    }
}

// Export for use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = UtilityFunctions;
}
