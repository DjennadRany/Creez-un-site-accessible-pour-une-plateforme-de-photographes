// Class that represents a photographer element factory
class PhotographerFactory {
  static createPhotographerElement(item) {
    // Create the necessary elements for the photographer
    const article = document.createElement('article');
    const link = document.createElement('a');
    const image = document.createElement('img');
    const heading = document.createElement('h2');
    const textphoter = document.createElement('p');
    const tarifphoter = document.createElement('p');
    const citycont = document.createElement('p');

    // Set the attributes and text content for the elements
    link.href = `photographer.html#${encodeURIComponent(item.id)}`;
    image.src = `./assets/photographers/${item.portrait}`;
    image.setAttribute('aria-label', `Photo de ${item.name}`);
    image.alt = item.name;
    heading.textContent = item.name;
    textphoter.textContent = item.tagline;
    tarifphoter.textContent = item.price + '€/jours';
    citycont.textContent = item.city + ', ' + item.country;

    // Append the elements to the article element
    link.appendChild(image);
    article.appendChild(link);
    article.appendChild(heading);
    article.appendChild(citycont);
    article.appendChild(textphoter);
    article.appendChild(tarifphoter);
    return article;
  }
}

// Class that represents all photographers and handles fetching and rendering their data
class AllPhotographers {
  constructor() {
    this.photographerSection = document.querySelector('.photographerSection');
  }

  // Asynchronously fetch photographers' data from a JSON file
  async fetchPhotographersData() {
    try {
      const response = await fetch('./data/photographers.json');
      if (!response.ok) {
        throw new Error('Looks like there was a problem. Status Code: ' + response.status);
      }
      const data = await response.json();
      return data.photographers;
    } catch (error) {
      console.log('Fetch Error :-S', error);
    }
  }

  // Asynchronously render photographers on the page
  async renderPhotographers() {
    const photographersData = await this.fetchPhotographersData();
    photographersData.forEach(item => {
      const photographerElement = PhotographerFactory.createPhotographerElement(item);
      this.photographerSection.appendChild(photographerElement);
    });
  }
}

// Create an instance of AllPhotographers and render the photographers
const allPhotographers = new AllPhotographers();
allPhotographers.renderPhotographers();
