// HamburgerMenu
// const apiKey = '1e17ed0415db427d85d0c5c8062f4434'; //created first
// const apiKey = 'f286733a42634bd3b713d9d90285995f'; //created second
// apiKey from Rob
const apiKey = 'e39ce1142e7844e183e7bd8ef27af21b';
const hamMenu = document.querySelector(".ham-menu");
const baseUrl = 'https://api.spoonacular.com/recipes/';

const offScreenMenu = document.querySelector(".off-screen-menu");

hamMenu.addEventListener("click", () => {
  hamMenu.classList.toggle("active");
  offScreenMenu.classList.toggle("active");
});

function searchRecipes() {
  var query = document.getElementById('searchInput').value.trim();
  var encodedQuery = encodeURIComponent(query); // Encode the search query

  var apiUrl;

  // Construct the API URL based on the type of search
  if (query.includes(' ')) {
      
      apiUrl = `${baseUrl}complexSearch?query=${encodedQuery}&apiKey=${apiKey}&number=15`;
  } else {
      apiUrl = `${baseUrl}complexSearch?query=${encodedQuery}&apiKey=${apiKey}&number=15`;
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
      // Fetch recipe summary
      fetch(`${baseUrl}${recipe.id}/summary?apiKey=${apiKey}`)
          .then(function(response) {
              return response.json();
          })
          .then(function(summaryData) {
              console.log("Recipe Summary:", summaryData);

              // Create recipe element
              var recipeElement = document.createElement('div');
              recipeElement.classList.add('recipe');
              recipeElement.innerHTML = '<h2>' + recipe.title + '</h2>' +
                  '<img src="' + recipe.image + '" alt="' + recipe.title + '">' +
                  '<p>Summary: ' + summaryData.summary + '</p>';

              // Check if recipe includes readyInMinutes property and it's not null or undefined
              if (recipe.readyInMinutes != null) {
                  recipeElement.innerHTML += '<p>Ready in ' + recipe.readyInMinutes + ' minutes</p>';
              }

              // Add event listener
              recipeElement.addEventListener('click', function() {
                  displayRecipeDetails(recipe);
              });

              // Append recipe element to container
              recipeContainer.appendChild(recipeElement);
          })
          .catch(function(error) {
              console.error('Error fetching recipe summary:', error);
          });
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
          <p>Ingredients:</p>
          <ul>
            ${data.extendedIngredients ? data.extendedIngredients.map(ingredient => `<li>${ingredient.original}</li>`).join('') : ''}
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

function extractRecipeFromURL(url) {
  var apiUrl = `https://api.spoonacular.com/recipes/extract?url=${url}&apiKey=${apiKey}`;

  fetch(apiUrl)
      .then(function(response) {
          return response.json();
      })
      .then(function(data) {
          console.log("Extracted Recipe Data:", data);
          // Process the extracted recipe data as needed
      })
      .catch(function(error) {
          console.error('Error extracting recipe data:', error);
      });
}


// Might be a fun function for later use, but right now not necessary.
// Function to fetch details for multiple recipes
// function fetchRecipeDetails(recipeIds) {
//   var apiUrl = `${baseUrl}informationBulk?ids=${recipeIds.join(',')}&apiKey=${apiKey}`;

//   fetch(apiUrl)
//     .then(function(response) {
//       return response.json();
//     })
//     .then(function(data) {
//       console.log("Recipe Details:", data); // Log the detailed recipe information for debugging
      // Process and display the fetched recipe details as needed
//     })
//     .catch(function(error) {
//       console.error('Error fetching recipe details:', error);
//     });
// }






