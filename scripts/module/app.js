
export default class App {
    constructor() {
      this.photographers = [];
    }
  
    // Méthode pour récupérer les informations du photographe en fonction de son ID
    getPhotographerById(photographerId) {
      return this.photographers.find(photographer => photographer.id === photographerId);
    }
  
    // Méthode pour récupérer les informations du photographe en fonction de l'ID dans l'URL
    getPhotographerInfoFromURL() {
      const url = window.location.href;
      const photographerId = parseInt(url.split('#')[1]);
      return photographerId ? this.getPhotographerById(photographerId) : null;
    }
  
    // Méthode pour charger les données des photographes à partir du fichier JSON
    loadPhotographersData() {
      fetch('./data/photographers.json')
        .then(response => response.json())
        .then(data => {
          this.photographers = data.photographers.map(photographerData => PhotographerFactory.createPhotographer(photographerData));
          const photographer = this.getPhotographerInfoFromURL();
          if (photographer) {
            const photographerInfo = new PhotographerInfo(photographer);
            photographerInfo.incrementPhotographerInfo();
          }
        })
        .catch(error => {
          console.log('Une erreur s\'est produite lors de la récupération du fichier JSON :', error);
        });
    }
  
    // Méthode pour afficher les données des photographes
    displayPhotographersData() {
      const url = window.location.href;
      const idIndex = url.lastIndexOf('#');
      const photographerId = url.substring(idIndex + 1);
  
      fetch('./data/photographers.json')
        .then(response => response.json())
        .then(data => {
          const photographer = data.photographers.find(p => p.id === parseInt(photographerId));
          if (photographer) {
            const photographerMedia = data.media.filter(media => media.photographerId === parseInt(photographerId));
            const totalLikes = photographerMedia.reduce((accumulator, currentValue) => accumulator + currentValue.likes, 0);
  
            const tgmDiv = document.createElement('div');
            tgmDiv.classList.add('tgm');
  
            const content = `
              <p class="totalLikes">${totalLikes} ❤</p>
              <p> ${photographer.price}€ /jour </p>
            `;
  
            tgmDiv.innerHTML = content;
  
            document.body.appendChild(tgmDiv);
          } else {
            console.log('Photographer not found');
          }
        })
        .catch(error => {
          console.log('An error occurred:', error);
        });
    }
  
    // Méthode d'initialisation de l'application
    init() {
      this.loadPhotographersData();
      this.displayPhotographersData();
    }
  }
  
  // Instanciation de l'application et lancement
  const app = new App();
  
  app.init();