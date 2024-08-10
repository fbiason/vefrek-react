<?php 
    $jsonData = file_get_contents('php://input');
    $data = json_decode($jsonData, true);

    $to = 'administracion@vefrek.com';
    
    $name = utf8_decode($data['name']);
    $email = utf8_decode($data['email']);
    $subject= utf8_decode($data['subject']);
    $message = utf8_decode($data['message']);
        
    $from = $email;

    $messageHTML = "

    <html>

        <head>
            <style>
                        
            </style>
        </head>

        <body>
           
            <p class='titulos'> <b> Asunto: </b> </p>
            <p>" . $subject . "</p> <br/>
            <p class='titulos'> <b> Nombre: </b> </p>
            <p>" . $name . "</p> <br/>
            <p class='titulos'> <b> e-mail: </b> </p>
            <p>" . $email . "</p> <br/>
            <p class='titulos'> <b> Mensaje </b> </p>
            <p>" . $message . "</p> <br/>
                     
        </body>

    </html>
    
    ";
          
    $cabecera = 'From: ' . ' <' . $from . '> ' . "\r\n" .
        "MIME-Version: 1.0" . "\r\n" .      
        "Content-type:text/html;charset=UTF-8" . "\r\n" .
        'X-Mailer: PHP/' . phpversion();
    
    // Enviar el correo electrónico
    $mail = mail($to, $name . ' ' . ' Dejo un mensaje en vefrek.com', $messageHTML, $cabecera);

    if ($mail) {
        echo json_encode(array('msg' => 'Correo enviado exitosamente'));
    } else {
        echo json_encode(array('msg' => 'Error al enviar el correo'));
    }
?>