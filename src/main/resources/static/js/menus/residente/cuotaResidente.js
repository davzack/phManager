
$(document).ready(function() {
    let aptoId = $("#apartamentoIDCuota").val();
    let tabla = document.querySelector("#table tbody");
    $.ajax({
        url: `http://localhost:8080/api/cuota/search/all/${aptoId}`,
        type: "GET",
        dataType: "json",
        success: function (response) {
            for (i = 0; i < response.length; i++) {
                   var claseEstado = '';
                    if (response[i].estado === 'Pendiente') {
                        claseEstado = 'estado-pendiente';
                    } else if (response[i].estado === 'Pagado') {
                        claseEstado = 'estado-pagado';
                    }
                tabla.innerHTML += '<tr><td>' + response[i].idCuota +
                    '</td><td>' + response[i].monto +
                    '</td><td>' + response[i].tipoDeCuota +
                    '</td><td class="' + claseEstado + '">' + response[i].estado +
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