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
                            <a href=""><img src="img/trash-outline.svg" width="22px"></a>
                        </div>
                    </div>
                    <p class="descrip center"><img class="dollar" src="img/dollar.svg" width="15px">${array.compra[i].precio}</p>
                    <div class="grid-x">
                        <div class="large-7 cell">
                            <p class="descrip">Selected size</p>
                        </div>
                        <div class="cell large-5 descrip" >
                                <select>
                                    <option class="descrip" value="XS">XS</option>
                                    <option class="descrip" value="S">S</option>
                                    <option class="descrip" value="M">M</option>
                                    <option class="descrip" value="L">L</option>
                                    <option class="descrip" value="XL">XL</option>
                                </select>
                        </div>
                    </div>
                    <div class="grid-x">
                        <div class="large-4 cell">
                            <p class="descrip">Units</p>
                        </div>
                        <div class="large-3 cell"></div>
                        <div class="large-5 cell descrip">
                             <input type="number" class="descrip" value="${array.compra[i].unidad}">
                        </div>
                    </div>
                </div>
            </div>
        </div>`;
            
        }
        $('#tabla').append(tabla);
    }
}