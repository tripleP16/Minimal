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
      $insert->bind_param("ssdss", $producto->getTitulo(), $producto->getDescripcion(), $producto->getPrecio(), $producto->getGenero(), $producto->getCategoria());
      $insert->execute();
    }

    function insertTallas($talla, $id){
      $insert = $this->conexion->prepare('INSERT INTO tallas (fk_producto, talla) VALUES (?,?)');
      $insert->bind_param("is", $id, $talla);
      $insert->execute();
    }

    function insertReview ($comentario, $puntuacion, $titulo){
     $insert = $this->conexion->prepare('INSERT INTO puntuaciones (fk_cliente, fk_producto, puntuacion, comentario, titulo) VALUES (?,?,?,?, ?)');
      $insert->bind_param("iiiss", $comentario->getId(),  $comentario->getIdProducto(), $puntuacion->getPuntuacion(), $comentario->getComentario(), $titulo);
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


    function insertImagen($ruta, $id){
      $insert = $this->conexion->prepare('INSERT INTO imagenes (fk_producto, imagen) VALUES (?,?)');
      $insert->bind_param("is", $id, $ruta);
      if( $insert->execute()){
        return 'oK';
      }else {
        echo $insert->error;
      }
    }

    function devolverProductoCategoria($genero, $categoria){
      $select = $this->conexion->prepare('SELECT id,titulo,descripcion,precio FROM productos  WHERE genero = ? and categoria=? '); 
      $select->bind_param("ss", $genero, $categoria);
      $select->execute();
      $result = $select->get_result();
      
      return $result ;
    
    }

    function devolverBuscado($busqueda){
      $select = $this->conexion->prepare("SELECT id,titulo,descripcion,precio FROM productos  WHERE descripcion LIKE  CONCAT('%',?,'%') "); 
      $select->bind_param("s", $busqueda);
      $select->execute();
      $result = $select->get_result();
    
      return $result ;
    }

    function devolverImagen($fk_producto){
      $select = $this->conexion->prepare('SELECT imagen FROM imagenes  WHERE fk_producto = ? '); 
      $select->bind_param("i", $fk_producto);
      $select->execute();
      $result = $select->get_result();
      $fila = $result->fetch_assoc();
      return $fila ;
    }


    function crearLista($id){
      $insert = $this->conexion->prepare('INSERT INTO listas_de_deseos (fk_cliente) VALUES (?)');
      $insert->bind_param("i", $id);
      if( $insert->execute()){
        return 'oK';
      }else {
        echo $insert->error;
      }
    }

    function devolverLista($fk_cliente){
      $select = $this->conexion->prepare('SELECT * FROM listas_de_deseos WHERE fk_cliente = ? '); 
      $select->bind_param("i", $fk_cliente);
      $select->execute();
      $result = $select->get_result();
      $fila = $result->fetch_assoc();
      return $fila ;
    }

    function devolverProductoLista ($fk_producto){
      $select = $this->conexion->prepare('SELECT fk_producto FROM lista_de_deseos WHERE fk_producto = ? '); 
      $select->bind_param("i", $fk_producto);
      $select->execute();
      $result = $select->get_result();
      $fila = $result->fetch_assoc();
      return $fila ;
    }

    function devolverProductoLista2 ($fk_lista){
      $select = $this->conexion->prepare('SELECT fk_producto FROM lista_de_deseos WHERE fk_lista = ? '); 
      $select->bind_param("i", $fk_lista);
      $select->execute();
      $result = $select->get_result();
      return $result ;
    }


    function insertProductLista($fk_producto, $fk_lista){
      $insert = $this->conexion->prepare('INSERT INTO lista_de_deseos (fk_lista, fk_producto) VALUES (?, ?)');
      $insert->bind_param("ii", $fk_lista, $fk_producto);
      if( $insert->execute()){
        return 'oK';
      }else {
        echo $insert->error;
      }
    }

    function devolverBuscado2($id){
      $select = $this->conexion->prepare("SELECT id,titulo,descripcion FROM productos  WHERE id = ?"); 
      $select->bind_param("i", $id);
      $select->execute();
      $result = $select->get_result();
      $fila = $result->fetch_assoc();
      return $fila ;
    }


    function eliminarDeLaLista($fk_producto, $fk_cliente){
      $delete = $this->conexion->prepare("DELETE FROM lista_de_deseos WHERE fk_lista = ? and fk_producto =?");
      $delete->bind_param("ii", $fk_cliente, $fk_producto); 
      $delete->execute();
      if( $delete->execute()){
        return 'oK';
      }else {
        echo $delete->error;
      }
    }

    function devolverComentario($fk_producto){
      $select = $this->conexion->prepare("SELECT * FROM puntuaciones WHERE fk_producto = ?");
      $select->bind_param("i",$fk_producto); 
      $select->execute();
      $result = $select->get_result(); 
      return $result;

    }

    function devolerProductoGenero($genero){
      $select = $this->conexion->prepare("SELECT id,titulo,descripcion FROM productos  WHERE genero = ?"); 
      $select->bind_param("s", $genero);
      $select->execute();
      $result = $select->get_result();
 
      return $result;

    }
    function eliminarProductoP($id){
      $delete =$this->conexion->prepare("DELETE FROM puntuaciones WHERE fk_producto = ?");
      $delete->bind_param("i", $id);
      if($delete->execute()){
   
      }else{
        echo $delete->error;
      }

    }

    function eliminarProducto($id){
      $delete =$this->conexion->prepare("DELETE FROM productos WHERE id = ?");
      $delete->bind_param("i", $id);
      if($delete->execute()){
   
      }else{
        echo $delete->error;
      }
    }
    function eliminarProductoTallas($id){
      $delete =$this->conexion->prepare("DELETE FROM tallas WHERE fk_producto = ?");
      $delete->bind_param("i", $id);
      if($delete->execute()){
      
      }else{
        echo $delete->error;
      }
    }
    function eliminarProductoImagenes($id){
      $delete =$this->conexion->prepare("DELETE FROM imagenes WHERE fk_producto = ?");
      $delete->bind_param("i", $id);
      if($delete->execute()){
        
      }else{
        echo $delete->error;
      }
    }
    function eliminarProductoL($id){
      $delete =$this->conexion->prepare("DELETE FROM lista_de_deseos WHERE fk_producto = ?");
      $delete->bind_param("i", $id);
      if($delete->execute()){
        
      }else{
        echo $delete->error;
      }
    }

    function actualizarProducto($id,$titulo,$descripcion,$precio,$categoria,$genero){
      $update = $this->conexion->prepare('UPDATE productos SET titulo = ? , descripcion = ?,  precio = ?, genero = ?, categoria =? WHERE id = ?');
      $update->bind_param("ssdssi", $titulo, $descripcion, $precio,$genero,$categoria,$id);
      $update->execute();
    }

    function devolverUnProducto($id){
      $select = $this->conexion->prepare('SELECT id,titulo,descripcion,precio,genero,categoria FROM productos  WHERE id = ?');
      $select->bind_param("i", $id);
      $select->execute();
      $result = $select->get_result();
      $fila = $result->fetch_assoc();
      return $fila ;
    }

    function insertarLote($fk_producto, $numero_lote, $precio, $talla, $fecha, $stock){
      $insert = $this->conexion->prepare('INSERT INTO lotes (numero_lote, fk_producto, costo, fecha_arribo, cant_producto, talla) VALUES(?,?,?,?,?, ?)');
      $insert->bind_param('iiisis',$numero_lote, $fk_producto,$precio,date('Y-m-d',$fecha), $stock, $talla);
      $insert->execute();
    }

    function devolverLotes(){
      $select = $this->conexion->prepare('SELECT * from lotes'); 
      $select->execute();
      $result = $select->get_result();
      return $result ;
    }

    function devolverTitulo($id){ 
      $select = $this->conexion->prepare('SELECT titulo FROM productos WHERE id =  ?'); 
      $select->bind_param("i", $id);
      $select->execute();
      $result = $select->get_result();
      $fila = $result->fetch_assoc();
      return $fila;
    }

    function eliminarlote($id){
      $delete =$this->conexion->prepare("DELETE FROM lotes WHERE id = ?");
      $delete->bind_param("i", $id);
      if($delete->execute()){
        return true;
      }else{
        return $delete->error;
      }

    }

    function actualizarLote($fk_producto, $numero_lote, $precio, $talla, $fecha, $stock, $id){
      $insert = $this->conexion->prepare('UPDATE lotes SET numero_lote =? ,  costo =?, fecha_arribo =?, cant_producto =?, talla=? WHERE id =?');
      $insert->bind_param('iisisi',$numero_lote,$precio,date('Y-m-d',$fecha), $stock, $talla,$id);
      if($insert->execute()){
        return true;
      }else{
        return $insert->error;
      }

    }

    function devolverTallaLotes($fk_producto){
      $select = $this->conexion->prepare('SELECT talla FROM lotes WHERE fk_producto =? AND cant_producto >0');
      $select->bind_param("i", $fk_producto);
      $select->execute();
      $result = $select->get_result();
 
      return $result;
    }
}
?>
