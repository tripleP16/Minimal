<?php
require('conectorBD.php');
error_reporting(0);
$id = $_POST['id'];
$talla = $_POST['talla'];
$con = new ConectorBD('localhost', 'user_prueba', '123456P');

if ($con->initConexion('minimal')== 'OK'){
    
    $lotes = $con->seleccionarLote($id,$talla);
    session_start();
    $id = $_SESSION['user'];
    $id_cliente = $con->devolverIdClientes($id); 
    $i = 0;
   
    if($lotes!= null){
        
    while($lote = $lotes->fetch_assoc()){
        $response[$i]['id'] = $lote['id'];
        $i++;
    }
    
    
    $con->anadirCompra($response[$i-1]['id'],$id_cliente['id'], 1);
    $respuesta = "Your product has been added to your bag";
    }else{
       
        $respuesta = "Error";
    }
   
}else{
    
}
echo $respuesta;