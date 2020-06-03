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
      return $fila;
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
      $nombre = $persona->getNombre();
      $apellido = $persona->getApellido() ;
      $email = $persona->getEmail() ;
      $contrasena = $persona->getContrasena();
      $insert = $this->conexion->prepare('INSERT INTO personas (nombre, apellido, email, contrasena) VALUES (?,?,?,?)'); 
      $insert->bind_param("ssss", $nombre ,$apellido,$email , password_hash($contrasena, PASSWORD_DEFAULT));
      $insert->execute();
    }

    function actualizarUsuario($persona, $estado){
      $update = $this->conexion->prepare('UPDATE personas SET nombre = ? , apellido = ?,  email = ?, fechanac = ?, direccion =?, zip_code =? , ciudad = ?, genero = ?, estado =? WHERE id = ?'); 
      $update->bind_param("sssssisssi", $persona->getNombre(), $persona->getApellido(), $persona->getEmail(), date('Y-m-d',$persona->getFecha_Nac()), $persona->getDireccion(), $persona->getCodigoPostal(), $persona->getCiudad(), $persona->getGenero(), $estado, $persona->getID()); 
      $update->execute();

    }


    
    function devolverIdProducto($descripcion){
      $select = $this->conexion->prepare('SELECT id FROM productos  WHERE descripcion = ? '); 
      $select->bind_param("s", $descripcion);
      $select->execute();
      $result = $select->get_result();
      $fila = $result->fetch_assoc();
      return $fila ;
    }

    function insertProducto($producto){
      $insert = $this->conexion->prepare('INSERT INTO productos (titulo, descripcion, precio, genero, categoria) VALUES (?,?,?, ?, ?)');
      $insert->bind_param("ssdss", $producto->getTitulo(), $producto->getDescripcion(), $producto->getPrecio(), $producto->genero(), $producto->getCategoria());
      $insert->execute();
    }

    function insertTallas($talla, $id){
      $insert = $this->conexion->prepare('INSERT INTO tallas (fk_producto, talla) VALUES (?,?)');
      $insert->bind_param("is", $id, $talla);
      $insert->execute();
    }

    function insertReview ($comentario, $puntuacion){
     $insert = $this->conexion->prepare('INSERT INTO puntuaciones (fk_cliente, fk_producto, puntuacion, comentario) VALUES (?,?,?,?)');
      $insert->bind_param("iiis", $comentario->getId(),  $comentario->getIdProducto(), $puntuacion->getPuntuacion(), $comentario->getComentario());
     if( $insert->execute()){
       return 'oK';
     }else {
       return $insert->error;
     }
    }

    function updateContrasena($contrasenaNueva, $id){
      $update = $this->conexion->prepare('UPDATE personas SET contrasena = ? WHERE id = ?'); 
      $update->bind_param('si', password_hash($contrasenaNueva, PASSWORD_DEFAULT), $id);
      $update->execute();
    }

    

    


  
  

}
?>