var api="https://phmanager.azurewebsites.net/api"
var path="residente"

$(document).ready(function() {
    let tabla = document.querySelector("#table tbody");
    let idApartamento = $("#propietarioApto").val();
    $.ajax({
        url: `${api}/${path}/search/all/${idApartamento}`, 
        type: "GET",
        dataType: "json",
        success: function (response) {
            for (i = 0; i < response.length; i++) {
                tabla.innerHTML += '<tr><td>' + response[i].cedula +
                    '</td><td>' + response[i].nombre +
                    '</td><td>' + response[i].apellido +
                    '</td><td>' + response[i].telefono +
                    '</td><td>' + response[i].correo +
                    '</td><td>' + response[i].fechaNacimiento +
                    '</td><td>' + response[i].tipoResidente +
                    '</td><td>' + "<a href='#' class='editar-link' data-bs-toggle='modal' data-bs-target='#updateModal' onclick='loadDataResidente(\"" + response[i].cedula + "\")'> <i class='material-icons'>edit_note</i></a>" +
                    '</td></tr>';
            }
            tablaMain =$('#table').DataTable({
                responsive: true,
                "language":{
                    url: '../js/datatables/language/esDataTables.json',
                },
                columnDefs: [
                     { responsivePriority: 1, targets: 0 },
                     { responsivePriority: 2, targets: -1 }
                ]
            });
        }
    })
}
);
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
  
///////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////

function reloadEvent(){
    var table = $('#table').DataTable();
    table.destroy();
    $("#table tbody").empty(); 
    let tabla=document.querySelector("#table tbody"); 
    let idApartamento = $("#propietarioApto").val(); 
    $.ajax({
        url: `${api}/${path}/search/all/${idApartamento}`,
        type: "GET",
        dataType: "json",
        success: function (response) {
            for (i = 0; i < response.length; i++) {
                tabla.innerHTML += '<tr><td>' + response[i].cedula +
                    '</td><td>' + response[i].nombre +
                    '</td><td>' + response[i].apellido +
                    '</td><td>' + response[i].telefono +
                    '</td><td>' + response[i].correo +
                    '</td><td>' + response[i].fechaNacimiento +
                    '</td><td>' + response[i].tipoResidente +
                    '</td><td>' + "<a href='#' class='editar-link' data-bs-toggle='modal' data-bs-target='#updateModal' onclick='loadDataResidente(\"" + response[i].cedula + "\")'> <i class='material-icons'>edit_note</i></a>" +
                    '</td></tr>';
            }
            tablaMain =$('#table').DataTable({
                responsive: true,
                "language":{
                    url: '../js/datatables/language/esDataTables.json',
                },
                columnDefs: [
                     { responsivePriority: 1, targets: 0 },
                     { responsivePriority: 2, targets: -1 }
                ]
            });
        }
    })
}

function saveResidente() {
    let cedula = $("#cedulaResidente").val();
    let nombre = $("#nombreResidente").val();
    let apellido = $("#apellidoResidente").val();
    let telefono = $("#telefonoResidente").val();
    let correo = $("#correoResidente").val();
    let fechaNacimiento = $("#fechaNacimientoResidente").val();
    let tipoResidente= $("#tipoResidente option:selected").val();
    let idApartamento = $("#propietarioApto").val();
    var validFeedback = document.getElementById('formCreate');
    if (cedula === '' || nombre === '' || apellido === '' || telefono === '' || correo === '' || fechaNacimiento === '' || idApartamento === '' ||tipoResidente === '') {
        return;
    }
    data = {
        cedula: cedula,
        nombre: nombre,
        apellido: apellido,
        telefono: telefono,
        correo: correo,
        fechaNacimiento: fechaNacimiento,
        tipoResidente: tipoResidente,
        apartamento: {
            idApartamento: idApartamento
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
            $("#cedulaResidente").val('');
            $("#nombreResidente").val('');
            $("#apellidoResidente").val('');
            $("#telefonoResidente").val('');
            $("#correoResidente").val('');
            $("#fechaNacimientoResidente").val('');
            $("#tipoResidente").val('');;
            reloadEvent()
        },
        error: function (xhr) {
        }

    })
}

function updateResidente() {
    var validFeedback = document.getElementById('formUpdate');
    let cedula = $("#updateCedulaResidente").val();
    let nombre = $("#updateNombreResidente").val();
    let apellido = $("#updateApellidoResidente").val();
    let telefono = $("#updateTelefonoResidente").val();
    let correo = $("#updateCorreoResidente").val();
    let fechaNacimiento = $("#updateFechaNacimientoResidente").val();
    let tipoResidente= $("#updateTipoResidente option:selected").val();
    let idApartamento = $("#propietarioApto").val();
    if (cedula === "" || nombre === "" || apellido === "" || telefono === "" || correo === "" || fechaNacimiento === "" || idApartamento === "" || tipoResidente === "" ) {
        return;
    }
    data = {
        cedula: cedula,
        nombre: nombre,
        apellido: apellido,
        telefono: telefono,
        correo: correo,
        fechaNacimiento: fechaNacimiento,
        tipoResidente: tipoResidente,
        apartamento: {
            idApartamento: idApartamento
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
            $("#updateCedulaResidente").val('');
            $("#updateNombreResidente").val('');
            $("#updateApellidoResidente").val('');
            $("#updateTelefonoResidente").val('');
            $("#updateCorreoResidente").val('');
            $("#updateFechaNacimientoResidente").val('');
            $("#updateTipoResidente").val('');
            reloadEvent();
        },
        error: function (xhr) {
        }

    })
}

function loadDataResidente(cedulaResidente) {
    $.ajax({
        url: `${api}/${path}/search/${cedulaResidente}`,
        type: "GET",
        dataType: "json",
        success: function (respuesta) {
            $("#updateCedulaResidente").val(respuesta.cedula);
            $("#updateNombreResidente").val(respuesta.nombre)
            $("#updateApellidoResidente").val(respuesta.apellido);
            $("#updateTelefonoResidente").val(respuesta.telefono);
            $("#updateCorreoResidente").val(respuesta.correo);
            $("#updateFechaNacimientoResidente").val(respuesta.fechaNacimiento);
            $("#updateTipoResidente").val(respuesta.tipoResidente).attr('selected', 'selected'); 
        }
    })
}

function searchResidente(cedulaResidente) {
    $("#inputBuscarrResidente").val(cedulaResidente);
    findByIdResidente()
}
