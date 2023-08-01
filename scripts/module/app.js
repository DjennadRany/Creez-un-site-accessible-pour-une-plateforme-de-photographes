export default class App {
  constructor() {
    this.photographers = [];
    this.PhotographerFactory = [];
  }

  // Method to get photographer information based on their ID
  getPhotographerById(photographerId) {
    return this.photographers.find(photographer => photographer.id === photographerId);
  }

  // Method to get photographer information based on the ID in the URL
  getPhotographerInfoFromURL() {
    const url = window.location.href;
    const photographerId = parseInt(url.split('#')[1]);
    return photographerId ? this.getPhotographerById(photographerId) : null;
  }

  createPhotographer(photographerData) {
    // Implementation of photographer creation based on the data
    const photographer = {
      id: photographerData.id,
      name: photographerData.name,
      // Add other properties based on the photographer data structure
    };
    return photographer;
  }

  // Method to load photographers' data from the JSON file
  loadPhotographersData() {
    fetch('./data/photographers.json')
      .then(response => response.json())
      .then(data => {
        this.photographers = data.photographers.map(photographerData => this.createPhotographer(photographerData));
        const photographer = this.getPhotographerInfoFromURL();
      })
      .catch(error => {
        console.log("An error occurred while fetching the JSON file:", error);
      });
  }

  // Method to display photographers' data
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
              <p> ${photographer.price}€ /day </p>
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

  // Method to initialize the application
  init() {
    this.loadPhotographersData();
    this.displayPhotographersData();
  }
}

// Instantiation of the application and execution
const app = new App();
app.init();
