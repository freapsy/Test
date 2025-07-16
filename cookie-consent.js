// Cookie Consent Management für NorthDrive
// DSGVO-konforme Cookie-Einwilligung

class CookieConsent {
  constructor() {
    this.cookies = {
      necessary: {
        name: 'necessary',
        title: 'Notwendige Cookies',
        description: 'Diese Cookies sind für die Grundfunktionen der Website erforderlich und können nicht deaktiviert werden.',
        required: true,
        enabled: true
      },
      analytics: {
        name: 'analytics',
        title: 'Analyse-Cookies',
        description: 'Diese Cookies helfen uns zu verstehen, wie Besucher mit der Website interagieren, indem Informationen anonym gesammelt werden.',
        required: false,
        enabled: false
      },
      marketing: {
        name: 'marketing',
        title: 'Marketing-Cookies',
        description: 'Diese Cookies werden verwendet, um Besuchern relevante Anzeigen und Marketingkampagnen bereitzustellen.',
        required: false,
        enabled: false
      },
      preferences: {
        name: 'preferences',
        title: 'Präferenz-Cookies',
        description: 'Diese Cookies ermöglichen es der Website, sich an Ihre Entscheidungen zu erinnern (z.B. Sprache oder Region).',
        required: false,
        enabled: false
      }
    };
    
    this.init();
  }

  init() {
    // Prüfen ob bereits eine Einwilligung vorliegt
    const consent = this.getConsent();
    
    if (!consent) {
      this.showBanner();
    } else {
      this.applyConsent(consent);
    }
  }

  showBanner() {
    // Banner erstellen
    const banner = document.createElement('div');
    banner.id = 'cookie-banner';
    banner.innerHTML = `
      <div class="cookie-banner-content">
        <div class="cookie-banner-header">
          <h3>🍪 Cookie-Einstellungen</h3>
          <p>Wir verwenden Cookies, um Ihre Erfahrung auf unserer Website zu verbessern. Sie können Ihre Einstellungen jederzeit anpassen.</p>
        </div>
        
        <div class="cookie-settings">
          ${Object.values(this.cookies).map(cookie => `
            <div class="cookie-option">
              <div class="cookie-option-header">
                <label class="cookie-toggle">
                  <input type="checkbox" 
                         id="cookie-${cookie.name}" 
                         ${cookie.required ? 'checked disabled' : ''} 
                         ${cookie.enabled ? 'checked' : ''}>
                  <span class="toggle-slider"></span>
                </label>
                <div class="cookie-option-info">
                  <h4>${cookie.title}</h4>
                  <p>${cookie.description}</p>
                </div>
              </div>
            </div>
          `).join('')}
        </div>
        
        <div class="cookie-banner-actions">
          <button id="cookie-accept-all" class="cookie-btn primary">Alle akzeptieren</button>
          <button id="cookie-accept-selected" class="cookie-btn secondary">Ausgewählte akzeptieren</button>
          <button id="cookie-reject-all" class="cookie-btn secondary">Alle ablehnen</button>
          <a href="#" id="cookie-settings-link" class="cookie-link">Einstellungen</a>
        </div>
      </div>
    `;

    // Styles hinzufügen
    const styles = document.createElement('style');
    styles.textContent = `
      #cookie-banner {
        position: fixed;
        bottom: 0;
        left: 0;
        right: 0;
        background: rgba(0, 0, 0, 0.95);
        color: white;
        z-index: 10000;
        padding: 20px;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      }
      
      .cookie-banner-content {
        max-width: 1200px;
        margin: 0 auto;
      }
      
      .cookie-banner-header h3 {
        margin: 0 0 10px 0;
        font-size: 1.2rem;
        color: #fff;
      }
      
      .cookie-banner-header p {
        margin: 0 0 20px 0;
        color: #ccc;
        line-height: 1.5;
      }
      
      .cookie-settings {
        margin: 20px 0;
      }
      
      .cookie-option {
        margin-bottom: 15px;
        padding: 15px;
        background: rgba(255, 255, 255, 0.1);
        border-radius: 8px;
      }
      
      .cookie-option-header {
        display: flex;
        align-items: flex-start;
        gap: 15px;
      }
      
      .cookie-toggle {
        position: relative;
        display: inline-block;
        width: 50px;
        height: 24px;
        flex-shrink: 0;
        margin-top: 2px;
      }
      
      .cookie-toggle input {
        opacity: 0;
        width: 0;
        height: 0;
      }
      
      .toggle-slider {
        position: absolute;
        cursor: pointer;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: #ccc;
        transition: .4s;
        border-radius: 24px;
      }
      
      .toggle-slider:before {
        position: absolute;
        content: "";
        height: 18px;
        width: 18px;
        left: 3px;
        bottom: 3px;
        background-color: white;
        transition: .4s;
        border-radius: 50%;
      }
      
      input:checked + .toggle-slider {
        background-color: #2196F3;
      }
      
      input:disabled + .toggle-slider {
        background-color: #666;
        cursor: not-allowed;
      }
      
      input:checked + .toggle-slider:before {
        transform: translateX(26px);
      }
      
      .cookie-option-info h4 {
        margin: 0 0 5px 0;
        font-size: 1rem;
        color: #fff;
      }
      
      .cookie-option-info p {
        margin: 0;
        font-size: 0.9rem;
        color: #ccc;
        line-height: 1.4;
      }
      
      .cookie-banner-actions {
        display: flex;
        gap: 10px;
        flex-wrap: wrap;
        align-items: center;
      }
      
      .cookie-btn {
        padding: 10px 20px;
        border: none;
        border-radius: 6px;
        cursor: pointer;
        font-size: 0.9rem;
        font-weight: 500;
        transition: all 0.3s ease;
      }
      
      .cookie-btn.primary {
        background-color: #2196F3;
        color: white;
      }
      
      .cookie-btn.primary:hover {
        background-color: #1976D2;
      }
      
      .cookie-btn.secondary {
        background-color: transparent;
        color: #fff;
        border: 1px solid #ccc;
      }
      
      .cookie-btn.secondary:hover {
        background-color: rgba(255, 255, 255, 0.1);
      }
      
      .cookie-link {
        color: #2196F3;
        text-decoration: none;
        font-size: 0.9rem;
      }
      
      .cookie-link:hover {
        text-decoration: underline;
      }
      
      @media (max-width: 768px) {
        #cookie-banner {
          padding: 15px;
        }
        
        .cookie-banner-actions {
          flex-direction: column;
          align-items: stretch;
        }
        
        .cookie-btn {
          width: 100%;
          text-align: center;
        }
        
        .cookie-option-header {
          flex-direction: column;
          gap: 10px;
        }
        
        .cookie-toggle {
          align-self: flex-start;
        }
      }
    `;

    document.head.appendChild(styles);
    document.body.appendChild(banner);

    // Event Listeners
    document.getElementById('cookie-accept-all').addEventListener('click', () => {
      this.acceptAll();
    });

    document.getElementById('cookie-accept-selected').addEventListener('click', () => {
      this.acceptSelected();
    });

    document.getElementById('cookie-reject-all').addEventListener('click', () => {
      this.rejectAll();
    });

    document.getElementById('cookie-settings-link').addEventListener('click', (e) => {
      e.preventDefault();
      this.showSettings();
    });
  }

