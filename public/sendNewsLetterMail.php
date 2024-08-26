<?php 
    $jsonData = file_get_contents('php://input');
    $data = json_decode($jsonData, true);

    $to = 'suscripcion@vefrek.com, ariel.corrado27@gmail.com';
    
    $email = utf8_decode($data['email']);
        
    $from = $email;

    $messageHTML = "

    <html>

        <head>
            <style>
                        
            </style>
        </head>

        <body>
            <p class='titulos'> <b> e-mail: </b> </p>
            <p>" . $email . "</p> <br/>
        </body>

    </html>
    
    ";
          
    $cabecera = 'From: ' . ' <' . $from . '> ' . "\r\n" .
        "MIME-Version: 1.0" . "\r\n" .      
        "Content-type:text/html;charset=UTF-8" . "\r\n" .
        'X-Mailer: PHP/' . phpversion();
    
    // Enviar el correo electrónico
    $mail = mail($to,  'Nueva suscripción en Vefrek.com', $messageHTML, $cabecera);

    if ($mail) {
        echo json_encode(array('msg' => 'Correo enviado exitosamente'));
    } else {
        echo json_encode(array('msg' => 'Error al enviar el correo'));
    }
?>