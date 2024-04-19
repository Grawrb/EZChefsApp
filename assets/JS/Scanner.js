// HamburgerMenu
const hamMenu = document.querySelector(".ham-menu");

const offScreenMenu = document.querySelector(".off-screen-menu");

hamMenu.addEventListener("click", () => {
  hamMenu.classList.toggle("active");
  offScreenMenu.classList.toggle("active");
});

// let baconBits = document.createElement('div');
// document.body.appendChild(baconBits);

// fetch('https://baconipsum.com/api/?type=meat-and-filler')
//   .then(response => response.json())
//   .then(data => baconBits.appendChild(data));

