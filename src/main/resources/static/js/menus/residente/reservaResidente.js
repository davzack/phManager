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

function saveReservaZonaComun() {
    let fechaInicio = $("#fechaInicioReservaZonaComun").val();
    let fechaFin = $("#fechaFinReservaZonaComun").val();
    let notas = $("#notasReserva").val();
    let residenteCedula = $("#residenteCedulaReservaZonaComun").val();
    let zonaComunId = $("#zonaComunIdReservaZonaComun option:selected").val(); 
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
$(document).ready(function() {
    let listIdZonaComun= document.querySelector("#zonaComunIdReservaZonaComun");
    $.ajax({
        url: `http://localhost:8080/api/zonacomun/all`,
        type: "GET",
        dataType: "json",
        success: function(response) {
            for(i=0;i<response.length;i++){
                listIdZonaComun.innerHTML += '<option value="' +response[i].idZonaComun +'">'
                +'ID: '+ response[i].idZonaComun+' '
                + response[i].nombre +'</option>';
            }
        }
    })
});