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
    // Set onclick callback for each button in the navbar
    navbarElement.onclick = callback.bind(navbarElement);
  }
}
/**
 * Sets onclick behaviour on button.
 * @callback buttonHandler
 * @type {buttonHandler}
 * @param {HTMLButtonElement} button Button to configure
 */
function buttonHandler() {
  const li = this; // "this" is passed via bind()
  const activeMenu = document.getElementsByClassName("activemenu");
  const activeContent = document.getElementsByClassName("active");
  let newActiveContent;
  // Map button id to DOM element
  switch (li.lastChild.id) {
    case "navButton1":
      newActiveContent = document.getElementsByClassName("introduction");
      break;
    case "navButton2":
      newActiveContent = document.getElementsByClassName("overview");
      break;
    case "navButton3":
      newActiveContent = document.getElementsByClassName("details");
      break;
    case "navButton4":
      newActiveContent = document.getElementsByClassName("comparison");
      break;
  }
  // Toggle off previous active elements
  activeMenu[0].classList.toggle("activemenu");
  activeContent[0].classList.toggle("active");
  // Toggle on new active elements
  li.classList.toggle("activemenu");
  newActiveContent[0].classList.toggle("active");
}
