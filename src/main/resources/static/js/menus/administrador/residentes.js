var api="https://phmanager.azurewebsites.net/api"
var path="residente"

$(document).ready(function() {
    let tabla = document.querySelector("#table tbody");
    $.ajax({
        url: `${api}/${path}/all`, 
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
                    '</td><td>' + response[i].apartamento.idApartamento +
                    '</td><td>' + "<a href='#' class='eliminar-link' data-bs-toggle='modal' data-bs-target='#deleteModal' onclick='deleteResidente(\"" + response[i].cedula + "\")'> <i class='material-icons'>delete</i></a> <a href='#' class='editar-link' data-bs-toggle='modal' data-bs-target='#updateModal' onclick='loadDataResidente(\"" + response[i].cedula + "\")'> <i class='material-icons'>edit_note</i></a>" +
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
    })

    let listIdApartamento = document.querySelector("#idApartamentoResidente");
    let listIdApartamentoAC= document.querySelector("#updateIdApartamentoResidente");
    $.ajax({
        url: `${api}/apartamento/all`,
        type: "GET",
        dataType: "json",
        success: function(response) {
            for(i=0;i<response.length;i++){
                listIdApartamento.innerHTML += '<option value="' +response[i].idApartamento +'">'
                +'ID: '+ response[i].idApartamento+' #: '
                + response[i].numeroApartamento+'  Torre: '
                + response[i].torre +'</option>';
                listIdApartamentoAC.innerHTML += '<option value="' +response[i].idApartamento +'">'
                +'ID: '+ response[i].idApartamento+' #: '
                + response[i].numeroApartamento+'  Torre: '
                + response[i].torre +'</option>'; 
            }
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
    $.ajax({
        url: `${api}/${path}/all`,
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
                    '</td><td>' + response[i].apartamento.idApartamento +
                    '</td><td>' + "<a href='#' class='eliminar-link' data-bs-toggle='modal' data-bs-target='#deleteModal' onclick='deleteResidente(\"" + response[i].cedula + "\")'> <i class='material-icons'>delete</i></a> <a href='#' class='editar-link' data-bs-toggle='modal' data-bs-target='#updateModal' onclick='loadDataResidente(\"" + response[i].cedula + "\")'> <i class='material-icons'>edit_note</i></a>" +
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
    })
}
function findByIdResidente() {
    var validFeedback = document.getElementById('formId');
    let cedulaAConsultar = $("#inputBuscarResidente").val();
    let tabla = document.querySelector("#table");
    $.ajax({
        url: `${api}/${path}/search/${cedulaAConsultar}`,
        type: "GET",
        dataType: "json",
        success: function (response) {
            validFeedback.classList.remove("was-validated");
            $("#inputBuscarResidente").val("");
            $("#table tbody").remove();
            tabla.innerHTML += '<tr><td>' + response.cedula +
                '</td><td>' + response.nombre +
                '</td><td>' + response.apellido +
                '</td><td>' + response.telefono +
                '</td><td>' + response.correo +
                '</td><td>' + response.fechaNacimiento +
                '</td><td>' + response.tipoResidente +
                '</td><td>' + response.apartamento.idApartamento +
                '</td><td>' + "<a href='#' class='eliminar-link' data-bs-toggle='modal' data-bs-target='#deleteModal' onclick='deleteResidente(\"" + response.cedula + "\")'> <i class='material-icons'>delete</i></a> <a href='#' class='editar-link' data-bs-toggle='modal' data-bs-target='#updateModal' onclick='loadDataResidente(\"" + response.cedula + "\")'> <i class='material-icons'>edit_note</i></a>" +
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


function saveResidente() {
    let cedula = $("#cedulaResidente").val();
    let nombre = $("#nombreResidente").val();
    let apellido = $("#apellidoResidente").val();
    let telefono = $("#telefonoResidente").val();
    let correo = $("#correoResidente").val();
    let fechaNacimiento = $("#fechaNacimientoResidente").val();
    let tipoResidente= $("#tipoResidente option:selected").val();
    let idApartamento = $("#idApartamentoResidente option:selected").val();
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
            $("#tipoResidente").val('');
            $("#idApartamentoResidente").val('');
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
    let idApartamento = $("#updateIdApartamentoResidente option:selected").val();
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
            $("#updateIdApartamentoResidente").val('');
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
            $("#updateIdApartamentoResidente").val(respuesta.apartamento.idApartamento).attr('selected', 'selected');
        }
    })
}

function searchResidente(cedulaResidente) {
    $("#inputBuscarrResidente").val(cedulaResidente);
    findByIdResidente()
}

function deleteResidente(cedulaResidente) {
    $("#deleteConfirmPropietario").off("click").on("click", function () {
        $.ajax({
            url: `${api}/${path}/delete/${cedulaResidente}`,
            type: "DELETE",
            success: function () {
                $("#deleteModal").modal("hide");
                reloadEvent();
            }
        })
    })
}
 