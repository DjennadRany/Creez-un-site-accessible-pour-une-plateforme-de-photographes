<<<<<<< HEAD
async function getPhotographers() {
    try {
      const response = await fetch('./data/photographers.json');
      if (!response.ok) {
        throw new Error('Looks like there was a problem. Status Code: ' + response.status);
      }
      const data = await response.json();
      console.log(data.photographers);
      const photographerSection = document.querySelector('.photographer_section');
  
      data.photographers.forEach(item => {
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
        textphoter.textContent = item.tagline
        citycont.textContent = item.city + ', ' + item.country 
        tarifphoter.textContent = item.price +'€/jours'
  
        link.appendChild(image);
        article.appendChild(link);
        article.appendChild(heading);
        article.appendChild(citycont);
        article.appendChild(textphoter);
        article.appendChild(tarifphoter);
        photographerSection.appendChild(article);
       
      });
    } catch (error) {
      console.log('Fetch Error :-S', error);
    }
  }
  
  getPhotographers();
=======
async function getPhotographers() {
    try {
      const response = await fetch('./data/photographers.json');
      if (!response.ok) {
        throw new Error('Looks like there was a problem. Status Code: ' + response.status);
      }
      const data = await response.json();
      console.log(data.photographers);
      const photographerSection = document.querySelector('.photographer_section');
  
      data.photographers.forEach(item => {
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
        textphoter.textContent = item.tagline
        citycont.textContent = item.city + ', ' + item.country 
        tarifphoter.textContent = item.price +'€/jours'
  
        link.appendChild(image);
        article.appendChild(link);
        article.appendChild(heading);
        article.appendChild(citycont);
        article.appendChild(textphoter);
        article.appendChild(tarifphoter);
        photographerSection.appendChild(article);
       
      });
    } catch (error) {
      console.log('Fetch Error :-S', error);
    }
<<<<<<< HEAD

    async function displayData(photographers) {
        const photographersSection = document.querySelector(".photographer_section");

        photographers.forEach((photographer) => {
            const photographerModel = photographerTemplate(photographer);
            const userCardDOM = photographerModel.getUserCardDOM();
            photographersSection.appendChild(userCardDOM);
        });
    }

    async function init() {
        // Récupère les datas des photographes
        const { photographers } = await getPhotographers();
        displayData(photographers);
    }
    
    init();
    
=======
  }
  
  getPhotographers();
>>>>>>> 44c2419 (push version local)
>>>>>>> a383b40 (Message de commit)
