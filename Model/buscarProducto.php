<?php
    require('conectorBD.php');
    $con = new ConectorBD('localhost', 'user_prueba', '123456P');
if ($con->initConexion('minimal')== 'OK'){
    $productos = $con->devolverProductoCategoria($_POST['genero'], $_POST['valor']); 
    $i=0; 
    while($producto = $productos->fetch_assoc()){
        $response['productos'][$i]['id']= $producto['id'];
        $response['productos'][$i]['descripcion']= $producto['descripcion'];
        $response['productos'][$i]['titulo']= $producto['titulo'];
        $imagen= $con->devolverImagen( $producto['id']); 
        $response['productos'][$i]['imagen'] = $imagen['imagen'];
        $response['productos'][$i]['precio']=$producto['precio'];
        $i++;

    }
    
    echo json_encode($response);
}
?>