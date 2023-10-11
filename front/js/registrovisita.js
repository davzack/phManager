$(document).ready(function() {
    let tabla = document.querySelector("#table tbody");
    $.ajax({
        url: "http://localhost:8080/api/registrovisita/all",
        dataType: "json",
        success: function (response) {
            for (i = 0; i < response.length; i++) {
                tabla.innerHTML += '<tr><td>' + response[i].idVisita +
                    '</td><td>' + response[i].nombreVisitante +
                    '</td><td>' + response[i].identificacionVisitante +
                    '</td><td>' + response[i].fechaVisita +
                    '</td><td>' + response[i].residente.cedula +
                    '</td><td>' + "<a href='#' class='eliminar-link' data-bs-toggle='modal' data-bs-target='#deleteModal' onclick='deleteRegistroVisita(" + response[i].idVisita + ")'> <i class='material-icons'>delete</i></a> <a href='#' class='editar-link' data-bs-toggle='modal' data-bs-target='#updateModal' onclick='loadDataRegistroVisita(" + response[i].idVisita + ")'> <i class='material-icons'>edit_note</i></a>" +
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

    let listIdResidente = document.querySelector("#residenteCedula");
    let listIdResidenteAC= document.querySelector("#updateResidenteCedula");
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
        url: "http://localhost:8080/api/registrovisita/all",
        dataType: "json",
        success: function (response) {
            for (i = 0; i < response.length; i++) {
                tabla.innerHTML += '<tr><td>' + response[i].idVisita +
                    '</td><td>' + response[i].nombreVisitante +
                    '</td><td>' + response[i].identificacionVisitante +
                    '</td><td>' + response[i].fechaVisita +
                    '</td><td>' + response[i].residente.cedula +
                    '</td><td>' + "<a href='#' class='eliminar-link' data-bs-toggle='modal' data-bs-target='#deleteModal' onclick='deleteRegistroVisita(" + response[i].idVisita + ")'> <i class='material-icons'>delete</i></a> <a href='#' class='editar-link' data-bs-toggle='modal' data-bs-target='#updateModal' onclick='loadDataRegistroVisita(" + response[i].idVisita + ")'> <i class='material-icons'>edit_note</i></a>" +
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
function findByIdRegistroVisita() {
    var validFeedback = document.getElementById('formIdA');
    let idRegistroVisitaAConsultar = $("#inputBuscarRegistroVisita").val();
    let tabla = document.querySelector("#table");
    $.ajax({
        url: "http://localhost:8080/api/registrovisita/search/" + idRegistroVisitaAConsultar,
        type: "GET",
        dataType: "json",
        success: function (response) {
            validFeedback.classList.remove("was-validated");
            $("#inputBuscarRegistroVisita").val("");
            $("#table tbody").remove();
            tabla.innerHTML += '<tr><td>' + response.idVisita +
                '</td><td>' + response.nombreVisitante +
                '</td><td>' + response.identificacionVisitante +
                '</td><td>' + response.fechaVisita +
                '</td><td>' + response.residente.cedula +
                '</td><td>' + "<a href='#' class='eliminar-link' data-bs-toggle='modal' data-bs-target='#deleteModal' onclick='deleteRegistroVisita(" + response.idVisita + ")'> <i class='material-icons'>delete</i></a> <a href='#' class='editar-link' data-bs-toggle='modal' data-bs-target='#updateModal' onclick='loadDataRegistroVisita(" + response.idVisita + ")'> <i class='material-icons'>edit_note</i></a>" +
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

function saveRegistroVisita() {
    let nombreVisitante = $("#nombreVisitante").val();
    let identificacionVisitante = $("#identificacionVisitante").val();
    let residenteCedula = $("#residenteCedula").val();
    var validFeedback = document.getElementById('formCreate');
    if (nombreVisitante === '' || identificacionVisitante === '' || residenteCedula === '') {
        return;
    }
    data = {
        nombreVisitante: nombreVisitante,
        identificacionVisitante: identificacionVisitante,
        residente: {
            cedula: residenteCedula
        }
    }
    $.ajax({
        url: "http://localhost:8080/api/registrovisita/save",
        type: "POST",
        data: JSON.stringify(data),
        contentType: "application/json",
        success: function () {
            validFeedback.classList.remove("was-validated");
            $("#createModal").modal("hide");
            $("#nombreVisitante").val('');
            $("#identificacionVisitante").val('');
            $("#fechaVisita").val('');
            $("#residenteCedula").val('');
            reloadEvent();
        },
        error: function (xhr) {
        }
    })
}

function updateRegistroVisita() {
    var validFeedback = document.getElementById('formUpdate');
    let idVisita = $("#updateIdVisita").val();
    let nombreVisitante = $("#updateNombreVisitante").val();
    let identificacionVisitante = $("#updateIdentificacionVisitante").val();
    let fechaVisita = $("#updateFechaVisita").val();
    let residenteCedula = $("#updateResidenteCedula").val();
    if (idVisita === "" || nombreVisitante === "" || identificacionVisitante === "" || fechaVisita === "" || residenteCedula === "") {
        return;
    }
    data = {
        idVisita: idVisita,
        nombreVisitante: nombreVisitante,
        identificacionVisitante: identificacionVisitante,
        fechaVisita: fechaVisita,
        residente: {
            cedula: residenteCedula
        }
    }
    $.ajax({
        url: "http://localhost:8080/api/registrovisita/update",
        type: "PUT",
        data: JSON.stringify(data),
        contentType: "application/json",
        success: function () {
            validFeedback.classList.remove("was-validated");
            $("#updateModal").modal("hide");
            $("#updateIdVisita").val('');
            $("#updateNombreVisitante").val('');
            $("#updateIdentificacionVisitante").val('');
            $("#updateFechaVisita").val('');
            $("#updateResidenteCedula").val('');
            reloadEvent();
        },
        error: function (xhr) {
        }
    })
}

function loadDataRegistroVisita(idVisita) {
    $.ajax({
        url: "http://localhost:8080/api/registrovisita/search/" + idVisita,
        type: "GET",
        dataType: "json",
        success: function (respuesta) {
            $("#updateIdVisita").val(respuesta.idVisita);
            $("#updateNombreVisitante").val(respuesta.nombreVisitante)
            $("#updateIdentificacionVisitante").val(respuesta.identificacionVisitante);
            $("#updateFechaVisita").val(respuesta.fechaVisita);
            $("#updateResidenteCedula").val(respuesta.residente.cedula);
        }
    })
}

function searchRegistroVisita(idVisita) {
    $("#inputBuscarRegistroVisita").val(idVisita);
    findByIdRegistroVisita();
}

function deleteRegistroVisita(idVisita) {
    $("#deleteConfirmRegistroVisita").off("click").on("click", function () {
        $.ajax({
            url: "http://localhost:8080/api/registrovisita/delete/" + idVisita,
            type: "DELETE",
            success: function () {
                $("#deleteModal").modal("hide");
                reloadEvent(); 
            }
        })
    })
}
