<<<<<<< HEAD
// Création des éléments HTML
const contactModal = document.createElement("div");
contactModal.id = "contact_modal";
contactModal.innerHTML = `
  <div class="modal">
    <header>
      <h2>Contactez-moi</h2>
      <img src="assets/icons/close.svg" onclick="closeModal()" />
    </header>
    <form>
      <div>
        <label>Prénom</label>
        <input id="first_name_input" />
      </div>
      <div>
        <label>Nom</label>
        <input id="last_name_input" />
      </div>
      <div>
        <label>e-mail</label>
        <input type="email" id="email_input" />
      </div>
      <div>
        <label>Message</label>
        <textarea id="message_input"></textarea>
      </div>
      <button class="contact_button">Envoyer</button>
    </form>
  </div>
`;

// Fonction pour afficher un message d'erreur
function displayError(inputElement, errorMessage) {
  const errorElement = document.createElement("div");
  errorElement.classList.add("error_message");
  errorElement.textContent = errorMessage;

  // Insérer le message d'erreur après l'input
  inputElement.parentNode.insertBefore(errorElement, inputElement.nextSibling);
}

// Fonction pour supprimer les messages d'erreur
function clearErrors() {
  const errorMessages = document.querySelectorAll(".error_message");
  errorMessages.forEach((errorMessage) => {
    errorMessage.parentNode.removeChild(errorMessage);
  });
}

// Fonction pour valider le formulaire
function validateForm() {
  clearErrors();

  // Récupérer les valeurs des champs du formulaire
  const firstName = document.getElementById("first_name_input").value;
  const lastName = document.getElementById("last_name_input").value;
  const mail = document.getElementById("email_input").value;
  const message = document.getElementById("message_input").value;

  // Expression régulière pour valider le nom et prénom (lettres uniquement)
  const nameRegex = /^(?=.*[A-Za-zÀ-ÖØ-öø-ÿ])(?=\S+$).{2,}$/;

  // Expression régulière pour valider l'adresse email
  const emailRegex = /^(?!\.)[a-zA-Z0-9._%+-]+@(?!-)[a-zA-Z0-9.-]+\.([a-zA-Z]{2,}|(?!-)[a-zA-Z0-9-]{2,})$/;

  // Valider le champ du prénom
  if (!nameRegex.test(firstName)) {
    displayError(document.getElementById("first_name_input"), "Le prénom est invalide");
    return false;
  }

  // Valider le champ du nom
  if (!nameRegex.test(lastName)) {
    displayError(document.getElementById("last_name_input"), "Le nom est invalide");
    return false;
  }

  // Valider le champ de l'adresse email
  if (!emailRegex.test(mail)) {
    displayError(document.getElementById("email_input"), "L'adresse email est invalide");
    return false;
  }

  // Le formulaire est valide, envoyer le message
  sendMessage();

  return true;
}

// Fonction pour gérer l'envoi du formulaire
function sendMessage() {
  // Récupérer les valeurs des champs du formulaire
  const firstName = document.getElementById("first_name_input").value;
  const lastName = document.getElementById("last_name_input").value;
  const mail = document.getElementById("email_input").value;
  const message = document.getElementById("message_input").value;

  // Afficher les valeurs dans la console
  console.log("Prénom:", firstName);
  console.log("Nom:", lastName);
  console.log("Email:", mail);
  console.log("Message:", message);

  // Fermer le modal
  closeModal();
}

// Fonction pour afficher le modal
function displayModal() {
  const modal = document.getElementById("contact_modal");
  modal.style.display = "block";
}

// Fonction pour masquer le modal
function closeModal() {
  const modal = document.getElementById("contact_modal");
  modal.style.display = "none";
}

// Ajout du modal à la fin du body
document.body.appendChild(contactModal);

