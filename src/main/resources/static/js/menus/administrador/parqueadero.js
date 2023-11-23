var api="http://localhost:8080/api"
var path="parqueadero"
$(document).ready(function() {
    let tabla = document.querySelector("#table tbody");
    $.ajax({
        url: `${api}/${path}/all`,
        dataType: "json",
        type: "GET",
        success: function (response) {
            for (i = 0; i < response.length; i++) {
                tabla.innerHTML += '<tr><td>' + response[i].idParqueadero +
                    '</td><td>' + response[i].numeroParqueadero +
                    '</td><td>' + response[i].tipoDeParqueadero +
                    '</td><td>' + "<a href='#' class='eliminar-link' data-bs-toggle='modal' data-bs-target='#deleteModal' onclick='deleteParqueadero(" + response[i].idParqueadero + ")'> <i class='material-icons'>delete</i></a> <a href='#' class='editar-link' data-bs-toggle='modal' data-bs-target='#updateModal' onclick='loadDataParqueadero(" + response[i].idParqueadero + ")'> <i class='material-icons'>edit_note</i></a>" +
                    '</td></tr>';
            }
            tablaMain =$('#table').DataTable({
                responsive: true,
                "language":{
                    url: '/js/datatables/language/esDataTables.json',
                },
                columnDefs: [
                     { responsivePriority: 1, targets: 0 },
                     { responsivePriority: 2, targets: -1 }
                ]
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
        url: `${api}/${path}/all`,
        dataType: "json",
        type: "GET",
        success: function (response) {
            for (i = 0; i < response.length; i++) {
                tabla.innerHTML += '<tr><td>' + response[i].idParqueadero +
                    '</td><td>' + response[i].numeroParqueadero +
                    '</td><td>' + response[i].tipoDeParqueadero +
                    '</td><td>' + "<a href='#' class='eliminar-link' data-bs-toggle='modal' data-bs-target='#deleteModal' onclick='deleteParqueadero(" + response[i].idParqueadero + ")'> <i class='material-icons'>delete</i></a> <a href='#' class='editar-link' data-bs-toggle='modal' data-bs-target='#updateModal' onclick='loadDataParqueadero(" + response[i].idParqueadero + ")'> <i class='material-icons'>edit_note</i></a>" +
                    '</td></tr>';
            }
            tablaMain =$('#table').DataTable({
                responsive: true,
                "language":{
                    url: '/js/datatables/language/esDataTables.json',
                },
                columnDefs: [
                     { responsivePriority: 1, targets: 0 },
                     { responsivePriority: 2, targets: -1 }
                ]
            });
        }
    });
}
  
function findByIdParqueadero() {
    var validFeedback = document.getElementById('formId');
    let idParqueaderoAConsultar = $("#inputBuscarParqueadero").val();
    let tabla = document.querySelector("#table");
    $.ajax({
        url: `${api}/${path}/search/${idParqueaderoAConsultar}`,
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
        url: `${api}/${path}/save`,
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
        url: `${api}/${path}/update`,
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
        url: `${api}/${path}/search/${idParqueadero}`,
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
            url: `${api}/${path}/delete/${idParqueadero}`,
            type: "DELETE",
            success: function () {
                $("#deleteModal").modal("hide");
                reloadEvent();
            }
        })
    })
}
