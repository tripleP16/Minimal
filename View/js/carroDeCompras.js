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

var arr ;

function desplegarCarro(array){
    arr = array;
    $('#tabla').empty();
    if(array == null){
        
        alert("It seems you haven't logged in or your bag it's empty");
    }else{

        var tabla ="" ;
        console.log(array.length)
        for (let i = 0; i < array.compra.length; i++) {
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
                                    <option class="descrip" value="XS" id="XS">XS</option>
                                    <option class="descrip" value="S" id="S">S</option>
                                    <option class="descrip" value="M" id="M">M</option>
                                    <option class="descrip" value="L" id="L">L</option>
                                    <option class="descrip" value="XL" id="XL">XL</option>
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
        $('#tabla').append(tabla);
        for (let i = 0; i < array.compra.length; i++) {
            document.getElementById(i.toString()).value = array.compra[i].talla;
            comprobarTallas(array.compra[i].id_producto);
            
        }
    }
}

function ponerTallas(array){
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
            $("#XS").remove();
        }
        if(s == false){
            $("#S").remove();
        }
        if(m == false){
            $("#M").remove();
        }
        if(l == false){
            $("#L").remove();
        }
        if(xl == false){
            $("#XL").remove();
        }
    }
}

function comprobarTallas(id){
    var request = $.ajax({
        url: '../Model/comprobarTalla.php',
        type: 'POST',
        dataType:'json',
        data : {id: id}
    })

    request.done(function(data){
        var response = JSON.parse(JSON.stringify(data));
        console.log(response);
        ponerTallas(response);
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
            window.location.reload(); 
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
    var request = $.ajax({
        url: '../Model/actualizarCarro.php',
        type: 'POST',
        dataType:'html',
        data : {talla: talla, unidades:unidades, fk_lote:fk_lote, id_cliente:id_cliente, fk_producto:fk_producto, id:id_compra}
    })

    request.done(function(data){
       console.log(data );
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