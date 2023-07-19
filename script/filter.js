import { RecipeApp } from './script.js';

export class RecipeFilters {
  constructor() {
    this.recipeApp = new RecipeApp();
    this.recipes = [];
    this.ingredientsInput = document.getElementById('ingredients-search-input');
    this.utensilsInput = document.getElementById('utensils-search-input');
    this.applianceInput = document.getElementById('appliance-search-input');
    this.keywordTagsList = document.getElementById('keyword-tags-list');
    this.selectedKeywords = [];
    

    this.loadRecipes().then(() => {
      this.updateFiltersAndOptions();
      this.addEventListeners();
    });
  }

  async loadRecipes() {
    try {
      const response = await fetch('script/data/recette.json');
      this.recipes = await response.json();
    } catch (error) {
      console.error('Une erreur s\'est produite lors du chargement des recettes :', error);
    }
  }
  addEventListeners() {
    const self = this;
  
    if (this.ingredientsInput) {
      this.ingredientsInput.addEventListener('keydown', function (event) {
        if (event.key === 'Enter') {
          const searchTerm = this.value.trim();
          if (searchTerm !== '') {
            self.addSelectedKeyword(searchTerm);
            this.value = '';
          }
        }
      });
    }
  
    if (this.utensilsInput) {
      this.utensilsInput.addEventListener('keydown', function (event) {
        if (event.key === 'Enter') {
          const searchTerm = this.value.trim();
          if (searchTerm !== '') {
            self.addSelectedKeyword(searchTerm);
            this.value = '';
          }
        }
      });
    }
  
    if (this.applianceInput) {
      this.applianceInput.addEventListener('keydown', function (event) {
        if (event.key === 'Enter') {
          const searchTerm = this.value.trim();
          if (searchTerm !== '') {
            self.addSelectedKeyword(searchTerm);
            this.value = '';
          }
        }
      });
    }
  }


  addSelectedKeyword(keyword) {
   
      if (this.selectedKeywords.length > 0) {
        const matchingRecipes = this.recipes.filter(recipe => {
          return this.selectedKeywords.every(keyword => {
            return (
              recipe.name.toLowerCase().includes(keyword) ||
              recipe.description.toLowerCase().includes(keyword) ||
              recipe.ingredients.some(ingredient => ingredient.ingredient.toLowerCase().includes(keyword)) ||
              recipe.ustensils.some(utensil => utensil.toLowerCase().includes(keyword)) ||
              recipe.appliance.toLowerCase().includes(keyword)
            );
          });
        });
      
        if (matchingRecipes.length === 0) {
          this.selectedKeywords = [];
          this.recipeApp.displayRecipes(this.recipes);
          return;
        }
      }
      
    
  
      
      

    this.selectedKeywords.push(keyword);
    this.applyKeywordsFilter();
    this.createKeywordTag(keyword);
    this.updateFiltersAndOptions();
  }


  checkFiltersAndDisplayRecipes() {
    const ingredientsInputValue = this.ingredientsInput.value.trim();
    const utensilsInputValue = this.utensilsInput.value.trim();
    const applianceInputValue = this.applianceInput.value.trim();
    const keywordTags = this.keywordTagsList.getElementsByTagName('li');
  
    // Vérifier si aucun mot-clé n'est sélectionné, ou si tous les champs de recherche sont vides, afficher toutes les recettes
    if (
      this.selectedKeywords.length === 0 ||
      (ingredientsInputValue === '' && utensilsInputValue === '' && applianceInputValue === '' && keywordTags.length === 0)
    ) {
      this.recipeApp.displayRecipes(this.recipes);
    } else {
      // Appliquer les filtres et afficher les recettes filtrées
      this.applyKeywordsFilter();
    }
  }


