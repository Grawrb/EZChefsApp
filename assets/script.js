// HamburgerMenu

//   Toggles the visibility of the hamburger menu and changes the appearance
//  of the hamburger icon to indicate whether the menu is open or closed.

function toggleHamburgerMenu() {
  // Select the menu and the icon elements from the DOM
  const menu = document.querySelector(".menu-links");
  const icon = document.querySelector(".hamburger-icon");

  // Toggle the 'open' class on both the menu and the icon
  menu.classList.toggle("open");
  icon.classList.toggle("open");

  // Updates the 'aria-expanded' attribute on the hamburger icon to reflect
  // the current state of the menu (true for open, false for closed), enhancing accessibility.
  const isOpen = menu.classList.contains("open");
  icon.setAttribute("aria-expanded", isOpen);
}

function searchRecipes() {
  var query = document.getElementById('searchInput').value;
  var apiKey = '1e17ed0415db427d85d0c5c8062f4434';
  var apiUrl = 'https://api.spoonacular.com/recipes/search?query=' + query + '&apiKey=' + apiKey;

  fetch(apiUrl)
      .then(function(response) {
          return response.json();
      })
      .then(function(data) {
          displayRecipes(data.results);
      })
      .catch(function(error) {
          console.error('Error fetching data:', error);
      });
}

function displayRecipes(recipes) {
  var recipeContainer = document.getElementById('recipeContainer');
  recipeContainer.innerHTML = ''; // Clear previous recipes

  recipes.forEach(function(recipe) {
      var recipeElement = document.createElement('div');
      recipeElement.classList.add('recipe');
      recipeElement.innerHTML = '<h2>' + recipe.title + '</h2>' +
                                '<img src="' + recipe.image + '" alt="' + recipe.title + '">' +
                                '<p>Ready in ' + recipe.readyInMinutes + ' minutes</p>';
      // event listener before appending recipe element
      recipeElement.addEventListener('click', function() {
          displayRecipeDetails(recipe);
      });
      recipeContainer.appendChild(recipeElement);
  });
}

function displayRecipeDetails(recipe) {
  var modalContent = document.getElementById('modalContent');
  modalContent.innerHTML = `
      <h2>${recipe.title}</h2>
      <img src="${recipe.image}" alt="${recipe.title}">
      <p>Ready in ${recipe.readyInMinutes} minutes</p>
      <!-- Add more recipe details here -->
  `;
  var modal = document.getElementById('recipeModal');
  modal.style.display = 'block';


// console.log("modalContent", modalContent)
}
