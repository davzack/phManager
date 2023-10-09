$(document).ready(function() {
    let tabla = document.querySelector("#table");
    $.ajax({
        url: "http://localhost:8080/api/reservazonacomun/all",
        dataType: "json",
        success: function (response) {
            $("#table tbody").remove();
            for (i = 0; i < response.length; i++) {
                tabla.innerHTML += '<tr><td>' + response[i].idReserva +
                    '</td><td>' + response[i].fechaInicio +
                    '</td><td>' + response[i].fechaFin +
                    '</td><td>' + response[i].estadoReserva +
                    '</td><td>' + response[i].notas +
                    '</td><td>' + response[i].residente.cedula +
                    '</td><td>' + response[i].zonaComun.idZonaComun +
                    '</td><td>' + "<a href='#' class='eliminar-link' data-bs-toggle='modal' data-bs-target='#deleteModal' onclick='deleteReservaZonaComun(" + response[i].idReserva + ")'> <i class='material-icons'>delete</i></a> <a href='#' class='editar-link' data-bs-toggle='modal' data-bs-target='#updateModal' onclick='loadDataReservaZonaComun(" + response[i].idReserva + ")'> <i class='material-icons'>edit_note</i></a>" +
                    '</td></tr>';
            }
        }
    });

    let listIdResidente = document.querySelector("#residenteCedulaReservaZonaComun");
    let listIdResidenteAC= document.querySelector("#updateResidenteCedulaReservaZonaComun");
    $.ajax({
        url: "http://localhost:8080/api/residente/all",
        type: "GET",
        dataType: "json",
        success: function(response) {
            for(i=0;i<response.length;i++){
                listIdResidente.innerHTML += '<option value="' +response[i].cedula +'">'
                +'ID: '+ response[i].cedula+' #: '
                + response[i].nombre+' '
                + response[i].apellido +'</option>';
                listIdResidenteAC.innerHTML += '<option value="' +response[i].cedula +'">'
                +'ID: '+ response[i].cedula+' '
                + response[i].nombre+' '
                + response[i].apellido +'</option>'; 
            }
        }
    })

    let listIdZonaComun= document.querySelector("#zonaComunIdReservaZonaComun");
    let listIdZonaComunAC= document.querySelector("#updateZonaComunIdReservaZonaComun");
    $.ajax({
        url: "http://localhost:8080/api/zonacomun/all",
        type: "GET",
        dataType: "json",
        success: function(response) {
            for(i=0;i<response.length;i++){
                listIdZonaComun.innerHTML += '<option value="' +response[i].idZonaComun +'">'
                +'ID: '+ response[i].idZonaComun+' '
                + response[i].nombre +'</option>';
                listIdZonaComunAC.innerHTML += '<option value="' +response[i].idZonaComun +'">'
                +'ID: '+ response[i].idZonaComun+' '
                + response[i].nombre +'</option>';
            }
        }
    })

});

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

(function () {
    'use strict';
  
    var form = document.getElementById('formIdA');
    var enviarButton = document.getElementById('findIdA');
  
    enviarButton.addEventListener('click', function (event) {
      if (!form.checkValidity()) {
        event.preventDefault();
        event.stopPropagation();
      }
  
      form.classList.add('was-validated');
    }, false);
})();
  
(function () { 
    'use strict';
  
    var form = document.getElementById('formUpdate');
    var enviarButton = document.getElementById('actualizar');
  
    enviarButton.addEventListener('click', function (event) {
      if (!form.checkValidity()) {
        event.preventDefault();
        event.stopPropagation();
      }
      form.classList.add('was-validated');
    }, false);
})();
  
