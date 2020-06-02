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


    function cerrarSesion(){
        var request = $.ajax({
            url : '../Model/cerrarSesion.php',
            dataType: 'json'
        })

        request.done(function(response){
            if (response.msg == 'OK'){
                window.location.href ="index.html";
            }
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

    $('#subir').click(function(){
        if ($('#register')[0].checkValidity()){
            registrarCliente();
        }
    });

    $('#iniciar').click(function(){
        if ($('#login2')[0].checkValidity()){
            iniciarSesion();
        }
       /* $('#email').val("");
        $('#contrasena').val("");**/

    })

    $('#exit').click(function(){
        cerrarSesion();
    })
});
