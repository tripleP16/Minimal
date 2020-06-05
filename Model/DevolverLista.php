<?php
 require('conectorBD.php');
 session_start();
 $id = $_SESSION['user'];
 $con = new ConectorBD('localhost', 'user_prueba', '123456P');
 if ($con->initConexion('minimal')== 'OK'){
    $id_clientes = $con->devolverIdClientes($id);
    $id_productos = $con->devolverProductoLista2($id_clientes['id']);
    $i = 0; 
    $arrayId ;
    while ($id_producto = $id_productos->fetch_assoc()){
        $arrayId[$i]['id_productos']= $id_producto['fk_producto'];
        $i ++ ;   
    }
    $j = 0;

    while (count($arrayId) > $j){
        $productoB = $con->devolverBuscado2($arrayId[$j]['id_productos']);
        $response['productos'][$j]['id']= $productoB['id'];
        $response['productos'][$j]['titulo']= $productoB['titulo'];
        $response['productos'][$j]['descripcion']= $productoB['descripcion'];
        $imagen= $con->devolverImagen( $productoB['id']); 
        $response['productos'][$j]['imagen'] = $imagen['imagen'];

        $j ++;
    }


 }

 echo json_encode($response);
?>