<?php
require('conectorBD.php');
$con = new ConectorBD('localhost', 'user_prueba', '123456P');
if ($con->initConexion('minimal')== 'OK'){
    $productos = $con->devolverBuscado($_POST['busqueda']); 
    $i=0; 
    while(count($productos) - 2> $i){
        $response['productos'][$i]['id']= $productos['id'];
        $response['productos'][$i]['descripcion']= $productos['descripcion'];
        $response['productos'][$i]['titulo']= $productos['titulo'];
        $imagen= $con->devolverImagen( $productos['id']); 
        $response['productos'][$i]['imagen'] = $imagen['imagen'];
        $i++;
    }
    
    echo json_encode($response);
}

?>