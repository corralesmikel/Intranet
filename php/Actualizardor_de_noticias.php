<?php

$Param = json_decode($_POST['Param']);
$servername = "localhost";
$username = "AdminNoticias";
$password = "Admin123";
$dbname = "intranet";
$conn = new mysqli($servername, $username, $password, $dbname);


if (!($conn->connect_error)) {
    $query = "UPDATE noticias SET Subtitulo = ?, Imagenes = ? WHERE Titulo = ?;";
    $stmt = $conn->prepare($query);

    $stmt->bind_param('sss', $Param->Subtitulo, $Param->Imagen, $Param->Titulo);

    $stmt->execute();



    $stmt->close();
    $conn->close();



    header('Content-Type: application/json');
    $returnValue = ['status' => $_POST['Param']];
    echo json_encode($returnValue);

} else {
    die("Connection failed: " . $conn->connect_error);
}

?>