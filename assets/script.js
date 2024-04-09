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
