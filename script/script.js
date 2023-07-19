export class RecipeApp {
  constructor() {
      this.recipes = [];
      this.resultsContainer = document.getElementById('results');
      this.searchInput = document.getElementById('main-search-input');

      this.loadRecipes();
      this.addEventListeners();
  }

  loadRecipes() {
      fetch('script/data/recette.json')
          .then(response => response.json())
          .then(data => {
              this.recipes = data;
              this.displayRecipes(this.recipes);
          })
          .catch(error => {
              console.error('Une erreur s\'est produite lors du chargement des recettes :', error);
          });
  }

  addEventListeners() {
      this.searchInput.addEventListener('input', () => {
          const searchTerm = this.searchInput.value.trim();
          const filteredRecipes = searchTerm ? this.searchRecipes(searchTerm) : this.recipes;
          this.displayRecipes(filteredRecipes);
      });
  }

  searchRecipes(searchTerm) {
      const lowerCaseSearchTerm = searchTerm.toLowerCase();
      return this.recipes.filter(recipe => {
          const searchFields = [
              recipe.name.toLowerCase(),
              recipe.description.toLowerCase(),
              ...recipe.ingredients.map(ingredient => ingredient.ingredient.toLowerCase())
          ];
          return searchFields.some(field => this.fuzzySearch(field, lowerCaseSearchTerm));
      });
  }

  fuzzySearch(str, searchTerm) {
    return str.includes(searchTerm);
  }

  displayRecipes(recipes) {
      this.resultsContainer.innerHTML = '';

      if (recipes.length === 0) {
          this.resultsContainer.innerHTML = 'Aucune recette trouvée.';
          return;
      }

      recipes.forEach(recipe => {
          const recipeElement = this.createRecipeElement(recipe);
          this.resultsContainer.appendChild(recipeElement);
      });
  }
  createRecipeElement(recipe) {
      const template = `
        <div class="recipe">
      
          <img src="asset/img/${recipe.image}" alt="${recipe.name}">
          <p class="time">${recipe.time} min </p>
          <div class="block">
          <h3>${recipe.name}</h3><br>
          <p>RECETTE</p>
          <p>${recipe.description}</p>
        
          <h4>Ingrédients:</h4>
          <div class="ingredients-list">
            <ul class="ingredients-column">
              ${recipe.ingredients
                .slice(0, Math.ceil(recipe.ingredients.length / 2))
                .map(ingredient => `
                  <li>
                    <p class="bol">${ingredient.ingredient}</p>
                    ${ingredient.quantity ? `<p>${ingredient.quantity} ${ingredient.unit || ''}</p>` : ''}
                  </li>
                `)
                .join('')}
            </ul>
            <ul class="ingredients-column">
              ${recipe.ingredients
                .slice(Math.ceil(recipe.ingredients.length / 2))
                .map(ingredient => `
                  <li>
                    <p class="bol">${ingredient.ingredient}</p>
                    ${ingredient.quantity ? `<p>${ingredient.quantity} ${ingredient.unit || ''}</p>` : ''}
                  </li>
                `)
                .join('')}
            </ul>
            </div>
          </div>
        </div>
      `;

      const recipeElement = document.createElement('div');
      recipeElement.innerHTML = template.trim();

      return recipeElement.firstChild;
  }

}

// Créer une instance de la classe RecipeApp
const app = new RecipeApp();

