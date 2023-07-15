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
}
