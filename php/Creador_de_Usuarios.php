<?php

$Param = json_decode($_POST['Param']);
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
    $query = "INSERT INTO usuarios(Usuario,Contraseña,Rol,Fecha) VALUES (?,?,0,NOW())";
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
    $returnValue = ['status' => $_POST['Param']];
    echo json_encode($returnValue);
    // Valores que devuelve a JS
} else {
    die("Connection failed: " . $conn->connect_error);
}

?>