/* Écrire un programme qui modifie le contenu du fichier data.txt. Remplacez le
contenu existant par : “Je manipule les fichiers avec un module node !”. */

const fs = require('fs'); // Importer le module 'fs'

const newContent = "Je manipule les fichiers avec un module node !"; // Contenu à écrire

// Écrire le contenu dans le fichier de manière asynchrone
fs.writeFile('data.txt', newContent, 'utf8', (err) => {
    if (err) {
        console.error("Erreur lors de l'écriture dans le fichier :", err); // Gérer les erreurs
        return; // Arrêter l'exécution en cas d'erreur
    }
    console.log("Le contenu du fichier a été mis à jour !"); // Message de confirmation
});


