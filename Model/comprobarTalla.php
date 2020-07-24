<?php
require('conectorBD.php');
error_reporting(0);
$id = $_POST['id'];
$con = new ConectorBD('localhost', 'user_prueba', '123456P');

if ($con->initConexion('minimal')== 'OK'){
    $tallas = $con->devolverTallaLotes($id);
    $i = 0;
    if($tallas!= null){
    while($talla = $tallas->fetch_assoc()){
        $response[$i]['talla'] = $talla['talla'];
        $i++;
    }
    }else{
        $response['msg'] = "Error";
    }
   
}
echo json_encode($response);
?>