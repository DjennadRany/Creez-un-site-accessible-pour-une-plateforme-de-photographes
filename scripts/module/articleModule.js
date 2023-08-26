export default class Article {
  constructor(media) {
    // Create the necessary elements to represent an article
    this.article = document.createElement('div');
    this.article.classList.add('blockouf');
    this.sousart = document.createElement('div');
    this.figure = document.createElement('article');
    this.title = document.createElement('p');
    this.likes = document.createElement('p');
    this.date = document.createElement('span');
    this.price = document.createElement('span');

    // Create a block to display the number of likes and the price
    this.prblock = document.createElement('div');

    // Add necessary classes to the elements
    this.sousart.classList.add('sousart');
    this.likes.classList.add('lowgne');
    this.title.classList.add('ligne');
    this.prblock.classList.add('prblock');

    // Fill the elements with the information from the media parameter
    this.title.textContent = media.title;
    this.likes.textContent = media.likes + '❤';

    // Add the created elements to the article element
    this.article.appendChild(this.figure);
    this.article.appendChild(this.sousart);
    this.article.appendChild(this.date);
    this.article.appendChild(this.price);
    this.article.appendChild(this.prblock);
    this.sousart.appendChild(this.title);
    this.sousart.appendChild(this.likes);

    // Set "tabindex" and "aria-" attributes for better accessibility
    this.setTabindex();
  }

  // Method to set "tabindex" and "aria-" attributes for better accessibility
  setTabindex() {
    this.article.setAttribute('tabindex', '0');
    this.article.setAttribute('aria-setsize', '0');
    this.article.setAttribute('aria-posinset', '0');
    this.title.setAttribute('tabindex', '0');
    this.title.setAttribute('aria-setsize', '0');
    this.title.setAttribute('aria-posinset', '0');
    this.likes.setAttribute('tabindex', '0');
    this.likes.setAttribute('aria-setsize', '0');
    this.likes.setAttribute('aria-posinset', '0');
  }

  // Method to add the article to a container of diaporama (slideshow)
  addToSliderContainer(sliderContainer) {
    sliderContainer.appendChild(this.article);
  }

  // Method to display the media in a diaporama and handle interactions with likes
  showSlide(index, media, filteredMedia) {
    // Display the image or video of the media in the "figure" element
    if (media.image !== undefined) {
      const image = document.createElement('img');
      image.src = `./assets/${media.photographerId}/${media.image}`;
      image.alt = media.title;
      image.setAttribute('aria-label', `Image : ${filteredMedia[index].title}`);
      this.figure.appendChild(image);
    } else if (media.video && media.videoPoster) {
      const video = document.createElement('video');
      video.src = `./assets/${media.photographerId}/${media.video}`;
      video.poster = `./assets/${media.photographerId}/${media.videoPoster}`;
      video.alt = media.title;
      this.figure.appendChild(video);
    } else {
      const blackSquare = document.createElement('div');
      blackSquare.classList.add('blackSquare');

      const playIcon = document.createElement('span');
      playIcon.classList.add('play-icon');
      playIcon.textContent = '▶';
      blackSquare.appendChild(playIcon);
      this.figure.appendChild(blackSquare);
    }

    // Handle opening the image modal when pressing "Enter"
    this.article.addEventListener('keydown', (event) => {
      if (event.key === 'Enter') {
        this.openImageModal(index, filteredMedia);
      }
    });

    // Add the article to the diaporama container
    this.addToSliderContainer(document.querySelector('.photoSection'));

    // Handle opening the image modal when clicking on the article
    this.figure.addEventListener('click', () => {
      this.openImageModal(index, filteredMedia);
    });

    // Handle interactions with likes
    const totalLikesElement = document.querySelector('.totalLikes');
    let totalLikes = parseInt(totalLikesElement.textContent.split(' ')[0]);

    const lowgneElements = document.querySelectorAll('.lowgne');

    const likedCoeurs = new Map();

    lowgneElements.forEach((lowgneElement) => {
      const initialLikes = parseInt(lowgneElement.textContent.split('❤')[0]);
      likedCoeurs.set(lowgneElement, initialLikes);

      lowgneElement.addEventListener('click', (event) => {
        event.stopPropagation();

        const currentLikes = likedCoeurs.get(lowgneElement);

        if (currentLikes === initialLikes) {
          likedCoeurs.set(lowgneElement, currentLikes + 1);
          totalLikes++;
          lowgneElement.textContent = (currentLikes + 1) + '❤';
          lowgneElement.classList.add('liked');
        } else {
          likedCoeurs.set(lowgneElement, currentLikes - 1);
          totalLikes--;
          lowgneElement.textContent = (currentLikes - 1) + '❤';
          lowgneElement.classList.remove('liked');
        }

        totalLikesElement.textContent = totalLikes + ' ❤';
      });
    });
  }

  // Method to open the image modal
  openImageModal(index, filteredMedia) {
    const modal = document.createElement('div');
    modal.classList.add('imageModal');
    modal.setAttribute('tabindex', '0');
    modal.setAttribute('role', 'dialog');
    modal.setAttribute('aria-labelledby', 'dialog-title');
    modal.setAttribute('aria-modal', 'true');
    modal.setAttribute('aria-hidden', 'true');


    const modalImage = document.createElement('img');
    if (filteredMedia[index].image) {
      modalImage.src = `./assets/${filteredMedia[index].photographerId}/${filteredMedia[index].image}`;
      modalImage.alt = filteredMedia[index].title;
      modalImage.setAttribute('aria-label', `Image : ${filteredMedia[index].title}`);
      modalImage.setAttribute('alt', `Image : ${filteredMedia[index].title}`);
      modalImage.setAttribute('tabindex', '0');
      modalImage.setAttribute('role', 'dialog');
      modalImage.setAttribute('aria-labelledby', 'dialog-title');
      modalImage.setAttribute('aria-modal', 'true');
      modalImage.setAttribute('aria-hidden', 'true');
      
    }

    const modalVideo = document.createElement('video');
    if (filteredMedia[index].video) {
      modalVideo.src = `./assets/${filteredMedia[index].photographerId}/${filteredMedia[index].video}`;
      modalVideo.alt = filteredMedia[index].title;
      modalVideo.setAttribute('aria-label', `Video : ${filteredMedia[index].title}`);
      modalVideo.setAttribute('alt', `Video : ${filteredMedia[index].title}`);
      modalVideo.setAttribute('role', 'dialog');
      modalVideo.setAttribute('tabindex', '0');
      modalVideo.setAttribute('aria-labelledby', 'dialog-title');
      modalVideo.setAttribute('aria-modal', 'true');
      modalVideo.setAttribute('aria-hidden', 'true');

      modalVideo.controls = true;
      modalVideo.autoplay = true;
    }

    const modalTitle = document.createElement('div');
    const modalTitlesav = document.createElement('div');
    modalTitle.textContent = filteredMedia[index].title;
    modalTitle.classList.add('txtImgModal');
    modalTitle.setAttribute('aria-label', `Image : ${filteredMedia[index].title}`);
    modalTitle.setAttribute('alt', `Image : ${filteredMedia[index].title}`);

    // Add navigation buttons to view the previous or next media
    const prevButton = document.createElement('button');
    prevButton.classList.add('prevButton');
    prevButton.setAttribute('alt', 'bouton précédent');
    prevButton.setAttribute('aria-label', 'précédent');
   

    prevButton.addEventListener('click', () => {
      const newIndex = (index - 1 + filteredMedia.length) % filteredMedia.length;
      this.closeModal();
      this.openImageModal(newIndex, filteredMedia);
    });

    const iconButtonp = document.createElement('img');
    iconButtonp.src = './assets/images/Vectorpreced.svg';
    iconButtonp.classList.add('preced');
    prevButton.appendChild(iconButtonp);

    const nextButton = document.createElement('button');
    nextButton.classList.add('nextButton');
    nextButton.setAttribute('alt', 'bouton suivant');
    nextButton.setAttribute('aria-label', 'suivant');

   
    nextButton.addEventListener('click', () => {
      const newIndex = (index + 1) % filteredMedia.length;
      this.closeModal();
      this.openImageModal(newIndex, filteredMedia);
    });

    const iconButtons = document.createElement('img');
    iconButtons.src = './assets/images/Vectorsuivant.svg';
    iconButtons.classList.add('suivan');
    nextButton.appendChild(iconButtons);

    // Add a button to close the modal
    const closeButton = document.createElement('button');
    closeButton.classList.add('closeButton');
    closeButton.classList.add('fa-solid');
    closeButton.classList.add('fa-xmark');
    closeButton.setAttribute('aria-label', 'fermé modale ');
    closeButton.addEventListener('click', () => {
      this.closeModal();
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

    // Set focus on the modal for better accessibility
    modal.focus();
  }

  // Method to get the "article" element
  closeModal() {
    const modal = document.querySelector('.imageModal');
    if (modal) {
      modal.remove();
    }
  }

  // Method to get the "article" element
  getarticle() {
    return this.article; // Make sure that filterSection is correctly initialized in the constructor
  }
}