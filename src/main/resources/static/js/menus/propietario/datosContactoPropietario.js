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
    let cedula = $("#propietarioCedula").val();
    let celular = $("#telefonoPropietario").val();
    if (cedula ==='' || celular ==='') {
        return;
    }
    data = {
        cedula:cedula,
        telefono:celular
    }
    $.ajax({
        url: "https://phmanager.azurewebsites.net/api/propietario/update/cellphone",
        type: "PUT",
        data: JSON.stringify(data),
        contentType: "application/json",
        success: function(output, status, xhr) {
        },
          error: function(output) {

        }
    })
}