  acceptAll() {
    const consent = {};
    Object.keys(this.cookies).forEach(key => {
      consent[key] = true;
    });
    this.saveConsent(consent);
    this.hideBanner();
  }

  acceptSelected() {
    const consent = {};
    Object.keys(this.cookies).forEach(key => {
      const checkbox = document.getElementById(`cookie-${key}`);
      consent[key] = checkbox.checked;
    });
    this.saveConsent(consent);
    this.hideBanner();
  }

  rejectAll() {
    const consent = {};
    Object.keys(this.cookies).forEach(key => {
      consent[key] = this.cookies[key].required;
    });
    this.saveConsent(consent);
    this.hideBanner();
  }

  saveConsent(consent) {
    const consentData = {
      consent: consent,
      timestamp: new Date().toISOString(),
      version: '1.0'
    };
    
    localStorage.setItem('northdrive_cookie_consent', JSON.stringify(consentData));
    this.applyConsent(consent);
  }

  getConsent() {
    const stored = localStorage.getItem('northdrive_cookie_consent');
    if (stored) {
      try {
        const data = JSON.parse(stored);
        return data.consent;
      } catch (e) {
        console.error('Fehler beim Parsen der Cookie-Einwilligung:', e);
        return null;
      }
    }
    return null;
  }

  applyConsent(consent) {
    // Analytics Cookies
    if (consent.analytics) {
      this.enableAnalytics();
    } else {
      this.disableAnalytics();
    }

    // Marketing Cookies
    if (consent.marketing) {
      this.enableMarketing();
    } else {
      this.disableMarketing();
    }

    // Preferences Cookies
    if (consent.preferences) {
      this.enablePreferences();
    } else {
      this.disablePreferences();
    }

    // Firebase Analytics basierend auf Consent
    this.setupFirebaseAnalytics(consent);
  }

