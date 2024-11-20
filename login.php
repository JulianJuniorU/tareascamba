<?php
// Incluir el archivo de conexión
include 'conexion.php';

// Iniciar sesión
session_start();

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $email = $_POST['email'];
    $password = $_POST['password'];

    // Consulta para verificar el usuario y la contraseña
    $query = "SELECT * FROM usuarios WHERE email_usuario = ?";
    $stmt = $conn->prepare($query);
    $stmt->bind_param("s", $email);
    $stmt->execute();
    $result = $stmt->get_result();// con esto obtenemos el resultado si el correcto existe en la bd 

    if ($result->num_rows == 1) {
        $user = $result->fetch_assoc();
        
        // Verificar contraseña
        if (password_verify($password, $user['clave_usuario'])) {
            // Si la contraseña es válida, se inicia una sesión para el usuario.
            // Se guarda el ID del usuario en una variable de sesión ($_SESSION['user_id']).
            $_SESSION['user_id'] = $user['id_usuario'];
            $_SESSION['user_name'] = $user['nombre_usuario'];
            header("Location: classroom.html"); // Redirecciona a una página de inicio
            exit();
        } else {
            header("Location: incorrecto.html"); // Redirecciona a una página de inicio
            ##echo "Contraseña incorrecta, <a href='login.html'>Vuelve a iniciar sesion aqui</a>";
        }
    } else {
        header("Location: incorrecto.html");
    }

    $stmt->close();
}
$conn->close();
?>
