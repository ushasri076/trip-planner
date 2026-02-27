// ===== Emergency System Module =====

class EmergencySystemApp {
    constructor(mainApp) {
        this.app = mainApp;
        this.isRecording = false;
        this.mediaRecorder = null;
        this.audioChunks = [];
        this.holdStartTime = null;
        this.gestureTriggered = false;
        this.recognitionSupported = 'webkitSpeechRecognition' in window || 'SpeechRecognition' in window;
        this.recognition = null;

        this.init();
    }

    init() {
        this.setupEmergencyContacts();
        this.setupEmergencyTrigger();
        this.setupVoiceActivation();
        this.setupAlertSettings();
        this.initSpeechRecognition();
    }

    setupEmergencyContacts() {
        const form = document.getElementById('emergency-contacts-form');
        if (form) {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                this.addEmergencyContact();
            });
        }

        this.updateEmergencyContactsList();
    }

    addEmergencyContact() {
        const name = document.getElementById('emergency-name').value.trim();
        const phone = document.getElementById('emergency-phone').value.trim();
        const email = document.getElementById('emergency-email').value.trim();

        if (!name || !phone || !email) {
            this.app.showNotification('Please fill in all contact details', 'error');
            return;
        }

        const contact = this.app.addEmergencyContact({
            name: name,
            phone: phone,
            email: email,
            addedDate: new Date().toISOString()
        });

        this.app.showNotification(`Emergency contact "${name}" added successfully!`, 'success');
        
        // Clear form
        document.getElementById('emergency-contacts-form').reset();
        this.updateEmergencyContactsList();
    }

    updateEmergencyContactsList() {
        const list = document.getElementById('emergency-contacts-list');
        if (!list) return;

        if (this.app.emergencyContacts.length === 0) {
            list.innerHTML = '<p class="empty-state">No emergency contacts added yet</p>';
            return;
        }

        list.innerHTML = this.app.emergencyContacts.map(contact => `
            <div class="contact-item">
                <div class="contact-info">
                    <h4>${contact.name}</h4>
                    <p>📱 ${contact.phone}</p>
                    <p>📧 ${contact.email}</p>
                </div>
                <button class="btn btn-secondary" onclick="window.emergencySystemApp.removeContact('${contact.id}')">
                    Remove
                </button>
            </div>
        `).join('');
    }

    removeContact(contactId) {
        this.app.emergencyContacts = this.app.emergencyContacts.filter(c => c.id !== contactId);
        this.app.saveToStorage();
        this.updateEmergencyContactsList();
        this.app.showNotification('Contact removed', 'info');
    }

    setupEmergencyTrigger() {
        const triggerBtn = document.getElementById('gesture-trigger-btn');
        if (!triggerBtn) return;

        let pressStartTime = null;

        triggerBtn.addEventListener('mousedown', (e) => {
            pressStartTime = Date.now();
            this.updateTriggerStatus('🟡 Holding... Release at 3 seconds');
        });

        triggerBtn.addEventListener('mouseup', (e) => {
            const pressDuration = Date.now() - pressStartTime;
            
            if (pressDuration >= 3000) { // 3 seconds
                this.triggerEmergencyAlert();
            } else {
                this.updateTriggerStatus('⏱️ Hold for 3 seconds to trigger');
            }
        });

        triggerBtn.addEventListener('mouseleave', (e) => {
            this.updateTriggerStatus('⏱️ Hold for 3 seconds to trigger');
        });

        // Touch support for mobile
        triggerBtn.addEventListener('touchstart', (e) => {
            pressStartTime = Date.now();
            this.updateTriggerStatus('🟡 Holding... Release at 3 seconds');
        });

        triggerBtn.addEventListener('touchend', (e) => {
            const pressDuration = Date.now() - pressStartTime;
            
            if (pressDuration >= 3000) {
                this.triggerEmergencyAlert();
            } else {
                this.updateTriggerStatus('⏱️ Hold for 3 seconds to trigger');
            }
        });

        this.updateTriggerStatus('⏱️ Hold for 3 seconds to trigger');
    }

    updateTriggerStatus(text) {
        const statusEl = document.getElementById('trigger-status');
        if (statusEl) {
            statusEl.textContent = text;
        }
    }

    triggerEmergencyAlert() {
        if (this.gestureTriggered) return; // Prevent multiple triggers
        
        this.gestureTriggered = true;
        this.updateTriggerStatus('🚨 EMERGENCY ALERT TRIGGERED!');

        const recordAudio = document.getElementById('record-audio').checked;
        const captureLocation = document.getElementById('capture-location').checked;

        if (recordAudio) {
            this.startAudioRecording();
        }

        if (captureLocation) {
            this.captureLocation();
        }

        // Create emergency alert
        const alert = {
            title: '🚨 EMERGENCY ALERT TRIGGERED',
            message: `User triggered emergency alert at ${new Date().toLocaleTimeString()}`,
            severity: 'critical',
            type: 'emergency',
            triggered_by: 'gesture'
        };

        this.app.addAlert(alert);
        this.addToAlertHistory(alert);
        this.notifyEmergencyContacts(alert);

        // Reset trigger after 5 seconds
        setTimeout(() => {
            this.gestureTriggered = false;
            this.updateTriggerStatus('✅ Alert sent! Ready for new alert');
        }, 5000);

        // Automatic reset after 1 minute
        setTimeout(() => {
            this.updateTriggerStatus('⏱️ Hold for 3 seconds to trigger');
        }, 60000);
    }

    startAudioRecording() {
        navigator.mediaDevices.getUserMedia({ audio: true })
            .then(stream => {
                this.mediaRecorder = new MediaRecorder(stream);
                this.audioChunks = [];
                this.isRecording = true;

                this.mediaRecorder.ondataavailable = (e) => {
                    this.audioChunks.push(e.data);
                };

                this.mediaRecorder.onstop = () => {
                    const audioBlob = new Blob(this.audioChunks, { type: 'audio/wav' });
                    const audioUrl = URL.createObjectURL(audioBlob);
                    this.app.showNotification('Audio recording saved', 'success');
                };

                this.mediaRecorder.start();
                this.app.showNotification('🎙️ Emergency audio recording started', 'success');

                // Stop recording after 30 seconds
                setTimeout(() => {
                    if (this.mediaRecorder && this.isRecording) {
                        this.mediaRecorder.stop();
                        this.isRecording = false;
                        stream.getTracks().forEach(track => track.stop());
                    }
                }, 30000);
            })
            .catch(err => {
                this.app.showNotification('Unable to access microphone', 'error');
                console.error('Microphone access denied:', err);
            });
    }

    captureLocation() {
        if ('geolocation' in navigator) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const coords = {
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude,
                        accuracy: position.coords.accuracy,
                        timestamp: new Date().toISOString()
                    };
                    
                    this.app.showNotification(`📍 Location captured: ${coords.latitude.toFixed(4)}, ${coords.longitude.toFixed(4)}`, 'success');

                    // Store location for emergency contacts
                    localStorage.setItem('emergency_location', JSON.stringify(coords));
                },
                (error) => {
                    this.app.showNotification('Unable to capture location', 'error');
                    console.error('Geolocation error:', error);
                }
            );
        }
    }

    setupVoiceActivation() {
        const voiceBtn = document.getElementById('voice-activate-btn');
        if (!voiceBtn) return;

        voiceBtn.addEventListener('click', () => {
            if (this.recognitionSupported) {
                this.startVoiceRecognition();
            } else {
                this.app.showNotification('Speech recognition not supported in your browser', 'error');
            }
        });
    }

    initSpeechRecognition() {
        if (!this.recognitionSupported) return;

        const SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition;
        this.recognition = new SpeechRecognition();

        this.recognition.continuous = true;
        this.recognition.interimResults = true;
        this.recognition.language = 'en-US';

        this.recognition.onstart = () => {
            const voiceOutput = document.getElementById('voice-output');
            if (voiceOutput) {
                voiceOutput.innerHTML = '<p class="voice-text">🎤 Listening... say "help" for emergency</p>';
            }
        };

        this.recognition.onresult = (event) => {
            let transcript = '';
            
            for (let i = event.resultIndex; i < event.results.length; i++) {
                transcript += event.results[i][0].transcript;
            }

            const voiceOutput = document.getElementById('voice-output');
            if (voiceOutput) {
                voiceOutput.innerHTML = `<p class="voice-text">You said: <strong>"${transcript}"</strong></p>`;
            }

            // Check for emergency triggers
            const lowerTranscript = transcript.toLowerCase();
            if (lowerTranscript.includes('help') || 
                lowerTranscript.includes('emergency') || 
                lowerTranscript.includes('danger') ||
                lowerTranscript.includes('sos')) {
                this.recognition.stop();
                this.triggerEmergencyAlert();
            }
        };

        this.recognition.onerror = (event) => {
            const voiceOutput = document.getElementById('voice-output');
            if (voiceOutput) {
                voiceOutput.innerHTML = `<p class="voice-text" style="color: red;">Error: ${event.error}</p>`;
            }
        };

        this.recognition.onend = () => {
            const voiceOutput = document.getElementById('voice-output');
            if (voiceOutput) {
                voiceOutput.innerHTML += '<p class="voice-text" style="margin-top: 0.5rem;">Stopped listening</p>';
            }
        };
    }

    startVoiceRecognition() {
        if (this.recognition) {
            this.recognition.start();
        }
    }

    setupAlertSettings() {
        const recordAudioCheckbox = document.getElementById('record-audio');
        const captureLocationCheckbox = document.getElementById('capture-location');
        const speechToTextCheckbox = document.getElementById('enable-speech-to-text');

        if (recordAudioCheckbox) {
            recordAudioCheckbox.addEventListener('change', () => {
                this.app.showNotification(
                    recordAudioCheckbox.checked ? '🎙️ Audio recording enabled' : '🎙️ Audio recording disabled',
                    'info'
                );
            });
        }

        if (captureLocationCheckbox) {
            captureLocationCheckbox.addEventListener('change', () => {
                this.app.showNotification(
                    captureLocationCheckbox.checked ? '📍 Location capture enabled' : '📍 Location capture disabled',
                    'info'
                );
            });
        }

        if (speechToTextCheckbox) {
            speechToTextCheckbox.addEventListener('change', () => {
                this.app.showNotification(
                    speechToTextCheckbox.checked ? '📝 Speech to text enabled' : '📝 Speech to text disabled',
                    'info'
                );
            });
        }

        // Set defaults to checked
        if (recordAudioCheckbox) recordAudioCheckbox.checked = true;
        if (captureLocationCheckbox) captureLocationCheckbox.checked = true;
        if (speechToTextCheckbox) speechToTextCheckbox.checked = true;
    }

    notifyEmergencyContacts(alert) {
        if (this.app.emergencyContacts.length === 0) {
            this.app.showNotification('⚠️ No emergency contacts configured', 'error');
            return;
        }

        // Simulate sending notifications to contacts
        this.app.emergencyContacts.forEach(contact => {
            console.log(`Notifying ${contact.name} at ${contact.phone} and ${contact.email}`);
            
            // In a real app, this would make API calls to send SMS and email
            this.app.showNotification(
                `📢 Notifying ${contact.name}...`,
                'info'
            );
        });

        this.app.showNotification(
            `✅ Emergency alert sent to ${this.app.emergencyContacts.length} contact(s)`,
            'success'
        );
    }

    addToAlertHistory(alert) {
        const history = document.getElementById('alert-history');
        if (!history) return;

        // Remove empty state if present
        const emptyState = history.querySelector('.empty-state');
        if (emptyState) emptyState.remove();

        const historyItem = document.createElement('div');
        historyItem.className = 'history-item';
        historyItem.innerHTML = `
            <h4>${alert.title}</h4>
            <p>${alert.message}</p>
            <span class="history-timestamp">
                ⏰ ${new Date().toLocaleString()}
            </span>
        `;

        history.insertBefore(historyItem, history.firstChild);

        // Keep only last 10 alerts
        const items = history.querySelectorAll('.history-item');
        if (items.length > 10) {
            items[items.length - 1].remove();
        }
    }
}
