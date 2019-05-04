/**
 * Sets navigation behaviour.
 * Navigation buttons toggles classes on navigation elements and
 * main content elements.
 * @param {buttonHandler} callback
 */
function setNavigationBehaviour(callback) {
  const navbar = document.getElementsByClassName("navigation")[0];
  const navbarElements = navbar.getElementsByTagName("li");
  for (let navbarElement of navbarElements) {
    navbarElement.onclick = () => callback(navbarElement);
  }
}
/**
 * Sets onclick behaviour on button.
 * @callback buttonHandler
 * @type {buttonHandler}
 * @param {HTMLButtonElement} button Button to configure
 */
function buttonHandler(button) {
  const activeMenu = document.getElementsByClassName("activemenu");
  const activeContent = document.getElementsByClassName("active");
  let newActiveContent;
  // Map button id to DOM element
  switch (button.lastChild.id) {
    case "navButton1":
      newActiveContent = document.getElementsByClassName("introduksjon");
      break;
    case "navButton2":
      newActiveContent = document.getElementsByClassName("oversikt");
      break;
    case "navButton3":
      newActiveContent = document.getElementsByClassName("detaljar");
      break;
    case "navButton4":
      newActiveContent = document.getElementsByClassName("samanlikning");
      break;
  }
  // Toggle off previous active elements
  activeMenu[0].classList.toggle("activemenu");
  activeContent[0].classList.toggle("active");
  // Toggle on new active elements
  button.classList.toggle("activemenu");
  newActiveContent[0].classList.toggle("active");
}