<?php

$received = json_decode($_POST['Param']);
// Valor POST

$servername = 'localhost';
$username = 'root';
$password = '';
$dbname = 'intranet';

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

if (!($conn->connect_error)) {
    //  Buscamos en la bbdd ese usuario
    $query = 'SELECT * FROM usuarios WHERE Usuario = ?';
    $stmt = $conn->prepare($query);

    $stmt->bind_param('s', $received->Usuario);

    $result = $stmt->execute();

    $resultset = $stmt->get_result();

    // Comprobar HASH
    if ($resultset->num_rows == 1) {
        $row = $resultset->fetch_assoc();
        if (password_verify($received->Contraseña, $row['Contraseña'])) {
            $respuesta['error'] = false;
            session_start();
            $_SESSION['Usuario'] = $row['Usuario'];
            $_SESSION['Rol'] = $row['Rol'];
            $respuesta['Usuario'] = $row['Usuario'];
            $respuesta['Rol'] = $row['Rol'];

        } else {
            // Incorrect password
            $respuesta['error'] = true;
            $respuesta['errorType'] = "invalid username/password";
            // Incorrect password
        }
        // Comprobar HASH

        // Comprobar que el usuario existe
    } else
    {
        $respuesta['error'] = true;
        $respuesta['errorType'] = "invalid username/password";
    }
    // Comprobar que el usuario existe

    // Conexiones
    $stmt->close();
    $conn->close();
    // Conexiones
}

// Datos que se envian al JS
header('Content-Type: application/json; charset=utf-8');  // add dthe required header
echo json_encode($respuesta);
// Datos que se envian al JS