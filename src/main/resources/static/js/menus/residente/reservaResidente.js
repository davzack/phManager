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
    let zonaComunId = $('input[name="flexRadioDefault"]:checked').val(); 
    var validFeedback = document.getElementById('formCreate');
    console.log(zonaComunId)
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
        },
        error: function (xhr) {
        }
    })
}
$(document).ready(function() {
    $.ajax({
        url: "http://localhost:8080/api/zonacomun/all",
        type: "GET",
        dataType: "json",
        success: function(response) {
            for (let i = 0; i < response.length; i++) {
                var formCheckDiv = $("<div>").addClass("form-check form-check-inline");
                var input = $("<input>").addClass("form-check-input")
                .attr({
                    "type": "radio",
                    "name": "flexRadioDefault",
                    "value": response[i].idZonaComun
                });
                var cardDiv = $("<div>").addClass("card").css("width", "11rem");
                var img = $("<img>").addClass("card-img-top").attr("src", response[i].fotos).attr("width", "50px").attr("height", "70px");
                var cardBodyDiv = $("<div>").addClass("card-body cardZonas");
                var cardTitle = $("<h5>").addClass("card-title cardZonaTitle").text(response[i].nombre);
                var validFeedbackDiv = $("<div>").addClass("valid-feedback").attr("id", "v1").text("¡Se ve bien!");
                var invalidFeedbackDiv = $("<div>").addClass("invalid-feedback").attr("id", "v2").text("Por favor, digite una fecha de inicio.");
                cardBodyDiv.append(cardTitle);
                cardDiv.append(img, cardBodyDiv);
                formCheckDiv.append(input, cardDiv, validFeedbackDiv, invalidFeedbackDiv);
                $("#contenedor").append(formCheckDiv);
            }
        }
    });
});