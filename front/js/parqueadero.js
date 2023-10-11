$(document).ready(function() {
    let tabla = document.querySelector("#table tbody");
    $.ajax({
        url: "http://localhost:8080/api/parqueadero/all",
        dataType: "json",
        success: function (response) {
            for (i = 0; i < response.length; i++) {
                tabla.innerHTML += '<tr><td>' + response[i].idParqueadero +
                    '</td><td>' + response[i].numeroParqueadero +
                    '</td><td>' + response[i].tipoDeParqueadero +
                    '</td><td>' + "<a href='#' class='eliminar-link' data-bs-toggle='modal' data-bs-target='#deleteModal' onclick='deleteParqueadero(" + response[i].idParqueadero + ")'> <i class='material-icons'>delete</i></a> <a href='#' class='editar-link' data-bs-toggle='modal' data-bs-target='#updateModal' onclick='loadDataParqueadero(" + response[i].idParqueadero + ")'> <i class='material-icons'>edit_note</i></a>" +
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
        url: "http://localhost:8080/api/parqueadero/all",
        dataType: "json",
        success: function (response) {
            for (i = 0; i < response.length; i++) {
                tabla.innerHTML += '<tr><td>' + response[i].idParqueadero +
                    '</td><td>' + response[i].numeroParqueadero +
                    '</td><td>' + response[i].tipoDeParqueadero +
                    '</td><td>' + "<a href='#' class='eliminar-link' data-bs-toggle='modal' data-bs-target='#deleteModal' onclick='deleteParqueadero(" + response[i].idParqueadero + ")'> <i class='material-icons'>delete</i></a> <a href='#' class='editar-link' data-bs-toggle='modal' data-bs-target='#updateModal' onclick='loadDataParqueadero(" + response[i].idParqueadero + ")'> <i class='material-icons'>edit_note</i></a>" +
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
  
function findByIdParqueadero() {
    var validFeedback = document.getElementById('formId');
    let idParqueaderoAConsultar = $("#inputBuscarParqueadero").val();
    let tabla = document.querySelector("#table");
    $.ajax({
        url: "http://localhost:8080/api/parqueadero/search/" + idParqueaderoAConsultar,
        type: "GET",
        dataType: "json",
        success: function (response) {
            validFeedback.classList.remove("was-validated");
            $("#inputBuscarParqueadero").val("");
            $("#table tbody").remove();
            tabla.innerHTML += '<tr><td>' + response.idParqueadero +
                '</td><td>' + response.numeroParqueadero +
                '</td><td>' + response.tipoDeParqueadero +
                '</td><td>' + "<a href='#' class='eliminar-link' data-bs-toggle='modal' data-bs-target='#deleteModal' onclick='deleteParqueadero(" + response.idParqueadero + ")'> <i class='material-icons'>delete</i></a> <a href='#' class='editar-link' data-bs-toggle='modal' data-bs-target='#updateModal' onclick='loadDataParqueadero(" + response.idParqueadero + ")'> <i class='material-icons'>edit_note</i></a>" +
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


function saveParqueadero() {
    let numeroParqueadero = $("#numeroParqueadero").val();
    let tipoDeParqueadero = $("#tipoDeParqueadero option:selected").val();
    var validFeedback = document.getElementById('formCreate');
    if (numeroParqueadero === '' || tipoDeParqueadero === '') {
        return;
    }
    data = {
        numeroParqueadero: numeroParqueadero,
        tipoDeParqueadero: tipoDeParqueadero
    }
    $.ajax({
        url: "http://localhost:8080/api/parqueadero/save",
        type: "POST",
        data: JSON.stringify(data),
        contentType: "application/json",
        success: function () {
            validFeedback.classList.remove("was-validated");
            $("#createModal").modal("hide");
            $("#numeroParqueadero").val('');
            $("#tipoDeParqueadero").val('');
            reloadEvent();
        },
        error: function (xhr) {
        }
    })
}

function updateParqueadero() {
    var validFeedback = document.getElementById('formUpdate');
    let idParqueadero = $("#updateIdParqueadero").val();
    let numeroParqueadero = $("#updateNumeroParqueadero").val();
    let tipoDeParqueadero = $("#updateTipoDeParqueadero option:selected").val();
    if (idParqueadero === "" || numeroParqueadero === "" || tipoDeParqueadero === "") {
        return;
    }
    data = {
        idParqueadero: idParqueadero,
        numeroParqueadero: numeroParqueadero,
        tipoDeParqueadero: tipoDeParqueadero
    }
    $.ajax({
        url: "http://localhost:8080/api/parqueadero/update",
        type: "PUT",
        data: JSON.stringify(data),
        contentType: "application/json",
        success: function () {
            validFeedback.classList.remove("was-validated");
            $("#updateModal").modal("hide");
            $("#updateIdParqueadero").val('');
            $("#updateNumeroParqueadero").val('');
            $("#updateTipoDeParqueadero").val('');
            reloadEvent();
        },
        error: function (xhr) {
        }
    })
}

function loadDataParqueadero(idParqueadero) {
    $.ajax({
        url: "http://localhost:8080/api/parqueadero/search/" + idParqueadero,
        type: "GET",
        dataType: "json",
        success: function (respuesta) {
            $("#updateIdParqueadero").val(respuesta.idParqueadero);
            $("#updateNumeroParqueadero").val(respuesta.numeroParqueadero);
            $("#updateTipoDeParqueadero").val(respuesta.tipoDeParqueadero).attr('selected', 'selected');
        }
    })
}

function searchParqueadero(idParqueadero) {
    $("#inputBuscarParqueadero").val(idParqueadero);
    findByIdParqueadero();
}

function deleteParqueadero(idParqueadero) {
    $("#deleteConfirmParqueadero").off("click").on("click", function () {
        $.ajax({
            url: "http://localhost:8080/api/parqueadero/delete/" + idParqueadero,
            type: "DELETE",
            success: function () {
                $("#deleteModal").modal("hide");
                reloadEvent();
            }
        })
    })
}
