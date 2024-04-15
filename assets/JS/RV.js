// HamburgerMenu
const apiKey = '1e17ed0415db427d85d0c5c8062f4434'; 
const hamMenu = document.querySelector(".ham-menu");
const baseUrl = 'https://api.spoonacular.com/recipes/';

const offScreenMenu = document.querySelector(".off-screen-menu");

hamMenu.addEventListener("click", () => {
  hamMenu.classList.toggle("active");
  offScreenMenu.classList.toggle("active");
});

function searchRecipes() {
  var query = document.getElementById('searchInput').value.trim();
  var apiUrl;

  // Check if the query contains spaces
  var isIngredientSearch = query.includes(' ');

  // Construct the API URL based on the type of search
  if (isIngredientSearch) {
      apiUrl = `${baseUrl}findByIngredients?ingredients=${query}&apiKey=${apiKey}`;
  } else {
      apiUrl = `${baseUrl}complexSearch?query=${query}&apiKey=${apiKey}`;
  }

  fetch(apiUrl)
      .then(function(response) {
          return response.json();
      })
      .then(function(data) {
          console.log("API Response:", data); // Log the API response for debugging
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
      console.log("Recipe Object Keys:", Object.keys(recipe)); // Debugging: Print the keys of the recipe object to the console
      var recipeElement = document.createElement('div');
      recipeElement.classList.add('recipe');
      recipeElement.innerHTML = '<h2>' + recipe.title + '</h2>' +
                                '<img src="' + recipe.image + '" alt="' + recipe.title + '">';

      // Check if recipe includes readyInMinutes property and it's not null or undefined
      if (recipe.readyInMinutes != null) {
          recipeElement.innerHTML += '<p>Ready in ' + recipe.readyInMinutes + ' minutes</p>';
      }

      recipeElement.addEventListener('click', function() {
          displayRecipeDetails(recipe);
      });
      recipeContainer.appendChild(recipeElement);
  });
}


function displayRecipeDetails(recipe) {
  // Extract the recipe ID
  var recipeId = recipe.id;

  // Construct the API URL to get detailed information about the recipe using its ID
  var apiUrl = `${baseUrl}${recipeId}/information?apiKey=${apiKey}`;

  // Fetch recipe details
  fetch(apiUrl)
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      console.log("Recipe Details:", data); // Log the detailed recipe information for debugging
      // Populate the modal with the detailed recipe information
      var modalContent = document.getElementById('modalContent');
      modalContent.innerHTML = `
          <h2>${data.title}</h2>
          <img src="${data.image}" alt="${data.title}">
          <p>Instructions:</p>
          <ul>
            ${data.instructions ? data.instructions.split('\n').map(instruction => `<li>${instruction}</li>`).join('') : ''}
          </ul>
      `;

      // Check if the close button already exists
      var closeModalBtn = document.getElementById('closeModalBtn');
      if (!closeModalBtn) {
        // If it doesn't exist, create and add it
        closeModalBtn = document.createElement('button');
        closeModalBtn.innerHTML = '&times;'; // Close (X) symbol
        closeModalBtn.id = 'closeModalBtn'; // Assign an ID for easier targeting
        modalContent.appendChild(closeModalBtn);
      }

      // Add event listener to the close button
      closeModalBtn.addEventListener('click', function() {
        var modal = document.getElementById('recipeModal');
        modal.style.display = 'none';
      });

      var modal = document.getElementById('recipeModal');
      modal.style.display = 'block';
    })
    .catch(function(error) {
      console.error('Error fetching recipe details:', error);
    });
}







