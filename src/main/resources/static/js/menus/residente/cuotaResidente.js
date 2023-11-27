
$(document).ready(function() {
    let aptoId = $("#apartamentoIDCuota").val();
    let tabla = document.querySelector("#table tbody");
    console.log(aptoId);
    $.ajax({
        url: `http://localhost:8080/api/cuota/search/all/${aptoId}`,
        type: "GET",
        dataType: "json",
        success: function (response) {
            for (i = 0; i < response.length; i++) {
                tabla.innerHTML += '<tr><td>' + response[i].idCuota +
                    '</td><td>' + response[i].monto +
                    '</td><td>' + response[i].tipoDeCuota +
                    '</td><td>' + response[i].estado +
                    '</td></tr>';
            }
            tablaMain =$('#table').DataTable({
                "language":{
                    url: '//cdn.datatables.net/plug-ins/1.13.6/i18n/es-ES.json', 
                }
            });
        }
    });

});