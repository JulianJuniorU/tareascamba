<?php
include 'conexion.php';

$query = "SELECT * FROM usuarios WHERE nombre_usuario = ?";
    $stmt = $conn->prepare($query);
    $stmt->bind_param("s", $email);
    $stmt->execute();
    $result = $stmt->get_result();// con esto obtenemos el resultado si el correcto existe en la bd 


?>