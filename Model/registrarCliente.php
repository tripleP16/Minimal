<?php
require('conectorBD.php');
require('persona.php');

error_reporting(0);
$email = $_POST['email'];           
$contrasena = $_POST['contrasena'];
$nombre = $_POST['nombre'];
$apellido = $_POST['apellido'];


$tipo_usuario = false; 

$cliente = new Cliente($nombre,$apellido,$email,$contrasena, null, null, null, null, null); 


$con = new ConectorBD('localhost', 'user_prueba', '123456P');

if($con->initConexion('minimal')== 'OK'){
    $id= $con->devolverIdPersonas($cliente->getEmail());
    if ($id['id'] == null){
        if($tipo_usuario == false){
            $con->insertPersona($cliente);
            $id= $con->devolverIdPersonas($cliente->getEmail());
            $con->insertCliente($id['id']);
            $response ='OK';
        }

    }else {
        $response = 'Oops it seems that you have already been registered before, please try to sign in ';
    }
    
}else {
    $response='Oops it seems that we have a promblem with the database :(';
}

echo $response;

?>