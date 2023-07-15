export default class PhotographerInfo {
  constructor(photographer) {
    this.photographer = photographer;
    this.photographHeaderDiv = document.querySelector('.photograph-header');
    this.infoContainer = document.createElement('div');
    this.infoContainer.classList.add('info-container');
    this.infoWrapper = document.createElement('div');
    this.infoWrapper.classList.add('info-wrapper');
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
    this.contactButton.classList.add('contact_button');
    this.contactButton.textContent = 'Contactez-moi';
    this.contactButton.onclick = this.displayModal.bind(this);
    this.portraitElement = document.createElement('img');
    this.portraitElement.src = `assets/photographers/${photographer.portrait}`;
    this.portraitElement.alt = photographer.name;
    this.portraitElement.classList.add('portrait');
    this.portraitElement.setAttribute('aria-label', `Photo de ${photographer.name}`);

    this.photographHeaderDiv.appendChild(this.infoWrapper);
    this.infoWrapper.appendChild(this.nameElement);
    this.infoWrapper.appendChild(this.countryElement);
    this.infoWrapper.appendChild(this.taglineElement);
    this.photographHeaderDiv.appendChild(this.contactButton);
    this.photographHeaderDiv.appendChild(this.portraitElement);
    this.photographHeaderDiv.appendChild(this.infoContainer);
  }

  displayModal() {
    const contactModal = document.createElement('div');
    contactModal.id = 'contact_modal';

    contactModal.innerHTML = `
      <div class="modal">
        <header>
          <h2>Contactez-moi</h2>
          <img src="assets/icons/close.svg" id="close_modal_button" tabindex="6" />
        </header>
        <form>
          <div>
            <label for="first_name_input">Prénom</label>
            <input id="first_name_input" tabindex="1" />
          </div>
          <div>
            <label for="last_name_input">Nom</label>
            <input id="last_name_input" tabindex="2" />
          </div>
          <div>
            <label for="email_input">E-mail</label>
            <input type="email" id="email_input" tabindex="3" />
          </div>
          <div>
            <label for="message_input">Message</label>
            <textarea id="message_input" tabindex="4"></textarea>
          </div>
          <button class="contact_button" tabindex="5">Envoyer</button>
        </form>
      </div>
    `;

    const closeModal = () => {
      const modal = document.getElementById('contact_modal');
      modal.style.display = 'none';
    };

    const displayError = (inputElement, errorMessage) => {
      const errorElement = document.createElement('div');
      errorElement.classList.add('error_message');
      errorElement.textContent = errorMessage;

      inputElement.parentNode.insertBefore(errorElement, inputElement.nextSibling);
    };

    const clearErrors = () => {
      const errorMessages = document.querySelectorAll('.error_message');
      errorMessages.forEach((errorMessage) => {
        errorMessage.parentNode.removeChild(errorMessage);
      });
    };

    const sendMessage = () => {
      const firstName = document.getElementById('first_name_input').value;
      const lastName = document.getElementById('last_name_input').value;
      const mail = document.getElementById('email_input').value;
      const message = document.getElementById('message_input').value;

      console.log('Prénom:', firstName);
      console.log('Nom:', lastName);
      console.log('Email:', mail);
      console.log('Message:', message);

      closeModal();
    };

    document.body.appendChild(contactModal);
    document.getElementById('contact_modal').style.display = 'block';

    const closeButton = document.getElementById('close_modal_button');
    closeButton.addEventListener('click', closeModal);
    closeButton.addEventListener('keydown', (event) => {
      if (event.key === 'Enter') {
        closeModal();
      }
    });

    const sendButton = document.querySelector('#contact_modal button');
    sendButton.addEventListener('click', (event) => {
      event.preventDefault();
      validateForm();
    });

    const validateForm = () => {
      clearErrors();

      const firstName = document.getElementById('first_name_input').value;
      const lastName = document.getElementById('last_name_input').value;
      const mail = document.getElementById('email_input').value;
      const message = document.getElementById('message_input').value;

      const nameRegex = /^(?=.*[A-Za-zÀ-ÖØ-öø-ÿ])(?=\S+$).{2,}$/;
      const emailRegex = /^(?!\.)[a-zA-Z0-9._%+-]+@(?!-)[a-zA-Z0-9.-]+\.([a-zA-Z]{2,}|(?!-)[a-zA-Z0-9-]{2,})$/;

      if (!nameRegex.test(firstName)) {
        displayError(document.getElementById('first_name_input'), "Le prénom est invalide");
        return false;
      }

      if (!nameRegex.test(lastName)) {
        displayError(document.getElementById('last_name_input'), "Le nom est invalide");
        return false;
      }

      if (!emailRegex.test(mail)) {
        displayError(document.getElementById('email_input'), "L'adresse email est invalide");
        return false;
      }

      sendMessage();

      return true;
    };

    const firstNameInput = document.getElementById('first_name_input');
    if (firstNameInput) {
      firstNameInput.focus();
    }
  }
}

const closeModal = () => {
  const modal = document.getElementById('contact_modal');
  modal.style.display = 'none';
};

const displayModal = () => {
  const modal = document.getElementById('contact_modal');
  modal.style.display = 'block';
};
