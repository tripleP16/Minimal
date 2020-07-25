<?php
require('conectorBD.php');

$con = new ConectorBD('localhost', 'user_prueba', '123456P');
$talla = $_POST['talla'];
$unidades =  $_POST['unidades'];
$fk_lote = $_POST['fk_lote'];
$id_cliente = $_POST['id_cliente'];
$fk_producto =  $_POST['fk_producto'];
$id =  $_POST['id'];
if ($con->initConexion('minimal')== 'OK'){

    $lotes = $con->seleccionarLote($fk_producto,$talla);
    $i = 0;
   
    if($lotes!= null){
        
        while($lote = $lotes->fetch_assoc()){
            $response[$i]['id'] = $lote['id'];
            $i++;
        }

       echo  $con->actualizarCarro($fk_lote, $id_cliente,$unidades,$response[$i-1]['id'], $id);
    }
}
?>