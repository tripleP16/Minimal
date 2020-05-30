<?php
require('conectorBD.php');
require('persona.php');


//$email = $_POST['email'];           /* peticiones post seran anexadas en el futuro cuando el front este listo */
//$contrasena = $_POST['contrasena'];
//$tipo_usuario = $_POST['tipo'];
//$nombre = $_POST['nombre'];
//$apellido = $_POST['apellido'];



$nombre_prueba2 = 'Stratos'; 
$apellido_prueba2 = 'Kakalanos';
$email_prueba2 = 'griego@gmail';
$contrasena_prueba2='1234567';

$response['msg'] ='You have been successfully registered';

$tipo_usuario = false; 

$cliente = new Cliente($nombre_prueba2,$apellido_prueba2,$email_prueba2,$contrasena_prueba2, null, null, null, null, null); 


$con = new ConectorBD('localhost', 'user_prueba', '123456P');

if($con->initConexion('minimal')== 'OK'){
    $id= $con->devolverIdPersonas($cliente->getEmail());
    if ($id['id'] == null){
        if($tipo_usuario == false){
            $con->insertPersona($cliente);
            $id= $con->devolverIdPersonas($cliente->getEmail());
            echo $id['id'];
            $con->insertCliente($id['id']);
            echo "TODO OK";
        }

    }else {
        $response['msg'] = 'Oops it seems that you have already been registered before, please try to sign in ';
    }
    
}else {
    $response['msg'] ='Oops it seems that we have a promblem with the database :(';
}

echo $response['msg'];

?>