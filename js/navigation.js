
  var header = document.getElementById("navigasjon");
  var btns = header.getElementsByClassName("btn");
  for (var i = 0; i < btns.length; i++) {
    btns[i].addEventListener("click", function() {
    var current = document.getElementsByClassName("activmenu");
    if (current.length > 0) {
      current[0].className = current[0].className.replace(" activmenu", "");
    }
    this.className += " activmenu";
    });
  }
