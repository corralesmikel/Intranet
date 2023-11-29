<?php

$Param = json_decode($_POST['Param']);
$respuesta = array(); // Inicializar el array de respuesta

// Filtros y validaciones
$mal = 0;

// Anti script
if (preg_match('/<script.*>.*<\/script>/i', $Param->Titulo)) {
    $respuesta['error'] = true;
    $respuesta['errorType'] = "Scripts not allowed in Title";
    echo json_encode($respuesta);
    exit();
}
// Anti script

// Anti null y limite de caracteres
if ($Param->Titulo === null || trim($Param->Titulo) === "") {
    $respuesta['error'] = true;
    $respuesta['errorType'] = "Title cannot be empty";
    echo json_encode($respuesta);
    exit();
} elseif (strlen($Param->Titulo) > 15) {
    $respuesta['error'] = true;
    $respuesta['errorType'] = "Title cannot exceed 15 characters";
    echo json_encode($respuesta);
    exit();
}
// Anti null y limite de caracteres

session_start();
if (!isset($_SESSION['Usuario']))  // Comprobar si a iniciado sesion
{
    // Sesion no iniciada
    die("Not logged in: " . $conn->connect_error);
    // Sesion no iniciada
} else {
    $servername = "localhost";
    $username = "AdminNoticias";
    $password = "Admin123";
    $dbname = "intranet";
    $conn = new mysqli($servername, $username, $password, $dbname);

    if (!($conn->connect_error)) {
        // Query
        $query = "DELETE from noticias where Titulo = ?";
        $stmt = $conn->prepare($query);
        // Query

        // Datos enviados del js
        $stmt->bind_param('s', $Param->Titulo);
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
}
?>