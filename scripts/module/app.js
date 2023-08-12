export default class App {
  constructor() {
    this.photographers = [];
    this.PhotographerFactory = [];
    this.url = window.location.href;
    this.photographerId = parseInt(this.url.split('#')[1]);
    this.idIndex = this.url.lastIndexOf('#');
     // Implementation of photographer creation based on the data
     this.photographer = { };

     this.photographerMedia = {}
     this.totalLikes = {}
     this.tgmDiv = document.createElement('div');
  }



  // Method to get photographer information based on their ID
  getPhotographerById(photographerId) {
    return this.photographers.find(photographer => photographer.id === photographerId);
  }

  // Method to get photographer information based on the ID in the URL
  getPhotographerInfoFromURL() {
  
    this.photographerId
    return this.photographerId ? this.getPhotographerById(this.photographerId) : null;
  }

  createPhotographer(photographerData) {
    this.photographer = {id: photographerData.id,
      name: photographerData.name,
      // Add other properties based on the photographer data structure
    }
    return this.photographer;
  }

  // Method to load photographers' data from the JSON file
  loadPhotographersData() {
    fetch('./data/photographers.json')
      .then(response => response.json())
      .then(data => {
        this.photographers = data.photographers.map(photographerData => this.createPhotographer(photographerData));
        this.photographer = this.getPhotographerInfoFromURL();
      })
      .catch(error => {
        console.log("An error occurred while fetching the JSON file:", error);
      });
  }

  // Method to display photographers' data
  displayPhotographersData() {
    fetch('./data/photographers.json')
      .then(response => response.json())
      .then(data => {
        const photographer = data.photographers.find(p => p.id === parseInt(this.photographerId));
        if (photographer) {
          this.photographerMedia = data.media.filter(media => media.photographerId === parseInt(this.photographerId));
          this.totalLikes = this.photographerMedia.reduce((accumulator, currentValue) => accumulator + currentValue.likes, 0);
          this.tgmDiv  
          this.tgmDiv.classList.add('tgm');
          const content = `
              <p class="totalLikes">${this.totalLikes} ❤</p>
              <p> ${photographer.price}€ /day </p>
            `;
          this.tgmDiv.innerHTML = content;
          document.body.appendChild(this.tgmDiv);
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
