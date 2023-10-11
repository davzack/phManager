const toggler = document.querySelector(".btn");
toggler.addEventListener("click",function(){
    document.querySelector("#sidebar").classList.toggle("collapsed");
});


$(document).ready(function() {
    const mediaQuery = window.matchMedia("(max-width: 1000px)");
  
    const elemento = document.querySelector("#sidebar");
  
    if (mediaQuery.matches) {
        elemento.classList.add("collapsed");
      } else {
        elemento.classList.remove("collapsed");
    }
}
);

window.addEventListener("resize", () => {
    const mediaQuery = window.matchMedia("(max-width: 1000px)");
  
    const elemento = document.querySelector("#sidebar");
  
    if (mediaQuery.matches) {
      elemento.classList.add("collapsed");
    } else {
      elemento.classList.remove("collapsed");
    }
  }); 