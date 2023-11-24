<?php
$servername = "localhost";
$username = "noticias";
$password = "Admin123";
$dbname = "intranet";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
if (!($conn->connect_error)) {
    $query = "SELECT titulo, subtitulo, imagenes FROM intranet.noticias ORDER BY noticias.Fecha DESC Limit 3";
    $stmt = $conn->prepare($query);
    $stmt->execute();
    $resultset = $stmt->get_result();

    $data = array();
    for ($i = 0; $i < $resultset->num_rows; $i++) {
        $row = $resultset->fetch_assoc();
        $data[] = $row;
    }
    $json_data = json_encode($data, JSON_PRETTY_PRINT);
    header('Content-Type: application/json; charset=utf-8'); //Para enseñar como JSON
    echo $json_data;
    $stmt->close();
    $conn->close();
} else {
    die("Connection failed: " . $conn->connect_error);
}
?>