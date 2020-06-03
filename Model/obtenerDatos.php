<?php
    require('conectorBD.php');
    require('persona.php');
    error_reporting(0);
    session_start();
    $id = $_SESSION['user'];
    $response['msg'] = 'OK';
    $con = new ConectorBD('localhost', 'user_prueba', '123456P');
if ($con->initConexion('minimal')== 'OK'){
    $persona = $con->devolverUsuario($id);
    $response['nombre']=$persona['nombre'];
    $response['apellido']=$persona['apellido'];
    $response['email']=$persona['email'];
    $response['fechanac']=$persona['fechanac'];
    $response['direccion']=$persona['direccion'];
    $response['codigo_postal']= $persona['zip_code'];
    $response['ciudad']=$persona['ciudad'];
    $response['genero']=$persona['genero'];
    $response['estado']=$persona['estado'];

}else{
    $response['msg'] = 'Ooops it seems that we have a problem, try again later';
}

echo json_encode($response);

?>