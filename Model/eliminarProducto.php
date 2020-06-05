<?php
require('conectorBD.php');
$con = new ConectorBD('localhost', 'user_prueba', '123456P');
if ($con->initConexion('minimal')== 'OK'){
    $id = $_GET['id']; 

    $con->eliminarProductoP($id);
    $con->eliminarProductoImagenes($id);
    $con->eliminarProductoTallas($id);
    $con->eliminarProductoL($id);
    $con->eliminarProducto($id); 
    echo "The product has been deleted";

}