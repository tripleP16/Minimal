<?php
require('../Model/conectorBD.php');
require('../Model/producto.php');
require('library.php');

$response ='Lo hiciste';
$respuestas = uploadFile('profile_img', '../View/img');
  if(isset($respuestas["newSource"])){
    $newImg = $respuestas["newSource"];
  }else {
    $newImg = null;
  }

  $producto = new Producto($_POST['titulo'], $_POST['descripcion'], $_POST['precio'], $_POST['tallas'], $newImg,$_POST['genero'], $_POST['categoria']);
  $con = new ConectorBD('localhost', 'user_prueba', '123456P');
  if ($con->initConexion('minimal')== 'OK'){
    $con->insertProducto($producto);
    $id = $con->devolverIdProducto($producto->getDescripcion());
    echo $id['id'];
  }else{

  }
echo $response ;



?>