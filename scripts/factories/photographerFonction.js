import Article from '../module/articlemodule.js'; // Importing the Article class from the specified module file
import FilterSection from '../module/filtermodule.js'; // Importing the FilterSection class from the specified module file

async function getPhotographers() {
  let filterContainer = null; // Declare filterContainer outside the try block
  try {
    const response = await fetch('./data/photographers.json'); // Fetching the photographers data from the JSON file
    const data = await response.json(); // Parsing the JSON data

    // Get the photographer ID from the URL
    const url = window.location.href;
    const id = url.split("#")[1]; // Extracting the photographer ID from the URL fragment

    // Filter media based on photographer ID
    const filteredMedia = data.media.filter(media => media.photographerId === parseInt(id)); // Filtering media based on the photographer ID

    const sliderContainer = document.querySelector('.photoSection'); // Getting the slider container element
    const filterSectionInstance = new FilterSection(); // Creating an instance of the FilterSection class

    filterSectionInstance.addFilterSection(filteredMedia); // Adding the filteredMedia as an argument to the addFilterSection method

    filteredMedia.forEach((media, index) => {
      const articleInstance = new Article(media); // Creating an instance of the Article class with each media item
      articleInstance.addToSliderContainer(sliderContainer); // Adding the media item to the slider container
      articleInstance.showSlide(index, media, filteredMedia); // Displaying the media item in the slider with the corresponding index
    });

    // Make sure filterContainer is defined before accessing it
    filterContainer = document.querySelector('.photographerSection'); // Getting the photographer section container element
    if (filterContainer) {
      filterContainer.appendChild(filterSectionInstance.getFilterSection()); // Appending the filter section to the photographer section container
    }
  } catch (error) {
    console.error('Error:', error); // Handling errors that occur during the fetch and processing of data
  }
}

// Call the main function
getPhotographers();