function findByIdReservaZonaComun() {
    var validFeedback = document.getElementById('formIdA');
    let idReservaZonaComunAConsultar = $("#inputBuscarReservaZonaComun").val();
    let tabla = document.querySelector("#table");
    const toastLiveExample = document.getElementById('liveToastReservaZonaComun');
    const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample);
    $.ajax({
        url: "http://localhost:8080/api/reservazonacomun/search/" + idReservaZonaComunAConsultar,
        type: "GET",
        dataType: "json",
        success: function (response) {
            validFeedback.classList.remove("was-validated");
            $("#inputBuscarReservaZonaComun").val("");
            $("#table tbody").remove();
            tabla.innerHTML += '<tr><td>' + response.idReserva +
                '</td><td>' + response.fechaInicio +
                '</td><td>' + response.fechaFin +
                '</td><td>' + response.estadoReserva +
                '</td><td>' + response.notas +
                '</td><td>' + response.residente.cedula +
                '</td><td>' + response.zonaComun.idZonaComun +
                '</td><td>' + "<a href='#' class='eliminar-link' data-bs-toggle='modal' data-bs-target='#deleteModal' onclick='deleteReservaZonaComun(" + response.idReserva + ")'> <i class='material-icons'>delete</i></a> <a href='#' class='editar-link' data-bs-toggle='modal' data-bs-target='#updateModal' onclick='loadDataReservaZonaComun(" + response.idReserva + ")'> <i class='material-icons'>edit_note</i></a>" +
                '</td></tr>';
        },
        error: function (xhr) {
            console.log(xhr.status)
            if (xhr.status === 404) {
                validFeedback.classList.remove("was-validated");
                toastBootstrap.show()
            }
        }
    })
}

function findAllReservaZonaComun() {
    let tabla = document.querySelector("#table");
    $.ajax({
        url: "http://localhost:8080/api/reservazonacomun/all",
        type: "GET",
        dataType: "json",
        success: function (response) {
            $("#table tbody").remove();
            for (i = 0; i < response.length; i++) {
                tabla.innerHTML += '<tr><td>' + response[i].idReserva +
                    '</td><td>' + response[i].fechaInicio +
                    '</td><td>' + response[i].fechaFin +
                    '</td><td>' + response[i].estadoReserva +
                    '</td><td>' + response[i].notas +
                    '</td><td>' + response[i].residente.cedula +
                    '</td><td>' + response[i].zonaComun.idZonaComun +
                    '</td><td>' + "<a href='#' class='eliminar-link' data-bs-toggle='modal' data-bs-target='#deleteModal' onclick='deleteReservaZonaComun(" + response[i].idReserva + ")'> <i class='material-icons'>delete</i></a> <a href='#' class='editar-link' data-bs-toggle='modal' data-bs-target='#updateModal' onclick='loadDataReservaZonaComun(" + response[i].idReserva + ")'> <i class='material-icons'>edit_note</i></a>" +
                    '</td></tr>';
            }
        }
    })
}

function saveReservaZonaComun() {
    let fechaInicio = $("#fechaInicioReservaZonaComun").val();
    let fechaFin = $("#fechaFinReservaZonaComun").val();
    let estadoReserva = $("#estadoReservaZonaComun").val();
    let notas = $("#notasReservaZonaComun").val();
    let residenteCedula = $("#residenteCedulaReservaZonaComun").val();
    let zonaComunId = $("#zonaComunIdReservaZonaComun").val();
    var validFeedback = document.getElementById('formCreate');
    if (fechaInicio === '' || fechaFin === '' || estadoReserva === '' || notas === '' || residenteCedula === '' || zonaComunId === '') {
        return;
    }
    data = {
        fechaInicio: fechaInicio,
        fechaFin: fechaFin,
        estadoReserva: estadoReserva,
        notas: notas,
        residente: {
            cedula: residenteCedula
        },
        zonaComun: {
            idZonaComun: zonaComunId
        }
    }
    $.ajax({
        url: "http://localhost:8080/api/reservazonacomun/save",
        type: "POST",
        data: JSON.stringify(data),
        contentType: "application/json",
        success: function () {
            validFeedback.classList.remove("was-validated");
            $("#createModal").modal("hide");
            $("#fechaInicioReservaZonaComun").val('');
            $("#fechaFinReservaZonaComun").val('');
            $("#estadoReservaZonaComun").val('');
            $("#notasReservaZonaComun").val('');
            $("#residenteCedulaReservaZonaComun").val('');
            $("#zonaComunIdReservaZonaComun").val('');
            findAllReservaZonaComun();
        },
        error: function (xhr) {
        }
    })
}

