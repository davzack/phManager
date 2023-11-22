var api="http://localhost:8080/api"
var path="propietario"

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
                    '</td><td>' + response[i].apartamento.idApartamento +
                    '</td><td>' + "<a href='#' class='eliminar-link' data-bs-toggle='modal' data-bs-target='#deleteModal' onclick='deletePropietario(\"" + response[i].cedula + "\")'> <i class='material-icons'>delete</i></a> <a href='#' class='editar-link' data-bs-toggle='modal' data-bs-target='#updateModal' onclick='loadDataPropietario(\"" + response[i].cedula + "\")'> <i class='material-icons'>edit_note</i></a>" +
                    '</td></tr>';
            }
            tablaMain =$('#table').DataTable({
                "language":{
                    url: '//cdn.datatables.net/plug-ins/1.13.6/i18n/es-ES.json', 
                }
            });
        }
    })

    let listIdApartamento = document.querySelector("#idApartamentoPropietario");
    let listIdApartamentoAC= document.querySelector("#updateIdApartamentoPropietario");
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
                    '</td><td>' + response[i].apartamento.idApartamento +
                    '</td><td>' + "<a href='#' class='eliminar-link' data-bs-toggle='modal' data-bs-target='#deleteModal' onclick='deletePropietario(\"" + response[i].cedula + "\")'> <i class='material-icons'>delete</i></a> <a href='#' class='editar-link' data-bs-toggle='modal' data-bs-target='#updateModal' onclick='loadDataPropietario(\"" + response[i].cedula + "\")'> <i class='material-icons'>edit_note</i></a>" +
                    '</td></tr>';
            }
            tablaMain =$('#table').DataTable({
                "language":{
                    url: '//cdn.datatables.net/plug-ins/1.13.6/i18n/es-ES.json', 
                }
            });
        }
    })
}
function findByIdPropietario() {
    var validFeedback = document.getElementById('formId');
    let cedulaAConsultar = $("#inputBuscarPropietario").val();
    let tabla = document.querySelector("#table");
    $.ajax({
        url: `${api}/${path}/search/${cedulaAConsultar}`,
        type: "GET",
        dataType: "json",
        success: function (response) {

            validFeedback.classList.remove("was-validated");
            $("#inputBuscarPropietario").val("");
            $("#table tbody").remove();
            tabla.innerHTML += '<tr><td>' + response.cedula +
                '</td><td>' + response.nombre +
                '</td><td>' + response.apellido +
                '</td><td>' + response.telefono +
                '</td><td>' + response.correo +
                '</td><td>' + response.fechaNacimiento +
                '</td><td>' + response.apartamento.idApartamento +
                '</td><td>' + "<a href='#' class='eliminar-link' data-bs-toggle='modal' data-bs-target='#deleteModal' onclick='deletePropietario(\"" + response.cedula + "\")'> <i class='material-icons'>delete</i></a> <a href='#' class='editar-link' data-bs-toggle='modal' data-bs-target='#' onclick='loadDataPropietario(\"" + response.cedula + "\")'> <i class='material-icons'>edit_note</i></a>" +
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

function savePropietario() {
    let cedula = $("#cedulaPropietario").val();
    let nombre = $("#nombrePropietario").val();
    let apellido = $("#apellidoPropietario").val();
    let telefono = $("#telefonoPropietario").val();
    let correo = $("#correoPropietario").val();
    let fechaNacimiento = $("#fechaNacimientoPropietario").val();
    let idApartamento = $("#idApartamentoPropietario option:selected").val();
    var validFeedback = document.getElementById('formCreate');
    if (cedula === '' || nombre === '' || apellido === '' || telefono === '' || correo === '' || fechaNacimiento === '' || idApartamento === '') {
        return;
    }
    data = {
        cedula: cedula,
        nombre: nombre,
        apellido: apellido,
        telefono: telefono,
        correo: correo,
        fechaNacimiento: fechaNacimiento,
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
            $("#cedulaPropietario").val('');
            $("#nombrePropietario").val('');
            $("#apellidoPropietario").val('');
            $("#telefonoPropietario").val('');
            $("#correoPropietario").val('');
            $("#fechaNacimientoPropietario").val('');
            $("#idApartamentoPropietario").val('');
            reloadEvent();
        },
        error: function (xhr) {
        }

    })
}

function updatePropietario() {
    var validFeedback = document.getElementById('formUpdate');
    let cedula = $("#updateCedulaPropietario").val();
    let nombre = $("#updateNombrePropietario").val();
    let apellido = $("#updateApellidoPropietario").val();
    let telefono = $("#updateTelefonoPropietario").val();
    let correo = $("#updateCorreoPropietario").val();
    let fechaNacimiento = $("#updateFechaNacimientoPropietario").val();
    let idApartamento = $("#updateIdApartamentoPropietario option:selected").val();
    if (cedula === "" || nombre === "" || apellido === "" || telefono === "" || correo === "" || fechaNacimiento === "" || idApartamento === "") {
        return;
    }
    data = {
        cedula: cedula,
        nombre: nombre,
        apellido: apellido,
        telefono: telefono,
        correo: correo,
        fechaNacimiento: fechaNacimiento,
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
            $("#updateCedulaPropietario").val('');
            $("#updateNombrePropietario").val('');
            $("#updateApellidoPropietario").val('');
            $("#updateTelefonoPropietario").val('');
            $("#updateCorreoPropietario").val('');
            $("#updateFechaNacimientoPropietario").val('');
            $("#updateIdApartamentoPropietario").val('');
            reloadEvent();
        },
        error: function (xhr) {
        }

    })
}

function loadDataPropietario(cedulaPropietario) {
    $.ajax({
        url: `${api}/${path}/search/${cedulaPropietario}`,
        type: "GET",
        dataType: "json",
        success: function (respuesta) {
            $("#updateCedulaPropietario").val(respuesta.cedula);
            $("#updateNombrePropietario").val(respuesta.nombre)
            $("#updateApellidoPropietario").val(respuesta.apellido);
            $("#updateTelefonoPropietario").val(respuesta.telefono);
            $("#updateCorreoPropietario").val(respuesta.correo);
            $("#updateFechaNacimientoPropietario").val(respuesta.fechaNacimiento);
            $("#updateIdApartamentoPropietario").val(respuesta.apartamento.idApartamento).attr('selected', 'selected');

        }
    })
}

function searchPropietario(cedulaPropietario) {
    $("#inputBuscarPropietario").val(cedulaPropietario);
    findByIdPropietario()
}
function deletePropietario(cedulaPropietario) {
    $("#deleteConfirmPropietario").off("click").on("click", function () {
        $.ajax({
            url: `${api}/${path}/delete/${cedulaPropietario}`,
            type: "DELETE",
            success: function () {
                $("#deleteModal").modal("hide");
                reloadEvent(); 
            }
        })
    })
}
