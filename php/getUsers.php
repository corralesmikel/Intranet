<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "2asir_test";

// Create connection
$conn = new mysqli($servername, $username, $password,$dbname);

session_start();
if ((!($conn->connect_error)) &&(isset($_SESSION['username']))) { // si no hay error de conexión y existe la variable de sesión username
    $query = "SELECT username,company FROM users";   // $query is a simple variable (string)
    $stmt = $conn->prepare($query);  // create a query statement 'controller' (variable name $stmt)
    $stmt->execute();                // execute the statement 
    $resultset = $stmt->get_result(); // get the mysqli resultset
    $jsonArray= array(); // create array to store the fetched data 
    for ($i = 0; $i<$resultset->num_rows; $i++) { 
       $row = $resultset->fetch_assoc(); // fetch each register (table row) 
       array_push($jsonArray,$row);
    }
     $stmt->close();  // close prepared statement
     $conn->close(); // close connection
    
    header('Content-Type: application/json; charset=utf-8');  // add dthe required header
    echo json_encode($jsonArray); //  print the json encoded data
  }
else{
  die("Connection failed: " . $conn->connect_error);
}