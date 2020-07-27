window.cargarCarro= function(){
    var request = $.ajax({
        url:'../Model/carroCompras.php',
        type:'POST',
        dataType: 'html',
    });

    request.done(function(data){
        var response = JSON.parse(data);
        desplegarCarro(response);
        console.log(response);
    }); 
    request.fail(function(response){
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
      })
      
}
var precioTotal = 0;
function desplegarCarro(array){
    arr = array;
    $('#tabla').empty();
    $('#tabla').append(`<div class="grid-x">
    <div class="cell large-4">
        <div class="descrip center"><p id="preview"><b>Product</b></p></div>
    </div>
    <div class="large-2 cell"></div>
    <div class="cell large-2">
        <p class="descrip center"><b>Units</b></p>
    </div> 
    <div class="cell large-2">
        <div class="descrip center"><p><b>Price</b></p></div>
    </div>
    <div class="large-2 cell">
        <p class="descrip center"><b>Total</b></p>
    </div>
</div>`)
    if(array == null){
        
        alert("It seems you haven't logged in or your bag it's empty");
        check = true;
    }else{

        var tabla ="" ;
       
        console.log(array.length)
        for (let i = 0; i < array.compra.length; i++) {
            let total = array.compra[i].unidad * array.compra[i].precio;
            precioTotal += total; 
            tabla+= `<div class="grid-x">
            <div class="cell large-4">
                <div class="grid-x">
                    <div class="large-1 cell"></div>
                    <div class="large-5 cell">
                        <div ><img class="imagen" src="${array.compra[i].imagen}" width="120px"></div>
                    </div>
                    <div class="large-1 cell"></div>
                    <div class="large-5 cell">
                        <p class="descrip center tabla">${array.compra[i].titulo}</p>
                    </div>
                </div>  
            </div>
            <div class="large-2 cell"></div>
            <div class="cell large-2">
               <p class="descrip center tabla">${array.compra[i].unidad}</p>
            </div> 
             <div class="cell large-2">
               <p class="descrip center tabla"><img class="icon" src="img/dollar.svg" width="15px">${array.compra[i].precio}</p>
            </div>
             <div class="cell large-2">
               <p class="descrip center tabla"><img class="icon" src="img/dollar.svg" width="15px">${total}</p>
            </div>
        </div>
        
        <hr>`;

        
            
        }
        $('#tabla').append(tabla);
        desplegarPrecioFinal('h');
    } 
    
}
var precioFinal  = 0;
window.desplegarPrecioFinal = function(val){
    let tax = precioTotal*0.12; 
    let recarga = 0 ;
    if (val == 'express'){
        recarga = 5; 
    }
   
    precioFinal = precioTotal + tax + recarga;
    $('#shipping').empty();
    $('#totalI').empty();
    $('#taxes').empty();
    $('.total').empty();
    $('#shipping').append(`<img class="icon" src="img/dollar.svg" width="15px">${recarga}`);
    $('#taxes').append(`<img class="icon" src="img/dollar.svg" width="15px">${tax}`);
    $('.total').append(`<img class="icon" src="img/dollar.svg" width="15px">${precioFinal}`);
    $('#totalI').append(`<img class="icon" src="img/dollar.svg" width="15px">${precioTotal}`);

}

window.cargarDatos =  function(){
    var request = $.ajax({
        url:'../Model/obtenerDatos.php',
        type:'POST',
        dataType:'json'
      })
      request.done(function(response){
        if(response.msg == 'OK'){
          $("#nombre").val(response.nombre);
          $("#apellido").val(response.apellido);
          $("#email").val(response.email);
          $("#adress").val(response.direccion);
          $("#codigo").val(response.codigo_postal);
          $("#ciudad").val(response.ciudad);
          $("#estado").val(response.estado);
        }else{
          alert(response.msg)
        }
      })
}

window.comprar = function(){
    let direccion =  $('#adress').val(); 
    let tarjeta = $('#cardnumber').val();
    let identificacion = $('#cedula').val(); 
    var request = $.ajax({
        url:'../Model/comprar.php', 
        type: 'POST', 
        dataType: 'html', 
        data : {direccion: direccion, tarjeta:tarjeta , identificacion:identificacion, precioFinal:precioFinal}
    })
    request.done(function(response){
        alert(response); 
        window.location.href =`Clients.html`;
    })
}