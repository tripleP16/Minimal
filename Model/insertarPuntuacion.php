<?php
require('conectorBD.php');
require('producto.php');
require('resena.php');
error_reporting(0);


$puntuacion = $_POST['puntuacion']; 
$comentario = $_POST['comentario'];
$descripcion = $_POST['descripcion']; 
$titulo = $_POST['titulo'];



session_start();
$id = $_SESSION['user'];

$con = new ConectorBD('localhost', 'user_prueba', '123456P');


if ($con->initConexion('minimal')== 'OK'){
    if ($id == null){
        echo "It seems you have not logged in yet";
    }else { 
        $id= $con->devolverIdClientes($id);
        $id_producto = $con->devolverIdProducto($descripcion);
        $comentario = new Comentario($comentario,$id['id'], $id_producto['id']);
        $puntuacion = new Puntuacion($puntuacion, $id['id'], $id_producto['id']);
        $con->insertReview($comentario, $puntuacion, $titulo);

        echo "Your review has been successfuly published";
        
    }


}else{
    echo "Oops something happened "; 
}
?>