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



    this.firstName = null
    this.lastName = null
    this.mail = null
    this.message = null

   this.sendButton = null 
   this.closeButton = null
   this.firstNameInput = null

   this.sendButton = null;
   this.closeModalFunction = null; 
  }




 // Display the contact modal when the contact button is clicked
 displayModal(closeModal) {
 
  const contactModal = document.getElementById('contactModal');
  contactModal.style.display = 'block';
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
        <button class="contactButton open" id="contactSend" tabindex="5">Envoyer</button>
      </form>
    </div>
  `;

  this.closeModalFunction = this.closeModal.bind(this);
 // Send button functionality for form validation and sending message
 this.sendButton = document.querySelector('#contactSend');
 this.sendButton.addEventListener('click', (event) => {
   event.preventDefault();
   this.validateForm(this.clearErrors.bind(this), this.displayError.bind(this), this.sendMessage.bind(this, this.closeModal.bind(this)));
 });



 // Append the contact modal to the document body and display it
 document.body.appendChild(contactModal);
 document.getElementById('contactModal').style.display = 'block';

       // Close modal button functionality
       this.closeButton = document.getElementById('closeModalButton');
       this.closeButton.addEventListener('click', closeModal);
       this.closeButton.addEventListener('keydown', (event) => {
         if (event.key === 'Enter') {
           closeModal();
         }
       });
    


}

    // Function to close the contact modal
    closeModal() {
      const modal = document.getElementById('contactModal');
      modal.style.display = 'none';
    }


    // Function to display an error message for form validation
    displayError(inputElement, errorMessage){
      const errorElement = document.createElement('div');
      errorElement.classList.add('errorMessage');
      errorElement.textContent = errorMessage;

      inputElement.parentNode.insertBefore(errorElement, inputElement.nextSibling);
    }

    // Function to clear all error messages
   clearErrors(){
      const errorMessages = document.querySelectorAll('.errorMessage');
      errorMessages.forEach((errorMessage) => {
        errorMessage.parentNode.removeChild(errorMessage);
      });
    }

     // Function to send the message when the form is submitted
    sendMessage(closeModal) {


      // Add logic to send the message
      closeModal();
    }

   

    // Form validation function
    validateForm(clearErrors, displayError, sendMessage) {
      clearErrors();

      this.firstName = document.getElementById('firstNameInput').value;
      this.lastName = document.getElementById('lastNameInput').value;
      this.mail = document.getElementById('emailInput').value;
      this.message = document.getElementById('messageInput').value;

      const nameRegex = /^(?=.*[A-Za-zÀ-ÖØ-öø-ÿ])(?=\S+$).{2,}$/;
      const emailRegex = /^(?!\.)[a-zA-Z0-9._%+-]+@(?!-)[a-zA-Z0-9.-]+\.([a-zA-Z]{2,}|(?!-)[a-zA-Z0-9-]{2,})$/;
      const messageRegex = /^(?:(?:\S+\s*){1,450})$/;

      if (!nameRegex.test(this.firstName)) {
        displayError(document.getElementById('firstNameInput'), "Le prénom est invalide");
        return false;
      }
      if (!nameRegex.test(this.lastName)) {
        displayError(document.getElementById('lastNameInput'), "Le nom est invalide");
        return false;
      }


      if (!emailRegex.test(this.mail)) {
        displayError(document.getElementById('emailInput'), "L'adresse email est invalide");
        return false;
      }


      if (!messageRegex.test(this.message)) {
        displayError(document.getElementById('messageInput'), "Le message est invalide");
        return false;
      }

  

      sendMessage();
      console.log('Prénom:', this.firstName);
      console.log('Nom:', this.lastName);
      console.log('Email:', this.mail);
      console.log('Message:', this.message);
      return true;
    }





  }