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
            const article = createArticle(item);
            const link = createLink(item);
            const image = createImage(item);
            const heading = createHeading(item);
            const textphoter = createParagraph(item.tagline);
            const tarifphoter = createParagraph(item.price + '€/jours');
            const citycont = createParagraph(item.city + ', ' + item.country);

            link.appendChild(image);
            article.appendChild(link);
            article.appendChild(heading);
            article.appendChild(citycont);
            article.appendChild(textphoter);
            article.appendChild(tarifphoter);
            photographerSection.appendChild(article);
        });
    } catch (error) {
        console.log('Fetch Error :-S', error);
    }
}

function createArticle(item) {
    return document.createElement('article');
}

function createLink(item) {
    const link = document.createElement('a');
    link.href = `photographer.html#${encodeURIComponent(item.id)}`;
    return link;
}

function createImage(item) {
    const image = document.createElement('img');
    image.src = `./assets/photographers/${item.portrait}`;
    image.setAttribute('aria-label', `Photo de ${item.name}`);
    image.alt = item.name;
    return image;
}

function createHeading(item) {
    const heading = document.createElement('h2');
    heading.textContent = item.name;
    return heading;
}

function createParagraph(text) {
    const paragraph = document.createElement('p');
    paragraph.textContent = text;
    return paragraph;
}

getPhotographers();
