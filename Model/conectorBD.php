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

    function devolverUsuario($id){
      $select = $this->conexion->prepare('SELECT * FROM personas WHERE id = ?');
      $select->bind_param("i", $id);
      $select->execute();
      $result = $select->get_result();
      $fila = $result->fetch_assoc();
    }

    function devolverContrasena($email){
      $select = $this->conexion->prepare('SELECT contrasena FROM personas  WHERE email = ? '); 
      $select->bind_param("s", $email);
      $select->execute();
      $result = $select->get_result();
      $fila = $result->fetch_assoc();
      
      return $fila ;
    }
    function devolverIdPersonas($email){
      $select = $this->conexion->prepare('SELECT id FROM personas  WHERE email = ? '); 
      $select->bind_param("s", $email);
      $select->execute();
      $result = $select->get_result();
      $fila = $result->fetch_assoc();
      
      return $fila ;
    }
    function devolverIdAdministradores($fk_persona){
      $select = $this->conexion->prepare('SELECT id FROM administradores  WHERE fk_persona = ? '); 
      $select->bind_param("i", $fk_persona);
      $select->execute();
      $result = $select->get_result();
      $fila = $result->fetch_assoc();
      return $fila ;
    }

    function devolverIdClientes($fk_persona){
      $select = $this->conexion->prepare('SELECT id FROM clientes WHERE fk_persona = ? '); 
      $select->bind_param("i", $fk_persona);
      $select->execute();
      $result = $select->get_result();
      $fila = $result->fetch_assoc();
      return $fila ;
    }

    function insertCliente($fk_persona){
      $insert = $this->conexion->prepare('INSERT INTO clientes (fk_persona) VALUES (?)');
      $insert->bind_param("i", $fk_persona); 
      $insert->execute();  

    }

    function insertAdministrador($fk_persona){
      $insert = $this->conexion->prepare('INSERT INTO administradores (fk_persona) VALUES (?)');
      $insert->bind_param("i", $fk_persona); 
      $insert->execute(); 
    }
    function insertPersona($persona){
      $insert = $this->conexion->prepare('INSERT INTO personas (nombre, apellido, email, contrasena) VALUES (?,?,?,?)'); 
      $insert->bind_param("ssss", $persona->getNombre(),$persona->getApellido(), $persona->getEmail(), password_hash($persona->getContrasena(), PASSWORD_DEFAULT));
      $insert->execute();
    }

    function actualizarUsuario($persona){
      $update = $this->conexion->prepare('UPDATE personas SET nombre = ? , apellido = ?,  email = ?, contrasena = ?, fechanac = ?, direccion =?, zip_code =? , ciudad = ?, genero = ? WHERE id = ?'); 
      $update->bind_param("ssssssissi", $persona->getNombre(), $persona->getApellido(), $persona->getEmail(), password_hash($persona->getContrasena(), PASSWORD_DEFAULT), date('Y-m-d',$persona->getFecha_Nac()), $persona->getDireccion(), $persona->getCodigoPostal(), $persona->getCiudad(), $persona->getGenero(), $persona->getID()); 
      $update->execute();

    }

    


  
  

}
?>