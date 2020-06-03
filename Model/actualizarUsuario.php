<?php
require('conectorBD.php');
require('persona.php');
error_reporting(0);


$nombre = $_POST['nombre'];  
$apellido = $_POST['apellido'];
$email = $_POST['email'];
$nacimiento = $_POST['nacimiento'];
$direccion = $_POST['direccion'];
$codigo_postal = $_POST['codigo'];
$estado = $_POST['estado'];
$ciudad = $_POST['ciudad'];
$genero = $_POST['genero'];

$contrasena = $_POST['contrasena'];
$response ;
session_start();
$id = $_SESSION['user'];
$con = new ConectorBD('localhost', 'user_prueba', '123456P');
if ($con->initConexion('minimal')== 'OK'){
    $persona= new Persona($nombre, $apellido, $email, $contrasena, $nacimiento, $direccion, $codigo_postal, $ciudad, $genero);
    $persona->setID($id); 
    $con->actualizarUsuario($persona,$estado);
    $response =  "Your data has been successfully updated";
}else {
    $response = "Oops something happened "; 
}

echo $response;

?>