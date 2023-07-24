import Article from '../module/articlemodule.js';

export default class FilterSection {
  constructor() {
    this.filterSection = document.createElement('nav');
    this.filterSection.classList.add('filter-section');

   
    this.filterLabel = document.createElement('label');
    this.filterLabel.setAttribute('for', 'filter-select');
    this.filterLabel.textContent = 'Trier par :';

    this.dropdownContainer = document.createElement('nav');
    this.dropdownContainer.classList.add('dropdown');

    this.dropdownLabel = document.createElement('span');
    this.dropdownLabel.classList.add('dropdown-label');
    this.dropdownLabel.textContent = 'Date';
    this.dropdownLabel.setAttribute('tabindex', '0');
    this.dropdownLabel.setAttribute('aria-label', 'Option de tri Date');

    this.dropdownIcon = document.createElement('span');
    this.dropdownIcon.classList.add('dropdown-icon');

    this.arrowUp = document.createElement('img');
    this.arrowUp.src = './assets/images/Vectorarrowup.png';
    this.arrowUp.classList.add('arrowUp');
    this.dropdownIcon.appendChild(this.arrowUp);

    this.dropdownOptions = document.createElement('ul');
    this.dropdownOptions.classList.add('dropdown-options');

    this.dropdownOptionDate = document.createElement('li');
    this.dropdownOptionDate.textContent = 'Date';
    this.dropdownOptionDate.setAttribute('data-value', 'date');
    this.dropdownOptionDate.classList.add('selected');
    this.dropdownOptionDate.setAttribute('tabindex', '0');
    this.dropdownOptionDate.setAttribute('aria-posinset', '0');
    this.dropdownOptionDate.setAttribute('aria-setsize', '0');
    this.dropdownOptionDate.setAttribute('aria-label', 'date');

    this.dropdownOptionTitle = document.createElement('li');
    this.dropdownOptionTitle.textContent = 'Titre';
    this.dropdownOptionTitle.setAttribute('data-value', 'title');
    this.dropdownOptionTitle.setAttribute('tabindex', '0');
    this.dropdownOptionTitle.setAttribute('aria-posinset', '0');
    this.dropdownOptionTitle.setAttribute('aria-setsize', '0');
    this.dropdownOptionTitle.setAttribute('aria-label', 'title');

    this.dropdownOptionPopularity = document.createElement('li');
    this.dropdownOptionPopularity.textContent = 'Popularité';
    this.dropdownOptionPopularity.setAttribute('data-value', 'popularity');
    this.dropdownOptionPopularity.setAttribute('tabindex', '0');
    this.dropdownOptionPopularity.setAttribute('aria-posinset', '0');
    this.dropdownOptionPopularity.setAttribute('aria-setsize', '0');
    this.dropdownOptionPopularity.setAttribute('aria-label', 'popularity');

    this.dropdownOptions.appendChild(this.dropdownOptionDate);
    this.dropdownOptions.appendChild(this.dropdownOptionTitle);
    this.dropdownOptions.appendChild(this.dropdownOptionPopularity);

    this.dropdownContainer.appendChild(this.dropdownLabel);
    this.dropdownContainer.appendChild(this.dropdownIcon);
    this.dropdownContainer.appendChild(this.dropdownOptions);

    this.filterSection.appendChild(this.filterLabel);
    this.filterSection.appendChild(this.dropdownContainer);
   
 

  }

  handleFilterChange() {
    const selectedValue = this.dropdownOptions.querySelector('.selected').getAttribute('data-value');

    if (selectedValue === 'date') {
      this.filterMediaByDate(filteredMedia);
    } else if (selectedValue === 'title') {
      this.filterMediaByTitle(filteredMedia);
    } else if (selectedValue === 'popularity') {
      this.filterMediaByPopularity(filteredMedia);
    }
  }

  filterMediaByDate(filteredMedia) { 
    filteredMedia.sort((a, b) => new Date(a.date) - new Date(b.date));
    this.renderSlides(filteredMedia); // Passez 'filteredMedia' comme argument
  }
  
  filterMediaByTitle(filteredMedia) {
    filteredMedia.sort((a, b) => a.title.localeCompare(b.title));
    this.renderSlides(filteredMedia); // Passez 'filteredMedia' comme argument
  }
  
  filterMediaByPopularity(filteredMedia) { 
    filteredMedia.sort((a, b) => b.likes - a.likes);
    this.renderSlides(filteredMedia); // Passez 'filteredMedia' comme argument
  }


