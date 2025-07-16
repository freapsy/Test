# Cookie-Management für NorthDrive

## Übersicht

Diese Implementierung bietet eine DSGVO-konforme Cookie-Einwilligung für die NorthDrive-Website. Das System ist modular aufgebaut und kann einfach erweitert werden.

## Features

### ✅ DSGVO-Konformität
- Explizite Einwilligung für alle nicht-notwendigen Cookies
- Granulare Kontrolle über Cookie-Kategorien
- Widerrufsmöglichkeit jederzeit
- Transparente Dokumentation der Cookie-Nutzung

### ✅ Benutzerfreundlichkeit
- Modernes, responsives Design
- Klare Kategorisierung der Cookies
- Einfache Einstellungsänderung
- Mehrsprachige Unterstützung (aktuell Deutsch)

### ✅ Technische Integration
- Nahtlose Integration mit Firebase
- Dynamische Analytics-Aktivierung
- Event-basierte Kommunikation
- Lokale Speicherung der Einstellungen

## Cookie-Kategorien

### 1. Notwendige Cookies
- **Zweck:** Grundfunktionen der Website
- **Beispiele:** Session-Management, Sicherheit
- **Speicherdauer:** Sitzung / 1 Jahr
- **Deaktivierung:** Nicht möglich

### 2. Analyse-Cookies
- **Zweck:** Website-Nutzung verstehen
- **Beispiele:** Google Analytics, Firebase Analytics
- **Speicherdauer:** 2 Jahre
- **Deaktivierung:** Über Cookie-Banner möglich

### 3. Marketing-Cookies
- **Zweck:** Personalisierte Werbung
- **Beispiele:** Conversion-Tracking, Remarketing
- **Speicherdauer:** 1 Jahr
- **Deaktivierung:** Über Cookie-Banner möglich

### 4. Präferenz-Cookies
- **Zweck:** Benutzereinstellungen speichern
- **Beispiele:** Sprache, Region, UI-Präferenzen
- **Speicherdauer:** 1 Jahr
- **Deaktivierung:** Über Cookie-Banner möglich

## Integration

### 1. Script einbinden
```html
<!-- In allen HTML-Dateien vor den anderen Scripts -->
<script src="cookie-consent.js"></script>
```

### 2. Firebase Analytics
```javascript
// Analytics nur mit Consent initialisieren
let analytics = null;

function initializeAnalytics() {
  if (window.hasCookieConsent && window.hasCookieConsent('analytics')) {
    if (!analytics) {
      analytics = getAnalytics(app);
    }
  }
}

// Event Listener für Consent-Änderungen
window.addEventListener('cookieConsentChanged', (event) => {
  initializeAnalytics();
});
```

### 3. Consent prüfen
```javascript
// Prüfen ob Analytics erlaubt ist
if (window.hasCookieConsent('analytics')) {
  // Analytics-Code ausführen
}

// Consent ändern
window.updateCookieConsent('analytics', true);
```

## Dateien

### Hauptdateien
- `cookie-consent.js` - Hauptlogik für Cookie-Management
- `datenschutz.html` - Datenschutzerklärung mit Cookie-Informationen

### Integration in bestehende Dateien
Alle HTML-Dateien wurden um folgende Elemente erweitert:
- Cookie-Script-Einbindung
- Datenschutz-Link in der Navigation
- Firebase Analytics mit Consent-Check

## Benutzeroberfläche

### Cookie-Banner
- Erscheint beim ersten Besuch
- Zeigt alle Cookie-Kategorien mit Toggles
- Buttons: "Alle akzeptieren", "Ausgewählte akzeptieren", "Alle ablehnen"
- Link zu detaillierten Einstellungen

### Einstellungen-Modal
- Detaillierte Erklärung jeder Cookie-Kategorie
- Individuelle Kontrolle über jede Kategorie
- Speichern/Abbrechen-Funktionen
- Responsive Design

## Technische Details

### Speicherung
- **Lokaler Speicher:** `localStorage` mit Key `northdrive_cookie_consent`
- **Format:** JSON mit Consent-Status, Timestamp und Version
- **Struktur:**
```json
{
  "consent": {
    "necessary": true,
    "analytics": false,
    "marketing": false,
    "preferences": false
  },
  "timestamp": "2024-12-01T10:00:00.000Z",
  "version": "1.0"
}
```

### Events
- `cookieConsentChanged` - Wird ausgelöst bei Consent-Änderungen
- Event-Detail enthält das neue Consent-Objekt

### API-Funktionen
- `window.hasCookieConsent(cookieType)` - Prüft Consent für Cookie-Typ
- `window.updateCookieConsent(cookieType, enabled)` - Ändert Consent
- `window.cookieConsent` - Direkter Zugriff auf CookieConsent-Instanz

## Anpassungen

### Neue Cookie-Kategorie hinzufügen
```javascript
// In cookie-consent.js, this.cookies erweitern:
newCategory: {
  name: 'newCategory',
  title: 'Neue Kategorie',
  description: 'Beschreibung der neuen Kategorie',
  required: false,
  enabled: false
}
```

### Styling anpassen
Die CSS-Styles sind direkt in der `cookie-consent.js` Datei enthalten und können dort angepasst werden.

### Mehrsprachigkeit
Aktuell ist nur Deutsch implementiert. Für weitere Sprachen können die Texte in Arrays organisiert und basierend auf der Browser-Sprache ausgewählt werden.

## Compliance

### DSGVO-Anforderungen
✅ **Einwilligung vor Verarbeitung** - Cookies werden nur nach expliziter Einwilligung gesetzt
✅ **Granulare Kontrolle** - Jede Cookie-Kategorie kann einzeln gesteuert werden
✅ **Widerrufsmöglichkeit** - Einstellungen können jederzeit geändert werden
✅ **Transparenz** - Klare Dokumentation der Cookie-Nutzung
✅ **Minimale Datenverarbeitung** - Nur notwendige Daten werden verarbeitet

### Browser-Kompatibilität
- ✅ Chrome 60+
- ✅ Firefox 55+
- ✅ Safari 12+
- ✅ Edge 79+
- ✅ Mobile Browser

## Troubleshooting

### Häufige Probleme

1. **Cookie-Banner erscheint nicht**
   - Prüfen Sie, ob `cookie-consent.js` korrekt eingebunden ist
   - Prüfen Sie die Browser-Konsole auf JavaScript-Fehler

2. **Analytics funktioniert nicht**
   - Stellen Sie sicher, dass Analytics-Consent erteilt wurde
   - Prüfen Sie die Firebase-Konfiguration

3. **Einstellungen werden nicht gespeichert**
   - Prüfen Sie, ob localStorage verfügbar ist
   - Prüfen Sie die Browser-Konsole auf Fehler

### Debug-Modi
```javascript
// Consent-Status in Konsole ausgeben
console.log(window.cookieConsent.getConsent());

// Alle Cookies zurücksetzen
localStorage.removeItem('northdrive_cookie_consent');
```

## Updates und Wartung

### Versionierung
- Aktuelle Version: 1.0
- Änderungen werden in der `version`-Property gespeichert
- Automatische Migration bei Versionsänderungen möglich

### Monitoring
- Consent-Änderungen werden in Firebase Analytics geloggt
- Fehler werden in der Browser-Konsole protokolliert

## Support

Bei Fragen oder Problemen:
- **E-Mail:** contact@northdrive.team
- **Betreff:** Cookie-Management
- **Dokumentation:** Diese README-Datei
- **Code:** `cookie-consent.js` mit ausführlichen Kommentaren 