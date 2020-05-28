<?php 
require('persona.php');


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
?>