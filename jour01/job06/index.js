/* Récupérez le contenu du fichier data.txt de façon synchrone, et afficher le
contenu dans le terminal. */

const fs = require('fs'); // Importer le module 'fs'

// Lire le contenu du fichier de manière synchrone
try {
    const data = fs.readFileSync('data.txt', 'utf8'); // Lire le fichier en utilisant l'encodage 'utf8'
    console.log(data); // Afficher le contenu du fichier dans le terminal
} catch (err) {
    console.error('Erreur lors de la lecture du fichier:', err); // Afficher un message d'erreur si la lecture échoue
}
