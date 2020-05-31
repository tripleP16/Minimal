<?php
require('conectorBD.php');
require('producto.php');
require('resena.php');

/*
$puntuacion = $_POST['puntuacion']; 
$comentario = $_POST['comentario'];
$descripcion = $_POST['descripcion']; 

*/

session_start();
$id = $_SESSION['user'];

$descripcion = 'Una camisa blanca muy bonita'; 
$puntuacion =  5;
$comentario = 'Excelente producto';
$con = new ConectorBD('localhost', 'user_prueba', '123456P');


if ($con->initConexion('minimal')== 'OK'){
    if ($id == null){
        echo "It seems you have not logged in yet";
    }else { 
        $id= $con->devolverIdClientes($id);
        $id_producto = $con->devolverIdProducto($descripcion);
        $comentario = new Comentario($comentario,$id['id'], $id_producto['id']);
        $puntuacion = new Puntuacion($puntuacion, $id['id'], $id_producto['id']);
        echo $con->insertReview($comentario, $puntuacion);

        echo "Your review has been successfuly published";
        
    }


}else{
    echo "Oops something happened "; 
}
?>