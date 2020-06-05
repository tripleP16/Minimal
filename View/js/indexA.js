
 function devolverDatos(){
    event.preventDefault();
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
  

    
  
  
  
  $(function(){
     
    
      function desplegarBusqueda(array){
        
        console.log(array);
        
        
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
              </div>
          </div>
      </div>`;
          
        }
        $('#tabla').append(tabla);
  
        
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
          window.location.href = `busquedaA.html?campo1=${busqueda}`
          console.log(busqueda);
        }
      })
      $('.search').click(function(e){
        var categoria = $(this).attr("value");
        console.log(categoria);
        window.location.href = `busquedaA.html?campo1=${$(this).attr("class")}&campo2=${categoria}`
        
      })
  
  
      $('.genero').click(function(){
        window.location.href=`busquedaA.html?campo1=${null}&campo2=${null}&campo3=${$(this).attr("id")}`;
      })
      
  
      
  
  
  });