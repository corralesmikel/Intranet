<?php

$Param = json_decode($_POST['Param']);
$respuesta = array(); // Inicializar el array de respuesta

// Filtros y validaciones
$mal = 0;

// Anti script en Titulo
if (preg_match('/<script.*>.*<\/script>/i', $Param->Titulo)) {
    $respuesta['error'] = true;
    $respuesta['errorType'] = "Scripts not allowed in Title";
    echo json_encode($respuesta);
    exit();
}

// Anti script en Subtitulo
if (preg_match('/<script.*>.*<\/script>/i', $Param->Subtitulo)) {
    $respuesta['error'] = true;
    $respuesta['errorType'] = "Scripts not allowed in Subtitle";
    echo json_encode($respuesta);
    exit();
}

// Anti script en Imagen
if (preg_match('/<script.*>.*<\/script>/i', $Param->Imagen)) {
    $respuesta['error'] = true;
    $respuesta['errorType'] = "Scripts not allowed in Image";
    echo json_encode($respuesta);
    exit();
}

// Anti null en Titulo
if ($Param->Titulo === null || trim($Param->Titulo) === "") {
    $respuesta['error'] = true;
    $respuesta['errorType'] = "Title cannot be empty";
    echo json_encode($respuesta);
    exit();
}

// Anti null en Subtitulo
if ($Param->Subtitulo === null || trim($Param->Subtitulo) === "") {
    $respuesta['error'] = true;
    $respuesta['errorType'] = "Subtitle cannot be empty";
    echo json_encode($respuesta);
    exit();
}

// Anti null en Imagen
if ($Param->Imagen === null || trim($Param->Imagen) === "") {
    $respuesta['error'] = true;
    $respuesta['errorType'] = "Image field cannot be empty";
    echo json_encode($respuesta);
    exit();
}

$servername = "localhost";
$username = "AdminNoticias";
$password = "Admin123";
$dbname = "intranet";
$conn = new mysqli($servername, $username, $password, $dbname);

if (!($conn->connect_error)) {
    $query = "INSERT INTO noticias(Titulo, Subtitulo, Imagenes, Fecha) VALUES (?, ?, ?, NOW())";
    $stmt = $conn->prepare($query);

    $stmt->bind_param('sss', $Param->Titulo, $Param->Subtitulo, $Param->Imagen);

    $stmt->execute();

    $stmt->close();
    $conn->close();

    // Valores que devuelve a JS
    header('Content-Type: application/json');
    $returnValue = ['status' => 'success'];
    echo json_encode($returnValue);

} else {
    die("Connection failed: " . $conn->connect_error);
}
?>