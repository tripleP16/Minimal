<?php
require('conectorBD.php');
$con = new ConectorBD('localhost', 'user_prueba', '123456P');
if ($con->initConexion('minimal')== 'OK'){
    session_start();
    $id = $_SESSION['user'];
    $id_cliente = $con->devolverIdClientes($id); 
    if($con->devolverLista($id_cliente['id'])== null){
        $con->crearLista($id_cliente['id']);

    }
   
        $con->insertProductLista($_POST['id'], $id_cliente['id']);

        $response = "Your Product has been succesfully added to your wishlist";
    

}

echo $response;
?> 