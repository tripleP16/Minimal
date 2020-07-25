<?php
require('conectorBD.php');
$id_compra = $_POST['id_compra'];
$con = new ConectorBD('localhost', 'user_prueba', '123456P');
$response = "Please try again later";
if ($con->initConexion('minimal')== 'OK'){
    $con->eliminarCarro($id_compra); 
    $response = 'The product has been removed from your bag ';

}
echo $response;
?>