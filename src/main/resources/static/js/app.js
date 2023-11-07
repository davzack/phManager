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

  

function openPageWithHeaders(path, id) {
    const api = "http://localhost:8080";
    $.ajax({
      url: `${api}/${path}`,
      type: "GET",
      success: function(response) {
        $('#content').html('');
        $('.sidebar-item .nav-link').removeClass("active")
        $("#"+id).addClass("active");
        $('#content').html(response);
      },
      error: function(error) {
        // Hubo un error al abrir la página
        console.error(error);
      },
    });
  }
