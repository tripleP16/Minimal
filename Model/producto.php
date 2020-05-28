<?php

class Producto  {
    private $id; 
    private $titulo; 
    private $descripcion; 
    private $precio ; 
    private $tallas ;
    private $imagenes ;

    function __construct( $titulo, $descripcion, $precio, $tallas, $imagenes)
    {
        $this->titulo = $titulo; 
        $this->descripcion = $descripcion; 
        $this->precio = $precio; 
        $this->tallas = $tallas; 
        $this->imagenes = $imagenes;
    }

    function getID(){
        return $this->id;
    }

    function getTitulo(){
        return $this->titulo;
    }
    function getDescripcion(){
        return $this->descripcion;
    }
    function getPrecio(){
        return $this->precio;
    }
    function getTallas(){
        return $this->tallas;
    }
    function getImagenes(){
        return $this->imagenes;
    }
    


}

?>