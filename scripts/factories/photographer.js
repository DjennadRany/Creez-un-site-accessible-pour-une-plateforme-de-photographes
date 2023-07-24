import PhotographerInfo from '../module/headgraphermodule.js'
import App from '../module/app.js';



// Appel de la fonction pour récupérer le contenu du fichier JSON
fetch('./data/photographers.json')
  .then(response => response.json())
  .then(data => {
    const photographers = data.photographers;
    const photographer = getPhotographerInfoFromURL(photographers);
    if (photographer) {
      // Créer une instance de la classe PhotographerInfo avec les informations du photographe
      const photographerInfo = new PhotographerInfo(photographer);
      const apply = new App(photographer);

      // Utiliser l'instance pour afficher les données du photographe
     
    }
  })
  .catch(error => {
    console.log("Une erreur s'est produite lors de la récupération du fichier JSON :", error);
  });

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
