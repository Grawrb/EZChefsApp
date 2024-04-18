// HamburgerMenu
// const apiKey = '1e17ed0415db427d85d0c5c8062f4434'; //created first
// const apiKey = 'f286733a42634bd3b713d9d90285995f'; //created second
// apiKey from Rob
// const apiKey = 'e39ce1142e7844e183e7bd8ef27af21b';
// second key from Rob
const apiKey = '8c38d39a17db4dcf8655d154ac2ee3c5'
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
        recipeElement.innerHTML = `
          <h2>${recipe.title}</h2>
          <img src="${recipe.image}" alt="${recipe.title}">
          <button class="see-recipe-btn">See Recipe</button>
          <p>${truncateSummary(summaryData.summary)}</p>
          
          <p class="full-summary" style="display: none;">${summaryData.summary}</p> <!-- Hidden full summary -->
        `;

        // Add event listener to the "See Recipe" button
        var seeRecipeBtn = recipeElement.querySelector('.see-recipe-btn');
        seeRecipeBtn.addEventListener('click', function() {
          // Open the modal with detailed recipe information
          displayModal(recipe.id);
        });

        // Add event listener to "See More" button
        var seeMoreBtn = recipeElement.querySelector('.see-more-btn');
        seeMoreBtn.addEventListener('click', function() {
          var fullSummary = recipeElement.querySelector('.full-summary');
          fullSummary.style.display = 'block';
          seeMoreBtn.style.display = 'none';
        });

        // Append recipe element to container
        recipeContainer.appendChild(recipeElement);
      })
      .catch(function(error) {
        console.error('Error fetching recipe summary:', error);
      });
  });
}
function displayModal(recipeId) {
  // Retrieve the inventory from local storage
  const inventory = JSON.parse(localStorage.getItem('savedInventory') || '{}');

  // Construct the API URL to get detailed information about the recipe using its ID
  var apiUrl = `${baseUrl}${recipeId}/information?apiKey=${apiKey}`;

  // Fetch recipe details
  fetch(apiUrl)
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      console.log("Recipe Details:", data); // Log the detailed recipe information for debugging
      
      // Check if ingredients are missing
      const missingIngredients = [];
      if (data.extendedIngredients) {
        data.extendedIngredients.forEach(function(ingredient) {
          const ingredientName = ingredient.name.toLowerCase();
          const ingredientQty = ingredient.amount;

          // Check if the ingredient is in the inventory and if the quantity is sufficient
          if (!inventory.hasOwnProperty(ingredientName) || inventory[ingredientName].quantity < ingredientQty) {
            missingIngredients.push(ingredient.original);
          }
        });
      }

      // Log the missing ingredients array
      console.log("Missing Ingredients:", missingIngredients);

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

      // Add missing ingredients to the modal
      if (missingIngredients.length > 0) {
        modalContent.innerHTML += `<p>You are missing the following ingredients:</p><ul>${missingIngredients.map(ingredient => `<li>${ingredient}</li>`).join('')}</ul>`;
      } else {
        modalContent.innerHTML += `<p>You have all the ingredients needed for this recipe!</p>`;
      }

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



function truncateSummary(summary) {
  const maxLength = 350; // Adjust as needed
  if (typeof summary === 'string' && summary.length > maxLength) {
    var truncatedSummary = summary.slice(0, maxLength) + '...';
    var seeMoreButton = '<button class="see-more-btn">See Mor2</button>';
    var fullSummary = '<span class="full-summary" style="display: none">' + summary + '</span>';
    return truncatedSummary + seeMoreButton + fullSummary;
  } else {
    return summary;
  }
}


function displayRecipeDetails(recipeId) {
  // This function is not implemented yet. You can add your code here to display the detailed recipe information.
  console.log("Recipe details for ID:", recipeId);
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






