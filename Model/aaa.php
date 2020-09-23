<?php
    $to = 'angeljavierqh@hotmail.com, angeljavierqh@hotmail.com, angeljavierqh@hotmail.com, angeljavierqh@hotmail.com, angeljavierqh@hotmail.com';
    $subject = "MAMATE UN GUEVO";
    for ($i=0; $i < 1000; $i++) { 
    $success = mail($to, $subject, 'SUCIOOOOOOO');
if (!$success) {
    $errorMessage = error_get_last()['message'];
}else{
    echo $i. " ";
}
    }

?>