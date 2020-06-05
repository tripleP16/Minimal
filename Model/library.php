<?php
  function checkLogin($user, $pass, $data){
    foreach ($data as $key => $value) {
      if ($user==$value['username']) {
        if($pass==$value['password']){
          return true;
        }
      }
    }
    return false;
  }

  function getData(){
    $data_file = fopen("./data/users.json","r");
    $data_readed = fread($data_file, filesize("./data/users.json"));
    $data = json_decode($data_readed, true);
    fclose($data_file);
    return $data;
  }

  function getInfo($username, $searched_item){
    foreach (getData() as $key => $value) {
      if ($username==$value['username']) {
        return $value[$searched_item];
      }
    }
  }

  function updateData($username, $field_name, $field_value){
    $data = getData();
    if (isset($data)) {
      foreach ($data as $key => $value) {
        if ($value['username']==$username) {
          $data[$key][$field_name] = $field_value;
        }
      }
      writeDataFile($data);
    }
  }

  function writeDataFile($data_array){
    if (sizeof($data_array)>0) {
      $data_file = fopen("./data/users.json","w");
      fwrite($data_file, json_encode($data_array));
      fclose($data_file);
    }

  }

  function uploadFile($nombreFile, $folder){
    $directorio = $folder."/";
    $nombreImagen = $_FILES[$nombreFile]["name"];
    $archivo_a_subir = $directorio . basename($nombreImagen);
    $tipoArchivo = pathinfo($archivo_a_subir,PATHINFO_EXTENSION);
    $tamanio_archivo = $_FILES[$nombreFile]["size"];
    $exito = true;
    $respuestas;

    if (file_exists($archivo_a_subir)) {
      $respuestas["mensaje"] =  "El archivo ya existe.";
      $exito = false;
    }

    if ($tamanio_archivo > 1000000000000000) {
      $respuestas["mensaje"] =  "El archivo es demasiado grande.";
      $exito = false;
    }

    if($tipoArchivo != "jpg" && $tipoArchivo != "png" && $tipoArchivo != "jpeg" && $tipoArchivo != "doc" && $tipoArchivo != "txt" && $tipoArchivo != "docx" && $tipoArchivo != "pdf" ) {
      $respuestas["mensaje"] = "Solo se permiten archivos JPG, JPEG, PNG, DOC, TXT, DOCX y PDF.";
      $exito = false;
    }

    if ($exito == false) {
      $respuestas["final"] = "Lo sentimos, tu archivo no fue añadido.";
    } else {
      if (move_uploaded_file($_FILES[$nombreFile]["tmp_name"], $archivo_a_subir)) {
        $respuestas["final"] = "El archivo ". basename($nombreImagen). " ha sido añadido.";
        $respuestas["mensaje"] = "";
        $respuestas["newSource"] = $archivo_a_subir;
      } else {
        $respuestas["final"] = "Lo sentimos, tu archivo no fue añadido.";
      }
    }

    return $respuestas;

  }







 ?>
