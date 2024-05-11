/* Récupérez le contenu du fichier data.txt de manière asynchrone, et affichez le
contenu dans le terminal. */

const fs = require('fs'); // Importer le module 'fs'

// Lire le contenu du fichier de manière asynchrone
fs.readFile('data.txt', 'utf8', (err, data) => {
    if (err) {
        console.error('Erreur lors de la lecture du fichier:', err); // Afficher le message d'erreur en cas de problème
        return; // Arrêter le traitement si une erreur se produit
    }
    console.log(data); // Afficher le contenu du fichier dans le terminal si tout est correct
});
