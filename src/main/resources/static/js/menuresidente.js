(function () {
    'use strict';
  
    var form = document.getElementById('formCreate');
    var enviarButton = document.getElementById('enviar');
  
    enviarButton.addEventListener('click', function (event) {
      if (!form.checkValidity()) {
        console.log("Hola")
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
        url: "http://localhost:8080/api/auth/login", 
        type: "POST",
        data: JSON.stringify(data),
        contentType: "application/json",
        success: function(output, status, xhr) { 
        },
          error: function(output) {
 
        }
    })
}
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

function saveReservaZonaComun() {
    let fechaInicio = $("#fechaInicioReservaZonaComun").val();
    let fechaFin = $("#fechaFinReservaZonaComun").val();
    let notas = $("#notasReservaZonaComun").val();
    let residenteCedula = $("#residenteCedulaReservaZonaComun").val();
    let zonaComunId = $("#zonaComunIdReservaZonaComun").val();
    var validFeedback = document.getElementById('formCreate');
    if (fechaInicio === '' || fechaFin === '' || notas === '' || residenteCedula === '' || zonaComunId === '') {
        return;
    }
    data = {
        fechaInicio: fechaInicio,
        fechaFin: fechaFin,
        notas: notas,
        residente: {
            cedula: residenteCedula
        },
        zonaComun: {
            idZonaComun: zonaComunId
        }
    }
    $.ajax({
        url: `http://localhost:8080/api/reservazonacomun/save`,
        type: "POST",
        data: JSON.stringify(data),
        contentType: "application/json",
        success: function () {
            validFeedback.classList.remove("was-validated");
            $("#fechaInicioReservaZonaComun").val('');
            $("#fechaFinReservaZonaComun").val('');
            $("#estadoReservaZonaComun").val('');
            $("#notasReservaZonaComun").val('');
            $("#residenteCedulaReservaZonaComun").val('');
            $("#zonaComunIdReservaZonaComun").val('');
        },
        error: function (xhr) {
        }
    })
}
function saveAsignacionParqueadero() {
    let placaVehiculo = $("#placaVehiculoAsignacionParqueadero").val();
    let fechaInicio = $("#fechaInicioAsignacionParqueadero").val();
    let fechaFin = $("#fechaFinAsignacionParqueadero").val();
    let residenteCedula = $("#residenteCedulaAsignacionParqueadero").val();
    let parqueaderoId = $("#parqueaderoIdAsignacionParqueadero").val();
    var validFeedback = document.getElementById('formCreate');
    if (placaVehiculo === '' ||  fechaInicio === '' || fechaFin === '' || fechaAsignacion === '' || residenteCedula === '' || parqueaderoId === '') {
        return;
    }
    data = {
        placaVehiculo: placaVehiculo,
        fechaInicio: fechaInicio,
        fechaFin: fechaFin,
        fechaAsignacion: fechaAsignacion,
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
    let tabla = document.querySelector("#table tbody");
    $.ajax({
        url: `http://localhost:8080/api/cuota/all`,
        type: "GET",
        dataType: "json",
        success: function (response) {
            for (i = 0; i < response.length; i++) {
                tabla.innerHTML += '<tr><td>' + response[i].idCuota +
                    '</td><td>' + response[i].monto +
                    '</td><td>' + response[i].tipoDeCuota +
                    '</td><td>' + response[i].estado +
                    '</td></tr>';
            }
            tablaMain =$('#table').DataTable({
                "language":{
                    url: '//cdn.datatables.net/plug-ins/1.13.6/i18n/es-ES.json', 
                }
            });
        }
    });

});