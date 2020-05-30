<?php
require('conectorBD.php');
require('persona.php');


//$email = $_POST['email'];           /* peticiones post seran anexadas en el futuro cuando el front este listo */
//$contrasena = $_POST['contrasena'];
//$tipo_usuario = $_POST['tipo'];
//$nombre = $_POST['nombre'];
//$apellido = $_POST['apellido'];

$nombre_prueba1= 'Pablo';
$apellido_prueba1= 'Perez';
$email_prueba1 = 'perez51160900@hotmail.com';
$contrasena_prueba1= '160900';
$tipo_usuario = true;
$administardor = new Administrador($nombre_prueba1, $apellido_prueba1, $email_prueba1,$contrasena_prueba1, null , null, null, null, null);
$response['msg'] ='You have been successfully registered';

$con = new ConectorBD('localhost', 'user_prueba', '123456P');

if($con->initConexion('minimal')== 'OK'){
    $id= $con->devolverIdPersonas($administardor->getEmail());
    if ($id['id'] == null){
        if($tipo_usuario == true){
            $con->insertPersona($administardor);
            $id= $con->devolverIdPersonas($administardor->getEmail());
            echo $id['id'];
            $con->insertAdministrador($id['id']);
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