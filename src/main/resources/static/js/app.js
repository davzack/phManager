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

  

const verifyAuthentication = async () => {
    // Obtiene el token JWT del encabezado Authorization
    const token = localStorage.getItem("jwtToken");
  
    // Decodifica el token JWT
    const jwt = await jwt.decode(token);
  
    // Obtiene el rol del usuario
    const role = jwt.claims.roles.toString();
  
    // Verifica si el usuario tiene el rol necesario
    if (!role.equals("ADMIN")) {
      // El usuario no tiene el rol necesario
      return false;
    }
  
    // El usuario tiene el rol necesario
    return true;
};
  