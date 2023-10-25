///////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////
const itemLocalStorage="jwtLlave"
const api="http://localhost:8080/api"
const path="apartamento"
$(document).ready(function() {
    let tabla=document.querySelector("#table tbody");
    $.ajax({
        url: `${api}/${path}/all`,
        type: "GET",
        dataType: "json",
        headers: {
            Authorization: `Bearer ${localStorage.getItem(itemLocalStorage)}`,
        },
        success: function(response){
            for(i=0;i<response.length;i++){
                tabla.innerHTML += '<tr><td>' + response[i].idApartamento +
                '</td><td>' + response[i].numeroApartamento +
                '</td><td>' + response[i].torre +
                '</td><td>' + "<a href='#' class='eliminar-link' data-bs-toggle='modal' data-bs-target='#deleteModal' onclick='deleteApartamento(\""+response[i].idApartamento+"\")'> <i class='material-icons'>delete</i></a> <a href='#' class='editar-link' data-bs-toggle='modal' data-bs-target='#updateModal' onclick='loadDataApartamento(\""+response[i].idApartamento+"\")'> <i class='material-icons'>edit_note</i></a>" +
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
        headers: {
            Authorization: `Bearer ${localStorage.getItem(itemLocalStorage)}`,
        },
        success: function(response){
            for(i=0;i<response.length;i++){
                tabla.innerHTML += '<tr><td>' + response[i].idApartamento +
                '</td><td>' + response[i].numeroApartamento +
                '</td><td>' + response[i].torre +
                '</td><td>' + "<a href='#' class='eliminar-link' data-bs-toggle='modal' data-bs-target='#deleteModal' onclick='deleteApartamento(\""+response[i].idApartamento+"\")'> <i class='material-icons'>delete</i></a> <a href='#' class='editar-link' data-bs-toggle='modal' data-bs-target='#updateModal' onclick='loadDataApartamento(\""+response[i].idApartamento+"\")'> <i class='material-icons'>edit_note</i></a>" +
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
    }) 
}
function findByIdApartamento(){
    var validFeedback = document.getElementById('formId');
    let idAConsultar=$("#inputBuscar").val();
    let tabla=document.querySelector("#table");
    $.ajax({
        url: `${api}/${path}/search/${idAConsultar}`,
        type: "GET",
        dataType: "json",
        headers: {
            Authorization: `Bearer ${localStorage.getItem(itemLocalStorage)}`,
        },
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

function saveApartamento(){
    let numero=$("#numberApartamento").val();
    let torre=$("#torre").val();
    var validFeedback = document.getElementById('formCreate');
    if(numero===''||torre===''){
        return;
    }
    data={
        numeroApartamento: numero,
        torre: torre,
    }
    $.ajax({
        url: `${api}/${path}/save`,
        type:"POST",
        data: JSON.stringify(data),
        contentType:"application/json", 
        headers: {
            Authorization: `Bearer ${localStorage.getItem(itemLocalStorage)}`,
        },
        success: function(){
            validFeedback.classList.remove("was-validated");
            $("#createModal").modal("hide");
            $("#numberApartamento").val('');
            $("#torre").val('');
            reloadEvent();
        },
        error: function(xhr) {
        }
        
    })
}

function updateApartamento(){
    var validFeedback = document.getElementById('formUpdate');
    let id=$("#updateIdApartamento").val();
    let numero=$("#updateNumberApartamento").val()
    let torre=$("#updateTorre").val();
    if(id===""||numero===""||torre===""){
        return;
    }
    data={
        idApartamento: id,
        numeroApartamento: numero,
        torre: torre
    }
    $.ajax({
        url: `${api}/${path}/update`,
        type:"PUT",
        data: JSON.stringify(data),
        contentType:"application/json",
        headers: {
            Authorization: `Bearer ${localStorage.getItem(itemLocalStorage)}`,
        },
        success: function(){
            validFeedback.classList.remove("was-validated");
            $("#updateModal").modal("hide");
            $("#updateIdApartamento").val('');
            $("#updateNumberApartamento").val('');
            reloadEvent();
        },
        error: function(xhr) {
        }
        
    })
}

function loadDataApartamento(idApartamento){
    $.ajax({
        url: `${api}/${path}/search/${idApartamento}`,
        type: "GET",
        dataType: "json",
        headers: {
            Authorization: `Bearer ${localStorage.getItem(itemLocalStorage)}`,
        },
        success: function(respuesta){
            $("#updateIdApartamento").val(respuesta.idApartamento);
            $("#updateNumberApartamento").val(respuesta.numeroApartamento)
            $("#updateTorre").val(respuesta.torre);
        }
    })
}

function deleteApartamento(idApartamento){
    $("#deleteConfirm").off("click").on("click", function(){
        $.ajax({
            url: `${api}/${path}/delete/${idApartamento}`,
            type: "DELETE",
            headers: {
                Authorization: `Bearer ${localStorage.getItem(itemLocalStorage)}`,
            },
            success: function(){
                $("#deleteModal").modal("hide");
                reloadEvent();  
            }
        })
    })
}
///////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////

