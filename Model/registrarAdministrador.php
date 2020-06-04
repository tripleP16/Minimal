<?php
require('conectorBD.php');
require('persona.php');

error_reporting(0);
$nombre = $_POST['nombre'];
$apellido = $_POST['apellido'];
$email = $_POST['email'];
$contrasena = $_POST['contrasena'];

$Administrador = new administrador($nombre,$apellido,$email,$contrasena, null, null, null, null, null);

$con = new ConectorBD('localhost', 'user_prueba', '123456P');

if($con->initConexion('minimal')== 'OK'){
    $id= $con->devolverIdPersonas($Administrador->getEmail());
    if ($id['id'] == null){
          $con->insertPersona($Administrador);
          $id= $con->devolverIdPersonas($Administrador->getEmail());
          $con->insertAdministrador($id['id']);
          $response ='OK';
    }else {
        $response = 'Oops it seems that you have already been registered before, please try to sign in ';
    }
}else {
    $response='Oops it seems that we have a promblem with the database :(';
}

echo $response;

?>
