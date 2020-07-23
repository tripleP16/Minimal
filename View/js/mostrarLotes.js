window.devolverLotes= function(){
    var request = $.ajax({
        url:'../Model/mostrarLotes.php', 
        dataType: '',
        type:"POST"
    });
    request.done(function(data){
        var response = JSON.parse(data);
        desplegarLotes(response);
       
    })
}
var array ;

window.desplegarLotes = function(arr){
    console.log(arr)
    let tabla = `
                    <table id="inventario" class="unstriped"> 
                    <thead  > 
                        <tr>
                            <th style="text-align: center;" BGCOLOR="white"><label class="descrip">Number</label></th>
                            <th style="text-align: center;" BGCOLOR="white"><label class="descrip">Product </label></th>
                            <th style="text-align: center;" BGCOLOR="white"><label class="descrip">Stock</label></th>
                            <th style="text-align: center;" BGCOLOR="white"><label class="descrip">Date</label> </th>
                            <th style="text-align: center;" BGCOLOR="white"><label class="descrip">Size </label></th>
                            <th style="text-align: center;" BGCOLOR="white"><label class="descrip">U/A </label> </th>
                        </tr>
                    </thead>
                    <tbody>`;
    for (let i = 0; i < arr.lotes.length; i++) {
        tabla+= `<tr>
                    <td style="text-align: center;"><label class="descrip bus" id="number">${arr.lotes[i].numero_lote}</label></td>
                    <td style="text-align: center;"><label class="descrip bus" id="product"> ${arr.lotes[i].titulo} </label></td>
                    <td style="text-align: center;"><label class="descrip bus" id="stock">${arr.lotes[i].cant_producto}</label></td>
                    <td style="text-align: center;"><label class="descrip bus" id="date">${arr.lotes[i].fecha_arribo}</label></td>
                    <td style="text-align: center;"><label class="descrip bus" id="size">${arr.lotes[i].talla}</label></td>
                    <td style="text-align: center;"><img src="img/trash-outline.svg" class="deleteB" onclick="eliminarLote(${arr.lotes[i].id})" " style="cursor: pointer;" > <img src="img/square-edit-outline.svg" class="editB" " style="cursor: pointer;" onclick = "actualizarLote(${i})"></td>
                </tr>

                </tbody>`
        
    }

    tabla+=`</table>
            `
    array = arr;
    $('#tabla').append(tabla);
    
}
function actualizarLote(i){
    console.log(array.lotes[i].titulo);
    
}
function eliminarLote(id){
    
}

window.busqueda= function(){
    var input, filter, table, tr, td0, i, txtValue0, td1, td2, td3, td4, txtValue1, txtValue2, txtValue3, txtValue4;
    input = document.getElementById("buscarLote");
    filter = input.value.toUpperCase();
    table = document.getElementById("inventario");
    tr = table.getElementsByTagName("tr");
  
    for (i = 0; i < tr.length; i++) {
      td0 = tr[i].getElementsByTagName("td")[0];
      td1 = tr[i].getElementsByTagName("td")[1];
      td2 = tr[i].getElementsByTagName("td")[2];
      td4 = tr[i].getElementsByTagName("td")[4];
      if (td0 ) {
        txtValue0 = td0.textContent || td0.innerText;
        txtValue1 = td1.textContent || td1.innerText;
        txtValue2 = td2.textContent || td2.innerText;
        txtValue4 = td4.textContent || td4.innerText;
        if ((txtValue0.toUpperCase().indexOf(filter) > -1) || (txtValue1.toUpperCase().indexOf(filter) > -1)|| (txtValue2.toUpperCase().indexOf(filter) > -1)|| (txtValue4.toUpperCase().indexOf(filter) > -1)){
          tr[i].style.display = "";
        } else {
          tr[i].style.display = "none";
        }
      }
    }
}