  enableAnalytics() {
    // Google Analytics aktivieren
    if (typeof gtag !== 'undefined') {
      gtag('consent', 'update', {
        'analytics_storage': 'granted'
      });
    }
    
    // Firebase Analytics aktivieren
    if (window.firebase && window.firebase.analytics) {
      window.firebase.analytics().setAnalyticsCollectionEnabled(true);
    }
  }

  disableAnalytics() {
    // Google Analytics deaktivieren
    if (typeof gtag !== 'undefined') {
      gtag('consent', 'update', {
        'analytics_storage': 'denied'
      });
    }
    
    // Firebase Analytics deaktivieren
    if (window.firebase && window.firebase.analytics) {
      window.firebase.analytics().setAnalyticsCollectionEnabled(false);
    }
  }

  enableMarketing() {
    // Marketing-Cookies aktivieren
    console.log('Marketing-Cookies aktiviert');
  }

  disableMarketing() {
    // Marketing-Cookies deaktivieren
    console.log('Marketing-Cookies deaktiviert');
  }

  enablePreferences() {
    // Präferenz-Cookies aktivieren
    console.log('Präferenz-Cookies aktiviert');
  }

  disablePreferences() {
    // Präferenz-Cookies deaktivieren
    console.log('Präferenz-Cookies deaktiviert');
  }

  setupFirebaseAnalytics(consent) {
    // Firebase Analytics basierend auf Consent konfigurieren
    if (window.firebase && window.firebase.analytics) {
      const analytics = window.firebase.analytics();
      
      if (consent.analytics) {
        analytics.setAnalyticsCollectionEnabled(true);
        
        // Custom events für Consent
        analytics.logEvent('cookie_consent_granted', {
          analytics: consent.analytics,
          marketing: consent.marketing,
          preferences: consent.preferences
        });
      } else {
        analytics.setAnalyticsCollectionEnabled(false);
      }
    }
    
    // Event auslösen für andere Scripts
    const event = new CustomEvent('cookieConsentChanged', {
      detail: { consent: consent }
    });
    window.dispatchEvent(event);
  }

  hideBanner() {
    const banner = document.getElementById('cookie-banner');
    if (banner) {
      banner.style.display = 'none';
    }
  }

  showSettings() {
    // Cookie-Einstellungen Modal anzeigen
    this.showSettingsModal();
  }

