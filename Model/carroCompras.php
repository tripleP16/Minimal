<?php
require('conectorBD.php');
error_reporting(0);
$con = new ConectorBD('localhost', 'user_prueba', '123456P');
if ($con->initConexion('minimal')== 'OK'){
    session_start();
    $email = $_SESSION['email'];
    $id = $con->devolverIdPersonas($email);
    
    $id_cliente = $con->devolverIdClientes($id['id']); 

    
    if($id_cliente != null){
        $i = 0;
         $compras = $con->devolverLoteCantidad($id_cliente['id']);
        
        // echo $compra['fk_lote'][1];
        while ($compra = $compras->fetch_assoc()){
          
            $response['compra'][$i]['lote'] = $compra['fk_lote'];
            $response['compra'][$i]['unidad'] = $compra['unidades'];
            $producto = $con->devolverClaveProducto( $response['compra'][$i]['lote']);
            $response['compra'][$i]['talla'] = $producto['talla'];
            $productoImagen = $con->devolverUnProducto($producto['fk_producto']);
            $productoImagen2 = $con->devolverImagen($producto['fk_producto']);
            $response['compra'][$i]['imagen']=$productoImagen2['imagen'];
            $response['compra'][$i]['titulo']=$productoImagen['titulo'];
            $response['compra'][$i]['precio']=$productoImagen['precio'];
            $i ++;
            
        }
        
    }
    
}

echo json_encode($response);
?>