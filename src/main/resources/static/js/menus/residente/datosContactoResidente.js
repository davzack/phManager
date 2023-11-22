(function () {
    'use strict';
  
    var form = document.getElementById('formCreate');
    var enviarButton = document.getElementById('enviar');
  
    enviarButton.addEventListener('click', function (event) {
      if (!form.checkValidity()) {
        event.preventDefault();
        event.stopPropagation();
      }
  
      form.classList.add('was-validated');
    }, false);
})();

function actualizarDatosDeContacto(){
    let cedula = $("#residenteCedula").val();
    let celular = $("#telefonoResidente").val();
    console.log(cedula)
    console.log(celular)
    if (cedula ==='' || celular ==='') {
        return;
    }
    data = {
        cedula:cedula,
        telefono:celular
    }
    $.ajax({
        url: "http://localhost:8080/api/residente/update/cellphone", 
        type: "PUT",
        data: JSON.stringify(data),
        contentType: "application/json",
        success: function(output, status, xhr) { 
        },
          error: function(output) {
 
        }
    })
}