  showSettingsModal() {
    const modal = document.createElement('div');
    modal.id = 'cookie-settings-modal';
    modal.innerHTML = `
      <div class="cookie-settings-overlay">
        <div class="cookie-settings-content">
          <div class="cookie-settings-header">
            <h2>🍪 Cookie-Einstellungen</h2>
            <button id="close-cookie-settings" class="close-btn">&times;</button>
          </div>
          
          <div class="cookie-settings-body">
            <p>Hier können Sie Ihre Cookie-Einstellungen anpassen. Notwendige Cookies können nicht deaktiviert werden, da sie für die Grundfunktionen der Website erforderlich sind.</p>
            
            <div class="cookie-settings-options">
              ${Object.values(this.cookies).map(cookie => `
                <div class="cookie-setting-option">
                  <div class="cookie-setting-header">
                    <label class="cookie-toggle">
                      <input type="checkbox" 
                             id="settings-cookie-${cookie.name}" 
                             ${cookie.required ? 'checked disabled' : ''} 
                             ${this.getConsent()?.[cookie.name] ? 'checked' : ''}>
                      <span class="toggle-slider"></span>
                    </label>
                    <div class="cookie-setting-info">
                      <h4>${cookie.title}</h4>
                      <p>${cookie.description}</p>
                    </div>
                  </div>
                </div>
              `).join('')}
            </div>
          </div>
          
          <div class="cookie-settings-footer">
            <button id="save-cookie-settings" class="cookie-btn primary">Einstellungen speichern</button>
            <button id="cancel-cookie-settings" class="cookie-btn secondary">Abbrechen</button>
          </div>
        </div>
      </div>
    `;

    // Styles für Modal
    const modalStyles = document.createElement('style');
    modalStyles.textContent = `
      #cookie-settings-modal {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.8);
        z-index: 10001;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      
      .cookie-settings-overlay {
        background: white;
        border-radius: 12px;
        max-width: 600px;
        width: 90%;
        max-height: 80vh;
        overflow-y: auto;
        color: #333;
      }
      
      .cookie-settings-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 20px;
        border-bottom: 1px solid #eee;
      }
      
      .cookie-settings-header h2 {
        margin: 0;
        font-size: 1.5rem;
      }
      
      .close-btn {
        background: none;
        border: none;
        font-size: 1.5rem;
        cursor: pointer;
        color: #666;
      }
      
      .close-btn:hover {
        color: #333;
      }
      
      .cookie-settings-body {
        padding: 20px;
      }
      
      .cookie-settings-body p {
        margin-bottom: 20px;
        line-height: 1.6;
        color: #666;
      }
      
      .cookie-setting-option {
        margin-bottom: 20px;
        padding: 15px;
        border: 1px solid #eee;
        border-radius: 8px;
      }
      
      .cookie-setting-header {
        display: flex;
        align-items: flex-start;
        gap: 15px;
      }
      
      .cookie-setting-info h4 {
        margin: 0 0 5px 0;
        font-size: 1.1rem;
      }
      
      .cookie-setting-info p {
        margin: 0;
        font-size: 0.9rem;
        color: #666;
        line-height: 1.4;
      }
      
      .cookie-settings-footer {
        padding: 20px;
        border-top: 1px solid #eee;
        display: flex;
        gap: 10px;
        justify-content: flex-end;
      }
      
      @media (max-width: 768px) {
        .cookie-settings-overlay {
          width: 95%;
          margin: 10px;
        }
        
        .cookie-settings-footer {
          flex-direction: column;
        }
        
        .cookie-btn {
          width: 100%;
        }
      }
    `;

    document.head.appendChild(modalStyles);
    document.body.appendChild(modal);

    // Event Listeners für Modal
    document.getElementById('close-cookie-settings').addEventListener('click', () => {
      this.hideSettingsModal();
    });

    document.getElementById('cancel-cookie-settings').addEventListener('click', () => {
      this.hideSettingsModal();
    });

    document.getElementById('save-cookie-settings').addEventListener('click', () => {
      this.saveSettings();
    });

    // Klick außerhalb schließt Modal
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        this.hideSettingsModal();
      }
    });
  }

  hideSettingsModal() {
    const modal = document.getElementById('cookie-settings-modal');
    if (modal) {
      modal.remove();
    }
  }

  saveSettings() {
    const consent = {};
    Object.keys(this.cookies).forEach(key => {
      const checkbox = document.getElementById(`settings-cookie-${key}`);
      consent[key] = checkbox.checked;
    });
    
    this.saveConsent(consent);
    this.hideSettingsModal();
    
    // Bestätigung anzeigen
    this.showNotification('Einstellungen gespeichert', 'Ihre Cookie-Einstellungen wurden erfolgreich gespeichert.');
  }

  showNotification(title, message) {
    const notification = document.createElement('div');
    notification.className = 'cookie-notification';
    notification.innerHTML = `
      <div class="cookie-notification-content">
        <h4>${title}</h4>
        <p>${message}</p>
      </div>
    `;

    const notificationStyles = document.createElement('style');
    notificationStyles.textContent = `
      .cookie-notification {
        position: fixed;
        top: 20px;
        right: 20px;
        background: #4CAF50;
        color: white;
        padding: 15px 20px;
        border-radius: 8px;
        z-index: 10002;
        animation: slideIn 0.3s ease;
      }
      
      @keyframes slideIn {
        from {
          transform: translateX(100%);
          opacity: 0;
        }
        to {
          transform: translateX(0);
          opacity: 1;
        }
      }
      
      .cookie-notification-content h4 {
        margin: 0 0 5px 0;
        font-size: 1rem;
      }
      
      .cookie-notification-content p {
        margin: 0;
        font-size: 0.9rem;
        opacity: 0.9;
      }
    `;

    document.head.appendChild(notificationStyles);
    document.body.appendChild(notification);

    // Nach 3 Sekunden entfernen
    setTimeout(() => {
      if (notification.parentNode) {
        notification.parentNode.removeChild(notification);
      }
    }, 3000);
  }

  // Öffentliche Methoden für andere Scripts
  hasConsent(cookieType) {
    const consent = this.getConsent();
    return consent && consent[cookieType];
  }

  updateConsent(cookieType, enabled) {
    const consent = this.getConsent() || {};
    consent[cookieType] = enabled;
    this.saveConsent(consent);
  }
}

// Cookie Consent initialisieren
document.addEventListener('DOMContentLoaded', () => {
  window.cookieConsent = new CookieConsent();
});

// Globale Funktionen für andere Scripts
window.hasCookieConsent = function(cookieType) {
  return window.cookieConsent && window.cookieConsent.hasConsent(cookieType);
};

window.updateCookieConsent = function(cookieType, enabled) {
  if (window.cookieConsent) {
    window.cookieConsent.updateConsent(cookieType, enabled);
  }
}; 