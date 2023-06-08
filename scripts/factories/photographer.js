<<<<<<< HEAD:scripts/factories/photographer.js
function photographerFactory(data) {
    const { name, portrait } = data;

    const picture = `./assets/photographers/${item.portrait}`;

    function getUserCardDOM() {
        const article = document.createElement( 'article' );
        const img = document.createElement( 'img' );
        img.setAttribute("src", picture)
        const h2 = document.createElement( 'h2' );
        h2.textContent = name;
        article.appendChild(img);
        article.appendChild(h2);
        return (article);
    }
    return { name, picture, getUserCardDOM }
=======
function photographerTemplate(data) {
    const { name, portrait } = data;

    const picture = `./assets/photographers/${item.portrait}`;

    function getUserCardDOM() {
        const article = document.createElement( 'article' );
        const img = document.createElement( 'img' );
        img.setAttribute("src", picture)
        const h2 = document.createElement( 'h2' );
        h2.textContent = name;
        article.appendChild(img);
        article.appendChild(h2);
        return (article);
    }
    return { name, picture, getUserCardDOM }
>>>>>>> a383b40 (Message de commit):scripts/templates/photographer.js
}