// Ajouter un gestionnaire d'événement au clic sur la classe .contact_button
const contactButton = document.querySelector('.contact_button');
contactButton.addEventListener('click', validateForm);
=======
// Création des éléments HTML
const contactModal = document.createElement("div");
contactModal.id = "contact_modal";
contactModal.innerHTML = `
  <div class="modal">
    <header>
      <h2>Contactez-moi</h2>
      <img src="assets/icons/close.svg" onclick="closeModal()" />
    </header>
    <form>
      <div>
        <label>Prénom</label>
        <input id="first_name_input" />
      </div>
      <div>
        <label>Nom</label>
        <input id="last_name_input" />
      </div>
      <div>
        <label>e-mail</label>
        <input type="email" id="email_input" />
      </div>
      <div>
        <label>Message</label>
        <textarea id="message_input"></textarea>
      </div>
      <button class="contact_button">Envoyer</button>
    </form>
  </div>
`;

// Fonction pour afficher un message d'erreur
function displayError(inputElement, errorMessage) {
  const errorElement = document.createElement("div");
  errorElement.classList.add("error_message");
  errorElement.textContent = errorMessage;

  // Insérer le message d'erreur après l'input
  inputElement.parentNode.insertBefore(errorElement, inputElement.nextSibling);
}

// Fonction pour supprimer les messages d'erreur
function clearErrors() {
  const errorMessages = document.querySelectorAll(".error_message");
  errorMessages.forEach((errorMessage) => {
    errorMessage.parentNode.removeChild(errorMessage);
  });
}

// Fonction pour valider le formulaire
function validateForm() {
  clearErrors();

  // Récupérer les valeurs des champs du formulaire
  const firstName = document.getElementById("first_name_input").value;
  const lastName = document.getElementById("last_name_input").value;
  const mail = document.getElementById("email_input").value;
  const message = document.getElementById("message_input").value;

  // Expression régulière pour valider le nom et prénom (lettres uniquement)
  const nameRegex = /^(?=.*[A-Za-zÀ-ÖØ-öø-ÿ])(?=\S+$).{2,}$/;

  // Expression régulière pour valider l'adresse email
  const emailRegex = /^(?!\.)[a-zA-Z0-9._%+-]+@(?!-)[a-zA-Z0-9.-]+\.([a-zA-Z]{2,}|(?!-)[a-zA-Z0-9-]{2,})$/;

  // Valider le champ du prénom
  if (!nameRegex.test(firstName)) {
    displayError(document.getElementById("first_name_input"), "Le prénom est invalide");
    return false;
  }

  // Valider le champ du nom
  if (!nameRegex.test(lastName)) {
    displayError(document.getElementById("last_name_input"), "Le nom est invalide");
    return false;
  }

  // Valider le champ de l'adresse email
  if (!emailRegex.test(mail)) {
    displayError(document.getElementById("email_input"), "L'adresse email est invalide");
    return false;
  }

  // Le formulaire est valide, envoyer le message
  sendMessage();

  return true;
}

// Fonction pour gérer l'envoi du formulaire
function sendMessage() {
  // Récupérer les valeurs des champs du formulaire
  const firstName = document.getElementById("first_name_input").value;
  const lastName = document.getElementById("last_name_input").value;
  const mail = document.getElementById("email_input").value;
  const message = document.getElementById("message_input").value;

  // Afficher les valeurs dans la console
  console.log("Prénom:", firstName);
  console.log("Nom:", lastName);
  console.log("Email:", mail);
  console.log("Message:", message);

  // Fermer le modal
  closeModal();
}

// Fonction pour afficher le modal
function displayModal() {
  const modal = document.getElementById("contact_modal");
  modal.style.display = "block";
}

// Fonction pour masquer le modal
function closeModal() {
  const modal = document.getElementById("contact_modal");
  modal.style.display = "none";
}

// Ajout du modal à la fin du body
document.body.appendChild(contactModal);

// Ajouter un gestionnaire d'événement au clic sur la classe .contact_button
const contactButton = document.querySelector('.contact_button');
contactButton.addEventListener('click', validateForm);
>>>>>>> a383b40 (Message de commit)
