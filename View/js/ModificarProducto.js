function muestraMensaje() {
    let genero = $('input:radio[name=gender]:checked').val()
  }
  
    function actualizarProducto(){
        event.preventDefault();
        let titulo = $("#inputTituloProducto").val();
        let descripcion = $("#InputDescripcion").val();
        let precio = $("#InputPrecio").val();
        let box = document.getElementById('categoria');
        let categoria = box.options[box.selectedIndex].text;
        let genero = $('input:radio[name=gender]:checked').val();
        var request = $.ajax({
          url:'../Model/actualizarProducto.php',
          type: 'POST',
          dataType: 'html',
          data: {titulo:titulo, descripcion:descripcion, precio:precio, categoria:categoria, genero:genero, id:id}
        });
  
        request.done(function(response){
          alert(response);
        });
        request.fail(function( jqXHR, textStatus, errorThrown ){
            if (jqXHR.status === 0)
                alert('Not connect: Verify Network.');
            else if (jqXHR.status == 404)
                alert('Requested page not found [404]');
            else if (jqXHR.status == 500)
                alert('Internal Server Error [500].');
            else if (textStatus === 'parsererror')
                alert('Requested JSON parse failed.');
            else if (textStatus === 'timeout')
                alert('Time out error.');
            else if (textStatus === 'abort')
                alert('Ajax request aborted.');
            else
                alert('Uncaught Error: ' + jqXHR.responseText);
        });
    }


    function cambiarImagen(imagen){
        $('.orbit-image').attr('src', imagen);
    }
    var id ;
    function mostrarProducto(){
        var url = new URL(window.location.href);
         id = url.searchParams.get("campo1");
        var imagen = url.searchParams.get("campo2");

        cambiarImagen(imagen);
        event.preventDefault();
        var request = $.ajax({
            url : '../Model/ModificarProducto.php',
            type: 'POST',
            dataType: 'json',
            data: {id:id}
        })
        request.done(function(response){
            if (response.msg == 'OK'){
                $("#inputTituloProducto").val(response.titulo);
                $("#InputDescripcion").val(response.descripcion);
                $("#InputPrecio").val(response.precio);
                if (response.categoria=="Tops")
                    $("#categoria option[value="+ "TOPS" +"]").attr("selected",true);
                else if (response.categoria=="Bottoms")
                    $("#categoria option[value="+ "BOTTOMS" +"]").attr("selected",true);
                else if (response.categoria=="Dresses")
                    $("#categoria option[value="+ "DRESSES" +"]").attr("selected",true);
                else if (response.categoria=="Hodies")
                    $("#categoria option[value="+ "HOODIES" +"]").attr("selected",true);
                else if (response.categoria=="Hats")
                    $("#categoria option[value="+ "HATS" +"]").attr("selected",true);
  
                if (response.genero=="M")
                    $("#mujer").prop("checked", true);
                else if (response.genero=="F")
                    $("#hombre").prop("checked", true);
            }
        });
        request.fail(function( jqXHR, textStatus, errorThrown ){
          alert("mas problemas");
            if (jqXHR.status === 0)
                alert('Not connect: Verify Network.');
            else if (jqXHR.status == 404)
                alert('Requested page not found [404]');
            else if (jqXHR.status == 500)
                alert('Internal Server Error [500].');
            else if (textStatus === 'parsererror')
                alert('Requested JSON parse failed.');
            else if (textStatus === 'timeout')
                alert('Time out error.');
            else if (textStatus === 'abort')
                alert('Ajax request aborted.');
            else
                alert('Uncaught Error: ' + jqXHR.responseText);
        });
    }
  