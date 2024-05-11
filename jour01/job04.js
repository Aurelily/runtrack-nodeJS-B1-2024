// À l’aide du module “fs”, affichez l’ensemble des dossiers présents dans le
// répertoire courant. Exécutez votre script pour vous assurer que tout
// fonctionne comme prévu.
// A VOIR : https://apprendre-nodejs.fr/v1/chapter-04/index.html

const fs = require('fs');             

fs.readdir('../jour01', (error, files) => {   
  console.log(files);                 
});

