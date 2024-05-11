/* À l’aide d’un module “path” que vous aurez importé, réalisez les actions suivantes :

➔ Récupérez le nom du fichier.
➔ Récupérez l'extension du fichier.
➔ Récupérez le répertoire parent du fichier. */

const path = require('path');

console.log('Le nom du fichier est : ', path.basename('/job05/index.js'));
console.log('L\'extension du fichier est : ', path.extname('/job05/index.js'));
console.log('Le repertoire du fichier est : ', path.dirname('/job05/index.js'));