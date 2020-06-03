<?php
require('conectorBD.php');
require('persona.php');
error_reporting(0);
session_start();
$contrasenaActual = $_POST['actual'];
$contrasenaNueva = $_POST['nueva'];
$id = $_SESSION['user'];
$email = $_SESSION['email'];
$con = new ConectorBD('localhost', 'user_prueba', '123456P');
if ($con->initConexion('minimal')== 'OK'){
    $contrasenaPrueba = $con->devolverContrasena($email);
    if(password_verify($contrasenaActual, $contrasenaPrueba['contrasena'])){
        $con->updateContrasena($contrasenaNueva, $id);
        $response = 'OK';

    }else{
        $response ="Wrong password, please try again";
    }
}else{
    $response = "Oops something happened "; 
}

echo $response;

?>