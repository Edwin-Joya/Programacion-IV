<?php
include('Config.php');
session_start();
if (isset($_POST['login'])) {
    $usuario = $_POST['usuario'];
    $contraseña = $_POST['contraseña'];
    $query = $conexion->prepare("SELECT * FROM usuarios WHERE usuario=:usuario");
    $query->bindParam("usuario", $usuario, PDO::PARAM_STR);
    $query->execute();
    $result = $query->fetch(PDO::FETCH_ASSOC);
    if (!$result) {
        echo '<p class="error">Usuario o contraseña incorrectos</p>';
    } else {
        if (password_verify($contraseña, $result['contraseña'])) {
            $_SESSION['idUsuario'] = $result['idUsuario'];
            echo '<p class="success">Congratulations, you are logged in!</p>';
            header("Location: indexmenu.html");
        } else {
            echo '<p class="error">Username password combination is wrong!</p>';
        }
    }
}
?>