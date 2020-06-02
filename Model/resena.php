<?php

class Resena{
    private $id ; 
    private $id_producto; 

    function __construct($id, $id_producto)
    {
        $this->id = $id; 
        $this->id_producto = $id_producto;
    }

    function getId(){
        return $this->id;
    }

    function getIdProducto (){
        return $this->id_producto;
    }

    function setId($id){
        $this->id = $id;
    }

    function setIdProducto($id_producto){
        $this->id_producto = $id_producto;
    }

}

Class Comentario extends Resena {
    private $comentario ; 

    function __construct($comentario, $id, $id_producto)
    {
        parent::__construct($id, $id_producto);
        $this->comentario = $comentario;
    }

    function getComentario(){
        return $this->comentario;
    }

    function setComentario($comentario){
        $this->comentario = $comentario;
    }

}

Class Puntuacion extends Resena {
    private $puntuacion; 
    function __construct($puntuacion, $id, $id_producto)
    {
        parent::__construct($id, $id_producto);
        $this->puntuacion = $puntuacion;
    }

    function getPuntuacion(){
        return $this->puntuacion;
    }

    function setPuntuacion($puntuacion){
        $this->puntuacion = $puntuacion;
    }


}
?>