import Article from '../module/articlemodule.js'
import FilterSection from '../module/filtermodule.js'



  







// Fonction principale pour récupérer les photographes
async function getPhotographers() {
    try {

        
const response = await fetch('./data/photographers.json');
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
            const articleInstance = new Article(media);

            if (media.image !== undefined) {
                const image = document.createElement('img');
                image.src = `./assets/${media.photographerId}/${media.image}`;
                image.alt = media.title;
                image.setAttribute('aria-label', `Image : ${filteredMedia[index].title}`);
                articleInstance.figure.appendChild(image);
            } else if (media.video && media.videoPoster) {
                const video = document.createElement('video');
                video.src = `./assets/${media.photographerId}/${media.video}`;
                video.poster = `./assets/${media.photographerId}/${media.videoPoster}`;
                video.alt = media.title;
                articleInstance.figure.appendChild(video);
            } else {
                const blackSquare = document.createElement('div');
                blackSquare.classList.add('black-square');

                const playIcon = document.createElement('span');
                playIcon.classList.add('play-icon');
                playIcon.textContent = '▶';
                blackSquare.appendChild(playIcon);
                articleInstance.figure.appendChild(blackSquare);
            }

            articleInstance.addToSliderContainer(document.querySelector('.photo_section'));

            articleInstance.figure.addEventListener('click', () => {
                openImageModal(index);
            });

            articleInstance.likes.addEventListener('click', (event) => {
                event.stopPropagation(); // Empêche la propagation de l'événement de clic sur l'élément parent

                media.likes++; // Incrémente le nombre de likes du média
                articleInstance.likes.textContent = media.likes + '❤'; // Met à jour le texte des likes

                const totalLikesElement = document.querySelector('.totalLikes');
                if (totalLikesElement) {
                    let totalLikes = parseInt(totalLikesElement.textContent); // Obtient la valeur actuelle des likes
                    totalLikes++; // Incrémente le total des likes
                    totalLikesElement.textContent = totalLikes + ' ❤'; // Met à jour le total des likes
                }
            });
        }

        // Render all the slides
        function renderSlides() {
            const sliderContainer = document.querySelector('.photo_section');
            sliderContainer.innerHTML = '';

            filteredMedia.forEach((media, index) => {
                showSlide(index);
            });
        }
  
        renderSlides();

        // Function to open the image modal
        function openImageModal(index) {
            const existingModal = document.querySelector('.image-modal');
            if (existingModal) {
                closeModal();
            }

            const modal = document.createElement('div');
            modal.classList.add('image-modal');

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
            // Create an instance of FilterSection
            const filterSection = new FilterSection();
          
            // Access the elements from the FilterSection instance
            const dropdownContainer = filterSection.dropdownContainer;
            const dropdownOptions = filterSection.dropdownOptions;
            const dropdownIcon = filterSection.dropdownIcon;
            const dropdownLabel = filterSection.dropdownLabel;
          
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
          
            // Toggle dropdown visibility and update selected value
            dropdownContainer.addEventListener('mouseenter', function () {
              dropdownIcon.classList.toggle('dropdown-anim');
              dropdownOptions.classList.toggle('show');
            });
          
            filterSection.dropdownOptions.addEventListener('click', function (event) {
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
            sliderContainer.parentNode.insertBefore(filterSection.filterSection, sliderContainer);
          }addFilterSection()
          


    } catch (error) {
        console.error('Error:', error);
    }
}

// Appel de la fonction principale
getPhotographers();