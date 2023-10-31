<?php
session_start();

// Verifica si el usuario está autenticado
if (isset($_SESSION['usuario'])) {
    echo 'Bienvenido, ' . $_SESSION['usuario'];
} else {
    // Si el usuario no está autenticado, muestra un formulario de inicio de sesión
    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        // Procesa el formulario de inicio de sesión
        $usuario = $_POST['usuario'];
        $contrasena = $_POST['contrasena'];

        // Verifica las credenciales del usuario (esto puede variar según tu sistema)
        if ($usuario === 'usuario' && $contrasena === 'contrasena') {
            $_SESSION['usuario'] = $usuario;
            echo 'Inicio de sesión exitoso. Bienvenido, ' . $usuario;
        } else {
            echo 'Credenciales incorrectas';
        }
    } else {
        // Muestra el formulario de inicio de sesión
        ?>
        <form method="post">
            Usuario: <input type="text" name="usuario"><br>
            Contraseña: <input type="password" name="contrasena"><br>
            <input type="submit" value="Iniciar sesión">
        </form>
        <?php
    }
}
?>
