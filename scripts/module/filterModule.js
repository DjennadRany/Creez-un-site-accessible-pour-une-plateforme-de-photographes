import Article from './articleModule.js ';

export default class FilterSection {
  constructor() {
    // Create the filter section container
    this.filterSection = document.createElement('nav');
    this.filterSection.classList.add('filterSection');

    // Create the label for the filter dropdown
    this.filterLabel = document.createElement('label');
    this.filterLabel.setAttribute('for', 'filter-select');
    this.filterLabel.textContent = 'Trier par :';

    // Create the dropdown container
    this.dropdownContainer = document.createElement('nav');
    this.dropdownContainer.classList.add('dropdown');

    // Create the label for the selected option in the dropdown
    this.dropdownLabel = document.createElement('span');
    this.dropdownLabel.classList.add('dropdownLabel');
    this.dropdownLabel.textContent = 'Date';
    this.dropdownLabel.setAttribute('tabindex', '0');
    this.dropdownLabel.setAttribute('aria-label', 'Option de tri Date');

    // Create the dropdown icon
    this.dropdownIcon = document.createElement('span');
    this.dropdownIcon.classList.add('dropdownIcon');

    // Create the arrow-up icon for the dropdown
    this.arrowUp = document.createElement('img');
    this.arrowUp.src = './assets/images/Vectorarrowup.png';
    this.arrowUp.classList.add('arrowUp');
    this.arrowUp.setAttribute('alt', 'iconFilter');
    this.dropdownIcon.appendChild(this.arrowUp);

    // Create the dropdown options list
    this.dropdownOptions = document.createElement('ul');
    this.dropdownOptions.classList.add('dropdownOptions');

    // Create the dropdown option for sorting by Date
    this.dropdownOptionDate = document.createElement('li');
    this.dropdownOptionDate.textContent = 'Date';
    this.dropdownOptionDate.setAttribute('data-value', 'date');
    this.dropdownOptionDate.classList.add('selected');
    this.dropdownOptionDate.setAttribute('tabindex', '0');
    this.dropdownOptionDate.setAttribute('aria-posinset', '0');
    this.dropdownOptionDate.setAttribute('aria-setsize', '0');
    this.dropdownOptionDate.setAttribute('aria-label', 'date');

    // Create the dropdown option for sorting by Title
    this.dropdownOptionTitle = document.createElement('li');
    this.dropdownOptionTitle.textContent = 'Title';
    this.dropdownOptionTitle.setAttribute('data-value', 'title');
    this.dropdownOptionTitle.setAttribute('tabindex', '0');
    this.dropdownOptionTitle.setAttribute('aria-posinset', '0');
    this.dropdownOptionTitle.setAttribute('aria-setsize', '0');
    this.dropdownOptionTitle.setAttribute('aria-label', 'title');

    // Create the dropdown option for sorting by Popularity
    this.dropdownOptionPopularity = document.createElement('li');
    this.dropdownOptionPopularity.textContent = 'Popularity';
    this.dropdownOptionPopularity.setAttribute('data-value', 'popularity');
    this.dropdownOptionPopularity.setAttribute('tabindex', '0');
    this.dropdownOptionPopularity.setAttribute('aria-posinset', '0');
    this.dropdownOptionPopularity.setAttribute('aria-setsize', '0');
    this.dropdownOptionPopularity.setAttribute('aria-label', 'popularity');

    // Append the dropdown options to the dropdown container
    this.dropdownOptions.appendChild(this.dropdownOptionDate);
    this.dropdownOptions.appendChild(this.dropdownOptionTitle);
    this.dropdownOptions.appendChild(this.dropdownOptionPopularity);

    // Append elements to the dropdown container
    this.dropdownContainer.appendChild(this.dropdownLabel);
    this.dropdownContainer.appendChild(this.dropdownIcon);
    this.dropdownContainer.appendChild(this.dropdownOptions);

    // Append elements to the filter section container
    this.filterSection.appendChild(this.filterLabel);
    this.filterSection.appendChild(this.dropdownContainer);

    this.selectedValue =[];
    this.filteredMedia = [];
  }

