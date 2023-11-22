
var api="http://localhost:8080/api"
var path="asignacionparqueadero"


$(document).ready(function() {
    let tabla = document.querySelector("#table tbody"); 
    $.ajax({
        url: `${api}/${path}/all`,
        type: "GET", 
        dataType: "json",
        success: function (response) {
            for (i = 0; i < response.length; i++) {
                tabla.innerHTML += '<tr><td>' + response[i].idAsignacion +
                    '</td><td>' + response[i].placaVehiculo +
                    '</td><td>' + response[i].estadoAsignacion +
                    '</td><td>' + response[i].fechaInicio +
                    '</td><td>' + response[i].fechaFin +
                    '</td><td>' + response[i].fechaAsignacion +
                    '</td><td>' + response[i].residente.cedula +
                    '</td><td>' + response[i].parqueadero.idParqueadero +
                    '</td><td>' + "<a href='#' class='eliminar-link' data-bs-toggle='modal' data-bs-target='#deleteModal' onclick='deleteAsignacionParqueadero(" + response[i].idAsignacion + ")'> <i class='material-icons'>delete</i></a> <a href='#' class='editar-link' data-bs-toggle='modal' data-bs-target='#updateModal' onclick='loadDataAsignacionParqueadero(" + response[i].idAsignacion + ")'> <i class='material-icons'>edit_note</i></a>" +
                    '</td></tr>';
            }
            tablaMain =$('#table').DataTable({
                "language":{
                    url: '//cdn.datatables.net/plug-ins/1.13.6/i18n/es-ES.json', 
                }
            });
        }
    });

    let listIdResidente = document.querySelector("#residenteCedulaAsignacionParqueadero");
    let listIdResidenteAC= document.querySelector("#updateResidenteCedulaAsignacionParqueadero");
    $.ajax({
        url: `${api}/residente/all`,
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

    let listIdParqueadero= document.querySelector("#parqueaderoIdAsignacionParqueadero");
    let listIdParqueaderoAC= document.querySelector("#updateParqueaderoIdAsignacionParqueadero");
    $.ajax({
        url: `${api}/parqueadero/all`,
        type: "GET",
        dataType: "json",
        success: function(response) {
            for(i=0;i<response.length;i++){
                listIdParqueadero.innerHTML += '<option value="' +response[i].idParqueadero +'">'
                + response[i].numeroParqueadero+' '
                + response[i].tipoDeParqueadero +'</option>';
                listIdParqueaderoAC.innerHTML += '<option value="' +response[i].idParqueadero +'">'
                + response[i].numeroParqueadero+' '
                + response[i].tipoDeParqueadero +'</option>';
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

function reloadEvent(){
    var table = $('#table').DataTable();
    table.destroy();
    $("#table tbody").empty(); 
    let tabla=document.querySelector("#table tbody");  
    $.ajax({
        url: `${api}/${path}/all`,
        type: "GET", 
        dataType: "json",
        success: function (response) {
            for (i = 0; i < response.length; i++) {
                tabla.innerHTML += '<tr><td>' + response[i].idAsignacion +
                    '</td><td>' + response[i].placaVehiculo +
                    '</td><td>' + response[i].estadoAsignacion +
                    '</td><td>' + response[i].fechaInicio +
                    '</td><td>' + response[i].fechaFin +
                    '</td><td>' + response[i].fechaAsignacion +
                    '</td><td>' + response[i].residente.cedula +
                    '</td><td>' + response[i].parqueadero.idParqueadero +
                    '</td><td>' + "<a href='#' class='eliminar-link' data-bs-toggle='modal' data-bs-target='#deleteModal' onclick='deleteAsignacionParqueadero(" + response[i].idAsignacion + ")'> <i class='material-icons'>delete</i></a> <a href='#' class='editar-link' data-bs-toggle='modal' data-bs-target='#updateModal' onclick='loadDataAsignacionParqueadero(" + response[i].idAsignacion + ")'> <i class='material-icons'>edit_note</i></a>" +
                    '</td></tr>';
            }
            tablaMain =$('#table').DataTable({
                "language":{
                    url: '//cdn.datatables.net/plug-ins/1.13.6/i18n/es-ES.json', 
                } 
            });
        }
    });
}

function findByIdApartamento(){
    var validFeedback = document.getElementById('formId');
    let idAConsultar=$("#inputBuscar").val();
    let tabla=document.querySelector("#table");
    $.ajax({
        url: `${api}/${path}/search/${idAConsultar}`,
        type: "GET",
        dataType: "json",
        success: function(response){

            validFeedback.classList.remove("was-validated");
            $("#inputBuscar").val("");
            $("#table tbody").remove();
            tabla.innerHTML += '<tr><td>' + response.idApartamento +
            '</td><td>' + response.numeroApartamento +
            '</td><td>' + response.torre +
            '</td><td>' + "<a href='#' class='eliminar-link' data-bs-toggle='modal' data-bs-target='#deleteModal' onclick='deleteApartamento(\""+response.idApartamento+"\")'> <i class='material-icons'>delete</i></a> <a href='#' class='editar-link' data-bs-toggle='modal' data-bs-target='#updateModal' onclick='loadDataApartamento(\""+response.idApartamento+"\")'> <i class='material-icons'>edit_note</i></a>" +
            '</td></tr>';
        },
        error: function(xhr) {
            console.log(xhr.status)
            if(xhr.status===404){
                validFeedback.classList.remove("was-validated");
        
            }
        }
    })
}

function saveAsignacionParqueadero() {
    let placaVehiculo = $("#placaVehiculoAsignacionParqueadero").val();
    let estadoAsignacion = $("#estadoAsignacionParqueadero").val();
    let fechaInicio = $("#fechaInicioAsignacionParqueadero").val();
    let fechaFin = $("#fechaFinAsignacionParqueadero").val();
    let fechaAsignacion = $("#fechaAsignacionAsignacionParqueadero").val();
    let residenteCedula = $("#residenteCedulaAsignacionParqueadero").val();
    let parqueaderoId = $("#parqueaderoIdAsignacionParqueadero").val();
    var validFeedback = document.getElementById('formCreate');
    if (placaVehiculo === '' || estadoAsignacion === '' || fechaInicio === '' || fechaFin === '' || fechaAsignacion === '' || residenteCedula === '' || parqueaderoId === '') {
        return;
    }
    data = {
        placaVehiculo: placaVehiculo,
        estadoAsignacion: estadoAsignacion,
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
        url: `${api}/${path}/save`,
        type: "POST",
        data: JSON.stringify(data),
        contentType: "application/json",
        success: function () {
            validFeedback.classList.remove("was-validated");
            $("#createModal").modal("hide");
            $("#placaVehiculoAsignacionParqueadero").val('');
            $("#estadoAsignacionParqueadero").val('');
            $("#fechaInicioAsignacionParqueadero").val('');
            $("#fechaFinAsignacionParqueadero").val('');
            $("#fechaAsignacionAsignacionParqueadero").val('');
            $("#residenteCedulaAsignacionParqueadero").val('');
            $("#parqueaderoIdAsignacionParqueadero").val('');
            reloadEvent();
        },
        error: function (xhr) {
        }
    })
}

function updateAsignacionParqueadero() {
    var validFeedback = document.getElementById('formUpdate');
    let idAsignacion = $("#updateIdAsignacionAsignacionParqueadero").val();
    let placaVehiculo = $("#updatePlacaVehiculoAsignacionParqueadero").val();
    let estadoAsignacion = $("#updateEstadoAsignacionParqueadero").val();
    let fechaInicio = $("#updateFechaInicioAsignacionParqueadero").val();
    let fechaFin = $("#updateFechaFinAsignacionParqueadero").val();
    let fechaAsignacion = $("#updateFechaAsignacionAsignacionParqueadero").val();
    let residenteCedula = $("#updateResidenteCedulaAsignacionParqueadero").val();
    let parqueaderoId = $("#updateParqueaderoIdAsignacionParqueadero").val();
    if (idAsignacion === "" || placaVehiculo === "" || estadoAsignacion === "" || fechaInicio === "" || fechaFin === "" || fechaAsignacion === "" || residenteCedula === "" || parqueaderoId === "") {
        return;
    }
    data = {
        idAsignacion: idAsignacion,
        placaVehiculo: placaVehiculo,
        estadoAsignacion: estadoAsignacion,
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
        url: `${api}/${path}/update`,
        type: "PUT",
        data: JSON.stringify(data),
        contentType: "application/json",
        success: function () {
            validFeedback.classList.remove("was-validated");
            $("#updateModal").modal("hide");
            $("#updateIdAsignacionAsignacionParqueadero").val('');
            $("#updatePlacaVehiculoAsignacionParqueadero").val('');
            $("#updateEstadoAsignacionParqueadero").val('');
            $("#updateFechaInicioAsignacionParqueadero").val('');
            $("#updateFechaFinAsignacionParqueadero").val('');
            $("#updateFechaAsignacionAsignacionParqueadero").val('');
            $("#updateResidenteCedulaAsignacionParqueadero").val('');
            $("#updateParqueaderoIdAsignacionParqueadero").val('');
            reloadEvent();
        },
        error: function (xhr) {
        }
    })
}

function loadDataAsignacionParqueadero(idAsignacion) {
    $.ajax({
        url: `${api}/${path}/search/${idAsignacion}`,
        type: "GET",
        dataType: "json",
        success: function (respuesta) {
            $("#updateIdAsignacionAsignacionParqueadero").val(respuesta.idAsignacion);
            $("#updatePlacaVehiculoAsignacionParqueadero").val(respuesta.placaVehiculo)
            $("#updateEstadoAsignacionParqueadero").val(respuesta.estadoAsignacion).attr('selected', 'selected');
            $("#updateFechaInicioAsignacionParqueadero").val(respuesta.fechaInicio);
            $("#updateFechaFinAsignacionParqueadero").val(respuesta.fechaFin);;
            $("#updateResidenteCedulaAsignacionParqueadero").val(respuesta.residente.cedula).attr('selected', 'selected');
            $("#updateParqueaderoIdAsignacionParqueadero").val(respuesta.parqueadero.idParqueadero).attr('selected', 'selected');
        }
    })
}

function searchAsignacionParqueadero(idAsignacion) {
    $("#inputBuscarAsignacionParqueadero").val(idAsignacion);
    findByIdAsignacionParqueadero();
}

function deleteAsignacionParqueadero(idAsignacion) {
    $("#deleteConfirmAsignacionParqueadero").off("click").on("click", function () {
        $.ajax({
            url: `${api}/${path}/delete/${idAsignacion}`,
            type: "DELETE",
            success: function () {
                $("#deleteModal").modal("hide");
                reloadEvent(); 
            }
        })
    })
}
