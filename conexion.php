<?php
$servername = "localhost";
$username = "root"; // Nombre de usuario de MySQL en XAMPP (por defecto es 'root')
$password = ""; // Contraseña de MySQL (por defecto en XAMPP es vacía)
$dbname = "tareascamba";

// Crear conexión
$conn = new mysqli($servername, $username, $password, $dbname);

// Verificar la conexión
if ($conn->connect_error) {
    die("Conexión fallida: " . $conn->connect_error);
}
##echo "Conexión exitosa";
?>