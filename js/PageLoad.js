document.addEventListener('DOMContentLoaded', function (event) {
    checkSession();
});

function checkSession() {
    $.ajax({
        url: "./php/checkSession.php",
        type: "POST",
        dataType: 'json',
        success: function (response) {

            if (response.exists === false) { // si no existe sesión abierta
                LogPage(); // carga el formulario 
            } else { // si existe sesión abierta
                PrinPage(response); // carga página principal
            }
        },
        error: function (xhr) {
            alert("An AJAX error occured: " + xhr.status + " " + xhr.statusText);
        }
    });
}
function LogPage() {
    // Mensaje No hay suficiente anchura
    myHtml = "<div class='N_min'>";
    myHtml += "<h1>Esta pagina no tiene soporte en estas resoluciones</h1>";
    myHtml += "</div>";
    // Mensaje No hay suficiente anchura

    myHtml += "<div class='Center'>";
    // Logo
    myHtml += "<img src='img/UNI eibar.png' alt='Logo' class='Logo'>";
    // Logo

    // Main
    myHtml += "<div class='Main'>";
    myHtml += "<h3>Usuario</h3>";
    myHtml += "<input type='text' class='Text' id='Username'>";
    myHtml += "<h3>Contraseña</h3>";
    myHtml += "<input type='text' class='Text' id='Contraseña'>";
    // Rol
    myHtml += "<h4>Rol (1 Letra Mayus)</h4>";
    myHtml += "<input list='Rol' class='Text' id='Roles'>";

    myHtml += "<datalist id='Rol'>";
    myHtml += "<option value='Administrador'>";
    myHtml += "<option value='Trabajador'>";
    myHtml += "</datalist>";
    // Rol
    myHtml += "<button type='button' class='btn btn-outline-light Boton' id='boton'>Login</button>";

    myHtml += " </div>";
    // Main
    myHtml += "</div>";

    // LINKS

    // CSS propio
    myHtml += "<link rel='stylesheet' href='css/Styles Login.css'>";
    // CSS propio

    // LINKS

    document.getElementById('imp').innerHTML += myHtml;

    document.getElementById('boton').addEventListener("click", Login);
}

function Login() {
    var Rol = document.getElementById('Roles').value;

    alert("Eres " + Rol);

    if (Rol == "Administrador") {
        var Tipo = 1
    } else if (Rol == "Trabajador") {
        var Tipo = 0
    } else {
        alert("Eres subnormal");
    }
    console.log(Tipo);

}