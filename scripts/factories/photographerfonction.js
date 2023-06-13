// Déclaration de la classe Photographer
class Photographer {
    constructor(id, name, city, country, tags, tagline, price, portrait) {
        this.id = id;
        this.name = name;
        this.city = city;
        this.country = country;
        this.tags = tags;
        this.tagline = tagline;
        this.price = price;
        this.portrait = portrait;
    }
}

// Déclaration de la classe Media
class Media {
    constructor(id, photographerId, title, image, video, tags, likes, date, price) {
        this.id = id;
        this.photographerId = photographerId;
        this.title = title;
        this.image = image;
        this.video = video;
        this.tags = tags;
        this.likes = likes;
        this.date = date;
        this.price = price;
    }
}

// Déclaration de la classe PhotographerFactory
class PhotographerFactory {
    static createPhotographer(data) {
        const {
            id,
            name,
            city,
            country,
            tags,
            tagline,
            price,
            portrait
        } = data;
        return new Photographer(id, name, city, country, tags, tagline, price, portrait);
    }
}

// Déclaration de la classe MediaFactory
class MediaFactory {
    static createMedia(data) {
        const {
            id,
            photographerId,
            title,
            image,
            video,
            tags,
            likes,
            date,
            price
        } = data;
        return new Media(id, photographerId, title, image, video, tags, likes, date, price);
    }
}

// Fonction principale pour récupérer les photographes
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

        // Variable pour stocker le nombre total de likes
        let totalLikes = parseInt(document.getElementById('totalLikes').textContent);
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
            prblock.classList.add('prblock');
            title.textContent = media.title;
            likes.textContent = media.likes + '❤';
          
            if (media.image !== undefined) {
              const image = document.createElement('img');
              image.src = `./assets/${media.photographerId}/${media.image}`;
              image.alt = media.title;
              image.setAttribute('aria-label', `Image : ${filteredMedia[index].title}`);
              figure.appendChild(image);
            } else if (media.video && media.videoPoster) {
              const video = document.createElement('video');
              video.src = `./assets/${media.photographerId}/${media.video}`;
              video.poster = `./assets/${media.photographerId}/${media.videoPoster}`;
              video.alt = media.title;
              figure.appendChild(video);
            } else {
              const blackSquare = document.createElement('div');
              blackSquare.classList.add('black-square');
          
              const playIcon = document.createElement('span');
              playIcon.classList.add('play-icon');
              playIcon.textContent = '▶';
          
              blackSquare.appendChild(playIcon);
              figure.appendChild(blackSquare);
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
          
            likes.addEventListener('click', (event) => {
              event.stopPropagation(); // Empêche la propagation de l'événement de clic sur l'élément parent
          
              media.likes++; // Incrémente le nombre de likes du média
              totalLikes++; // Incrémente le nombre total de likes
          
              likes.textContent = media.likes + '❤'; // Met à jour le texte des likes
              document.getElementById('totalLikes').textContent = totalLikes + ' ❤'; // Met à jour le total des likes
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
                        selectedOption.classList.remove('selected'); // Remove the 'selected' class from the previously selected option
                        event.target.classList.add('selected'); // Add the 'selected' class to the newly selected option
                        dropdownLabel.textContent = event.target.textContent; // Update the dropdown label text
                        handleFilterChange(); // Call the filter change handler function
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
        }

        renderSlides();
        addFilterSection();
    } catch (error) {
        console.error('Error:', error);
    }
}

// Appel de la fonction principale
getPhotographers();