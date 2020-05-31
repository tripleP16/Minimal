<?php
require('conectorBD.php');
require('producto.php');

/*
$titulo = $_POST['titulo'];                             PETICIONES POSTS PARA JAVASCRIPT
$descripcion = $_POST['descripcion'];
$precio = $_POST['precio'];
$tallas = $_POST['tallas'];
$imagenes = $_POST['imagenes'];
*/

$titulo = 'Camisa';
$descripcion = 'Una camisa blanca muy bonita'; 
$precio = 15.25; 
$tallas = ['XS', 'S','M', 'L', 'XL'];
$imagenes = []; // FALTA INSERTAR LAS IMAGENES DEFINIR SI SE GUARDAN LAS RUTAS O EN BLOB 

session_start();
$id = $_SESSION['user'];
$con = new ConectorBD('localhost', 'user_prueba', '123456P');
if ($con->initConexion('minimal')== 'OK'){
    if ($id == null){
        echo "It seems you have not logged in yet";
    }else { 
        if($con->devolverIdAdministradores($id)== null){
            echo "Access denied, you don't have permission to add a product";
        }else { 
            $producto = new Producto($titulo,$descripcion,$precio,$tallas,$imagenes);
            $con->insertProducto($producto);
            $id = $con->devolverIdProducto($producto->getDescripcion());
            foreach($tallas as $talla){
                $con->insertTallas($talla, $id['id']);
            }
            echo "The product has been successfuly inserted";
        }
    }


}else{
    echo "Oops something happened "; 
}
?>