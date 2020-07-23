<?php
require('conectorBD.php');

$con = new ConectorBD('localhost', 'user_prueba', '123456P');
if ($con->initConexion('minimal')== 'OK'){
    $lotes = $con->devolverLotes();
    $i = 0; 
    while ($lote = $lotes->fetch_assoc()){
        $response['lotes'][$i]['id']= $lote['id'];
        $response['lotes'][$i]['numero_lote']= $lote['numero_lote'];
        $response['lotes'][$i]['fk_producto']= $lote['fk_producto'];
        $aux = $con->devolverTitulo($lote['fk_producto']); 
        $response['lotes'][$i]['titulo']= $aux['titulo'];
        $response['lotes'][$i]['costo']= $lote['costo'];
        $response['lotes'][$i]['fecha_arribo']= $lote['fecha_arribo'];
        $response['lotes'][$i]['cant_producto']= $lote['cant_producto'];
        $response['lotes'][$i]['talla']= $lote['talla'];
        $i++;
    }
    echo json_encode($response);

    
}

    
?>