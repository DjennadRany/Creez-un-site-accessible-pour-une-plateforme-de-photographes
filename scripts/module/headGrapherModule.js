export default class PhotographerInfo {
  constructor(photographer) {
     // Initialize the PhotographerInfo class with the given photographer data
    this.photographer = photographer;

    // Get the photograph header element and create the info container
    this.photographHeaderDiv = document.querySelector('.photographHeader');
    this.infoContainer = document.createElement('div');
    this.infoContainer.classList.add('infoContainer');
    this.infoWrapper = document.createElement('div');
    this.infoWrapper.classList.add('infoWrapper');

     // Create elements for name, city, country, tagline, contact button, and portrait
    this.nameElement = document.createElement('h2');
    this.nameElement.textContent = photographer.name;
    this.cityElement = document.createElement('p');
    this.cityElement.textContent = ' ';
    this.countryElement = document.createElement('p');
    this.countryElement.textContent = ` ${photographer.city}, ${photographer.country} `;
    this.countryElement.classList.add('city');
    this.taglineElement = document.createElement('p');
    this.taglineElement.classList.add('tagline');
    this.taglineElement.textContent = photographer.tagline;
    this.contactButton = document.createElement('button');
    this.contactButton.classList.add('contactButton');
    this.contactButton.textContent = 'Contactez-moi';
    this.contactButton.onclick = this.displayModal.bind(this);
    this.portraitElement = document.createElement('img');
    this.portraitElement.src = `assets/photographers/${photographer.portrait}`;
    this.portraitElement.alt = photographer.name;
    this.portraitElement.classList.add('portrait');
    this.portraitElement.setAttribute('aria-label', `Photo de ${photographer.name}`);

    // Append the elements to the photograph header
    this.photographHeaderDiv.appendChild(this.infoWrapper);
    this.infoWrapper.appendChild(this.nameElement);
    this.infoWrapper.appendChild(this.countryElement);
    this.infoWrapper.appendChild(this.taglineElement);
    this.photographHeaderDiv.appendChild(this.contactButton);
    this.photographHeaderDiv.appendChild(this.portraitElement);
    this.photographHeaderDiv.appendChild(this.infoContainer);
  }
 // Display the contact modal when the contact button is clicked
  displayModal() {
    const contactModal = document.createElement('div');
    contactModal.id = 'contactModal';

    // Create the contact modal HTML content
    contactModal.innerHTML = `
      <div class="modal">
        <header>
          <h2>Contactez-moi</h2>
          <img src="assets/icons/close.svg" id="closeModalButton" tabindex="6" />
        </header>
        <form>
          <div>
            <label for="firstNameInput">Prénom</label>
            <input id="firstNameInput" tabindex="1" />
          </div>
          <div>
            <label for="lastNameInput">Nom</label>
            <input id="lastNameInput" tabindex="2" />
          </div>
          <div>
            <label for="emailInput">E-mail</label>
            <input type="email" id="emailInput" tabindex="3" />
          </div>
          <div>
            <label for="messageInput">Message</label>
            <textarea id="messageInput" tabindex="4"></textarea>
          </div>
          <button class="contactButton" tabindex="5">Envoyer</button>
        </form>
      </div>
    `;

    // Function to close the contact modal
    const closeModal = () => {
      const modal = document.getElementById('contactModal');
      modal.style.display = 'none';
    };

    // Function to display an error message for form validation
    const displayError = (inputElement, errorMessage) => {
      const errorElement = document.createElement('div');
      errorElement.classList.add('errorMessage');
      errorElement.textContent = errorMessage;

      inputElement.parentNode.insertBefore(errorElement, inputElement.nextSibling);
    };

    // Function to clear all error messages
    const clearErrors = () => {
      const errorMessages = document.querySelectorAll('.errorMessage');
      errorMessages.forEach((errorMessage) => {
        errorMessage.parentNode.removeChild(errorMessage);
      });
    };

     // Function to send the message when the form is submitted
    const sendMessage = () => {
      const firstName = document.getElementById('firstNameInput').value;
      const lastName = document.getElementById('lastNameInput').value;
      const mail = document.getElementById('emailInput').value;
      const message = document.getElementById('messageInput').value;

      // Add logic to send the message
      closeModal();
    };

      // Append the contact modal to the document body and display it
    document.body.appendChild(contactModal);
    document.getElementById('contactModal').style.display = 'block';

    // Close modal button functionality
    const closeButton = document.getElementById('closeModalButton');
    closeButton.addEventListener('click', closeModal);
    closeButton.addEventListener('keydown', (event) => {
      if (event.key === 'Enter') {
        closeModal();
      }
    });

    // Send button functionality for form validation and sending message
    const sendButton = document.querySelector('#contactModal button');
    sendButton.addEventListener('click', (event) => {
      event.preventDefault();
      validateForm();
    });

    // Form validation function
    const validateForm = () => {
      clearErrors();

      const firstName = document.getElementById('firstNameInput').value;
      const lastName = document.getElementById('lastNameInput').value;
      const mail = document.getElementById('emailInput').value;
      const message = document.getElementById('messageInput').value;

      const nameRegex = /^(?=.*[A-Za-zÀ-ÖØ-öø-ÿ])(?=\S+$).{2,}$/;
      const emailRegex = /^(?!\.)[a-zA-Z0-9._%+-]+@(?!-)[a-zA-Z0-9.-]+\.([a-zA-Z]{2,}|(?!-)[a-zA-Z0-9-]{2,})$/;

      if (!nameRegex.test(firstName)) {
        displayError(document.getElementById('firstNameInput'), "Le prénom est invalide");
        return false;
      }
      if (!nameRegex.test(lastName)) {
        displayError(document.getElementById('lastNameInput'), "Le nom est invalide");
        return false;
      }


      if (!emailRegex.test(mail)) {
        displayError(document.getElementById('emailInput'), "L'adresse email est invalide");
        return false;
      }


      if (!nameRegex.test(message)) {
        displayError(document.getElementById('messageInput'), "Le message est invalide");
        return false;
      }

      
      sendMessage();
      console.log('Prénom:', firstName);
      console.log('Nom:', lastName);
      console.log('Email:', mail);
      console.log('Message:', message);
      return true;
    };

    // Set focus on the first input field (First Name)
    const firstNameInput = document.getElementById('firstNameInput');
    if (firstNameInput) {
      firstNameInput.focus();
    }
  }
}
// Function to close the contact modal
const closeModal = () => {
  const modal = document.getElementById('contactModal');
  modal.style.display = 'none';
};

// Function to display the contact modal
const displayModal = () => {
  const modal = document.getElementById('contactModal');
  modal.style.display = 'block';
};
