var id , titulo, batch, precio,talla,fecha, stock;

window.recibirParametrosE = function(){
    var url = new URL(window.location.href); 
    id = url.searchParams.get("campo1"); 
    titulo = url.searchParams.get("campo2");
    batch = url.searchParams.get("campo3");
    precio = url.searchParams.get("campo4");
    talla = url.searchParams.get("campo5");
    fecha = url.searchParams.get("campo6");
    stock = url.searchParams.get("campo7");

    desplegarResultado();

}

function desplegarResultado(){
    $('#title').val(titulo);
    $('#batch').val(batch);
    $('#bP').val(precio);
    $('#size').val(talla);
    $('#dateA').val(fecha);
    $('#stock').val(stock);

}


window.actualizarLote = function (){
    event.preventDefault();
    batch = $('#batch').val();
    precio = $('#bP').val();
    talla = $("#size").val();
    fecha = $('#dateA').val();
    stock = $("#stock").val();
    console.log(id);
    var request = $.ajax({
        url: '../Model/actualizarLote.php',
        type:'POST',
        dataType:'json', 
        data: {'stock':stock,'id':id, 'price':precio, 'size':talla, 'fecha':fecha, 'batch':batch, 'pc':id}
    })

    request.done(function(data){
        alert(data.msg);
    });
    request.fail(function( jqXHR, textStatus, errorThrown ){
        
        if (jqXHR.status === 0) {
        
        alert('Not connect: Verify Network.');
        
        } else if (jqXHR.status == 404) {
        
        alert('Requested page not found [404]');
        
        } else if (jqXHR.status == 500) {
        
        alert('Internal Server Error [500].');
        
        } else if (textStatus === 'parsererror') {
        
        alert('Requested JSON parse failed.');
        
        } else if (textStatus === 'timeout') {
        
        alert('Time out error.');
        
        } else if (textStatus === 'abort') {
        
        alert('Ajax request aborted.');
        
        } else {
        
        alert('Uncaught Error: ' + jqXHR.responseText);
        
        }
        
        });
    window.location.href=`mostrarLotes.html`;
}