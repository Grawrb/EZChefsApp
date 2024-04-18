// This event listener ensures that the following code only runs after the DOM is fully loaded.
document.addEventListener('DOMContentLoaded', () => {
    // Set up event listeners for the inventory search button and menu toggles.
    const inventorySearchButton = document.getElementById('inventorySearchButton');
    inventorySearchButton.addEventListener('click', searchInventoryItems);

    const hamMenu = document.querySelector(".ham-menu");
    const offScreenMenu = document.querySelector(".off-screen-menu");
    hamMenu.addEventListener("click", () => {
        hamMenu.classList.toggle("active");
        offScreenMenu.classList.toggle("active");
    });

    // Set up event delegation for Save buttons within the inventory container.
    const inventoryContainer = document.getElementById('inventoryContainer');
    inventoryContainer.addEventListener('click', function(event) {
        if (event.target.tagName === 'BUTTON' && event.target.dataset.itemId) {
            const itemId = event.target.dataset.itemId;
            const itemName = event.target.dataset.itemName;
            
            console.log(event.target.parentElement);

            const ingredientElement = event.target.parentElement;
            
            const itemImage = ingredientElement.childNodes[1].src
            console.log(itemImage);
            
            
            saveInventoryItem(itemId, itemName, itemImage); // Pass the image URL to the save function
        }
    });

    // Display saved inventory items when the page loads.
    displaySavedInventoryItems();
});

// API key and base URL configuration.
const apiKey = '1884e65b100a493caf2f4d7d0a9169de';
const baseUrl = 'https://api.spoonacular.com/';

// Function to handle searching of inventory items using an API call.
function searchInventoryItems(event) {
    event.preventDefault();

    const query = document.getElementById('inventorySearchInput').value.trim();
    console.log("query");
    if (query) {
        const encodedQuery = encodeURIComponent(query);
        const apiUrl = `${baseUrl}food/ingredients/search?query=${encodedQuery}&apiKey=${apiKey}&number=15`;
        fetch(apiUrl).then(response => response.json()).then(data => {
            if (data.results) {
                displayInventoryItems(data.results);
            } else {
                console.error('No results found for the query:', query);
            }
        }).catch(error => console.error('Error fetching inventory data:', error));
    }
}

// Function to display fetched inventory items in the DOM.
function displayInventoryItems(items) {
    const inventoryContainer = document.getElementById('inventoryContainer');
    if (inventoryContainer) {
        inventoryContainer.innerHTML = items.map(item => `
            <div class="ingredient grid grid-rows-3 grid-flow-col gap-4 items-center bg-parchment border border-teagreen rounded-lg shadow md:w-2/6 m-auto">
                <img class="justify-self-center row-span-3 object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-s-lg" src="https://spoonacular.com/cdn/ingredients_100x100/${item.image}" alt="${item.name}">

                    <h2 class="mb-2 text-2xl mx-auto font-bold tracking-tight text-chamoisee" >${item.name}</h2>
                    <div class="row-span-2 col-span-2">
                        <input type="number" value="1" min="1" class="w-20 text-umber" id="qty-${item.id}">
                        <button data-item-id="${item.id}" data-item-name="${item.name}" class="mt-3 text-parchment bg-umber hover:bg-teagreen hover:text-chamoisee font-medium rounded-lg text-sm px-10 py-2.5 me-2 mb-2">Save</button>
                    </div>
            </div>
        `).join('');
    } else {
        console.error('The element #inventoryContainer does not exist!');
    }
}

// Function to save an inventory item to local storage, including the image URL.
function saveInventoryItem(itemId, itemName, itemImage) {
    console.log('Attempting to save item:', itemId, itemName);
    const qtyInput = document.getElementById(`qty-${itemId}`);
    if (qtyInput) {
        const quantity = qtyInput.value;
        const savedItems = JSON.parse(localStorage.getItem('savedInventory') || '{}');
        savedItems[itemId] = { name: itemName, quantity: quantity, image: itemImage };
        localStorage.setItem('savedInventory', JSON.stringify(savedItems));
        console.log(`${itemName}: QTY ${quantity} saved to your inventory!`);
        alert(`${itemName}: QTY ${quantity} saved to your inventory!`);
        displaySavedInventoryItems();
    } else {
        console.error(`Element with id "qty-${itemId}" not found.`);
    }
}

// Function to display saved inventory items on the screen, including their images.
function displaySavedInventoryItems() {
    const savedItems = JSON.parse(localStorage.getItem('savedInventory') || '{}');
    const savedItemsContainer = document.getElementById('savedItemsContainer');
    savedItemsContainer.innerHTML = '';
    Object.keys(savedItems).forEach(itemId => {
        console.log(savedItems)
        let item = {}
        for (const [key, value] of Object.entries(savedItems)) {
           if (key === itemId) {
            item = value
           }
        }
        console.log(item);
        
        console.log(itemId)
        const itemElement = document.createElement('div');
        itemElement.className = 'saved-ingredient';
        itemElement.innerHTML = `
            <img src="${item.image}" alt="${item.name}" style="width: 100px; height: 100px;">
            <p>${item.name}: QTY ${item.quantity}</p>
            <button onclick="removeSavedInventoryItem('${itemId}')">Remove</button>
        `;
        savedItemsContainer.appendChild(itemElement);
    });
}

// Function to remove an inventory item from local storage and update the display.
function removeSavedInventoryItem(itemId) {
    const savedItems = JSON.parse(localStorage.getItem('savedInventory') || '{}');
    delete savedItems[itemId];
    localStorage.setItem('savedInventory', JSON.stringify(savedItems));
    displaySavedInventoryItems();
}