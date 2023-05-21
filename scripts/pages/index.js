async function getPhotographers() {
    try {
      const response = await fetch('./data/photographers.json');
      if (!response.ok) {
        throw new Error('Looks like there was a problem. Status Code: ' + response.status);
      }
      const data = await response.json();
      console.log(data.photographers);
      const photographerSection = document.querySelector('.photographer_section');
  
      data.photographers.forEach(item => {
        const article = document.createElement('article');
        const link = document.createElement('a');
        const image = document.createElement('img');
        const heading = document.createElement('h2');
  
        link.href = `photographer.html#${encodeURIComponent(item.id)}`;
        image.src = `./assets/photographers/${item.portrait}`;
        image.alt = item.name;
        heading.textContent = item.name;
  
        link.appendChild(image);
        article.appendChild(link);
        article.appendChild(heading);
        photographerSection.appendChild(article);
      });
    } catch (error) {
      console.log('Fetch Error :-S', error);
    }
  }
  
  getPhotographers();