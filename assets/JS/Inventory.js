document.addEventListener('DOMContentLoaded', () => {
    // Event listeners for inventory search
    const inventorySearchButton = document.getElementById('inventorySearchButton');
    inventorySearchButton.addEventListener('click', searchInventoryItems);
  
    // Event listeners for hamburger menu
    const hamMenu = document.querySelector(".ham-menu");
    const offScreenMenu = document.querySelector(".off-screen-menu");
  
    hamMenu.addEventListener("click", () => {
        hamMenu.classList.toggle("active");
        offScreenMenu.classList.toggle("active");
    });
  
    // Set up event delegation for the Save buttons in inventoryContainer
    const inventoryContainer = document.getElementById('inventoryContainer');
    inventoryContainer.addEventListener('click', function(event) {
        if (event.target.tagName === 'BUTTON' && event.target.dataset.itemId) {
            const itemId = event.target.dataset.itemId;
            const itemName = event.target.dataset.itemName;
            saveInventoryItem(itemId, itemName);
        }
    });
  });
  
  const apiKey = '1e17ed0415db427d85d0c5c8062f4434'; // Use the most recent API key
  const baseUrl = 'https://api.spoonacular.com/';
  
  function searchInventoryItems() {
    const query = document.getElementById('inventorySearchInput').value.trim();
    if (query) {
        const encodedQuery = encodeURIComponent(query);
        const apiUrl = `${baseUrl}food/ingredients/search?query=${encodedQuery}&apiKey=${apiKey}&number=15`;
  
        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                if (data.results) {
                    displayInventoryItems(data.results);
                } else {
                    console.error('No results found for the query:', query);
                }
            })
            .catch(error => console.error('Error fetching inventory data:', error));
    }
  }
  
  function displayInventoryItems(items) {
    const inventoryContainer = document.getElementById('inventoryContainer');
    if (inventoryContainer) {
        inventoryContainer.innerHTML = items.map(item => `
            <div class="ingredient">
                <img src="https://spoonacular.com/cdn/ingredients_100x100/${item.image}" alt="${item.name}">
                <p>${item.name}</p>
                <input type="number" value="1" min="1" id="qty-${item.id}">
                <button data-item-id="${item.id}" data-item-name="${item.name}">Save</button>
            </div>
        `).join('');
    } else {
        console.error('The element #inventoryContainer does not exist!');
    }
  }
  
  function saveInventoryItem(itemId, itemName) {
    console.log('Attempting to save item:', itemId, itemName); // Check if this logs when you click save
    const qtyInput = document.getElementById(`qty-${itemId}`);
    if (qtyInput) {
        const quantity = qtyInput.value;
        const savedItems = JSON.parse(localStorage.getItem('savedInventory') || '{}');
        savedItems[itemId] = { name: itemName, quantity: quantity };
        localStorage.setItem('savedInventory', JSON.stringify(savedItems));
        console.log(`${itemName}: QTY ${quantity} saved to your inventory!`); // This should log the saved item
        alert(`${itemName}: QTY ${quantity} saved to your inventory!`);
    } else {
        console.error(`Element with id "qty-${itemId}" not found.`);
    }
  }