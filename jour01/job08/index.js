/* Récupérez le contenu textuel du fichier data.txt et affichez dans le terminal
une lettre sur deux. */

const fs = require('fs'); // Importer le module 'fs'

// Lire le contenu du fichier de manière asynchrone
fs.readFile('data.txt', 'utf8', (err, data) => {
    if (err) {
        console.error("Erreur lors de la lecture du fichier :", err); // Gérer les erreurs
        return;
    }

    // Récupérer une lettre sur deux
    let result = '';
    for (let i = 0; i < data.length; i += 2) {
        result += data[i]; // Ajouter la lettre si elle est à une position paire (0, 2, 4, ...)
    }

    console.log("Une lettre sur deux :", result); // Afficher le résultat dans le terminal
});

