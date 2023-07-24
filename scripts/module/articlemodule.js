export default class Article {
  constructor(media) {
    this.article = document.createElement('div');
    this.article.classList.add('blockouf');
    this.sousart = document.createElement('div');
    this.figure = document.createElement('article');
    this.title = document.createElement('p');
    this.likes = document.createElement('p');
    this.date = document.createElement('span');
    this.price = document.createElement('span');

    this.prblock = document.createElement('div');

    this.sousart.classList.add('sousart');
    this.likes.classList.add('lowgne');
    this.title.classList.add('ligne');
    this.prblock.classList.add('prblock');

    this.title.textContent = media.title;
    this.likes.textContent = media.likes + '❤';

    // Ajouter d'autres propriétés et fonctionnalités au besoin

    // Ajouter les éléments créés à l'élément article
    this.article.appendChild(this.figure);
    this.article.appendChild(this.sousart);
    this.article.appendChild(this.date);
    this.article.appendChild(this.price);
    this.article.appendChild(this.prblock);
    this.sousart.appendChild(this.title);
    this.sousart.appendChild(this.likes);
    this.setTabindex();
    

  }

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

  addToSliderContainer(sliderContainer) {
    sliderContainer.appendChild(this.article);
  }

  showSlide(index, media, filteredMedia) {

    
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
      blackSquare.classList.add('black-square');

      const playIcon = document.createElement('span');
      playIcon.classList.add('play-icon');
      playIcon.textContent = '▶';
      blackSquare.appendChild(playIcon);
      this.figure.appendChild(blackSquare);
    }

    this.article.addEventListener('keydown', (event) => {
      if (event.key === 'Enter') {
        this.openImageModal(index, filteredMedia);
      }
    });

    this.addToSliderContainer(document.querySelector('.photo_section'));

    this.figure.addEventListener('click', () => {
      this.openImageModal(index, filteredMedia);
    });

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
  openImageModal(index, filteredMedia) {
    const modal = document.createElement('div');
    modal.classList.add('image-modal');
    modal.setAttribute('tabindex', '-1');

    const modalImage = document.createElement('img');
    if (filteredMedia[index].image) {
      modalImage.src = `./assets/${filteredMedia[index].photographerId}/${filteredMedia[index].image}`;
      modalImage.alt = filteredMedia[index].title;
      modalImage.setAttribute('aria-label', `Image : ${filteredMedia[index].title}`);
    }

    const modalVideo = document.createElement('video');
    if (filteredMedia[index].video) {
      modalVideo.src = `./assets/${filteredMedia[index].photographerId}/${filteredMedia[index].video}`;
      modalVideo.alt = filteredMedia[index].title;
      modalVideo.setAttribute('aria-label', `Video : ${filteredMedia[index].title}`);
      modalVideo.controls = true;
      modalVideo.autoplay = true;
    }

    const modalTitle = document.createElement('div');
    const modalTitlesav = document.createElement('div');
    modalTitle.textContent = filteredMedia[index].title;
    modalTitle.classList.add('txt-img-modal');

    const prevButton = document.createElement('button');
    prevButton.classList.add('prev-button');
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
    nextButton.classList.add('next-button');
    nextButton.addEventListener('click', () => {
      const newIndex = (index + 1) % filteredMedia.length;
      this.closeModal();
      this.openImageModal(newIndex, filteredMedia);
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

    // Définir le focus sur la modal
    modal.focus();
  }

 // Function to close the image modal
  closeModal() {
  const modal = document.querySelector('.image-modal');
  if (modal) {
      modal.remove();
  }
}
  
getarticle() {
  return this.Article; // Assurez-vous que filterSection est correctement initialisé dans le constructeur
}

}
