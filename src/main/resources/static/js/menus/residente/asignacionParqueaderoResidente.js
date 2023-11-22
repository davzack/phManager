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

function saveAsignacionParqueadero() {
    let placaVehiculo = $("#placaVehiculoAsignacionParqueadero").val();
    let fechaInicio = $("#fechaInicioAsignacionParqueadero").val();
    let fechaFin = $("#fechaFinAsignacionParqueadero").val();
    let residenteCedula = $("#residenteCedulaAsignacionParqueadero").val();
    let parqueaderoId = $("#parqueaderoIdAsignacionParqueadero option:selected").val();
    var validFeedback = document.getElementById('formCreate');
    if (placaVehiculo === '' ||  fechaInicio === '' || fechaFin === '' || residenteCedula === '' || parqueaderoId === '') {
        return;
    }
    data = {
        placaVehiculo: placaVehiculo,
        fechaInicio: fechaInicio,
        fechaFin: fechaFin,
        residente: {
            cedula: residenteCedula
        },
        parqueadero: {
            idParqueadero: parqueaderoId
        }
    }
    $.ajax({
        url: `http://localhost:8080/api/asignacionparqueadero/save`,
        type: "POST",
        data: JSON.stringify(data),
        contentType: "application/json",
        success: function () {
            validFeedback.classList.remove("was-validated");
            $("#placaVehiculoAsignacionParqueadero").val('');
            $("#fechaInicioAsignacionParqueadero").val('');
            $("#fechaFinAsignacionParqueadero").val('');
            $("#parqueaderoIdAsignacionParqueadero").val('');
        },
        error: function (xhr) {
        }
    })
}

$(document).ready(function() {
    let listIdParqueadero= document.querySelector("#parqueaderoIdAsignacionParqueadero");
    $.ajax({
        url: `http://localhost:8080/api/parqueadero/allout`,
        type: "GET",
        dataType: "json",
        success: function(response) {
            for(i=0;i<response.length;i++){
                listIdParqueadero.innerHTML += '<option value="' +response[i].idParqueadero +'">'
                + response[i].numeroParqueadero+' '
                + response[i].tipoDeParqueadero +'</option>';
            }
        }
    })

});