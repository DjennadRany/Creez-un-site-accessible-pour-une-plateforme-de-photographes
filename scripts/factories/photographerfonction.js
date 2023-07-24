import Article from '../module/articlemodule.js';
import FilterSection from '../module/filtermodule.js';

async function getPhotographers() {
  let filterContainer = null; // Déclarer filterContainer en dehors du bloc try

  try {
    const response = await fetch('./data/photographers.json');
    const data = await response.json();

    // Get the photographer ID from the URL
    const url = window.location.href;
    const id = url.split("#")[1];

    // Filter media based on photographer ID
    const filteredMedia = data.media.filter(media => media.photographerId === parseInt(id));

    const sliderContainer = document.querySelector('.photo_section');
    const filterSectionInstance = new FilterSection();
    filterSectionInstance.addFilterSection(filteredMedia); // Ajoutez filteredMedia comme argument

    filteredMedia.forEach((media, index) => {
      const articleInstance = new Article(media);
      articleInstance.addToSliderContainer(sliderContainer);
      articleInstance.showSlide(index, media, filteredMedia);
    });

    // Assurez-vous que filterContainer est défini avant d'y accéder
    filterContainer = document.querySelector('.photographer_section');
    if (filterContainer) {
      filterContainer.appendChild(filterSectionInstance.getFilterSection());
    }

  } catch (error) {
    console.error('Error:', error);
  }
}


// Appel de la fonction principale
getPhotographers();
