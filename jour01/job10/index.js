/* Écrire un script qui contient une constante nommée URL et qui a pour valeur :
“https://www.google.com&search=nodejs”.
À l’aide du module “url”, faire les actions suivantes :
➔ Récupérer le protocole utilisé
➔ Récupérer le nom d'hôte
➔ Récupérer les paramètres de l’URL
➔ Reformater l’URL en une nouvelle URL valide en modifiant le nom hôte
par “www.laplateforme.io”
➔ Ajouter à cette nouvelle URL un paramètre
➔ Afficher dans le terminal la nouvelle URL*/

const { URL } = require('url'); // Importer la classe URL du module 'url'

// URL incorrecte donnée par le sujet : & n'introduit pas un parametre mais ?
const badURL = "https://www.google.com&search=nodejs";

// Corriger l'URL (utilisation incorrecte du caractère '&')
let correctedURLString = "https://www.google.com?search=nodejs"; // Remplacement de '&' par '?'

// Analyser l'URL corrigée
const parsedURL = new URL(correctedURLString);

// Récupérer le protocole
const protocol = parsedURL.protocol; // "https:"
console.log("Protocole :", protocol);

// Récupérer le nom d'hôte
const hostname = parsedURL.hostname; // "www.google.com"
console.log("Nom d'hôte :", hostname);

// Récupérer les paramètres de l'URL
const queryParameters = {};
parsedURL.searchParams.forEach((value, key) => {
    queryParameters[key] = value;
});
console.log("Paramètres de l'URL :", queryParameters);

// Modifier le nom d'hôte
parsedURL.hostname = "www.laplateforme.io"; // Changer le nom d'hôte
console.log("Nouvelle URL après modification du nom d'hôte :", parsedURL.href);

// Ajouter un nouveau paramètre à l'URL
parsedURL.searchParams.append('lang', 'fr'); // Ajouter un nouveau paramètre
console.log("Nouvelle URL après ajout d'un paramètre :", parsedURL.href);



