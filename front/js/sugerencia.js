$(document).ready(function() {
    let tabla = document.querySelector("#table tbody");
    $.ajax({
        url: "http://localhost:8080/api/sugerencia/all",
        dataType: "json",
        success: function (response) {
            for (i = 0; i < response.length; i++) {
                tabla.innerHTML += '<tr><td>' + response[i].idSugerencia +
                    '</td><td>' + response[i].fecha +
                    '</td><td>' + response[i].asunto +
                    '</td><td>' + response[i].descripcion +
                    '</td><td>' + response[i].estado +
                    '</td><td>' + response[i].accionTomada +
                    '</td><td>' + response[i].residente.cedula +
                    '</td><td>' + "<a href='#' class='eliminar-link' data-bs-toggle='modal' data-bs-target='#deleteModal' onclick='deleteSugerencia(" + response[i].idSugerencia + ")'> <i class='material-icons'>delete</i></a> <a href='#' class='editar-link' data-bs-toggle='modal' data-bs-target='#updateModal' onclick='loadDataSugerencia(" + response[i].idSugerencia  + ")'> <i class='material-icons'>edit_note</i></a>" +
                    '</td></tr>';
            }
            tablaMain =$('#table').DataTable({ 
                "language":{
                    url: '//cdn.datatables.net/plug-ins/1.13.6/i18n/es-ES.json', 
                }
            });
        }
    });

    let listIdResidente = document.querySelector("#residenteCedulaSugerencia");
    let listIdResidenteAC= document.querySelector("#updateResidenteCedulaSugerencia");
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
        url: "http://localhost:8080/api/sugerencia/all",
        dataType: "json",
        success: function (response) {
            for (i = 0; i < response.length; i++) {
                tabla.innerHTML += '<tr><td>' + response[i].idSugerencia +
                    '</td><td>' + response[i].fecha +
                    '</td><td>' + response[i].asunto +
                    '</td><td>' + response[i].descripcion +
                    '</td><td>' + response[i].estado +
                    '</td><td>' + response[i].accionTomada +
                    '</td><td>' + response[i].residente.cedula +
                    '</td><td>' + "<a href='#' class='eliminar-link' data-bs-toggle='modal' data-bs-target='#deleteModal' onclick='deleteSugerencia(" + response[i].idSugerencia + ")'> <i class='material-icons'>delete</i></a> <a href='#' class='editar-link' data-bs-toggle='modal' data-bs-target='#updateModal' onclick='loadDataSugerencia(" + response[i].idSugerencia  + ")'> <i class='material-icons'>edit_note</i></a>" +
                    '</td></tr>';
            }
            tablaMain =$('#table').DataTable({ 
                "language":{
                        "decimal":        "",
                        "emptyTable":     "No hay registros en la tabla",
                        "info":           "Mostrando _START_ a _END_ - de _TOTAL_ registros",
                        "infoEmpty":      "Mostrando 0 de 0 registros",
                        "infoFiltered":   "(filtered from _MAX_ total entries)",
                        "infoPostFix":    "",
                        "thousands":      ",",
                        "lengthMenu":     "Mostrar _MENU_ registros",
                        "loadingRecords": "Cargando...",
                        "processing":     "",
                        "search":         "Buscar:",
                        "zeroRecords":    "No se encontraron registros que coincidan con la busqueda",
                        "paginate": {
                            "first":      "Primero",
                            "last":       "Último",
                            "next":       "Siguiente",
                            "previous":   "Anterior"
                        },
                        "aria": {
                            "sortAscending":  ": activar para ordenar la columna de forma ascendente",
                            "sortDescending": ": activar para ordenar columnas descendentes"
                        } 
                }
            });
        }
    });
}
function findByIdSugerencia() {
    var validFeedback = document.getElementById('formIdA');
    let fechaSugerenciaAConsultar = $("#inputBuscarSugerencia").val();
    let tabla = document.querySelector("#table");
    $.ajax({
        url: "http://localhost:8080/api/sugerencia/search/" + fechaSugerenciaAConsultar,
        type: "GET",
        dataType: "json",
        success: function (response) {
            validFeedback.classList.remove("was-validated");
            $("#inputBuscarSugerencia").val("");
            $("#table tbody").remove();
            tabla.innerHTML += '<tr><td>' + response.idSugerencia +
                '</td><td>' + response.fecha +
                '</td><td>' + response.asunto +
                '</td><td>' + response.descripcion +
                '</td><td>' + response.estado +
                '</td><td>' + response.accionTomada +
                '</td><td>' + response.residente.cedula +
                '</td><td>' + "<a href='#' class='eliminar-link' data-bs-toggle='modal' data-bs-target='#deleteModal' onclick='deleteSugerencia(" + response.idSugerencia  + ")'> <i class='material-icons'>delete</i></a> <a href='#' class='editar-link' data-bs-toggle='modal' data-bs-target='#updateModal' onclick='loadDataSugerencia(" + response.idSugerencia  + ")'> <i class='material-icons'>edit_note</i></a>" +
                '</td></tr>';
        },
        error: function (xhr) {
            console.log(xhr.status)
            if (xhr.status === 404) {
                validFeedback.classList.remove("was-validated");
            }
        }
    })
}

