<?php
require('conectorBD.php');
error_reporting(0);
    $id = $_POST['pc'];
    $fk_producto= $_POST["id"]; 
    $numero_lote = $_POST['batch'];
    $precio = $_POST['price'];
    $talla = $_POST['size'];
    $fecha = strtotime($_POST['fecha']);
    $stock = $_POST['stock'];
    $response ;
    $con = new ConectorBD('localhost', 'user_prueba', '123456P');
    if ($con->initConexion('minimal')== 'OK'){
        $con->actualizarLote($fk_producto, $numero_lote, $precio, $talla, $fecha, $stock,$id);
        $response['msg'] = "The batch has been succesfully updated";

    }else{
        $response['msg'] = "Try again later";
    }
   
    echo json_encode($response);
?>