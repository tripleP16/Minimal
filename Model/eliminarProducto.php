<?php
require('conectorBD.php');
$con = new ConectorBD('localhost', 'user_prueba', '123456P');
if ($con->initConexion('minimal')== 'OK'){
    $id = $_POST['id']; 
    $con->eliminarProducto($id); 
    echo "The product has been deleted";

}