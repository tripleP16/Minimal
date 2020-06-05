<?php
    require('conectorBD.php');

    $response['msg'] = 'OK';
    $id = $_POST['id'];
    $con = new ConectorBD('localhost', 'user_prueba', '123456P');
if ($con->initConexion('minimal')== 'OK'){
    $productos = $con->devolverUnProducto($id);
    $response['titulo']= $productos['titulo'];
    $response['descripcion']= $productos['descripcion'];
    $response['precio']= $productos['precio'];
    $response['genero']= $productos['genero'];
    $response['categoria']= $productos['categoria'];

    echo json_encode($response);
}

?>