  removeKeywordTag(keyword) {
    this.selectedKeywords = this.selectedKeywords.filter(kw => kw !== keyword);
    this.applyKeywordsFilter();

    const keywordTags = this.keywordTagsList.getElementsByTagName('li');

    for (let i = 0; i < keywordTags.length; i++) {
      const tag = keywordTags[i];
      if (tag.textContent === keyword) {
        this.keywordTagsList.removeChild(tag);
        break;
      }
    }
    if (this.selectedKeywords.length === 0) {
      this.resetContent();
      return;
    }
    
    this.applyKeywordsFilter();
    this.updateFiltersAndOptions();
  }


  
  updateFiltersAndOptions() {
    const selectedKeywordsLower = this.selectedKeywords.map(kw => kw.toLowerCase());
  

    // Récupérer les datalists
    const ingredientsDatalist = document.getElementById('ingredients-options');
    const utensilsDatalist = document.getElementById('utensils-options');
    const applianceDatalist = document.getElementById('appliance-options');
  
    // Garder une copie des options actuelles avant de les vider
    const existingIngredientsOptions = Array.from(ingredientsDatalist.getElementsByTagName('option'));
    const existingUtensilsOptions = Array.from(utensilsDatalist.getElementsByTagName('option'));
    const existingApplianceOptions = Array.from(applianceDatalist.getElementsByTagName('option'));
  
    // Vider les datalists avant d'ajouter les nouvelles options triées
    ingredientsDatalist.innerHTML = '';
    utensilsDatalist.innerHTML = '';
    applianceDatalist.innerHTML = '';
  
    // Créer les tableaux pour stocker les options actuelles
    const allIngredients = [];
    const allUtensils = [];
    const allAppliances = [];
  
    this.recipes.forEach(recipe => {
      recipe.ingredients.forEach(ingredient => {
        const lowerCaseIngredient = ingredient.ingredient.toLowerCase();
        if (!selectedKeywordsLower.includes(lowerCaseIngredient) && !allIngredients.includes(lowerCaseIngredient)) {
          allIngredients.push(lowerCaseIngredient);
        }
      });
  
      recipe.ustensils.forEach(utensil => {
        const lowerCaseUtensil = utensil.toLowerCase();
        if (!selectedKeywordsLower.includes(lowerCaseUtensil) && !allUtensils.includes(lowerCaseUtensil)) {
          allUtensils.push(lowerCaseUtensil);
        }
      });
  
      const lowerCaseAppliance = recipe.appliance.toLowerCase();
      if (!selectedKeywordsLower.includes(lowerCaseAppliance) && !allAppliances.includes(lowerCaseAppliance)) {
        allAppliances.push(lowerCaseAppliance);
      }
    });
  
    // Concaténer les nouvelles options triées avec les options existantes
    const allIngredientsOptions = existingIngredientsOptions.concat(allIngredients.map(ingredient => {
      const optionElement = document.createElement('option');
      optionElement.value = ingredient;
      return optionElement;
    }));
  
    const allUtensilsOptions = existingUtensilsOptions.concat(allUtensils.map(utensil => {
      const optionElement = document.createElement('option');
      optionElement.value = utensil;
      return optionElement;
    }));
  
    const allAppliancesOptions = existingApplianceOptions.concat(allAppliances.map(appliance => {
      const optionElement = document.createElement('option');
      optionElement.value = appliance;
      return optionElement;
    }));
  
    // Ajouter les options de mots-clés triées
    allIngredientsOptions.forEach(option => ingredientsDatalist.appendChild(option));
    allUtensilsOptions.forEach(option => utensilsDatalist.appendChild(option));
    allAppliancesOptions.forEach(option => applianceDatalist.appendChild(option));
  
    // ...
  
    // Mettre à jour les objets Awesomplete avec les nouvelles options
    const ingredientsInput = document.getElementById('ingredients-search-input');
    const utensilsInput = document.getElementById('utensils-search-input');
    const applianceInput = document.getElementById('appliance-search-input');
  
    new Awesomplete(ingredientsInput, {
      list: allIngredients,
      // ...
    });
  
    new Awesomplete(utensilsInput, {
      list: allUtensils,
      // ...
    });
  
    new Awesomplete(applianceInput, {
      list: allAppliances,
      // ...
    });
    // Récupérer les ul générés par Awesomplete
  const awesompleteLists = document.querySelectorAll('[id^="awesomplete_list_"]');
  
  // Ajouter la classe "suggestion-list" aux ul
  awesompleteLists.forEach(ulElement => {
    ulElement.classList.add('suggestion-list');
  });
    // ...
  }
  
  
  
  
  addOptionToDatalist(datalistId, value) {
    const datalist = document.getElementById(datalistId);
    const optionElement = document.createElement('option');
    optionElement.value = value;
    datalist.appendChild(optionElement);
  
    // Tri des options par ordre alphabétique
    const options = Array.from(datalist.getElementsByTagName('option')).sort((a, b) => a.value.localeCompare(b.value));
    datalist.innerHTML = '';
    options.forEach(option => datalist.appendChild(option));
  }
  





  


