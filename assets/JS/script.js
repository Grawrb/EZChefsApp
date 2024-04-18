//HamburgerMenu
function createHamMenu() {
  const hamMenu = document.querySelector(".ham-menu");
  const offScreenMenu = document.querySelector(".off-screen-menu");
  hamMenu.addEventListener("click", () => {
    hamMenu.classList.toggle("active");
    offScreenMenu.classList.toggle("active");
  });
};

createHamMenu();

fetch('https://baconipsum.com/api/?type=meat-and-filler')
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error('Error:', error));
