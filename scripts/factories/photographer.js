import PhotographerInfo from '../module/headgraphermodule.js'

// Fonction pour récupérer les informations du photographe en fonction de son ID
function getPhotographerById(photographers, photographerId) {
  return photographers.find(photographer => photographer.id === photographerId);
}

// Fonction pour récupérer les informations du photographe en fonction de l'ID dans l'URL
function getPhotographerInfoFromURL(photographers) {
  const url = window.location.href;
  const photographerId = parseInt(url.split('#')[1]);
  return photographerId ? getPhotographerById(photographers, photographerId) : null;
}


// Appel de la fonction pour récupérer le contenu du fichier JSON
fetch('./data/photographers.json')
  .then(response => response.json())
  .then(data => {
    const photographers = data.photographers;
    const photographer = getPhotographerInfoFromURL(photographers);
    if (photographer) {
      // Créer une instance de la classe PhotographerInfo avec les informations du photographe
      const photographerInfo = new PhotographerInfo(photographer);

      // Utiliser l'instance pour afficher les données du photographe
      photographerInfo.displayInfo();
    }
  })
  .catch(error => {
    console.log("Une erreur s'est produite lors de la récupération du fichier JSON :", error);
  });

function displayPhotographersData() {
  // Obtenir l'URL actuelle
  const url = window.location.href;

  // Trouver l'ID du photographe après le '#'
  const idIndex = url.lastIndexOf('#');
  const photographerId = url.substring(idIndex + 1);

  // Effectuer un appel fetch pour récupérer les données des photographes
  fetch('./data/photographers.json')
    .then(response => response.json())
    .then(data => {
      // Trouver le photographe correspondant à l'ID
      const photographer = data.photographers.find(p => p.id === parseInt(photographerId));

      // Vérifier si le photographe existe
      if (photographer) {
        // Créer une instance de la classe PhotographerInfo avec les informations du photographe
        const photographerInfo = new PhotographerInfo(photographer);

        // Utiliser l'instance pour afficher les données du photographe
        photographerInfo.displayInfo();
      } else {
        console.log('Photographer not found');
      }
    })
    .catch(error => {
      console.log('An error occurred:', error);
    });
}

