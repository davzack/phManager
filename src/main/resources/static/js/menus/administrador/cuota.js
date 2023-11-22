var api="http://localhost:8080/api"
var path="cuota"

$(document).ready(function() {
    let tabla = document.querySelector("#table tbody");
    $.ajax({
        url: `${api}/${path}/all`,
        dataType: "json",
        success: function (response) {
            for (i = 0; i < response.length; i++) {
                tabla.innerHTML += '<tr><td>' + response[i].idCuota +
                    '</td><td>' + response[i].monto +
                    '</td><td>' + response[i].tipoDeCuota +
                    '</td><td>' + response[i].estado +
                    '</td><td>' + response[i].apartamento.idApartamento +
                    '</td><td>' + "<a href='#' class='eliminar-link' data-bs-toggle='modal' data-bs-target='#deleteModal' onclick='deleteCuota(" + response[i].idCuota + ")'> <i class='material-icons'>delete</i></a> <a href='#' class='editar-link' data-bs-toggle='modal' data-bs-target='#updateModal' onclick='loadDataCuota(" + response[i].idCuota + ")'> <i class='material-icons'>edit_note</i></a>" +
                    '</td></tr>';
            }
            tablaMain =$('#table').DataTable({
                "language":{
                    url: '//cdn.datatables.net/plug-ins/1.13.6/i18n/es-ES.json', 
                }
            });
        }
    });

    let listIdApartamento = document.querySelector("#apartamentoIdCuota");
    let listIdApartamentoAC= document.querySelector("#updateApartamentoIdCuota");
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
        success: function (response) {
            for (i = 0; i < response.length; i++) {
                tabla.innerHTML += '<tr><td>' + response[i].idCuota +
                    '</td><td>' + response[i].monto +
                    '</td><td>' + response[i].tipoDeCuota +
                    '</td><td>' + response[i].estado +
                    '</td><td>' + response[i].apartamento.idApartamento +
                    '</td><td>' + "<a href='#' class='eliminar-link' data-bs-toggle='modal' data-bs-target='#deleteModal' onclick='deleteCuota(" + response[i].idCuota + ")'> <i class='material-icons'>delete</i></a> <a href='#' class='editar-link' data-bs-toggle='modal' data-bs-target='#updateModal' onclick='loadDataCuota(" + response[i].idCuota + ")'> <i class='material-icons'>edit_note</i></a>" +
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
  
function findByIdCuota() {
    var validFeedback = document.getElementById('formIdA');
    let idCuotaAConsultar = $("#inputBuscarCuota").val();
    let tabla = document.querySelector("#table");
    $.ajax({
        url: `${api}/${path}/search/${idCuotaAConsultar}`,
        type: "GET",
        dataType: "json",
        success: function (response) {
            validFeedback.classList.remove("was-validated");
            $("#inputBuscarCuota").val("");
            $("#table tbody").remove();
            tabla.innerHTML += '<tr><td>' + response.idCuota +
                '</td><td>' + response.monto +
                '</td><td>' + response.tipoDeCuota +
                '</td><td>' + response.estado +
                '</td><td>' + response.apartamento.idApartamento +
                '</td><td>' + "<a href='#' class='eliminar-link' data-bs-toggle='modal' data-bs-target='#deleteModal' onclick='deleteCuota(" + response.idCuota + ")'> <i class='material-icons'>delete</i></a> <a href='#' class='editar-link' data-bs-toggle='modal' data-bs-target='#updateModal' onclick='loadDataCuota(" + response.idCuota + ")'> <i class='material-icons'>edit_note</i></a>" +
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


function saveCuota() {
    let monto = $("#montoCuota").val();
    let tipoDeCuota = $("#tipoDeCuota option:selected").val();
    let estado = $("#estadoCuota option:selected").val();
    let apartamentoId = $("#apartamentoIdCuota option:selected").val();
    var validFeedback = document.getElementById('formCreate');
    if (monto === '' || tipoDeCuota === '' || estado === '' || apartamentoId === '') {
        return;
    }
    data = {
        monto: monto,
        tipoDeCuota: tipoDeCuota,
        estado: estado,
        apartamento: {
            idApartamento: apartamentoId
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
            $("#montoCuota").val('');
            $("#tipoDeCuota").val('');
            $("#estadoCuota").val('');
            $("#apartamentoIdCuota").val('');
            reloadEvent();
        },
        error: function (xhr) {
        }
    })
}

function updateCuota() {
    var validFeedback = document.getElementById('formUpdate');
    let idCuota = $("#updateIdCuota").val();
    let monto = $("#updateMontoCuota").val();
    let tipoDeCuota = $("#updateTipoDeCuota option:selected").val();
    let estado = $("#updateEstadoCuota option:selected").val();
    let apartamentoId = $("#updateApartamentoIdCuota option:selected").val();
    if (idCuota === "" || monto === "" || tipoDeCuota === "" || estado === "" || apartamentoId === "") {
        return;
    }
    data = {
        idCuota: idCuota,
        monto: monto,
        tipoDeCuota: tipoDeCuota,
        estado: estado,
        apartamento: {
            idApartamento: apartamentoId
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
            $("#updateIdCuota").val('');
            $("#updateMontoCuota").val('');
            $("#updateTipoDeCuota").val('');
            $("#updateEstadoCuota").val('');
            $("#updateApartamentoIdCuota").val('');
            reloadEvent();
        },
        error: function (xhr) {
        }
    })
}

function loadDataCuota(idCuota) {
    $.ajax({
        url: `${api}/${path}/search/${idCuota}`,
        type: "GET",
        dataType: "json",
        success: function (respuesta) {
            $("#updateIdCuota").val(respuesta.idCuota);
            $("#updateMontoCuota").val(respuesta.monto)
            $("#updateTipoDeCuota").val(respuesta.tipoDeCuota).attr('selected', 'selected');
            $("#updateEstadoCuota").val(respuesta.estado).attr('selected', 'selected');
            $("#updateApartamentoIdCuota").val(respuesta.apartamento.idApartamento).attr('selected', 'selected');
        }
    })
}

function searchCuota(idCuota) {
    $("#inputBuscarCuota").val(idCuota);
    findByIdCuota();
}

function deleteCuota(idCuota) {
    $("#deleteConfirmCuota").off("click").on("click", function () {
        $.ajax({
            url: `${api}/${path}/delete/${idCuota}`,
            type: "DELETE",
            success: function () {
                $("#deleteModal").modal("hide");
                reloadEvent();
            }
        })
    })
}
