<?php
    date_default_timezone_set('America/Caracas');
class conectorBD{
    private $host;
    private $user;
    private $password;
    private $conexion;

    function __construct($host, $user, $password){
      $this->host = $host;
      $this->user = $user;
      $this->password = $password;
    }

    function ejecutarQuery($query){
        return $this->conexion->query($query);
      }

    function initConexion($nombre_db){
      $this->conexion = new mysqli($this->host, $this->user, $this->password, $nombre_db);
      if ($this->conexion->connect_error) {
        return "Error:" . $this->conexion->connect_error;
      }else {
        return "OK";
      }
    }

    function insertData($tabla, $data){
        $sql = 'INSERT INTO '.$tabla.' (';
        $i = 1;
        foreach ($data as $key => $value) {
          $sql .= $key;
          if ($i<count($data)) {
            $sql .= ', ';
          }else $sql .= ')';
          $i++;
        }
        $sql .= ' VALUES (';
        $i = 1;
        foreach ($data as $key => $value) {
          $sql .= $value;
          if ($i<count($data)) {
            $sql .= ', ';
          }else $sql .= ');';
          $i++;
        }
        return $this->ejecutarQuery($sql);
      }

      function consultData($tablas, $campos, $condicion = ""){
        $sql = "SELECT ";
        $result = array_keys($campos);
        $ultima_key = end($result);
        foreach ($campos as $key => $value) {
          $sql .= $value;
          if ($key!=$ultima_key) {
            $sql.=", ";
          }else $sql .=" FROM ";
        }

        $result = array_keys($tablas);
        $ultima_key = end($result);
        foreach ($tablas as $key => $value) {
          $sql .= $value;
          if ($key!=$ultima_key) {
            $sql.=", ";
          }else $sql .= " ";
        }

        if ($condicion == "") {
          $sql .= ";";
        }else {
          $sql .= $condicion.";";
        }
        return $this->ejecutarQuery($sql);
      }

}
?>
