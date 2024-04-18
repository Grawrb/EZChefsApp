//HamburgerMenu
function createHamMenu() {
  console.log('yup');

  const hamMenu = document.querySelector(".ham-menu");

  const offScreenMenu = document.querySelector(".off-screen-menu");

  hamMenu.addEventListener("click", () => {
    hamMenu.classList.toggle("active");
    offScreenMenu.classList.toggle("active");
    console.log('wow')
  });
};

createHamMenu();
console.log("yeah");

