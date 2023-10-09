///////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////
$(document).ready(function() {
    let tabla=document.querySelector("#table");
    $.ajax({
        url: "http://localhost:8080/api/apartamento/all",
        type: "GET",
        dataType: "json",
        success: function(response){
            $("#table tbody").remove();
            for(i=0;i<response.length;i++){
                tabla.innerHTML += '<tr><td>' + response[i].idApartamento +
                '</td><td>' + response[i].numeroApartamento +
                '</td><td>' + response[i].torre +
                '</td><td>' + "<a href='#' class='eliminar-link' data-bs-toggle='modal' data-bs-target='#deleteModal' onclick='deleteApartamento(\""+response[i].idApartamento+"\")'> <i class='material-icons'>delete</i></a> <a href='#' class='editar-link' data-bs-toggle='modal' data-bs-target='#updateModal' onclick='loadDataApartamento(\""+response[i].idApartamento+"\")'> <i class='material-icons'>edit_note</i></a>" +
                '</td></tr>';
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
  
    var form = document.getElementById('formId');
    var enviarButton = document.getElementById('findIdA');
  
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
function findByIdApartamento(){
    var validFeedback = document.getElementById('formId');
    let idAConsultar=$("#inputBuscar").val();
    let tabla=document.querySelector("#table");
    const toastLiveExample = document.getElementById('liveToast')
    const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample)
    $.ajax({
        url: "http://localhost:8080/api/apartamento/search/"+ idAConsultar,
        type: "GET",
        dataType: "json",
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
                toastBootstrap.show() 
        
                
            }
        }
    })
}



function findAllApartamentos(){
    let tabla=document.querySelector("#table");
    $.ajax({
        url: "http://localhost:8080/api/apartamento/all",
        type: "GET",
        dataType: "json",
        success: function(response){
            $("#table tbody").remove();
            for(i=0;i<response.length;i++){
                tabla.innerHTML += '<tr><td>' + response[i].idApartamento +
                '</td><td>' + response[i].numeroApartamento +
                '</td><td>' + response[i].torre +
                '</td><td>' + "<a href='#' class='eliminar-link' data-bs-toggle='modal' data-bs-target='#deleteModal' onclick='deleteApartamento(\""+response[i].idApartamento+"\")'> <i class='material-icons'>delete</i></a> <a href='#' class='editar-link' data-bs-toggle='modal' data-bs-target='#updateModal' onclick='loadDataApartamento(\""+response[i].idApartamento+"\")'> <i class='material-icons'>edit_note</i></a>" +
                '</td></tr>';
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
        url:"http://localhost:8080/api/apartamento/save",
        type:"POST",
        data: JSON.stringify(data),
        contentType:"application/json",
        success: function(){
            validFeedback.classList.remove("was-validated");
            $("#createModal").modal("hide");
            $("#numberApartamento").val('');
            $("#torre").val('');
            findAllApartamentos()
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
        url:"http://localhost:8080/api/apartamento/update",
        type:"PUT",
        data: JSON.stringify(data),
        contentType:"application/json",
        success: function(){
            validFeedback.classList.remove("was-validated");
            $("#updateModal").modal("hide");
            $("#updateIdApartamento").val('');
            $("#updateNumberApartamento").val('');
            findAllApartamentos()
        },
        error: function(xhr) {
        }
        
    })
}

function loadDataApartamento(idApartamento){
    $.ajax({
        url: "http://localhost:8080/api/apartamento/search/"+ idApartamento,
        type: "GET",
        dataType: "json",
        success: function(respuesta){
            $("#updateIdApartamento").val(respuesta.idApartamento);
            $("#updateNumberApartamento").val(respuesta.numeroApartamento)
            $("#updateTorre").val(respuesta.torre);

        }
    })
}

function searchApartamento(idApartamento){
    $("#inputBuscar").val(idApartamento);
    findByIdApartamento()
}


function deleteApartamento(idApartamento){
    $("#deleteConfirm").off("click").on("click", function(){
        $.ajax({
            url: "http://localhost:8080/api/apartamento/delete/"+idApartamento,
            type: "DELETE",
            success: function(){
                $("#deleteModal").modal("hide");
                findAllApartamentos();   
            }
        })
    })
}
///////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////

