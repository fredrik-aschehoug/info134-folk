/**
 * Sets navigation behaviour.
 * Navigation buttons toggles classes on navigation elements and
 * main content elements.
 */
function setNavigationBehaviour() {
  const header = document.getElementById("navigasjon");
  const btns = header.getElementsByClassName("btn");

  for (var i = 0; i < btns.length; i++) {
    const currentBtn = btns[i];
    currentBtn.onclick = () => buttonHandler(currentBtn);
  }
}
/**
 * Sets onclick behaviour on button.
 * @callback
 * @param {HTMLButtonElement} button Button to configure
 */
function buttonHandler(button) {
  const activeMenu = document.getElementsByClassName("activemenu");
  const activeContent = document.getElementsByClassName("active");
  let newActiveContent;
  // Map button id to DOM element
  switch (button.lastChild.id) {
    case "btn1":
    newActiveContent = document.getElementsByClassName("introduksjon");
    break;
    case "btn2":
    newActiveContent = document.getElementsByClassName("oversikt");
    break;
    case "btn3":
    newActiveContent = document.getElementsByClassName("detaljar");
    break;
    case "btn4":
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