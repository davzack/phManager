
var api="http://localhost:8080/api"
var path="registrovisita"
$(document).ready(function() {
    let tabla = document.querySelector("#table tbody");
    $.ajax({
        url: `${api}/${path}/all`,
        dataType: "json",
        type: "GET",
        success: function (response) {
            for (i = 0; i < response.length; i++) {
                tabla.innerHTML += '<tr><td>' + response[i].idVisita +
                    '</td><td>' + response[i].nombreVisitante +
                    '</td><td>' + response[i].identificacionVisitante +
                    '</td><td>' + response[i].fechaVisita +
                    '</td><td>' + response[i].residente.cedula +
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
    });

    let listIdResidente = document.querySelector("#residenteCedula");
    let listIdResidenteAC= document.querySelector("#updateResidenteCedula");
    $.ajax({
        url: `${api}/residente/all`,
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
        url: `${api}/${path}/save`,
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