  // Handle the filter change event
  handleFilterChange() {
    this.selectedValue  = this.dropdownOptions.querySelector('.selected').getAttribute('data-value');

    if (this.selectedValue  === 'date') {
      this.filterMediaByDate(this.filteredMedia );
    } else if (this.selectedValue  === 'title') {
      this.filterMediaByTitle(this.filteredMedia );
    } else if (this.selectedValue  === 'popularity') {
      this.filterMediaByPopularity(this.filteredMedia );
    }
  }

  // Filter media by Date
  filterMediaByDate(filteredMedia) {
    filteredMedia.sort((a, b) => new Date(a.date) - new Date(b.date));
    this.renderSlides(filteredMedia); // Pass 'filteredMedia' as an argument
  }

  // Filter media by Title
  filterMediaByTitle(filteredMedia) {
    filteredMedia.sort((a, b) => a.title.localeCompare(b.title));
    this.renderSlides(filteredMedia); // Pass 'filteredMedia' as an argument
  }

  // Filter media by Popularity
  filterMediaByPopularity(filteredMedia) {
    filteredMedia.sort((a, b) => b.likes - a.likes);
    this.renderSlides(filteredMedia); // Pass 'filteredMedia' as an argument
  }

  // Add the filter section to the DOM
  addFilterSection(filteredMedia) {
    // Access the elements from the FilterSection instance
    const dropdownContainer = this.dropdownContainer;
    const dropdownOptions = this.dropdownOptions;
    const dropdownIcon = this.dropdownIcon;
    const dropdownLabel = this.dropdownLabel;

    // Handle filter change event
    const handleFilterChange = () => {
      this.selectedValue  = dropdownOptions.querySelector('.selected').getAttribute('data-value');

      if (this.selectedValue  === 'date') {
        this.filterMediaByDate(filteredMedia);
      } else if (this.selectedValue  === 'title') {
        this.filterMediaByTitle(filteredMedia);
      } else if (this.selectedValue  === 'popularity') {
        this.filterMediaByPopularity(filteredMedia);
      }
    };

    // Toggle dropdown visibility and update selected value
    dropdownContainer.addEventListener('click', function () {
      dropdownIcon.classList.toggle('dropdownAnim');
      dropdownOptions.classList.toggle('show');
    });

    dropdownOptions.addEventListener('keydown', (event) => {
      if (event.key === 'Enter') {
        const selectedOption = dropdownOptions.querySelector('.selected');
        this.selectedValue  = event.target.getAttribute('data-value');
        selectedOption.classList.remove('selected');
        event.target.classList.add('selected');
        dropdownLabel.textContent = event.target.textContent;
        handleFilterChange();
      }
    });

    dropdownOptions.addEventListener('click', function (event) {
      if (event.target.tagName === 'LI') {
        const selectedOption = dropdownOptions.querySelector('.selected');
        this.selectedValue  = event.target.getAttribute('data-value');

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
        dropdownIcon.classList.remove('dropdownAnim');
        dropdownOptions.classList.remove('show');
      }
    });

    // Show dropdown options on keyboard navigation
    dropdownContainer.addEventListener('keydown', function (event) {
      if (event.code === 'Space' || event.code === 'Enter') {
        event.preventDefault();
        dropdownIcon.classList.toggle('dropdownAnim');
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
        dropdownIcon.classList.remove('dropdownAnim');
        dropdownOptions.classList.remove('show');
      }
    });

    // Append the filterSection to the DOM
    const sliderContainer = document.querySelector('.photoSection');
    sliderContainer.parentNode.insertBefore(this.filterSection, sliderContainer);
  }

  // Get the filter section element
  getFilterSection() {
    return this.filterSection; // Make sure filterSection is correctly initialized in the constructor
  }

  // Render slides based on the filtered media
  renderSlides(filteredMedia) {
    const sliderContainer = document.querySelector('.photoSection');
    const existingSlides = Array.from(sliderContainer.children);

    // Remove existing slides
    existingSlides.forEach(slide => slide.remove());

    // Loop through each 'media' element in 'filteredMedia'
    filteredMedia.forEach((media, index) => {
      // Create an instance of the Article class here
      const articleInstance = new Article(media);

      // Call showSlide from the Article class instance
      articleInstance.showSlide(index, media, filteredMedia);

      // Add the article element to the slideshow container
      articleInstance.addToSliderContainer(sliderContainer);
    });
  }
}
