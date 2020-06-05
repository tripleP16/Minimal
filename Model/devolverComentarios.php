<?php
require('conectorBD.php');
require('producto.php');

$con = new ConectorBD('localhost', 'user_prueba', '123456P');

$id = $_POST['id'];
if ($con->initConexion('minimal')== 'OK'){
    $comentarios = $con->devolverComentario($id); 
    $i = 0;
    while ($comentario = $comentarios->fetch_assoc()){
        $response['comentario'][$i]['puntuacion'] = $comentario['puntuacion'];
        $response['comentario'][$i]['comentario'] = $comentario['comentario'];
        $response['comentario'][$i]['titulo'] = $comentario['titulo'];

        $i ++;
    }

}

echo json_encode($response);




?>