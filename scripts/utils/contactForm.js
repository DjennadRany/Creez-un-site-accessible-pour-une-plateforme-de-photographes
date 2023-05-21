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
        <label>Message</label>
        <textarea id="message_input"></textarea>
      </div>
      <button class="contact_button">Envoyer</button>
    </form>
  </div>
`;

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

// Fonction pour gérer l'envoi du formulaire
function sendMessage(event) {
  event.preventDefault();
  
  // Récupérer les valeurs des champs du formulaire
  const firstName = document.getElementById("first_name_input").value;
  const lastName = document.getElementById("last_name_input").value;
  const message = document.getElementById("message_input").value;
  
  // Afficher les valeurs dans la console
  console.log("Prénom:", firstName);
  console.log("Nom:", lastName);
  console.log("Message:", message);
  
  // Fermer le modal
  closeModal();
}

// Ajout du modal à la fin du body
document.body.appendChild(contactModal);

// Ajouter un gestionnaire d'événement au clic sur la classe .contact_button
const contactButton = document.querySelector('.contact_button');
contactButton.addEventListener('click', sendMessage);