 removeAllKeywords() {
  this.selectedKeywords = [];
  this.resetContent();
}
resetContent() {
  this.keywordTagsList.innerHTML = '';
  this.applyKeywordsFilter();
  this.updateFiltersAndOptions();
}



 addSelectizeOptions(inputElement, options) {
  const selectize = $(inputElement).selectize({
    create: false,
    renderOption: function(item, escape) {
      return '<div>' + escape(item.text) + '</div>';
    },
    render: {
      option: function(item, escape) {
        return '<div>' + escape(item.text) + '</div>';
      }
    },
    options: options
  });

  // Rafraîchir Selectize lorsque les options changent
  const selectizeInstance = selectize[0].selectize;
  selectizeInstance.clearOptions();
  selectizeInstance.addOption(options);
  selectizeInstance.refreshOptions(false);
}

removeSelectedKeyword(keyword) {
  // Supprimer le mot-clé de la liste des mots-clés sélectionnés
  this.selectedKeywords = this.selectedKeywords.filter(kw => kw !== keyword);

  // Filtrer les recettes en fonction des mots-clés restants
  this.applyKeywordsFilter();

  // Mettre à jour l'affichage des mots-clés et des options de mots-clés
  this.updateKeywordTags();
  this.updateFiltersAndOptions();
}

 
// ... autres méthodes de la classe ...

updateKeywordTags() {
  // Mettre à jour l'affichage des mots-clés sélectionnés
  this.keywordTagsList.innerHTML = '';

  this.selectedKeywords.forEach(keyword => {
    this.createKeywordTag(keyword);
  });
}

createKeywordTag(keyword) {
  const keywordTag = document.createElement('li');
  keywordTag.textContent = keyword;

  const closeButton = document.createElement('button');
  closeButton.className = 'close-button';
  closeButton.innerHTML = '&times;';

  const self = this;

  closeButton.addEventListener('click', function () {
    const keywordToRemove = keywordTag.textContent.trim();
    self.removeKeywordTag(keywordToRemove);
  });

  keywordTag.appendChild(closeButton);
  this.keywordTagsList.appendChild(keywordTag);
}

// ... autres méthodes de la classe ...









applyKeywordsFilter() {
  if (this.selectedKeywords.length === 0) {
    this.recipeApp.displayRecipes(this.recipes);
    return;
  }

  const filteredRecipes = this.recipes.filter(recipe => {
    return this.selectedKeywords.every(keyword => {
      return (
        recipe.name.toLowerCase().includes(keyword) ||
        recipe.description.toLowerCase().includes(keyword) ||
        recipe.ingredients.some(ingredient => ingredient.ingredient.toLowerCase().includes(keyword)) ||
        recipe.ustensils.some(utensil => utensil.toLowerCase().includes(keyword)) ||
        recipe.appliance.toLowerCase().includes(keyword)
      );
    });
  });

  this.recipeApp.displayRecipes(filteredRecipes);
}



  
////// the end //////
}








