<?php
date_default_timezone_set('America/Caracas');
class Persona {
    private $id;
    private $nombre; 
    private $apellido; 
    private $email; 
    private $contrasena ; 
    private $fechanac; 
    private $direccion;
    private $codigoPostal; 
    private $ciudad ; 
    private $genero; 

    function __construct($nombre, $apellido, $email, $contrasena, $fechanac, $direccion, $codigoPostal, $ciudad, $genero)
    {
        $this->nombre = $nombre; 
        $this->apellido = $apellido; 
        $this->email = $email; 
        $this->contrasena = $contrasena; 
        $this->fechanac = strtotime($fechanac); 
        $this->direccion = $direccion; 
        $this->codigoPostal = $codigoPostal; 
        $this->ciudad = $ciudad; 
        $this->genero = $genero; 
    }
    function getID(){
        return $this->id;
    }

    function getEmail(){
        return $this->email;
    }
    function getDireccion(){
        return $this->direccion;
    }
    function getGenero(){
        return $this->genero;
    }
    function getCiudad(){
        return $this->ciudad;
    }
    function getCodigoPostal(){
        return $this->codigoPostal;
    }
    function getNombre(){
        return $this->nombre;
    }

    function getApellido(){
        return $this->apellido;
    }

    function getContrasena(){
        return $this->contrasena;
    }

    function getFecha_Nac(){
        return $this->fechanac;
    }





}

class Cliente extends Persona{
    private $idCliente; 

    function __construct($nombre, $apellido, $email, $contrasena, $fechanac, $direccion, $codigoPostal, $ciudad, $genero)
    {
        parent::__construct($nombre, $apellido, $email, $contrasena, $fechanac, $direccion, $codigoPostal, $ciudad, $genero);
    }

    function getIdCliente(){
        return $this->idCliente;
    }

}

class Administrador extends Personal{
    
}

class Personal extends Persona{
    
}


?>