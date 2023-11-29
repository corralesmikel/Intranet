<?php

$received = json_decode($_POST['Param']); // Datos del JS
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

// Anti null y limite de caracteres
if ($received->Usuario === null || trim($received->Usuario) === "") {
    $respuesta['error'] = true;
    $respuesta['errorType'] = "Username cannot be empty";
    $mal = 1;
} elseif (strlen($received->Usuario) > 30) {
    $respuesta['error'] = true;
    $respuesta['errorType'] = "User cannot exceed 30 characters";
    echo json_encode($respuesta);
    exit();
}

if ($received->Contraseña === null || trim($received->Contraseña) === "") {
    $respuesta['error'] = true;
    $respuesta['errorType'] = "Password cannot be empty";
    $mal = 1;
} elseif (strlen($received->Contraseña) < 8) {
    $respuesta['error'] = true;
    $respuesta['errorType'] = "Password must be at least 8 characters";
    echo json_encode($respuesta);
    exit();
} elseif (strlen($received->Contraseña) > 20) {
    $respuesta['error'] = true;
    $respuesta['errorType'] = "Password must be at max 20 characters";
    echo json_encode($respuesta);
    exit();
}
// Anti null y limite de caracteres

// No cumplio los filtros
if ($mal === 1) {
    // Datos que se envían al JS
    header('Content-Type: application/json; charset=utf-8');
    echo json_encode($respuesta);
    exit(); // Detener la ejecución del código
}
// No cumplio los filtros

$servername = 'localhost';
$username = 'AdminUsuarios';
$password = 'Admin123';
$dbname = 'intranet';


$conn = new mysqli($servername, $username, $password, $dbname);

if (!($conn->connect_error)) {

    // Query
    $query = 'SELECT * FROM usuarios WHERE Usuario = ?';
    $stmt = $conn->prepare($query);
    // Query

    // Datos enviados del js
    $stmt->bind_param('s', $received->Usuario);
    // Datos enviados del js

    $result = $stmt->execute();

    $resultset = $stmt->get_result();

    // Comprobar usuario
    if ($resultset->num_rows == 1) {
        $row = $resultset->fetch_assoc();
        if (password_verify($received->Contraseña, $row['Contraseña'])) { // Verifica HASH
            $respuesta['error'] = false;
            session_start();
            $_SESSION['id'] = $row['id'];
            $_SESSION['Usuario'] = $row['Usuario'];
            $_SESSION['Rol'] = $row['Rol'];
            
            // Cookie
            $respuesta['id'] = $row['id'];
            $respuesta['Usuario'] = $row['Usuario'];
            $respuesta['Rol'] = $row['Rol'];
            // Cookie

        } else {
            // Error contraseña
            $respuesta['error'] = true;
            $respuesta['errorType'] = "invalid username/password";
        }
        // Comprobar usuario

    } else {
        // Invalid usuario
        $respuesta['error'] = true;
        $respuesta['errorType'] = "invalid username/password";
    }

    $stmt->close();
    $conn->close();
}

// Datos que se envían al JS
header('Content-Type: application/json; charset=utf-8');
echo json_encode($respuesta);
// Datos que se envían al JS
?>