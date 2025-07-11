const admin = require('firebase-admin');
const serviceAccount = require('./northdrive-fb0d6-e34ab777536d.json');

// Initialisiere Firebase Admin
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

// Beispiel-Whitelist-Einträge
const whitelistEntries = [
  {
    email: 'northdrive25@gmail.com',
    role: 'manager',
    isActive: true,
    createdAt: admin.firestore.FieldValue.serverTimestamp(),
    notes: 'Administrator-Konto'
  }
];

async function createWhitelist() {
  try {
    // Erstelle die Whitelist-Sammlung und füge Einträge hinzu
    const batch = db.batch();
    
    for (const entry of whitelistEntries) {
      const docRef = db.collection('whitelist').doc();
      batch.set(docRef, {
        ...entry,
        email: entry.email.toLowerCase() // Stelle sicher, dass E-Mail in Kleinbuchstaben ist
      });
    }
    
    await batch.commit();
    console.log('Whitelist erfolgreich erstellt!');
    
    // Erstelle Firestore-Regeln für die Whitelist
    const rules = `
    rules_version = '2';
    service cloud.firestore {
      match /databases/{database}/documents {
        // Whitelist kann nur von Administratoren gelesen werden
        match /whitelist/{document=**} {
          allow read: if false; // Nur über Server-Code zugreifbar
          allow write: if false;
        }
        
        // Bestehende Regeln bleiben erhalten
        match /{document=**} {
          allow read, write: if request.auth != null;
        }
      }
    }
    `;
    
    // Regeln müssen manuell in der Firebase Console eingestellt werden
    console.log('\nBitte fügen Sie folgende Regeln in der Firebase Console hinzu:');
    console.log(rules);
    
  } catch (error) {
    console.error('Fehler beim Erstellen der Whitelist:', error);
  } finally {
    // Beende die App
    process.exit();
  }
}

// Führe das Skript aus
createWhitelist(); 