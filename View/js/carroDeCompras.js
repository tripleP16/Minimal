var precioTotal = 0;
var check = null;
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



function desplegarCarro(array){
    arr = array;
    $('#tabla').empty();
    if(array == null){
        
        alert("It seems you haven't logged in or your bag it's empty");
        check = true;
    }else{

        var tabla ="" ;
        
        console.log(array.length)
        for (let i = 0; i < array.compra.length; i++) {
            precioTotal += array.compra[i].precio * array.compra[i].unidad;
            tabla+= `<div class="cell large-3">
            <div class="card">
                <a href=""><img href="" src="${array.compra[i].imagen}"></a>
                <div class="card-section">
                    <div class="grid-x ">
                        <div class="cell large-6">
                            <a href=""><p id="title" class="titulo">${array.compra[i].titulo}</p></a>
                        </div>
                        <div class="cell large-2 large-offset-4">
                            <a onclick="eliminarDelCarro(${i})"><img src="img/trash-outline.svg" width="22px"></a>
                        </div>
                    </div>
                    <p class="descrip center"><img class="dollar" src="img/dollar.svg" width="15px">${array.compra[i].precio}</p>
                    <div class="grid-x">
                        <div class="large-7 cell">
                            <p class="descrip">Selected size</p>
                        </div>
                        <div class="cell large-5 descrip" >
                                <select id="${i}" onchange="actualizarCarro(${i})">
                                    <option class="descrip" value="XS" id="XS${i}">XS</option>
                                    <option class="descrip" value="S" id="S${i}">S</option>
                                    <option class="descrip" value="M" id="M${i}">M</option>
                                    <option class="descrip" value="L" id="L${i}">L</option>
                                    <option class="descrip" value="XL" id="XL${i}">XL</option>
                                </select>
                        </div>
                    </div>
                    <div class="grid-x">
                        <div class="large-4 cell">
                            <p class="descrip">Units</p>
                        </div>
                        <div class="large-3 cell"></div>
                        <div class="large-5 cell descrip">
                             <input type="number" class="descrip" value="${array.compra[i].unidad}" oninput="actualizarCarro(${i})" id="unidad${i.toString()}" min="1">
                        </div>
                    </div>
                </div>
            </div>
        </div>`;

        
            
        }
        
        calculoPrecioTotal(array);
        $('#tabla').append(tabla);
        for (let i = 0; i < array.compra.length; i++) {
            document.getElementById(i.toString()).value = array.compra[i].talla;
            comprobarTallas(array.compra[i].id_producto, i);
            
        }
    }
}

function calculoPrecioTotal(arr){
    $('#items').text(arr.compra.length +  " Items");
    $('#sub-total').empty();
    $('#sub-total').append(`<img class="icon" src="img/dollar.svg" width="15px">${precioTotal}`); 
    $('#total').empty();
    $('#total').append(`<img class="icon" src="img/dollar.svg" width="18px">${precioTotal}`); 
}
function ponerTallas(array, id){
    var xs = false; 
    var s = false; 
    var m = false; 
    var l = false;
    var xl = false;
    if(array == null){
        console.log("HOLA");
    }else {
        for (let i = 0; i < array.length; i++) {
            switch (array[i].talla){
                case "XS" : xs = true; 
                            break;
                case "S" : s = true; 
                            break;
                case "M" : m = true; 
                            break;
                case "L" : l = true; 
                            break;
                case "XL" : xl = true; 
                            break;
            }
            
        }
        if(xs == false){
            $("#XS" + id.toString()).remove();
        }
        if(s == false){
            $("#S"+ id.toString()).remove();
        }
        if(m == false){
            $("#M"+id.toString()).remove();
        }
        if(l == false){
            $("#L"+id.toString()).remove();
        }
        if(xl == false){
            $("#XL"+id.toString()).remove();
        }
       
    }
}

function comprobarTallas(id, i){
    var request = $.ajax({
        url: '../Model/comprobarTalla.php',
        type: 'POST',
        dataType:'json',
        data : {id: id}
    })

    request.done(function(data){
        var response = JSON.parse(JSON.stringify(data));
        console.log(response);
        ponerTallas(response, i);
    })
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
}

function eliminarDelCarro(i){
    var r = confirm("Do you really want to remove this item?");
    let id_compra =  arr.compra[i].id_compra;
    if(r== true){
        var request = $.ajax({
            url:'../Model/eliminarProductoCarro.php',
            type:'POST',
            dataType: 'html',
            data : {id_compra:id_compra}
        });
    
        request.done(function(data){
            alert(data);
            location.reload(); 
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
}

function actualizarCarro(i){
    let talla = $('#'+ i.toString()).val(); 
    let unidades = $('#unidad'+i.toString()).val();
    let fk_lote = arr.compra[i].lote;
    let id_cliente = arr.compra[i].id_cliente;
    let fk_producto = arr.compra[i].id_producto;
    let id_compra = arr.compra[i].id_compra;
    arr.compra[i].unidades = unidades;
    console.log( arr.compra[i].unidades);
    var request = $.ajax({
        url: '../Model/actualizarCarro.php',
        type: 'POST',
        dataType:'html',
        data : {talla: talla, unidades:unidades, fk_lote:fk_lote, id_cliente:id_cliente, fk_producto:fk_producto, id:id_compra}
    })

    request.done(function(data){
        console.log(data );
        
        location.reload();
        
    })
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
        
}

function irAcompra(){
    if(check == true){
        alert("You don't have anything in your bag");
    }else{
        window.location.href =  `comprarProductos.html`;
    }

}