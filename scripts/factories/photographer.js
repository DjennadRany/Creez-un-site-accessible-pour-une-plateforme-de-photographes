import PhotographerInfo from '../module/headGrapherModule.js';
import App from '../module/app.js';

let photographers; // Variable to store the photographers data
let photographer; // Variable to store the selected photographer
const url = window.location.href; // Get the current URL of the page
const photographerId = parseInt(url.split('#')[1]); // Extract the photographer ID from the URL (assuming it's in the fragment identifier after the '#' symbol)

// Fetch the photographers' data from the JSON file
fetch('./data/photographers.json')
  .then(response => response.json())
  .then(data => {
    photographers = data.photographers; // Store the photographers array from the JSON data
    photographer = getPhotographerInfoFromURL(); // Get the photographer information based on the ID in the URL
    if (photographer) {
      const photographerInfo = new PhotographerInfo(photographer); // Create an instance of the PhotographerInfo class with the photographer's information
      const apply = new App(photographer); // Create an instance of the App class with the photographer's information
    }
  })
  .catch(error => {
    console.log("An error occurred while retrieving the JSON file:", error); // Log an error message if there's an issue with fetching or parsing the JSON
  });

// Function to retrieve photographer information based on their ID
function getPhotographerById(photographerId) {
  return photographers.find(photographer => photographer.id === photographerId); // Search for the photographer with the specified ID in the photographers array
}

// Function to retrieve photographer information based on the ID in the URL
function getPhotographerInfoFromURL() {
  return photographerId ? getPhotographerById(photographerId) : null; // Return the photographer information if the ID is found, otherwise return null
}
