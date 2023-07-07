export default class Article {
    constructor(media) {
      this.article = document.createElement('div');
      this.sousart = document.createElement('div');
      this.article.classList.add('blockouf');
      this.article.setAttribute('tabindex', '0');
  
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
    }
  




    
    addToSliderContainer(sliderContainer) {
      sliderContainer.appendChild(this.article);
    }
  }