<?php
require('../Model/conectorBD.php');
require('../Model/producto.php');
require('library.php');
error_reporting(0);

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
    $tallas = $_POST['tallas'];
    for ($i=0; $i <($_POST['contador'] *2) -1  ; $i++) { 
        if($tallas[$i]!=',')
            $con->insertTallas($tallas[$i], $id['id']);
    }
    $con->insertImagen($newImg, $id['id']);
    $response= $newImg;
    echo $response;
  }else{

  }




?>