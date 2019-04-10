/**
 * Sets navigation behaviour.
 * Navigation buttons changes classes on navigation elements and
 * main content elements.
 */
function setNavigationBehaviour() {
  const header = document.getElementById("navigasjon");
  const btns = header.getElementsByClassName("btn");

  for (var i = 0; i < btns.length; i++) {
    const currentBtn = btns[i];
    currentBtn.onclick = () => buttonHandler(currentBtn);
  }
  function buttonHandler(button) {
    const activeMenu = document.getElementsByClassName("activmenu");
    const activeContent = document.getElementsByClassName("active");
    let newActiveContent;
    if (activeMenu.length > 0) {
      activeMenu[0].classList.toggle("activmenu");
    }
    button.classList.toggle("activmenu");
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
      default:
        break;
      }
      activeContent[0].classList.toggle("active");
      newActiveContent[0].classList.toggle("active");
  }
}