  addFilterSection(filteredMedia) {
 

    // Access the elements from the FilterSection instance
    const dropdownContainer = this.dropdownContainer;
    const dropdownOptions = this.dropdownOptions;
    const dropdownIcon = this.dropdownIcon;
    const dropdownLabel = this.dropdownLabel;

    // Handle filter change event
    const handleFilterChange = () => {
      const selectedValue = dropdownOptions.querySelector('.selected').getAttribute('data-value');
  
      if (selectedValue === 'date') {
        this.filterMediaByDate(filteredMedia);
      } else if (selectedValue === 'title') {
        this.filterMediaByTitle(filteredMedia);
      } else if (selectedValue === 'popularity') {
        this.filterMediaByPopularity(filteredMedia);
      }
    };

    // Toggle dropdown visibility and update selected value
    dropdownContainer.addEventListener('click', function () {
      dropdownIcon.classList.toggle('dropdown-anim');
      dropdownOptions.classList.toggle('show');
    });

    dropdownOptions.addEventListener('keydown', (event) => {
      if (event.key === 'Enter') {
        const selectedOption = dropdownOptions.querySelector('.selected');
        const selectedValue = event.target.getAttribute('data-value');
        selectedOption.classList.remove('selected');
        event.target.classList.add('selected');
        dropdownLabel.textContent = event.target.textContent;
        handleFilterChange();
      }
    });

    dropdownOptions.addEventListener('click', function (event) {
      if (event.target.tagName === 'LI') {
        const selectedOption = dropdownOptions.querySelector('.selected');
        const selectedValue = event.target.getAttribute('data-value');

        if (selectedOption !== event.target) {
          selectedOption.classList.remove('selected');
          event.target.classList.add('selected');
          dropdownLabel.textContent = event.target.textContent;
          handleFilterChange();
        }
      }
    });

    // Close dropdown on click outside
    document.addEventListener('click', function (event) {
      if (!dropdownContainer.contains(event.target)) {
        dropdownIcon.classList.remove('dropdown-anim');
        dropdownOptions.classList.remove('show');
      }
    });

    // Show dropdown options on keyboard navigation
    dropdownContainer.addEventListener('keydown', function (event) {
      if (event.code === 'Space' || event.code === 'Enter') {
        event.preventDefault();
        dropdownIcon.classList.toggle('dropdown-anim');
        dropdownOptions.classList.toggle('show');
        dropdownOptions.focus();
      }
    });

    // Handle keyboard navigation within dropdown options
    dropdownOptions.addEventListener('keydown', function (event) {
      const selectedOption = dropdownOptions.querySelector('.selected');
      const firstOption = dropdownOptions.firstElementChild;
      const lastOption = dropdownOptions.lastElementChild;

      if (event.code === 'ArrowUp' && selectedOption !== firstOption) {
        event.preventDefault();
        selectedOption.classList.remove('selected');
        selectedOption.previousElementSibling.classList.add('selected');
        dropdownLabel.textContent = selectedOption.previousElementSibling.textContent;
        handleFilterChange();
      }

      if (event.code === 'ArrowDown' && selectedOption !== lastOption) {
        event.preventDefault();
        selectedOption.classList.remove('selected');
        selectedOption.nextElementSibling.classList.add('selected');
        dropdownLabel.textContent = selectedOption.nextElementSibling.textContent;
        handleFilterChange();
      }

      if (event.code === 'Escape') {
        dropdownIcon.classList.remove('dropdown-anim');
        dropdownOptions.classList.remove('show');
      }
    });

    // Append the filterSection to the DOM
    const sliderContainer = document.querySelector('.photo_section');
    sliderContainer.parentNode.insertBefore(this.filterSection, sliderContainer);
  }


  getFilterSection() {
    return this.filterSection; // Assurez-vous que filterSection est correctement initialisé dans le constructeur
  }

  renderSlides(filteredMedia) {
    const sliderContainer = document.querySelector('.photo_section');
    const existingSlides = Array.from(sliderContainer.children);
  
    // Supprimer les slides existants
    existingSlides.forEach(slide => slide.remove());
  
    // Parcourez chaque élément 'media' dans 'filteredMedia'
    filteredMedia.forEach((media, index) => {
      // Créez une instance de la classe Article ici
      const articleInstance = new Article(media);
  
      // Appelez showSlide depuis l'instance de la classe Article
      articleInstance.showSlide(index, media, filteredMedia);
  
      // Ajouter l'élément de l'article au conteneur du diaporama
      articleInstance.addToSliderContainer(sliderContainer);
    });
  }
  
}