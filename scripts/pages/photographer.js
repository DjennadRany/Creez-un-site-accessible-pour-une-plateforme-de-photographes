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

  const taglineElement = document.createElement('p');
  taglineElement.textContent = `${photographer.tagline}`;

  const contactButton = document.createElement('button');
  contactButton.classList.add('contact_button');
  contactButton.textContent = 'Contactez-moi';
  contactButton.onclick = displayModal;
  

 // Create the back button
 const backButton = document.createElement('button');
 backButton.textContent = 'Retour';
 backButton.classList.add('back-button');
 backButton.addEventListener('click', () => {
   window.location.href = './';
 });

 // Append the back button to the photographer section
 const photographerSection = document.querySelector('.photograph-header');
 photographerSection.appendChild(backButton);
  
  // Ajout des éléments dans la div info-wrapper
  infoWrapper.appendChild(nameElement);
  infoWrapper.appendChild(cityElement);
  infoWrapper.appendChild(countryElement);
  infoWrapper.appendChild(taglineElement);
  
    // Création de l'élément pour afficher la photo du photographe
    const portraitElement = document.createElement('img');
    portraitElement.src = `assets/photographers/${photographer.portrait}`;
    portraitElement.alt = photographer.name;
    portraitElement.classList.add('portrait');

  // Ajout des éléments à la div info-container

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


  async function getPhotographers() {
    try {
      const response = await fetch('./data/photographers.json');
      if (!response.ok) {
        throw new Error('Looks like there was a problem. Status Code: ' + response.status);
      }
      const data = await response.json();
      console.log(data.photographers);
  
      // Get the photographer ID from the URL
      const url = window.location.href;
      const id = url.split("#")[1];
      console.log(id);
  
      // Filter media based on photographer ID
      const filteredMedia = data.media.filter(media => media.photographerId === parseInt(id));
      console.log(filteredMedia);
  
      // Function to render a slide
      function showSlide(index) {
        const media = filteredMedia[index];
  
        const article = document.createElement('div');
        article.classList.add('blockouf');
        const figure = document.createElement('figure');
        const title = document.createElement('h2');
        const likes = document.createElement('span');
        const date = document.createElement('span');
        const price = document.createElement('span');
  
        title.textContent = media.title;
        likes.textContent = 'Nombre de likes : ' + media.likes;
        date.textContent = media.date;
        price.textContent = media.price + ' €';
  
        if (media.image) {
          const image = document.createElement('img');
          image.src = `./assets/${media.photographerId}/${media.image}`;
          image.alt = media.title;
          figure.appendChild(image);
        } else {
          const blackSquare = document.createElement('div');
          blackSquare.classList.add('black-square');
  
          const playIcon = document.createElement('span');
          playIcon.classList.add('play-icon');
          playIcon.textContent = '▶';
  
          blackSquare.appendChild(playIcon);
          figure.appendChild(blackSquare);
        }
  
        if (media.video && media.videoPoster) {
          const video = document.createElement('video');
          video.src = `./assets/${media.photographerId}/${media.video}`;
          video.poster = `./assets/${media.photographerId}/${media.videoPoster}`;
          video.alt = media.title;
          figure.appendChild(video);
        }
  
        article.appendChild(figure);
        article.appendChild(title);
        article.appendChild(likes);
        article.appendChild(date);
        article.appendChild(price);
  
        figure.addEventListener('click', () => {
          openImageModal(index);
        });
  
        const sliderContainer = document.querySelector('.photographer_section');
        sliderContainer.appendChild(article);
      }
  
      // Render all the slides
      function renderSlides() {
        const sliderContainer = document.querySelector('.photographer_section');
        sliderContainer.innerHTML = '';
  
        filteredMedia.forEach((media, index) => {
          showSlide(index);
        });
      }
  
      // Function to open the image modal
      function openImageModal(index) {
        const existingModal = document.querySelector('.image-modal');
        if (existingModal) {
          closeModal();
        }
  
        const modal = document.createElement('div');
        modal.classList.add('image-modal');
  
        const modalImage = document.createElement('img');
        modalImage.src = `./assets/${filteredMedia[index].photographerId}/${filteredMedia[index].image}`;
        modalImage.alt = filteredMedia[index].title;
  
        const modalVideo = document.createElement('video');
        modalVideo.src = `./assets/${filteredMedia[index].photographerId}/${filteredMedia[index].video}`;
        modalVideo.poster = `./assets/${filteredMedia[index].photographerId}/${filteredMedia[index].videoPoster}`;
        modalVideo.alt = filteredMedia[index].title;
        modalVideo.controls = true;
        modalVideo.autoplay = true;
  
        const prevButton = document.createElement('button');
        prevButton.textContent = 'Précédent';
        prevButton.classList.add('prev-button');
        prevButton.addEventListener('click', () => {
          const newIndex = (index - 1 + filteredMedia.length) % filteredMedia.length;
          closeModal();
          openImageModal(newIndex);
        });
  
        const nextButton = document.createElement('button');
        nextButton.textContent = 'Suivant';
        nextButton.classList.add('next-button');
        nextButton.addEventListener('click', () => {
          const newIndex = (index + 1) % filteredMedia.length;
          closeModal();
          openImageModal(newIndex);
        });
  
        const closeButton = document.createElement('button');
        closeButton.textContent = 'Fermer';
        closeButton.classList.add('close-button');
        closeButton.addEventListener('click', () => {
          closeModal();
        });
  
        modal.appendChild(closeButton);
        modal.appendChild(prevButton);
        modal.appendChild(nextButton);
  
        if (filteredMedia[index].video) {
          modal.appendChild(modalVideo);
        } else {
          modal.appendChild(modalImage);
        }
  
        document.body.appendChild(modal);
      }
  
      // Function to close the image modal
      function closeModal() {
        const modal = document.querySelector('.image-modal');
        if (modal) {
          modal.remove();
        }
      }
    

      // Add the filter section
      function addFilterSection() {
        // Handle filter change event
        function handleFilterChange() {
          const selectElement = document.getElementById('filter-select');
          const selectedValue = selectElement.value;
  
          if (selectedValue === 'date') {
            filterMediaByDate();
          } else if (selectedValue === 'title') {
            filterMediaByTitle();
          } else if (selectedValue === 'popularity') {
            filterMediaByPopularity();
          }
        }
  
        // Filter media by date
        function filterMediaByDate() {
          filteredMedia.sort((a, b) => new Date(a.date) - new Date(b.date));
          renderSlides();
        }
  
        // Filter media by title
        function filterMediaByTitle() {
          filteredMedia.sort((a, b) => a.title.localeCompare(b.title));
          renderSlides();
        }
  
        // Filter media by popularity
        function filterMediaByPopularity() {
          filteredMedia.sort((a, b) => b.likes - a.likes);
          renderSlides();
        }
  
        // Create filter section elements
        const filterSection = document.createElement('div');
        filterSection.classList.add('filter-section');
  
        const filterLabel = document.createElement('label');
        filterLabel.setAttribute('for', 'filter-select');
        filterLabel.textContent = 'Filtrer par :';
  
        const filterSelect = document.createElement('select');
        filterSelect.setAttribute('id', 'filter-select');
  
        const dateOption = document.createElement('option');
        dateOption.setAttribute('value', 'date');
        dateOption.textContent = 'Date';
  
        const titleOption = document.createElement('option');
        titleOption.setAttribute('value', 'title');
        titleOption.textContent = 'Titre';
  
        const popularityOption = document.createElement('option');
        popularityOption.setAttribute('value', 'popularity');
        popularityOption.textContent = 'Popularité';
  
        filterSelect.appendChild(dateOption);
        filterSelect.appendChild(titleOption);
        filterSelect.appendChild(popularityOption);
  
        filterSection.appendChild(filterLabel);
        filterSection.appendChild(filterSelect);
  
        // Insert filter section before the slider container
        const sliderContainer = document.querySelector('.photographer_section');
        sliderContainer.parentNode.insertBefore(filterSection, sliderContainer);
  
        // Add event listener for filter change
        filterSelect.addEventListener('change', handleFilterChange);
      }
  
      // Render initial slides
      filteredMedia.forEach((media, index) => {
        showSlide(index);
      });
  
      // Add the filter section
      addFilterSection();
  
    
    } catch (error) {
      console.error(error);
    }
  }
  
  // Call the main function
  getPhotographers();
  