<?php

$Param = json_decode($_POST['Param']); // Datos del js
$respuesta = array(); // Inicializar el array de respuesta

// Filtros y validaciones
$mal = 0;

// Filtro Usuario: Solo se permiten caracteres alfanuméricos
$regex = '/^[a-zA-Z0-9]+$/';
if (!preg_match($regex, $Param->Usuario)) {
    $respuesta['error'] = true;
    $respuesta['errorType'] = "Invalid characters in Username";
    echo json_encode($respuesta);
    exit();
}
// Filtro Usuario: Solo se permiten caracteres alfanuméricos

// Anti script en Usuario
if (preg_match('/<script.*>.*<\/script>/i', $Param->Usuario)) {
    $respuesta['error'] = true;
    $respuesta['errorType'] = "Scripts not allowed in Username";
    echo json_encode($respuesta);
    exit();
}
// Anti script en Usuario

// Anti script en Contraseña
if (preg_match('/<script.*>.*<\/script>/i', $Param->Contraseña)) {
    $respuesta['error'] = true;
    $respuesta['errorType'] = "Scripts not allowed in Password";
    echo json_encode($respuesta);
    exit();
}
// Anti script en Contraseña

// Anti null y limite de caracteres
if ($Param->Usuario === null || trim($Param->Usuario) === "") {
    $respuesta['error'] = true;
    $respuesta['errorType'] = "Username cannot be empty";
    echo json_encode($respuesta);
    exit();
} elseif (strlen($Param->Usuario) > 30) {
    $respuesta['error'] = true;
    $respuesta['errorType'] = "User cannot exceed 30 characters";
    echo json_encode($respuesta);
    exit();
}

if ($Param->Contraseña === null || trim($Param->Contraseña) === "") {
    $respuesta['error'] = true;
    $respuesta['errorType'] = "Password cannot be empty";
    echo json_encode($respuesta);
    exit();
} elseif (strlen($Param->Contraseña) < 8) {
    $respuesta['error'] = true;
    $respuesta['errorType'] = "Password must be at least 8 characters";
    echo json_encode($respuesta);
    exit();
} elseif (strlen($Param->Contraseña) > 20) {
    $respuesta['error'] = true;
    $respuesta['errorType'] = "Password must be at max 20 characters";
    echo json_encode($respuesta);
    exit();
}
// Anti null y limite de caracteres

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "intranet";
$conn = new mysqli($servername, $username, $password, $dbname);

if (!($conn->connect_error)) {
    // HASH Contraseña
    $hashedPassword = password_hash($Param->Contraseña, PASSWORD_DEFAULT);
    // HASH Contraseña

    // Query
    $query = "INSERT INTO usuarios(Usuario, Contraseña, Rol, Fecha) VALUES (?, ?, 0, NOW())";
    $stmt = $conn->prepare($query);
    // Query

    // Datos enviados del js
    $stmt->bind_param('ss', $Param->Usuario, $hashedPassword);
    // Datos enviados del js

    $stmt->execute();

    $stmt->close();
    $conn->close();

    // Valores que devuelve a JS
    header('Content-Type: application/json');
    $returnValue = ['status' => 'success'];
    echo json_encode($returnValue);
    // Valores que devuelve a JS
} else {
    die("Connection failed: " . $conn->connect_error);
}
?>