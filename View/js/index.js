var arr ;
var c4 = null ;
 function devolverDatos(){
  event.preventDefault();
  var f = 0;
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
      $('#birthday').val(response.fechanac);
      if(response.genero == "F"){
        $('#mujer').attr('checked', true);
      }else {
        $('#hombre').attr('checked', true);
      }
    }else{
      alert(response.msg)
    }
  })
}




function obtenerWish(){
  alert("Hola");
  var request  = $.ajax({
    url: '../Model/DevolverLista.php', 
    type: 'POST', 
    dataType: 'json'
  });

  request.done(function(data){
    var response = JSON.parse(JSON.stringify(data));
    console.log(response);

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
}



function acomodarMenu(){
  $('#usuario').hide(); 
 
}
function buscarBarra(c1){
    let busqueda = c1; 
    var request = $.ajax({
        url: '../Model/barra.php',
        type:'POST',
        dataType: 'html',
        data:{busqueda: busqueda}
    });
    request.done(function(data){
  var response = JSON.parse(data);
  desplegarBusqueda(response);
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

function busquedaParametrizada(genero , valor){
if (genero ==  "w search"){
  genero = "F";
}else {
  genero = "M";
}

event.preventDefault(); 
var request = $.ajax({
  url: '../Model/buscarProducto.php',
  type: 'POST', 
  dataType:'html', 
  data : {genero: genero, valor:valor}
})

request.done(function(data){
  var response = JSON.parse(JSON.stringify(data));
  if (response[0] == null){
    $('#tabla').append(`<h3 class="titulo">We couldn't make any matches please try another search</h3>`);
  }else{
    desplegarBusqueda(response);
    console.log(response);
  }

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

function desplegarBusqueda(array){
  
  console.log(array);
  
  arr = array;
  $('#tabla').empty();
  var tabla = [];
  for(let i = 0 ; i< array.productos.length ; i ++){
    console.log(i);
    tabla += `<div class="cell large-3">
    <div class="card">
        <a href=""><img href="" src="${array.productos[i].imagen}"></a>
        <div class="card-section">
            <a href=""><p id="title" class="titulo"> ${array.productos[i].titulo} </p></a>
            <a href=""><p class="descrip">${array.productos[i].descripcion}</p></a>
            <button class="button secondary descrip expanded producto" onclick="selectProducto(${i})"> See More </button>
        </div>
    </div>
</div>`;
    
  }
  $('#tabla').append(tabla);

  
}
function selectProducto(i){
  console.log(i);

  window.location.href = `seleccionarProducto.html?imagen=${arr.productos[i].imagen}&id=${arr.productos[i].id}&titulo=${arr.productos[i].titulo}&descripcion=${arr.productos[i].descripcion}&campo4${c4}`;
}



$(function(){
    function registrarCliente(){
        event.preventDefault();
        let nombre = $('#name').val();
        let apellido = $('#last').val();
        let email = $('#emailR').val();
        let contrasena = $('#contrasenaR').val();
        var request = $.ajax({
            url:'../Model/registrarCliente.php',
            data: {nombre:nombre, apellido:apellido, email:email, contrasena:contrasena},
            type:'POST', 
            dataType: "html"
        })

        request.done(function(response){
           if (response == 'OK'){
               alert ("You have been successfully registered");
               $('#email').val(email); 
               $('#contrasena').val(contrasena);
               iniciarSesion();

           }else {
               alert(response);
           }

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
    
    }
  
  
    function iniciarSesion(){
        event.preventDefault();
        let email = $('#email').val(); 
        let contrasena = $('#contrasena').val();
        var request = $.ajax({
            url : '../Model/iniciarSesion.php',
            data: {email:email, contrasena:contrasena},
            type: 'POST',
            dataType: 'json'
        })

        request.done(function(response){
            sesion = true;
            if (response.msg == 'OK'){
                alert ("Welcome");
                if (response.user == true){
                    window.location.href = "Admins.html";
                }else{
                    window.location.href = "Clients.html";
                }
                
            }else {
                alert(response.msg);
            }
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
    }
  

  function actualizarContrasena(){
      event.preventDefault();
      let nueva = $('#contrasenaNueva').val();
      let actual = $('#contrasenaActual').val();
      var request = $.ajax({
        url:'../Model/actualizarContrasena.php', 
        type: 'POST', 
        dataType:'html', 
        data : {nueva: nueva, actual:actual}
      })
      request.done(function(response){
        if (response == 'OK'){
          alert("Your password has been updated");
        }else{
          alert(response);
        }
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
    }

      window.recibirParametros = function(){
      var url = new URL(window.location.href);
      var c1 = url.searchParams.get("campo1");
      var c2 = url.searchParams.get("campo2");
      var c3 = url.searchParams.get("campo3");
      c4 = url.searchParams.get("campo4");
      console.log(c4);
        if (c4 == null){
          $('#account').removeAttr('id')
        }else {
          acomodarMenu()
        }
        if ((c2 ==  null) && (c3 == null)){
            buscarBarra(c1);
        }else if ((c2!=null)&&(c3 == null)){
          if (c4 == null){
            window.location.href = `categoriasColecciones.html?campo1=${c1}&campo2=${c2}`
            
          }else{
            
            window.location.href = `categoriasColecciones.html?campo1=${c1}&campo2=${c2}&campo4=${true}`
          }
        }else if(c3 != null){
          if (c4 ==  null){
           window.location.href = `categoriasColecciones.html?campo1=${c1}&campo2=${c2}&campo3=${c3}`;
          }else{
            
            window.location.href = `categoriasColecciones.html?campo1=${c1}&campo2=${c2}&campo3=${c3}&campo4=${true}`;
          }
          
        }
    }



    function actualizarUsuario(){
      event.preventDefault();
      let nombre = $("#nombre").val();
      let apellido = $("#apellido").val();
      let email = $("#email").val();
      let direccion =$("#adress").val();
      let codigo = $("#codigo").val();
      let ciudad = $("#ciudad").val();
      let estado = $("#estado").val();
      let nacimiento = $('#birthday').val();
      let genero = $('input:radio[name=gender]:checked').val()

      var request = $.ajax({
        url:'../Model/actualizarUsuario.php',
        type: 'POST',
        dataType: 'html',
        data: {nombre:nombre, apellido:apellido, email:email, direccion:direccion, codigo:codigo, ciudad:ciudad, estado:estado, nacimiento:nacimiento, genero:genero}
      });

      request.done(function(response){
        alert(response);
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

  
    function registrarAdministrador(){
      event.preventDefault();
      let nombre = $('#name').val();
      let apellido = $('#last').val();
      let email = $('#emailR').val();
      let contrasena = $('#contrasenaR').val();
      var request = $.ajax({
          url:'../Model/registrarAdministrador.php',
          data: {nombre:nombre, apellido:apellido, email:email, contrasena:contrasena},
          type:'POST',
          dataType: "html"
      })
      request.done(function(response){
         if (response == 'OK'){
             alert ("the administrator has successfully registered");
             $('#dialog2').dialog("close");

         }else
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

  $('#registrarAdmin').click(function(){
      if ($('#register')[0].checkValidity()){
          registrarAdministrador();
      }
      $('#name').val("");
      $('#last').val("");
      $('#emailR').val("");
      $('#contrasenaR').val("");
  });



    
    $('#subir').click(function(){
        if ($('#register')[0].checkValidity()){
            registrarCliente();
        }
        $('#name').val("");
        $('#last').val("");
        $('#emailR').val("");
        $('#contrasenaR').val("");
        
    });

  

    $('#iniciar').click(function(){
        if ($('#login2')[0].checkValidity()){
            iniciarSesion();
        }
       /* $('#email').val(""); 
        $('#contrasena').val("");**/
    })

    $('#update').click(function(){
      actualizarUsuario();
    })

    $('#contrasena').click(function(){
      if ($('#pass').is(":visible")){
        actualizarContrasena();
      }
    })

    $('#barra').keypress(function(e){
      if (e.which == 13){
        var busqueda = $('#barrita').val();
        console.log(window.location.href);
        if (window.location.href == "http://localhost/Minimal2/View/index.html" || c4 == true){
          window.location.href = `busqueda.html?campo1=${busqueda}&campo4=${true}`
        }else{
          window.location.href = `busqueda.html?campo1=${busqueda}`
        }
        
        console.log(busqueda);
      }
    })
    $('.search').click(function(e){
      var categoria = $(this).attr("value");
      console.log(categoria);
      if (window.location.href == "http://localhost/Minimal2/View/index.html" || c4 == true){
        window.location.href = `busqueda.html?campo1=${$(this).attr("class")}&campo2=${categoria}&campo4=${true}`
        
      }else{
        window.location.href = `busqueda.html?campo1=${$(this).attr("class")}&campo2=${categoria}`
      }
      
    })


    $('#wish').click(function(){
      window.location.href = `wishlist.html`;

    })

    $('.genero').click(function(){
      if (window.location.href == "http://localhost/Minimal2/View/index.html" || c4 == true){
        window.location.href=`busqueda.html?campo1=${null}&campo2=${null}&campo3=${$(this).attr("id")}&campo4=${true}`;
      }else{
        window.location.href=`busqueda.html?campo1=${null}&campo2=${null}&campo3=${$(this).attr("id")}`;
      }
    })
    

    


});