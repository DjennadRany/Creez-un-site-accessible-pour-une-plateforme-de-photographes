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
      const title = document.createElement('p');
      const likes = document.createElement('p');
      const date = document.createElement('span');
      const price = document.createElement('span');
      const prblock = document.createElement('div');
      likes.classList.add('lowgne');
      title.classList.add('ligne');
      prblock.classList.add('prblock')
      title.textContent = media.title;
      likes.textContent = media.likes + '❤';

      if (media.image) {
        const image = document.createElement('img');
        image.src = `./assets/${media.photographerId}/${media.image}`;
        image.alt = media.title;
        image.setAttribute('aria-label', `Image : ${filteredMedia[index].title}`);
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
      article.appendChild(prblock);
      prblock.appendChild(title);
      prblock.appendChild(likes);
      prblock.appendChild(date);
      prblock.appendChild(price);

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
      modalImage.setAttribute('aria-label', `Image : ${filteredMedia[index].title}`);

      const modalVideo = document.createElement('video');
      modalVideo.src = `./assets/${filteredMedia[index].photographerId}/${filteredMedia[index].video}`;
      modalVideo.poster = `./assets/${filteredMedia[index].photographerId}/${filteredMedia[index].videoPoster}`;
      modalVideo.alt = filteredMedia[index].title;
      modalVideo.setAttribute('aria-label', `Video : ${filteredMedia[index].title}`);
      modalVideo.controls = true;
      modalVideo.autoplay = true;

      const modalTitle = document.createElement('div');
      const modalTitlesav = document.createElement('div');
      modalTitle.textContent = filteredMedia[index].title;
      modalTitle.classList.add('txt-img-modal');

      const prevButton = document.createElement('button');


      prevButton.classList.add('prev-button');

      prevButton.addEventListener('click', () => {
        const newIndex = (index - 1 + filteredMedia.length) % filteredMedia.length;
        closeModal();
        openImageModal(newIndex);
      });

      const iconButtonp = document.createElement('img');
      iconButtonp.src = './assets/images/Vectorpreced.svg';
      iconButtonp.classList.add('preced');
      prevButton.appendChild(iconButtonp);

      const nextButton = document.createElement('button');

      nextButton.classList.add('next-button');

      nextButton.addEventListener('click', () => {
        const newIndex = (index + 1) % filteredMedia.length;
        closeModal();
        openImageModal(newIndex);
      });
      const iconButtons = document.createElement('img');
      iconButtons.src = './assets/images/Vectorsuivant.svg';
      iconButtons.classList.add('suivan');
      nextButton.appendChild(iconButtons);



      const closeButton = document.createElement('button');

      closeButton.classList.add('close-button');
      closeButton.classList.add('fa-solid');
      closeButton.classList.add('fa-xmark');
      closeButton.addEventListener('click', () => {
        closeModal();
      });



      if (filteredMedia[index].video) {

        modal.appendChild(prevButton);
        modal.appendChild(modalVideo);
        modal.appendChild(closeButton);
        modal.appendChild(nextButton);
        modal.appendChild(modalTitlesav);
        modal.appendChild(modalTitle);
      } else {


        modal.appendChild(prevButton);
        modal.appendChild(modalImage);
        modal.appendChild(closeButton);
        modal.appendChild(nextButton);
        modal.appendChild(modalTitlesav);
        modal.appendChild(modalTitle);
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

    function addFilterSection() {
      // Handle filter change event
      function handleFilterChange() {
        const selectedValue = dropdownOptions.querySelector('.selected').getAttribute('data-value');

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
      const filterSection = document.createElement('nav');
      filterSection.classList.add('filter-section');

      const filterLabel = document.createElement('label');
      filterLabel.setAttribute('for', 'filter-select');
      filterLabel.textContent = 'Trier par :';

      const dropdownContainer = document.createElement('div');
      dropdownContainer.classList.add('dropdown');

      const dropdownLabel = document.createElement('span');
      dropdownLabel.classList.add('dropdown-label');
      dropdownLabel.textContent = 'Date';

      const dropdownIcon = document.createElement('span');
      dropdownIcon.classList.add('dropdown-icon');

      const arrowUp = document.createElement('img');
      arrowUp.src = './assets/images/Vectorarrowup.png';
      arrowUp.classList.add('arrowUp');
      dropdownIcon.appendChild(arrowUp);

      const dropdownOptions = document.createElement('ul');
      dropdownOptions.classList.add('dropdown-options');

      const dropdownOptionDate = document.createElement('li');
      dropdownOptionDate.textContent = 'Date';
      dropdownOptionDate.setAttribute('data-value', 'date');
      dropdownOptionDate.classList.add('selected');

      const dropdownOptionTitle = document.createElement('li');
      dropdownOptionTitle.textContent = 'Titre';
      dropdownOptionTitle.setAttribute('data-value', 'title');

      const dropdownOptionPopularity = document.createElement('li');
      dropdownOptionPopularity.textContent = 'Popularité';
      dropdownOptionPopularity.setAttribute('data-value', 'popularity');



      dropdownOptions.appendChild(dropdownOptionDate);
      dropdownOptions.appendChild(dropdownOptionTitle);
      dropdownOptions.appendChild(dropdownOptionPopularity);

      dropdownContainer.appendChild(dropdownLabel);
      dropdownContainer.appendChild(dropdownIcon);
      dropdownContainer.appendChild(dropdownOptions);

      filterSection.appendChild(filterLabel);
      filterSection.appendChild(dropdownContainer);

      const sliderContainer = document.querySelector('.photographer_section');
      sliderContainer.parentNode.insertBefore(filterSection, sliderContainer);

      // Toggle dropdown visibility and update selected value
      dropdownContainer.addEventListener('mouseenter', function () {
        dropdownIcon.classList.toggle('dropdown-anim');
        dropdownOptions.classList.toggle('show');


      });

   
dropdownOptions.addEventListener('click', function (event) {
  if (event.target.tagName === 'LI') {
    const selectedOption = dropdownOptions.querySelector('.selected');
    const selectedValue = event.target.getAttribute('data-value');

    if (selectedOption !== event.target) {
      selectedOption.classList.remove('selected'); // Retire la classe 'selected' de l'élément précédemment sélectionné
      event.target.classList.add('selected'); // Ajoute la classe 'selected' à l'élément nouvellement sélectionné
      dropdownOptions.appendChild(selectedOption); 
    }

    event.target.classList.add('selected');
    const selectedText = event.target.textContent;
    dropdownLabel.textContent = selectedText;
    handleFilterChange();
    dropdownOptions.classList.remove('show');
  }

  dropdownIcon.classList.remove('dropdown-anim');
});
    }






    // Render initial slides
    filteredMedia.forEach((_media, index) => {
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
          
              <p>${totalLikes} ❤</p>  <p> ${photographer.price}€ /jour </p>
             
 
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