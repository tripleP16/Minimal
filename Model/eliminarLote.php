<?php 
require('conectorBD.php');
if (isset($_POST['productoC']) ){
    $id = $_POST['productoC'];
}

$con = new ConectorBD('localhost', 'user_prueba', '123456P');
$response ;
if ($con->initConexion('minimal')== 'OK'){
    $con->eliminarlote($id);
    $response = "The data has been succesfully deleted ";

}else {
    $response = "Please try again later";
}

echo $response;

?> 