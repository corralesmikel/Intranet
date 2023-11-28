<?php

$received = json_decode($_POST['Param']);
$respuesta = array(); // Inicializar el array de respuesta

// Filtros y validaciones
$mal = 0;
// Filtros y validaciones

// Filtro Usuario: Solo se permiten caracteres alfanuméricos
if (!preg_match('/^[a-zA-Z0-9]+$/', $received->Usuario)) {
    $respuesta['error'] = true;
    $respuesta['errorType'] = "invalid characters in Username";
    $mal = 1;
}
// Filtro Usuario: Solo se permiten caracteres alfanuméricos

// Anti script
if (preg_match('/<script.*>.*<\/script>/i', $received->Usuario)) {
    $respuesta['error'] = true;
    $respuesta['errorType'] = "scripts not allowed in Username";
    $mal = 1;
}
if (preg_match('/<script.*>.*<\/script>/i', $received->Contraseña)) {
    $respuesta['error'] = true;
    $respuesta['errorType'] = "scripts not allowed in Password";
    $mal = 1;
}
// Anti script

// Anti null
if ($received->Usuario === null || trim($received->Usuario) === "") {
    $respuesta['error'] = true;
    $respuesta['errorType'] = "Username cannot be empty";
    $mal = 1;
}
if ($received->Contraseña === null || trim($received->Contraseña) === "") {
    $respuesta['error'] = true;
    $respuesta['errorType'] = "Password cannot be empty";
    $mal = 1;
}
// Anti null

if ($mal === 1) {
    // Datos que se envían al JS
    header('Content-Type: application/json; charset=utf-8');
    echo json_encode($respuesta);
    exit(); // Detener la ejecución del código
}

// Valor POST
$servername = 'localhost';
$username = 'root';
$password = '';
$dbname = 'intranet';

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

if (!($conn->connect_error)) {
    // Buscamos en la bbdd ese usuario
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
        }
        // Comprobar HASH

    } else {
        // Invalid username/password
        $respuesta['error'] = true;
        $respuesta['errorType'] = "invalid username/password";
    }
    // Comprobar que el usuario existe

    // Conexiones
    $stmt->close();
    $conn->close();
}

// Datos que se envían al JS
header('Content-Type: application/json; charset=utf-8');
echo json_encode($respuesta);
?>