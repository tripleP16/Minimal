var id = 0;
window.recibirParametrosA =  function(){
    var url = new URL(window.location.href); 
    var titulo = url.searchParams.get("titulo"); 
    id = url.searchParams.get("campo2");
    modificarTitulo(titulo);
    console.log(id);
}

function modificarTitulo(titulo){
    console.log(titulo)
    $('#title').val(titulo)
}



window.anadirLote = function(){
    let batch = $('#batch').val();
    let price = $('#bP').val();
    let size = $("#size").val();
    let fecha = $('#dateA').val();
    let stock = $("#stock").val();
    console.log(id);
    var request = $.ajax({
        url: '../Model/anadirLote.php',
        type:'POST',
        dataType:'json', 
        data: {stock:stock,id:id, price:price, size:size, fecha:fecha, batch:batch}
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

