<?php
require('conectorBD.php');
error_reporting(0);
$direccion = $_POST['direccion']; 
$tarjeta = $_POST['tarjeta'];
$identificacion = $_POST['identificacion'];
$precio_final = $_POST['precioFinal'];
$response = "";
$con = new ConectorBD('localhost', 'user_prueba', '123456P');
if ($con->initConexion('minimal')== 'OK'){
    session_start();
    $email = $_SESSION['email'];
    $id = $con->devolverIdPersonas($email);
    
    $id_cliente = $con->devolverIdClientes($id['id']); 

    
    if($id_cliente != null){
        $con->insertCompra($precio_final, $tarjeta,$id_cliente['id'], $direccion, $identificacion);
        $con->vaciarCarro($id_cliente['id']);
        $response ="Your transaction has been succesfull, have a nice day ";
    }
}else{
    $response = "Please try again later";
}

echo $response;
?>