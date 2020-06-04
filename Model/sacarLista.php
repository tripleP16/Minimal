<?php
require('conectorBD.php');
$con = new ConectorBD('localhost', 'user_prueba', '123456P');
session_start();
$id = $_SESSION['user'];

if ($con->initConexion('minimal')== 'OK'){
    $id_cliente = $con->devolverIdClientes($id); 
    $con->eliminarDeLaLista($_GET['id2'], $id_cliente['id']);
    echo $id_cliente['id'];
}



?>