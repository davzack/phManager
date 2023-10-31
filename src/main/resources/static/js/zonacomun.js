
var itemLocalStorage="jwtLlave"
var api="http://localhost:8080/api"
var path="zonacomun"
$(document).ready(function() {
    let tabla = document.querySelector("#table tbody");
    $.ajax({
        url: `${api}/${path}/all`,
        dataType: "json",
        type: "GET",
        headers: {
            Authorization: `Bearer ${localStorage.getItem(itemLocalStorage)}`,
        },
        success: function (response) {
            for (i = 0; i < response.length; i++) {
                tabla.innerHTML += '<tr><td>' + response[i].idZonaComun +
                    '</td><td>' + response[i].nombre +
                    '</td><td>' + response[i].capacidad +
                    '</td><td>' + response[i].descripcion +
                    '</td><td>' + response[i].tarifaPorHora + 
                    '</td><td>' + "<a href='#' class='eliminar-link' data-bs-toggle='modal' data-bs-target='#deleteModal' onclick='deleteZonaComun(" + response[i].idZonaComun + ")'> <i class='material-icons'>delete</i></a> <a href='#' class='editar-link' data-bs-toggle='modal' data-bs-target='#updateModal' onclick='loadDataZonaComun(" + response[i].idZonaComun + ")'> <i class='material-icons'>edit_note</i></a>" +
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
        headers: {
            Authorization: `Bearer ${localStorage.getItem(itemLocalStorage)}`,
        },
        success: function (response) {
            for (i = 0; i < response.length; i++) {
                tabla.innerHTML += '<tr><td>' + response[i].idZonaComun +
                    '</td><td>' + response[i].nombre +
                    '</td><td>' + response[i].capacidad +
                    '</td><td>' + response[i].descripcion +
                    '</td><td>' + response[i].tarifaPorHora +
                    '</td><td>' + "<a href='#' class='eliminar-link' data-bs-toggle='modal' data-bs-target='#deleteModal' onclick='deleteZonaComun(" + response[i].idZonaComun + ")'> <i class='material-icons'>delete</i></a> <a href='#' class='editar-link' data-bs-toggle='modal' data-bs-target='#updateModal' onclick='loadDataZonaComun(" + response[i].idZonaComun + ")'> <i class='material-icons'>edit_note</i></a>" +
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
  
function findByIdZonaComun() {
    var validFeedback = document.getElementById('formId');
    let idZonaComunAConsultar = $("#inputBuscarZonaComun").val();
    let tabla = document.querySelector("#table");
    $.ajax({
        url: `${api}/${path}/search/${idZonaComunAConsultar}`,
        type: "GET",
        dataType: "json",
        headers: {
            Authorization: `Bearer ${localStorage.getItem(itemLocalStorage)}`,
        },
        success: function (response) {
            validFeedback.classList.remove("was-validated");
            $("#inputBuscarZonaComun").val("");
            $("#table tbody").remove();
            tabla.innerHTML += '<tr><td>' + response.idZonaComun +
                '</td><td>' + response.nombre +
                '</td><td>' + response.capacidad +
                '</td><td>' + response.descripcion +
                '</td><td>' + response.tarifaPorHora +
                '</td><td>' + "<a href='#' class='eliminar-link' data-bs-toggle='modal' data-bs-target='#deleteModal' onclick='deleteZonaComun(" + response.idZonaComun + ")'> <i class='material-icons'>delete</i></a> <a href='#' class='editar-link' data-bs-toggle='modal' data-bs-target='#updateModal' onclick='loadDataZonaComun(" + response.idZonaComun + ")'> <i class='material-icons'>edit_note</i></a>" +
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

function saveZonaComun() {
    let nombre = $("#nombreZonaComun").val();
    let capacidad = $("#capacidadZonaComun").val();
    let descripcion = $("#descripcionZonaComun").val();
    let tarifaPorHora = $("#tarifaPorHoraZonaComun").val();
    var validFeedback = document.getElementById('formCreate');
    if (nombre === '' || capacidad === '' || descripcion === '' || tarifaPorHora === '') {
        return;
    }
    data = {
        nombre: nombre,
        capacidad: capacidad,
        descripcion: descripcion,
        tarifaPorHora: tarifaPorHora
    }
    $.ajax({
        url: `${api}/${path}/save`,
        type: "POST",
        data: JSON.stringify(data),
        contentType: "application/json",
        headers: {
            Authorization: `Bearer ${localStorage.getItem(itemLocalStorage)}`,
        },
        success: function () {
            validFeedback.classList.remove("was-validated");
            $("#createModal").modal("hide");
            $("#nombreZonaComun").val('');
            $("#capacidadZonaComun").val('');
            $("#descripcionZonaComun").val('');
            $("#tarifaPorHoraZonaComun").val('');
            reloadEvent();
        },
        error: function (xhr) {
        }
    })
}

function updateZonaComun() {
    var validFeedback = document.getElementById('formUpdate');
    let idZonaComun = $("#updateIdZonaComunZonaComun").val();
    let nombre = $("#updateNombreZonaComun").val();
    let capacidad = $("#updateCapacidadZonaComun").val();
    let descripcion = $("#updateDescripcionZonaComun").val();
    let tarifaPorHora = $("#updateTarifaPorHoraZonaComun").val();
    if (idZonaComun === "" || nombre === "" || capacidad === "" || descripcion === "" || tarifaPorHora === "") {
        return;
    }
    data = {
        idZonaComun: idZonaComun,
        nombre: nombre,
        capacidad: capacidad,
        descripcion: descripcion,
        tarifaPorHora: tarifaPorHora
    }
    $.ajax({
        url: `${api}/${path}/update`,
        type: "PUT",
        data: JSON.stringify(data),
        contentType: "application/json",
        headers: {
            Authorization: `Bearer ${localStorage.getItem(itemLocalStorage)}`,
        },
        success: function () {
            validFeedback.classList.remove("was-validated");
            $("#updateModal").modal("hide");
            $("#updateIdZonaComunZonaComun").val('');
            $("#updateNombreZonaComun").val('');
            $("#updateCapacidadZonaComun").val('');
            $("#updateDescripcionZonaComun").val('');
            $("#updateTarifaPorHoraZonaComun").val('');
            reloadEvent();
        },
        error: function (xhr) {
        }
    })
}

function loadDataZonaComun(idZonaComun) {
    $.ajax({
        url: `${api}/${path}/search/${idZonaComun}`,
        type: "GET",
        dataType: "json",
        headers: {
            Authorization: `Bearer ${localStorage.getItem(itemLocalStorage)}`,
        },
        success: function (respuesta) {
            $("#updateIdZonaComunZonaComun").val(respuesta.idZonaComun);
            $("#updateNombreZonaComun").val(respuesta.nombre)
            $("#updateCapacidadZonaComun").val(respuesta.capacidad);
            $("#updateDescripcionZonaComun").val(respuesta.descripcion);
            $("#updateTarifaPorHoraZonaComun").val(respuesta.tarifaPorHora);
        }
    })
}

function searchZonaComun(idZonaComun) {
    $("#inputBuscarZonaComun").val(idZonaComun);
    findByIdZonaComun();
}

function deleteZonaComun(idZonaComun) {
    $("#deleteConfirmZonaComun").off("click").on("click", function () {
        $.ajax({
            url: `${api}/${path}/delete/${idZonaComun}`,
            type: "DELETE",
            headers: {
                Authorization: `Bearer ${localStorage.getItem(itemLocalStorage)}`,
            },
            success: function () {
                $("#deleteModal").modal("hide");
                reloadEvent();
            }
        })
    })
} 