function updateReservaZonaComun() {
    var validFeedback = document.getElementById('formUpdate');
    let idReserva = $("#updateIdReservaReservaZonaComun").val();
    let fechaInicio = $("#updateFechaInicioReservaZonaComun").val();
    let fechaFin = $("#updateFechaFinReservaZonaComun").val();
    let estadoReserva = $("#updateEstadoReservaZonaComun").val();
    let notas = $("#updateNotasReservaZonaComun").val();
    let residenteCedula = $("#updateResidenteCedulaReservaZonaComun").val();
    let zonaComunId = $("#updateZonaComunIdReservaZonaComun").val();
    if (idReserva === "" || fechaInicio === "" || fechaFin === "" || estadoReserva === "" || notas === "" || residenteCedula === "" || zonaComunId === "") {
        return;
    }
    data = {
        idReserva: idReserva,
        fechaInicio: fechaInicio,
        fechaFin: fechaFin,
        estadoReserva: estadoReserva,
        notas: notas,
        residente: {
            cedula: residenteCedula
        },
        zonaComun: {
            idZonaComun: zonaComunId
        }
    }
    $.ajax({
        url: "http://localhost:8080/api/reservazonacomun/update",
        type: "PUT",
        data: JSON.stringify(data),
        contentType: "application/json",
        success: function () {
            validFeedback.classList.remove("was-validated");
            $("#updateModal").modal("hide");
            $("#updateIdReservaReservaZonaComun").val('');
            $("#updateFechaInicioReservaZonaComun").val('');
            $("#updateFechaFinReservaZonaComun").val('');
            $("#updateEstadoReservaZonaComun").val('');
            $("#updateNotasReservaZonaComun").val('');
            $("#updateResidenteCedulaReservaZonaComun").val('');
            $("#updateZonaComunIdReservaZonaComun").val('');
            findAllReservaZonaComun();
        },
        error: function (xhr) {
        }
    })
}

function loadDataReservaZonaComun(idReserva) {
    $.ajax({
        url: "http://localhost:8080/api/reservazonacomun/search/" + idReserva,
        type: "GET",
        dataType: "json",
        success: function (respuesta) {
            $("#updateIdReservaReservaZonaComun").val(respuesta.idReserva);
            $("#updateFechaInicioReservaZonaComun").val(respuesta.fechaInicio)
            $("#updateFechaFinReservaZonaComun").val(respuesta.fechaFin);
            $("#updateEstadoReservaZonaComun").val(respuesta.estadoReserva).attr('selected', 'selected');
            $("#updateNotasReservaZonaComun").val(respuesta.notas);
            $("#updateResidenteCedulaReservaZonaComun").val(respuesta.residente.cedula).attr('selected', 'selected');
            $("#updateZonaComunIdReservaZonaComun").val(respuesta.zonaComun.idZonaComun).attr('selected', 'selected');
        }
    })
}

function searchReservaZonaComun(idReserva) {
    $("#inputBuscarReservaZonaComun").val(idReserva);
    findByIdReservaZonaComun();
}

function deleteReservaZonaComun(idReserva) {
    $("#deleteConfirmReservaZonaComun").off("click").on("click", function () {
        $.ajax({
            url: "http://localhost:8080/api/reservazonacomun/delete/" + idReserva,
            type: "DELETE",
            success: function () {
                $("#deleteModal").modal("hide");
                findAllReservaZonaComun();
            }
        })
    })
}
