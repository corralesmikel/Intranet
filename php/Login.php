<?php

$received = json_decode($_POST['param']);
// se lee el valor enviado por ajax vía POST

$servername = 'localhost';
$username = 'root';
$password = '';
$dbname = 'intranet';

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

if (!($conn->connect_error)) {
    //  buscamos en la bbdd ese usuario con su password
    $query = 'SELECT * FROM users WHERE username = ? AND password=?';
    $stmt = $conn->prepare($query);
    $stmt->bind_param('ss', $received->Username, $received->Contraseña);
    $result = $stmt->execute();
    $resultset = $stmt->get_result();

    if ($resultset->num_rows == 1)
    // si la consulta recibe un registro de respuesta, es que el user/email es válido
    {
        $row = $resultset->fetch_assoc(); // como va a venir un registro, no necesito meter un for
        $respuesta['error'] = false; // esto es lo que vamos a responder a la petición de javascript si ha habido éxito al validar
        // ahora se crea variable de sesión necesaria para poder mantenernos logueados
        session_start();
        $_SESSION['username'] = $row['username']; // creo una variable de sesión llamada username, donde guardo
        // el nombre de usuario que me ha devuelto la bbdd
    } else // si no obtengo registro de respuesta, es que  hemos fallado con el nombre o contraseña
    {
        // esto es lo que vamos a responder a la petición de javascript si no ha habido éxito al validar
        $respuesta['error'] = true;
        $respuesta['errorType'] = "invalid username/password";
    }
    $stmt->close();
    $conn->close();
}

// Ahora envía la respuesta que contendrá lo que corresponda dependiendo de la condición que se haya cumplido.
header('Content-Type: application/json; charset=utf-8'); // add dthe required header
echo json_encode($respuesta);
