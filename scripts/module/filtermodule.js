class FilterSection {
  constructor() {
    this.filteredMedia = []; // Placeholder for filtered media data

    // Create filter section elements
    const filterSection = document.createElement('nav');
    filterSection.classList.add('filter-section');

    const filterLabel = document.createElement('label');
    filterLabel.setAttribute('for', 'filter-select');
    filterLabel.textContent = 'Trier par :';

    const dropdownContainer = document.createElement('nav');
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
    dropdownOptions.setAttribute('tabindex', '0');

    const dropdownOptionDate = document.createElement('li');
    dropdownOptionDate.textContent = 'Date';
    dropdownOptionDate.setAttribute('data-value', 'date');
    dropdownOptionDate.classList.add('selected');
    dropdownOptionDate.setAttribute('tabindex', '0');

    const dropdownOptionTitle = document.createElement('li');
    dropdownOptionTitle.textContent = 'Titre';
    dropdownOptionTitle.setAttribute('data-value', 'title');
    dropdownOptionTitle.setAttribute('tabindex', '0');

    const dropdownOptionPopularity = document.createElement('li');
    dropdownOptionPopularity.textContent = 'Popularité';
    dropdownOptionPopularity.setAttribute('data-value', 'popularity');
    dropdownOptionPopularity.setAttribute('tabindex', '0');

    dropdownOptions.appendChild(dropdownOptionDate);
    dropdownOptions.appendChild(dropdownOptionTitle);
    dropdownOptions.appendChild(dropdownOptionPopularity);

    dropdownContainer.appendChild(dropdownLabel);
    dropdownContainer.appendChild(dropdownIcon);
    dropdownContainer.appendChild(dropdownOptions);

    filterSection.appendChild(filterLabel);
    filterSection.appendChild(dropdownContainer);

    // Ajouter l'élément filterSection au DOM
    const sliderContainer = document.querySelector('.photo_section');
    sliderContainer.parentNode.insertBefore(filterSection, sliderContainer);

    // Bind event handlers to class instance
    this.handleFilterChange = this.handleFilterChange.bind(this);
    this.filterMediaByDate = this.filterMediaByDate.bind(this);
    this.filterMediaByTitle = this.filterMediaByTitle.bind(this);
    this.filterMediaByPopularity = this.filterMediaByPopularity.bind(this);

    // Attach event listeners
    dropdownContainer.addEventListener('mouseenter', () => {
      dropdownIcon.classList.toggle('dropdown-anim');
      dropdownOptions.classList.toggle('show');
    });

    dropdownOptions.addEventListener('click', (event) => {
      if (event.target.tagName === 'LI') {
        const selectedOption = dropdownOptions.querySelector('.selected');
        const selectedValue = event.target.getAttribute('data-value');

        if (selectedOption !== event.target) {
          selectedOption.classList.remove('selected');
          event.target.classList.add('selected');
          dropdownLabel.textContent = event.target.textContent;
          this.handleFilterChange(selectedValue);
        }
      }
    });

    document.addEventListener('click', (event) => {
      if (!dropdownContainer.contains(event.target)) {
        dropdownIcon.classList.remove('dropdown-anim');
        dropdownOptions.classList.remove('show');
      }
    });

    dropdownContainer.addEventListener('keydown', (event) => {
      if (event.code === 'Space' || event.code === 'Enter') {
        event.preventDefault();
        dropdownIcon.classList.toggle('dropdown-anim');
        dropdownOptions.classList.toggle('show');
        dropdownOptions.focus();
      }
    });

    dropdownOptions.addEventListener('keydown', (event) => {
      const selectedOption = dropdownOptions.querySelector('.selected');
      const firstOption = dropdownOptions.firstElementChild;
      const lastOption = dropdownOptions.lastElementChild;

      if (event.code === 'ArrowUp' && selectedOption !== firstOption) {
        event.preventDefault();
        selectedOption.classList.remove('selected');
        selectedOption.previousElementSibling.classList.add('selected');
        dropdownLabel.textContent = selectedOption.previousElementSibling.textContent;
        this.handleFilterChange(selectedOption.previousElementSibling.getAttribute('data-value'));
      }

      if (event.code === 'ArrowDown' && selectedOption !== lastOption) {
        event.preventDefault();
        selectedOption.classList.remove('selected');
        selectedOption.nextElementSibling.classList.add('selected');
        dropdownLabel.textContent = selectedOption.nextElementSibling.textContent;
        this.handleFilterChange(selectedOption.nextElementSibling.getAttribute('data-value'));
      }

      if (event.code === 'Escape') {
        dropdownIcon.classList.remove('dropdown-anim');
        dropdownOptions.classList.remove('show');
      }
    });
  }

  handleFilterChange(selectedValue) {
    if (selectedValue === 'date') {
      this.filterMediaByDate();
    } else if (selectedValue === 'title') {
      this.filterMediaByTitle();
    } else if (selectedValue === 'popularity') {
      this.filterMediaByPopularity();
    }
  }

  filterMediaByDate() {
    this.filteredMedia.sort((a, b) => new Date(a.date) - new Date(b.date));
    this.renderSlides();
  }

  filterMediaByTitle() {
    this.filteredMedia.sort((a, b) => a.title.localeCompare(b.title));
    this.renderSlides();
  }

  filterMediaByPopularity() {
    this.filteredMedia.sort((a, b) => b.likes - a.likes);
    this.renderSlides();
  }

  renderSlides() {
    // Implementation of the renderSlides() method
    // ...
  }
}

// Utilisation de la classe FilterSection
const filterSection = new FilterSection();
