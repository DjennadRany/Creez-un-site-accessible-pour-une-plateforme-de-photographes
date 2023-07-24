class PhotographerFactory {
    static createPhotographerElement(item) {
      const article = document.createElement('article');
      const link = document.createElement('a');
      const image = document.createElement('img');
      const heading = document.createElement('h2');
      const textphoter = document.createElement('p');
      const tarifphoter = document.createElement('p');
      const citycont = document.createElement('p');
  
      link.href = `photographer.html#${encodeURIComponent(item.id)}`;
      image.src = `./assets/photographers/${item.portrait}`;
      image.setAttribute('aria-label', `Photo de ${item.name}`);
      image.alt = item.name;
      heading.textContent = item.name;
      textphoter.textContent = item.tagline;
      tarifphoter.textContent = item.price + '€/jours';
      citycont.textContent = item.city + ', ' + item.country;
  
      link.appendChild(image);
      article.appendChild(link);
      article.appendChild(heading);
      article.appendChild(citycont);
      article.appendChild(textphoter);
      article.appendChild(tarifphoter);
  
      return article;
    }
  }
  
  class AllPhotographers {
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
  
    async renderPhotographers() {
      const photographerSection = document.querySelector('.photographer_section');
      const photographersData = await this.fetchPhotographersData();
  
      photographersData.forEach(item => {
        const photographerElement = PhotographerFactory.createPhotographerElement(item);
        photographerSection.appendChild(photographerElement);
      });
    }
  }
  
  const allPhotographers = new AllPhotographers();
  allPhotographers.renderPhotographers();
  