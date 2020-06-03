<?php

class Producto  {
    private $id; 
    private $titulo; 
    private $descripcion; 
    private $precio ; 
    private $tallas ;
    private $imagenes ;
    private $genero;
    private $categoria;
    function __construct( $titulo, $descripcion, $precio, $tallas, $imagenes, $genero, $categoria)
    {
        $this->titulo = $titulo; 
        $this->descripcion = $descripcion; 
        $this->precio = $precio; 
        $this->tallas = $tallas; 
        $this->imagenes = $imagenes;
        $this->genero = $genero;
        $this->categoria = $categoria;
    }

    function getCategoria(){
        return $this->categoria;
    }

    function getGenero(){
        return $this->genero; 
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