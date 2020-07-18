<?php
    require('conectorBD.php');
    require('persona.php');
    error_reporting(0);
    session_start();

    $to = $_POST['email'];
    $subject = "Password Recovery ";
    $response['msg'] ="";
    
    $numero = 0;
    for ($i=0; $i < 10 ; $i++) { 
       $g = rand(1,9);
       $numero = $numero * 10 + $g;
    }

    $con = new ConectorBD('localhost', 'user_prueba', '123456P');
if ($con->initConexion('minimal')== 'OK'){
    $id = $con->devolverIdPersonas($to);
    if ($id != null){
        $con->updateContrasena($numero, $id['id']);
        $message = " Your new Password is ".strval($numero);
        mail($to, $subject, $message);
        $response['msg'] = "Your new password has been sent, please verify your inbox";
    }else{
        $response['msg'] = "Oops it seems that you haven't registered ";
    }

    echo json_encode($response);
    
   

}
    

    
?>