<?php
require('conectorBD.php');
require('producto.php');

$id=$_POST['id'];
$titulo = $_POST['titulo'];
$descripcion = $_POST['descripcion'];
$precio = $_POST['precio'];
$categoria = $_POST['categoria'];
$genero = $_POST['genero'];
$response;

$con = new ConectorBD('localhost', 'user_prueba', '123456P');
if ($con->initConexion('minimal')== 'OK'){
    $productos = $con->devolverUnProducto($id);
    $response['titulo']= $productos['titulo'];
    $response['descripcion']= $productos['descripcion'];
    $response['precio']= $productos['precio'];
    $response['genero']= $productos['genero'];
    $response['categoria']= $productos['categoria'];

    $con->actualizarProducto($id,$titulo,$descripcion,$precio,$categoria,$genero);
    $response =  "Your data has been successfully updated";
    echo json_encode($response);
}
echo $response;

?>
