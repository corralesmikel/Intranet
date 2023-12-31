document.addEventListener('DOMContentLoaded', function (event) {
    checkSession();
});

//----------------------------------------------------------------
function checkSession() {
    $.ajax({
        url: "./php/checkSession.php",
        type: "POST",
        dataType: 'json',
        success: function (response) {

            if (response.exists === false) { // si no existe sesión abierta
                LogPage(); // carga el formulario 
            } else { // si existe sesión abierta
                //PrinPage(response); // carga página principal
                Cookie(response); // carga pagina principal
            }
        },
        error: function (xhr) {
            alert("An AJAX error occured: " + xhr.status + " " + xhr.statusText);
        }
    });
}
//----------------------------------------------------------------
function Cookie(response) {
    if (response.error === true) { // si no existe sesión abierta
        LogPage(); // carga el formulario 
    } else { // si existe sesión abierta
        //PrinPage(response); // carga página principal
        if (response.Rol === 0) {
            //var myHtml = '<div>hola basico ' + response.Usuario + '</div>';
            Trabajador()
        } else {
            //var myHtml = '<div>hola administrador ' + response.Usuario + '</div>';
            Administrador()
        }
        //document.getElementById('imp').innerHTML = myHtml;
    }
}
//----------------------------------------------------------------
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
    myHtml += "<input type='text' class='Text' id='Usuario'>";
    myHtml += "<h3>Contraseña</h3>";
    myHtml += "<input type='password' class='Text' id='Contraseña'>";

    // Boton
    myHtml += "<div class='Botones'>";
    myHtml += "<button type='button' class='btn btn-outline-light Boton' id='boton'>Login</button>";
    myHtml += "<button type='button' class='btn btn-outline-light Boton' id='boton_reg'>Registro</button>";
    myHtml += " </div>";
    // Boton

    myHtml += " </div>";
    // Main
    myHtml += "</div>";

    // LINKS

    // CSS propio
    myHtml += "<link rel='stylesheet' href='css/Styles Login.css'>";
    // CSS propio

    // LINKS

    // Imprimir la pagina
    document.getElementById('imp').innerHTML = myHtml;
    // Imprimir la pagina

    // Cargar Login
    document.getElementById('boton').addEventListener("click", Login);
    // Cargar Login

    // Cargar Registro
    document.getElementById('boton_reg').addEventListener("click", Registro);
    // Cargar Registro
}
//----------------------------------------------------------------
function Login() {
    // Variable para filtro
    var mal = 0;
    // Variable para filtro

    // Datos formulario
    var Usuario = document.getElementById('Usuario').value;
    var Contraseña = document.getElementById('Contraseña').value;
    // Datos formulario

    // Anti null y limite de caracteres
    if (Usuario === null || Usuario.trim() === "") {
        alert("¡El campo de Usuario no puede estar vacío!");
        mal = 1;
    } else if (Usuario.length > 30) {
        alert("¡El usuario no puede tener más de 30 caracteres!");
        mal = 1;
    }

    if (Contraseña === null || Contraseña.trim() === "") {
        alert("¡El campo de Contraseña no puede estar vacío!");
        mal = 1;
    } else if (Contraseña.length < 8) {
        alert("¡La contraseña necesita minimo 8 caracteres!");
        mal = 1;
    } else if (Contraseña.length > 20) {
        alert("¡La contraseña tiene un maximo de 20 caracteres!");
        mal = 1;
    }
    // Anti null y limite de caracteres

    // Filtro Usuario
    var input_u = document.getElementById("Usuario");
    var valor_u = input_u.value;
    var regex = /^[a-zA-Z0-9]+$/;
    if (!regex.test(valor_u)) {
        //Alerta
        alert("¡El nombre de usuario no puede tener caracteres especiales ni espacios!");
        //Alerta
        mal = 1
    }
    // Filtro Usuario

    // Anti script
    if (/<script.*>.*<\/script>/i.test(Usuario)) {
        // Alerta
        alert("¡No se permiten scripts!");
        // Alerta
        mal = 1
    }
    if (/<script.*>.*<\/script>/i.test(Contraseña)) {
        // Alerta
        alert("¡No se permiten scripts!");
        // Alerta
        mal = 1
    }
    // Anti script

    if (mal == 0) {
        // String
        var datos = {
            'Usuario': Usuario,
            'Contraseña': Contraseña
        };
        // String

        // Login

        jQuery.ajax({
            url: './php/Login.php',
            type: "POST",
            data: { Param: JSON.stringify(datos) },
            dataType: 'json',

            success: function (response) { // response contiene la respuesta del server
                //alert("Iniciando Sesion");
                if (response.error === true) { // si no existe sesión abierta
                    LogPage(); // carga el formulario
                    alert("Error al iniciar sesion");
                } else { // si existe sesión abierta
                    //PrinPage(response); // carga página principal
                    if (response.Rol === 0) {
                        //var myHtml = '<div>hola basico ' + response.Usuario + '</div>';
                        Trabajador()
                    } else {
                        //var myHtml = '<div>hola administrador ' + response.Usuario + '</div>';
                        Administrador()
                    }
                    //document.getElementById('imp').innerHTML = myHtml;
                }
            },
            error: function (xhr) {
                console.log("An AJAX error occured: " + xhr.status + " " + xhr.statusText);
            }
        });
    }
    // Login
}
//----------------------------------------------------------------
function Registro() {
    // Variable para filtro
    var mal = 0;
    // Variable para filtro
    //Datos formulario
    var Usuario = document.getElementById('Usuario').value;
    var Contraseña = document.getElementById('Contraseña').value;
    //Datos formulario

    // Filtro Usuario
    var input_u = document.getElementById("Usuario");
    var valor_u = input_u.value;
    var regex = /^[a-zA-Z0-9]+$/;
    if (!regex.test(valor_u)) {
        //Alerta
        alert("Usuario solo se permiten texto alfanumerico NO caracteres especiales");
        //Alerta
        mal = 1
    }
    // Filtro Usuario

    // Anti script
    if (/<script.*>.*<\/script>/i.test(Usuario)) {
        // Alerta
        alert("¡No se permiten scripts!");
        // Alerta
        mal = 1
    }
    if (/<script.*>.*<\/script>/i.test(Contraseña)) {
        // Alerta
        alert("¡No se permiten scripts!");
        // Alerta
        mal = 1
    }
    // Anti script

    // Anti null y limite de caracteres
    if (Usuario === null || Usuario.trim() === "") {
        alert("¡El campo de Usuario no puede estar vacío!");
        mal = 1;
    } else if (Usuario.length > 30) {
        alert("¡El usuario no puede tener más de 30 caracteres!");
        mal = 1;
    }

    if (Contraseña === null || Contraseña.trim() === "") {
        alert("¡El campo de Contraseña no puede estar vacío!");
        mal = 1;
    } else if (Contraseña.length < 8) {
        alert("¡La contraseña necesita minimo 8 caracteres!");
        mal = 1;
    } else if (Contraseña.length > 20) {
        alert("¡La contraseña tiene un maximo de 20 caracteres!");
        mal = 1;
    }
    // Anti null y limite de caracteres

    if (mal == 0) {
        // String
        var datos = {
            'Usuario': Usuario,
            'Contraseña': Contraseña
        };
        // String

        // Crear Usuario
        jQuery.ajax({
            url: 'php/Creador_de_Usuarios.php',
            type: "POST",
            data: { Param: JSON.stringify(datos) },
            dataType: 'json',

            success: function (response) { // Response contiene la respuesta del server
                //alert (response.status);
                alert("Registrado correctamente");
            },
            error: function (xhr) {
                console.log(xhr.responseText);
            }
        });
        // Crear Usuario
    }
}
//----------------------------------------------------------------
function Administrador() {
    // Mensaje 'No hay suficiente anchura'
    myHtml = "<div class='N_min'>";
    myHtml += "<h1>Esta pagina no tiene soporte en estas resoluciones</h1>";
    myHtml += "</div>";
    // Mensaje 'No hay suficiente anchura'

    // Indice
    myHtml += "<div class='Index'>";

    // Logo
    myHtml += "<div class='BlockLogo'>";
    myHtml += "<img src='img/UNI eibar.png' alt='Logo' class='Logo'>";
    myHtml += "</div>";
    // Logo

    // Paginas
    myHtml += "<div class='BlockPaginas'>";
    myHtml += "<ul>";
    myHtml += "<li class='Selected'>";
    myHtml += "<h5><a id='Inicio'>Inicio</a></h5>";
    myHtml += "</li>";
    myHtml += "<li>";
    myHtml += "<h5><a id='C_Noticias'>Creador de noticias</a></h5>";
    myHtml += "</li>";
    myHtml += "</ul>";
    myHtml += "</div>";
    // Paginas

    // Logout
    myHtml += "<div class='BlockLogout'>";
    myHtml += "<button type='button' class='btn btn-primary' id='Logout'>Logout</button>"
    myHtml += "</div>";
    // Logout

    myHtml += "</div>";
    // Indice

    // Carrousel
    myHtml += "<div class='Carrousel'>";
    myHtml += "<div id='myCarousel' class='carousel slide' data-bs-ride='carousel'>";

    // Indicadores
    myHtml += "<ol class='carousel-indicators'>";
    myHtml += "<li data-bs-target='#myCarousel' data-bs-slide-to='0' class='active'></li>";
    myHtml += "<li data-bs-target='#myCarousel' data-bs-slide-to='1'></li>";
    myHtml += "<li data-bs-target='#myCarousel' data-bs-slide-to='2'></li>";
    myHtml += "</ol>";
    // Indicadores

    // Slides
    myHtml += "<div class='carousel-inner'>";
    myHtml += "<div class='carousel-item active'>";
    myHtml += "<img src='img/Car1.jpg' alt='Imagen 1' class='Car'>";
    myHtml += "</div>";
    myHtml += "<div class='carousel-item'>";
    myHtml += "<img src='img/Car2.jpg' alt='Imagen 2' class='Car'>";
    myHtml += "</div>";
    myHtml += "<div class='carousel-item'>";
    myHtml += "<img src='img/Car3.jpg' alt='Imagen 3' class='Car'>";
    myHtml += "</div>";
    myHtml += "</div>";
    // Slides

    // Controles
    myHtml += "<a class='carousel-control-prev' href='#myCarousel' role='button' data-bs-slide='prev'>";
    myHtml += "<span class='carousel-control-prev-icon' aria-hidden='true'></span>";
    myHtml += "<span class='visually-hidden'>Anterior</span>";
    myHtml += "</a>";
    myHtml += "<a class='carousel-control-next' href='#myCarousel' role='button' data-bs-slide='next'>";
    myHtml += "<span class='carousel-control-next-icon' aria-hidden='true'></span>";
    myHtml += "<span class='visually-hidden'>Siguiente</span>";
    myHtml += "</a>";
    // Controles
    myHtml += "</div>";
    myHtml += "</div>";
    // Carrousel

    // Noticias
    myHtml += "<div class='News_Container' id='News_C_ID'></div>";
    // Noticias



    // LINKS

    // CSS propio
    myHtml += "<link rel='stylesheet' href='css/Styles index.css'>";
    // CSS propio

    // LINKS

    //Imprimir la pagina
    document.getElementById('imp').innerHTML = myHtml;
    //Imprimir la pagina

    // Links indice
    document.getElementById('Inicio').addEventListener("click", Administrador);
    document.getElementById('C_Noticias').addEventListener("click", CreadorNoticias);
    document.getElementById('Logout').addEventListener("click", Logout);
    //Links indice

    // Noticias la pagina
    Noticias();
    // Noticias la pagina
}
//----------------------------------------------------------------
function CreadorNoticias() {
    // Mensaje "No hay suficiente anchura"
    myHtml = "<div class='N_min'>";
    myHtml += "<h1>Esta pagina no tiene soporte en estas resoluciones</h1>";
    myHtml += "</div>";
    // Mensaje "No hay suficiente anchura"

    // Indice
    myHtml += "<div class='Index'>";

    // Logo
    myHtml += "<div class='BlockLogo'>";
    myHtml += "<img src='img/UNI eibar.png' alt='Logo' class='Logo'>";
    myHtml += "</div>";
    // Logo

    // Paginas
    myHtml += "<div class='BlockPaginas'>";
    myHtml += "<ul>";
    myHtml += "<li class='Selected'>";
    myHtml += "<h5><a id='Inicio'>Inicio</a></h5>";
    myHtml += "</li>";
    myHtml += "<li>";
    myHtml += "<h5><a id='C_Noticias'>Creador de noticias</a></h5>";
    myHtml += "</li>";
    myHtml += "</ul>";
    myHtml += "</div>";
    // Paginas

    // Logout
    myHtml += "<div class='BlockLogout'>";
    myHtml += "<button type='button' class='btn btn-primary' id='Logout'>Logout</button>"
    myHtml += "</div>";
    // Logout
    myHtml += "</div>";

    // Indice

    // Main
    myHtml += "<div class='Main'>";
    myHtml += "<h3>Aviso el Actualizar/Borrar se hara buscando por Titulo con lo que ¡Escribid bien los titulos o tendreis que eliminar la noticia!</h3>"
    myHtml += "<h3>Titulo</h3>";
    myHtml += "<input type='text' class='Texto' id='Titulo_CN'>";
    myHtml += "<h3>Subtitulo</h3>";
    myHtml += "<input type='text' class='Texto' id='Subtitulo_CN'>";
    myHtml += "<h3>Imagen (Link)</h3>";
    myHtml += "<input type='text' class='Texto' id='Imagen_CN'>";
    // Botones
    myHtml += "<div class='Botones'>";
    myHtml += "<input class='btn btn-primary boton' type='button' value='Crear' id='Crear_CN'>";
    myHtml += "<input class='btn btn-primary boton' type='button' value='Actualizar' id='Actualizar_CN'>";
    myHtml += "<input class='btn btn-primary boton' type='button' value='Borrar' id='Borrar_CN'>";
    myHtml += "</div>";
    // Botones

    myHtml += "</div>";
    // Main

    // LINKS

    // CSS propio
    myHtml += "<link rel='stylesheet' href='css/Styles Creador de noticias.css'>";
    // CSS propio

    // LINKS

    // Imprimir la pagina
    document.getElementById('imp').innerHTML = myHtml;
    // Imprimir la pagina

    //Links indice
    document.getElementById('Inicio').addEventListener("click", Administrador);
    document.getElementById('C_Noticias').addEventListener("click", CreadorNoticias);
    document.getElementById('Logout').addEventListener("click", Logout);
    //Links indice

    //Creador Noticias
    document.getElementById('Crear_CN').addEventListener("click", Insert);
    document.getElementById('Actualizar_CN').addEventListener("click", Update);
    document.getElementById('Borrar_CN').addEventListener("click", Delete);
    //Creador Noticias
}
//----------------------------------------------------------------
function Insert() {
    // Variable para filtro
    mal = 0
    // Variable para filtro

    var Titulo = document.getElementById('Titulo_CN').value;
    var Subtitulo = document.getElementById('Subtitulo_CN').value;
    var Imagen = document.getElementById('Imagen_CN').value;

    // Anti script
    if (/<script.*>.*<\/script>/i.test(Titulo)) {
        // Alerta
        alert("¡No se permiten scripts!");
        // Alerta
        mal = 1
    }
    if (/<script.*>.*<\/script>/i.test(Subtitulo)) {
        // Alerta
        alert("¡No se permiten scripts!");
        // Alerta
        mal = 1
    }
    if (/<script.*>.*<\/script>/i.test(Imagen)) {
        // Alerta
        alert("¡No se permiten scripts!");
        // Alerta
        mal = 1
    }
    // Anti script

    // Anti null y limite de caracteres
    if (Titulo === null || Titulo.trim() === "") {
        alert("¡El campo de Titulo no puede estar vacío!");
        mal = 1;
    } else if (Titulo.length > 15) {
        alert("¡El Título no puede tener más de 15 caracteres!");
        mal = 1;
    }
    if (Subtitulo === null || Subtitulo.trim() === "") {
        alert("¡El campo de Subtitulo no puede estar vacío!");
        mal = 1;
    } else if (Subtitulo.length > 22) {
        alert("¡El Subtítulo no puede tener más de 22 caracteres!");
        mal = 1;
    }
    // Anti null y limite de caracteres

    // Anti null imagenes
    if (Imagen === null || Imagen.trim() === "") {
        alert("¡El campo de Imagen no puede estar vacío!");
        mal = 1;
    }
    // Anti null imagenes

    // Envio a la base de datos
    if (mal == 0) {
        var datos = {
            'Titulo': Titulo,
            'Subtitulo': Subtitulo,
            'Imagen': Imagen
        };


        jQuery.ajax({
            url: './php/Creador_de_noticias.php',
            type: "POST",
            data: { Param: JSON.stringify(datos) },
            dataType: 'json',

            success: function (response) { // Response contiene la respuesta del server
                //alert (response.status);
                alert("Noticia Creada");
            },
            error: function (xhr) {
                console.log(xhr.responseText);
            }
        });
    }
    // Envio a la base de datos
}
//----------------------------------------------------------------
function Update() {
    // Variable para filtro
    mal = 0
    // Variable para filtro

    var Titulo = document.getElementById('Titulo_CN').value;
    var Subtitulo = document.getElementById('Subtitulo_CN').value;
    var Imagen = document.getElementById('Imagen_CN').value;

    // Anti script
    if (/<script.*>.*<\/script>/i.test(Titulo)) {
        // Alerta
        alert("¡No se permiten scripts!");
        // Alerta
        mal = 1
    }
    if (/<script.*>.*<\/script>/i.test(Subtitulo)) {
        // Alerta
        alert("¡No se permiten scripts!");
        // Alerta
        mal = 1
    }
    if (/<script.*>.*<\/script>/i.test(Imagen)) {
        // Alerta
        alert("¡No se permiten scripts!");
        // Alerta
        mal = 1
    }
    // Anti script

    // Anti null y limite de caracteres
    if (Titulo === null || Titulo.trim() === "") {
        alert("¡El campo de Titulo no puede estar vacío!");
        mal = 1;
    } else if (Titulo.length > 15) {
        alert("¡El Título no puede tener más de 15 caracteres!");
        mal = 1;
    }
    if (Subtitulo === null || Subtitulo.trim() === "") {
        alert("¡El campo de Subtitulo no puede estar vacío!");
        mal = 1;
    } else if (Subtitulo.length > 22) {
        alert("¡El Subtítulo no puede tener más de 22 caracteres!");
        mal = 1;
    }
    // Anti null y limite de caracteres

    // Ante null imagenes
    if (Imagen === null || Imagen.trim() === "") {
        alert("¡El campo de Imagen no puede estar vacío!");
        mal = 1;
    }
    // Anti null imagenes

    // Envio a la base de datos
    if (mal == 0) {
        var datos = {
            'Subtitulo': Subtitulo,
            'Imagen': Imagen,
            'Titulo': Titulo
        };

        jQuery.ajax({
            url: 'php/Actualizador_de_noticias.php',
            type: "POST",
            data: { Param: JSON.stringify(datos) },
            dataType: 'json',

            success: function (response) { // Response contiene la respuesta del server
                //alert (response.status);
                alert("Noticia Actualizada");
            },
            error: function (xhr) {
                console.log(xhr.responseText);
            }
        });
    }
}
//----------------------------------------------------------------
function Delete() {
    // Variable para filtro
    mal = 0
    // Variable para filtro

    var Titulo = document.getElementById('Titulo_CN').value;
    var Subtitulo = document.getElementById('Subtitulo_CN').value;
    var Imagen = document.getElementById('Imagen_CN').value;

    // Anti script 
    if (/<script.*>.*<\/script>/i.test(Titulo)) {
        // Alerta
        alert("¡No se permiten scripts!");
        // Alerta
        mal = 1
    }
    if (/<script.*>.*<\/script>/i.test(Subtitulo)) {
        // Alerta
        alert("¡No se permiten scripts!");
        // Alerta
        mal = 1
    }
    if (/<script.*>.*<\/script>/i.test(Imagen)) {
        // Alerta
        alert("¡No se permiten scripts!");
        // Alerta
        mal = 1
    }
    // Anti script

    // Anti null y limite de caracteres
    if (Titulo === null || Titulo.trim() === "") {
        alert("¡El campo de Titulo no puede estar vacío!");
        mal = 1;
    } else if (Titulo.length > 15) {
        alert("¡El Título no puede tener más de 15 caracteres!");
        mal = 1;
    }
    // Anti null y limite de caracteres

    // Envio a la base de datos
    if (mal == 0) {
        var datos = {
            'Titulo': Titulo,
            'Subtitulo': Subtitulo,
            'Imagen': Imagen
        };


        jQuery.ajax({
            url: 'php/Borrador_de_noticias.php',
            type: "POST",
            data: { Param: JSON.stringify(datos) },
            dataType: 'json',

            success: function (response) { // Response contiene la respuesta del server
                //alert (response.status);
                alert("Noticia Borrada");
            },
            error: function (xhr) {
                console.log(xhr.responseText);
            }
        });
    }
}
//----------------------------------------------------------------
function Trabajador() {
    // Mensaje 'No hay suficiente anchura'
    myHtml = "<div class='N_min'>";
    myHtml += "<h1>Esta pagina no tiene soporte en estas resoluciones</h1>";
    myHtml += "</div>";
    // Mensaje 'No hay suficiente anchura'

    // Indice
    myHtml += "<div class='Index'>";
    // Logo
    myHtml += "<div class='BlockLogo'>";
    myHtml += "<img src='img/UNI eibar.png' alt='Logo' class='Logo'>";
    myHtml += "</div>";
    // Logo

    // Paginas
    myHtml += "<div class='BlockPaginas'>";
    myHtml += "<ul>";
    myHtml += "<li class='Selected'>";
    myHtml += "<h5><a id='Inicio'>Inicio</a></h5>";
    myHtml += "</li>";
    myHtml += "</ul>";
    myHtml += "</div>";
    // Paginas

    // Logout
    myHtml += "<div class='BlockLogout'>";
    myHtml += "<button type='button' class='btn btn-primary' id='Logout'>Logout</button>"
    myHtml += "</div>";
    // Logout

    myHtml += "</div>";
    // Indice

    // Carrousel
    myHtml += "<div class='Carrousel'>";
    myHtml += "<div id='myCarousel' class='carousel slide' data-bs-ride='carousel'>";
    // Indicadores
    myHtml += "<ol class='carousel-indicators'>";
    myHtml += "<li data-bs-target='#myCarousel' data-bs-slide-to='0' class='active'></li>";
    myHtml += "<li data-bs-target='#myCarousel' data-bs-slide-to='1'></li>";
    myHtml += "<li data-bs-target='#myCarousel' data-bs-slide-to='2'></li>";
    myHtml += "</ol>";
    // Indicadores

    // Slides
    myHtml += "<div class='carousel-inner'>";
    myHtml += "<div class='carousel-item active'>";
    myHtml += "<img src='img/Car1.jpg' alt='Imagen 1' class='Car'>";
    myHtml += "</div>";
    myHtml += "<div class='carousel-item'>";
    myHtml += "<img src='img/Car2.jpg' alt='Imagen 2' class='Car'>";
    myHtml += "</div>";
    myHtml += "<div class='carousel-item'>";
    myHtml += "<img src='img/Car3.jpg' alt='Imagen 3' class='Car'>";
    myHtml += "</div>";
    myHtml += "</div>";
    // Slides

    // Controles
    myHtml += "<a class='carousel-control-prev' href='#myCarousel' role='button' data-bs-slide='prev'>";
    myHtml += "<span class='carousel-control-prev-icon' aria-hidden='true'></span>";
    myHtml += "<span class='visually-hidden'>Anterior</span>";
    myHtml += "</a>";
    myHtml += "<a class='carousel-control-next' href='#myCarousel' role='button' data-bs-slide='next'>";
    myHtml += "<span class='carousel-control-next-icon' aria-hidden='true'></span>";
    myHtml += "<span class='visually-hidden'>Siguiente</span>";
    myHtml += "</a>";
    // Controles
    myHtml += "</div>";
    myHtml += "</div>";
    // Carrousel

    // Noticias
    myHtml += "<div class='News_Container' id='News_C_ID'></div>";
    // Noticias

    // LINKS

    // CSS propio
    myHtml += "<link rel='stylesheet' href='css/Styles index.css'>";
    // CSS propio

    // LINKS

    //Imprimir la pagina
    document.getElementById('imp').innerHTML = myHtml;
    //Imprimir la pagina

    //Links indice
    document.getElementById('Inicio').addEventListener("click", Trabajador);
    document.getElementById('Logout').addEventListener("click", Logout);
    //Links indice

    // Noticias la pagina
    Noticias();
    // Noticias la pagina
}
//----------------------------------------------------------------
function Noticias() {
    $.ajax({
        url: './php/Noticias.php',
        type: "POST",
        dataType: 'json',
        success: function (response) {
            //Variable
            var Noticias = "";
            //Loop
            for (var i = 0; i < response.length && i < 3; i++) {
                //Titulo
                Noticias += "<div class='News'><div class='T_News'>";
                Noticias += "<h3>" + response[i].Titulo + "</h3></div>";
                //Titulo
                //Subtitulo
                Noticias += "<div class='S_News'>";
                Noticias += "<h5>" + response[i].Subtitulo + "</h5></div>";
                //Subtitulo
                //Imagen

                Noticias += "<img class='I_News' src='" + response[i].Imagenes + "'></div>"
                //Imagen
            }
            //ID Container
            document.getElementById("News_C_ID").innerHTML = Noticias;
            //ID Container
        },
        error: function (xhr) {
            alert("An AJAX error occured: " + xhr.status + " " + xhr.statusText);
        }
    });
}
//----------------------------------------------------------------
function Logout() {
    alert("Cerrando sesion");
    $.ajax({
        url: "./php/logout.php",
        success: function () {
            checkSession(); // se ejecuta el chequeo de sesión, 
            // como /logout.php habrá eliminado la variable de sesión,se cargará el formulario de login.
        },
        error: function (xhr) {
            alert("An AJAX error occured: " + xhr.status + " " + xhr.statusText);
        }
    });
}
//----------------------------------------------------------------