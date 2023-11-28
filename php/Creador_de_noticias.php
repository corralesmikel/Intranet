<?php

$Param = json_decode($_POST['Param']); // Datos del js
$respuesta = array(); // Inicializar el array de respuesta

// Filtro
$mal = 0;
// Filtro

// Anti script en Titulo
if (preg_match('/<script.*>.*<\/script>/i', $Param->Titulo)) {
    $respuesta['error'] = true;
    $respuesta['errorType'] = "Scripts not allowed in Title";
    echo json_encode($respuesta);
    exit();
}
// Anti script en Titulo

// Anti script en Subtitulo
if (preg_match('/<script.*>.*<\/script>/i', $Param->Subtitulo)) {
    $respuesta['error'] = true;
    $respuesta['errorType'] = "Scripts not allowed in Subtitle";
    echo json_encode($respuesta);
    exit();
}
// Anti script en Subtitulo

// Anti script en Imagen
if (preg_match('/<script.*>.*<\/script>/i', $Param->Imagen)) {
    $respuesta['error'] = true;
    $respuesta['errorType'] = "Scripts not allowed in Image";
    echo json_encode($respuesta);
    exit();
}
// Anti script en Imagen

// Anti null en Titulo y limite de caracteres
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
// Anti null en Titulo y limite de caracteres

// Anti null en Subtitulo y limite de caracteres
if ($Param->Subtitulo === null || trim($Param->Subtitulo) === "") {
    $respuesta['error'] = true;
    $respuesta['errorType'] = "Subtitle cannot be empty";
    echo json_encode($respuesta);
    exit();
} elseif (strlen($Param->Subtitulo) > 22) {
    $respuesta['error'] = true;
    $respuesta['errorType'] = "Subtitle cannot exceed 22 characters";
    echo json_encode($respuesta);
    exit();
}
// Anti null en Subtitulo y limite de caracteres

// Anti null en Imagen
if ($Param->Imagen === null || trim($Param->Imagen) === "") {
    $respuesta['error'] = true;
    $respuesta['errorType'] = "Image field cannot be empty";
    echo json_encode($respuesta);
    exit();
}
// Anti null en Imagen

$servername = "localhost";
$username = "AdminNoticias";
$password = "Admin123";
$dbname = "intranet";
$conn = new mysqli($servername, $username, $password, $dbname);

if (!($conn->connect_error)) {
    // Query
    $query = "INSERT INTO noticias(Titulo, Subtitulo, Imagenes, Fecha) VALUES (?, ?, ?, NOW())";
    $stmt = $conn->prepare($query);
    // Query

    // Datos enviados del js
    $stmt->bind_param('sss', $Param->Titulo, $Param->Subtitulo, $Param->Imagen);
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