<?php

require('conectorBD.php');
require('persona.php');
error_reporting(0);


$email_prueba1 = $_POST['email'];
$contrasena_prueba1= $_POST['contrasena'];
$con = new ConectorBD('localhost', 'user_prueba', '123456P');
$response['msg'] ='OK';

if ($con->initConexion('minimal')== 'OK'){
    $contrasena = $con->devolverContrasena($email_prueba1);
    if ($contrasena['contrasena']!= null ){
        if(password_verify($contrasena_prueba1,$contrasena['contrasena'])){
            session_start();
            $id = $con->devolverIdPersonas($email_prueba1);
            if ($id['id']!=null){
                $id_administradores = $con->devolverIdAdministradores($id['id']);
                
                if ($id_administradores['id']!=null){
                    $_SESSION['tipo_usuario'] = true;
                    
                }else { 

                    $_SESSION['tipo_usuario'] = false;
                    
                }
                    $_SESSION['user'] =$id['id'];
                    $_SESSION['email']= $email_prueba1;
                    $response['user']=$_SESSION['tipo_usuario'];
            }else{
                $response['msg'] = 'Ooops, we could not find you, sorry please try again';
            }

        }else{
            $response['msg']='Oops wrong password, please try again ';
        }
    }else {
        $response['msg']= 'Oops it seems you are not registered yet, please create an account';
    }
}

echo json_encode($response);


?>