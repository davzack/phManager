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


function enviarSugerenciaResidente(){
    let cedula= $("#cedulaSugerencia").val();
    let asunto = $("#asuntoSugerencia").val();
    let descripcion = $("#descripcionSugerencia").val();
    console.log(cedula)
    if (cedula=='' || asunto=='' || descripcion=='' ) {
        return;
    }
    data = {
        asunto: asunto,
        descripcion: descripcion,
        residente:{
            cedula: cedula,
        }
    }
    $.ajax({
        url: "http://localhost:8080/api/sugerencia/save", 
        type: "POST",
        data: JSON.stringify(data),
        contentType: "application/json",
        success: function(output, status, xhr) { 
        },
          error: function(output) {
 
        }
    })
}

function openPageWithHeaders() {
  $.ajax({
    url: `http://localhost:8080/html/sugerenciasConsulta.html`,
    type: "GET",
    success: function(response) {
      $('#contenido').html('');
      $('#contenido').html(response);
    },
    error: function(error) {
      console.error(error);
    },
  });
}
