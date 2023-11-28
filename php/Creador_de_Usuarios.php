<?php

$Param = json_decode($_POST['Param']);
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

// Anti script en Usuario
if (preg_match('/<script.*>.*<\/script>/i', $Param->Usuario)) {
    $respuesta['error'] = true;
    $respuesta['errorType'] = "Scripts not allowed in Username";
    echo json_encode($respuesta);
    exit();
}

// Anti script en Contraseña
if (preg_match('/<script.*>.*<\/script>/i', $Param->Contraseña)) {
    $respuesta['error'] = true;
    $respuesta['errorType'] = "Scripts not allowed in Password";
    echo json_encode($respuesta);
    exit();
}

// Anti null en Usuario
if ($Param->Usuario === null || trim($Param->Usuario) === "") {
    $respuesta['error'] = true;
    $respuesta['errorType'] = "Username cannot be empty";
    echo json_encode($respuesta);
    exit();
}

// Anti null en Contraseña
if ($Param->Contraseña === null || trim($Param->Contraseña) === "") {
    $respuesta['error'] = true;
    $respuesta['errorType'] = "Password cannot be empty";
    echo json_encode($respuesta);
    exit();
}

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "intranet";
$conn = new mysqli($servername, $username, $password, $dbname);

if (!($conn->connect_error)) {
    // HASH Contraseña
    $hashedPassword = password_hash($Param->Contraseña, PASSWORD_DEFAULT);
    // HASH Contraseña

    // Insert
    $query = "INSERT INTO usuarios(Usuario, Contraseña, Rol, Fecha) VALUES (?, ?, 0, NOW())";
    // Insert

    // Conexiones
    $stmt = $conn->prepare($query);

    $stmt->bind_param('ss', $Param->Usuario, $hashedPassword);

    $stmt->execute();

    $stmt->close();
    $conn->close();
    // Conexiones

    // Valores que devuelve a JS
    header('Content-Type: application/json');
    $returnValue = ['status' => 'success'];
    echo json_encode($returnValue);
    // Valores que devuelve a JS
} else {
    die("Connection failed: " . $conn->connect_error);
}
?>