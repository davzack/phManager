var api="https://phmanager.azurewebsites.net/api"
var path="residente"

$(document).ready(function() {
    let tabla = document.querySelector("#table tbody");
    let idApartamento = $("#propietarioApto").val();
    $.ajax({
        url: `${api}/${path}/all`,
        type: "GET",
        dataType: "json",
        success: function (response) {
            for (i = 0; i < response.length; i++) {
                tabla.innerHTML += '<tr><td>' + response[i].nombre +
                    '</td><td>' + response[i].apellido +
                    '</td><td>' + response[i].telefono +
                    '</td><td>' + response[i].correo +
                    '</td><td>' + response[i].apartamento.idApartamento +
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
