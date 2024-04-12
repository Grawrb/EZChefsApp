// HamburgerMenu
const hamMenu = document.querySelector(".ham-menu");

const offScreenMenu = document.querySelector(".off-screen-menu");

hamMenu.addEventListener("click", () => {
  hamMenu.classList.toggle("active");
  offScreenMenu.classList.toggle("active");
});

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


console.log("modalContent", modalContent)
}
