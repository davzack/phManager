var api="https://phmanager.azurewebsites.net/api"
var path="sugerencia"

$(document).ready(function() {
    let tabla = document.querySelector("#table tbody");
    let cedula= $("#cedulaSugerencia").val();
    $.ajax({
        url: `${api}/${path}/search/all/${cedula}`,
        dataType: "json",
        type: "GET",
        success: function (response) {
            for (i = 0; i < response.length; i++) {
                tabla.innerHTML += '<tr><td>' + response[i].idSugerencia +
                    '</td><td>' + response[i].fecha +
                    '</td><td>' + response[i].asunto +
                    '</td><td>' + response[i].descripcion +
                    '</td><td>' + response[i].estado +
                    '</td><td>' + response[i].accionTomada +
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
});

  
