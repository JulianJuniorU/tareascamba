<?php
// Incluir el archivo de conexión
include 'conexion.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $id_usuario = uniqid(); // Generar un ID único para el usuario
    $nombre = $_POST['firstname'] . ' ' . $_POST['lastname'];
    $email = $_POST['email'];
    $phone = $_POST['phone'];
    $direccion = ''; // Puedes agregar un campo de dirección si es necesario
    $password = $_POST['password'];
    $hashed_password = password_hash($password, PASSWORD_DEFAULT); // Cifrar la contraseña
    $id_rol_usuario = 2; // Asigna el rol predeterminado (2 como ejemplo)

    // Verificar si el correo electrónico ya existe
    $check_query = "SELECT * FROM usuarios WHERE email_usuario = ?";
    $stmt = $conn->prepare($check_query);
    $stmt->bind_param("s", $email);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows == 0) {
        // Insertar el nuevo usuario en la base de datos
        $insert_query = "INSERT INTO usuarios (id_usuario, nombre_usuario, email_usuario, celular_usuario, direccion_usuario, clave_usuario, id_rol_usuario) VALUES (?, ?, ?, ?, ?, ?, ?)";
        $stmt = $conn->prepare($insert_query);
        // Asociar los valores a los placeholders de la consulta preparada utilizando 'bind_param'.
        // El primer parámetro "ssssssi" indica el tipo de dato de cada valor:
        //   - 's' (string): id_usuario, nombre, email, phone, direccion, hashed_password.
        //   - 'i' (integer): id_rol_usuario.
        $stmt->bind_param("ssssssi", $id_usuario, $nombre, $email, $phone, $direccion, $hashed_password, $id_rol_usuario);
        // Ejecutar la consulta preparada.
        // Si la ejecución es exitosa, se muestra un mensaje de éxito con un enlace a la página de inicio de sesión.
        if ($stmt->execute()) {
            echo header("Location: login.html");;
        } else {
            echo "Error en el registro: " . $stmt->error;
        }
    } else {
        echo 'El correo ya ha sido registrado. <a href="login.html">Inicia sesión aquí</a>';
    }

    $stmt->close();
}
$conn->close();
?>