function saveSugerencia() {
    let asunto = $("#asuntoSugerencia").val();
    let descripcion = $("#descripcionSugerencia").val();
    let estado = $("#estadoSugerencia option:selected").val();
    let residenteCedula = $("#residenteCedulaSugerencia option:selected").val();
    var validFeedback = document.getElementById('formCreate');
    if ( asunto === '' || descripcion === '' || estado === '' || residenteCedula === '') {
        return;
    }
    data = {
        asunto: asunto,
        descripcion: descripcion,
        estado: estado,
        residente: {
            cedula: residenteCedula
        }
    }
    $.ajax({
        url: "http://localhost:8080/api/sugerencia/save",
        type: "POST",
        data: JSON.stringify(data),
        contentType: "application/json",
        success: function () {
            validFeedback.classList.remove("was-validated");
            $("#createModal").modal("hide");
            $("#fechaSugerencia").val('');
            $("#asuntoSugerencia").val('');
            $("#descripcionSugerencia").val('');
            $("#estadoSugerencia").val('');
            $("#accionTomadaSugerencia").val('');
            $("#residenteCedulaSugerencia").val('');
            reloadEvent();
        },
        error: function (xhr) {
        }
    })
}

function updateSugerencia() {
    var validFeedback = document.getElementById('formUpdate');
    let id = $("#updateIdSugerencia").val();
    let asunto = $("#updateAsuntoSugerencia").val();
    let fecha = $("#updateFechaSugerencia").val();
    let descripcion = $("#updateDescripcionSugerencia").val();
    let estado = $("#updateEstadoSugerencia").val();
    let accionTomada = $("#updateAccionTomadaSugerencia").val();
    let residenteCedula = $("#updateResidenteCedulaSugerencia").val();
    if (asunto === "" || descripcion === "" || estado === "" || accionTomada === "" || residenteCedula === "") {
        return;
    }
    data = {
        idSugerencia: id,
        fecha: fecha,
        asunto: asunto,
        descripcion: descripcion,
        estado: estado,
        accionTomada: accionTomada,
        residente: {
            cedula: residenteCedula
        }
    }
    $.ajax({
        url: "http://localhost:8080/api/sugerencia/update",
        type: "PUT",
        data: JSON.stringify(data),
        contentType: "application/json",
        success: function () {
            validFeedback.classList.remove("was-validated");
            $("#updateModal").modal("hide");
            $("#updateFechaSugerencia").val('');
            $("#updateAsuntoSugerencia").val('');
            $("#updateDescripcionSugerencia").val('');
            $("#updateEstadoSugerencia").val('');
            $("#updateAccionTomadaSugerencia").val('');
            $("#updateResidenteCedulaSugerencia").val('');
            reloadEvent();
        },
        error: function (xhr) {
        }
    })
}

function loadDataSugerencia(idSugerencia) {
    $.ajax({
        url: "http://localhost:8080/api/sugerencia/search/" + idSugerencia,
        type: "GET",
        dataType: "json",
        success: function (respuesta) {
            $("#updateIdSugerencia").val(respuesta.idSugerencia);
            $("#updateFechaSugerencia").val(respuesta.fecha);
            $("#updateAsuntoSugerencia").val(respuesta.asunto) ;
            $("#updateDescripcionSugerencia").val(respuesta.descripcion);
            $("#updateEstadoSugerencia").val(respuesta.estado).attr('selected', 'selected');
            $("#updateAccionTomadaSugerencia").val(respuesta.accionTomada);
            $("#updateResidenteCedulaSugerencia").val(respuesta.residente.cedula).attr('selected', 'selected');
        }
    })
}

function searchSugerencia(fechaSugerencia) {
    $("#inputBuscarSugerencia").val(fechaSugerencia);
    findByIdSugerencia();
}

function deleteSugerencia(fechaSugerencia) {
    $("#deleteConfirmSugerencia").off("click").on("click", function () {
        $.ajax({
            url: "http://localhost:8080/api/sugerencia/delete/" + fechaSugerencia,
            type: "DELETE",
            success: function () {
                $("#deleteModal").modal("hide");
                reloadEvent();
            }
        })
    })
}
