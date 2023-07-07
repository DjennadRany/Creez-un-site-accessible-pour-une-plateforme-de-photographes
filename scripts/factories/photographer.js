// Fonction pour créer et incrémenter les informations du photographe dans la div
function incrementPhotographerInfo(photographer) {
  const photographHeaderDiv = document.querySelector('.photograph-header');

  // Création de la div pour contenir les informations et la photo du photographe
  const infoContainer = document.createElement('div');
  infoContainer.classList.add('info-container');

  // Création des éléments HTML pour afficher les informations du photographe
  const infoWrapper = document.createElement('div');
  infoWrapper.classList.add('info-wrapper');



  const nameElement = document.createElement('h2');
  nameElement.textContent = photographer.name;

  const cityElement = document.createElement('p');
  cityElement.textContent = ` `;

  const countryElement = document.createElement('p');
  countryElement.textContent = `  ${photographer.city}, ${photographer.country} `;
  countryElement.classList.add('city');
  const taglineElement = document.createElement('p');
  taglineElement.classList.add('taglin');
  taglineElement.textContent = `${photographer.tagline}`;

  const contactButton = document.createElement('button');
  contactButton.classList.add('contact_button');
  contactButton.textContent = 'Contactez-moi';
  contactButton.onclick = displayModal;




  // Append the back button to the photographer section
  const photographerSection = document.querySelector('.photograph-header');
  photographerSection.appendChild(contactButton);

  // Ajout des éléments dans la div info-wrapper
  infoWrapper.appendChild(nameElement);;
  infoWrapper.appendChild(countryElement);
  infoWrapper.appendChild(taglineElement);

  // Création de l'élément pour afficher la photo du photographe
  const portraitElement = document.createElement('img');
  portraitElement.src = `assets/photographers/${photographer.portrait}`;
  portraitElement.alt = photographer.name;
  portraitElement.classList.add('portrait');
  portraitElement.setAttribute('aria-label', `Photo de ${photographer.name}`);

  photographHeaderDiv.appendChild(infoWrapper);
  photographHeaderDiv.appendChild(contactButton);
  photographHeaderDiv.appendChild(portraitElement);

  // Ajout de la div info-container à la div photograph-header
  photographHeaderDiv.appendChild(infoContainer);
}

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
      incrementPhotographerInfo(photographer);
    }
  })
  .catch(error => {
    console.log('Une erreur s\'est produite lors de la récupération du fichier JSON :', error);
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
        // Filtrer les médias pour obtenir ceux du photographe
        const photographerMedia = data.media.filter(media => media.photographerId === parseInt(photographerId));

        // Calculer la somme des likes
        const totalLikes = photographerMedia.reduce((accumulator, currentValue) => accumulator + currentValue.likes, 0);

        // Créer la div .tgm pour afficher les données
        const tgmDiv = document.createElement('div');
        tgmDiv.classList.add('tgm');

        // Construire le contenu à afficher
        const content = `
            
                <p class="totalLikes">${totalLikes} ❤</p>  <p> ${photographer.price}€ /jour </p>
               
   
            `;

        // Ajouter le contenu à la div .tgm
        tgmDiv.innerHTML = content;

        // Ajouter la div .tgm au DOM
        document.body.appendChild(tgmDiv);
      } else {
        console.log('Photographer not found');
      }
    })
    .catch(error => {
      console.log('An error occurred:', error);
    });
}

// Appeler la fonction pour afficher les données des photographes
displayPhotographersData();