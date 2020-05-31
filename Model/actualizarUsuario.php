<?php
require('conectorBD.php');
require('persona.php');

/*
$nombre = $_POST['nombre'];  
$apellido = $_POST['apellido'];
$email = $_POST['email'];
$nacimiento = $_POST['nacimiento'];
$direccion = $_POST['direccion'];
$codigo_postal = $_POST['postal'];
$estado = $_POST['estado'];
$ciudad = $_POST['ciudad'];
$genero = $_POST['genero'];
$contrasena = $_POST['contrasena'];
*/

$nombre = 'Pedro';
$apellido = 'Perez';
$email = 'pedro@gmail.com';
$nacimiento = '2000-09-16';
$direccion = 'Santa Monica';
$codigo_postal = 1050;
$estado = 'Nueva Esparta';
$ciudad = 'La Asuncion';
$genero = 'M';
$contrasena = '1234567';
session_start();
$id = $_SESSION['user'];
$con = new ConectorBD('localhost', 'user_prueba', '123456P');
if ($con->initConexion('minimal')== 'OK'){
    $persona= new Persona($nombre, $apellido, $email, $contrasena, $nacimiento, $direccion, $codigo_postal, $ciudad, $genero);
    $persona->setID($id); 
    $con->actualizarUsuario($persona);
    echo "Your data has been updated ";
}else {
    echo "Oops something happened "; 
}

?>