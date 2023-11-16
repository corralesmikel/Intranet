document.addEventListener('DOMContentLoaded', function (event) {
    checkSession();
});

////////////////////////////////
//////// FALTA EL LOGIN ////////
////////////////////////////////

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
    myHtml += "<h4>Rol (Administrador o Trabajador)</h4>";
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

    //Imprimir la pagina
    document.getElementById('imp').innerHTML = myHtml;
    //Imprimir la pagina

    //Cargar Login
    document.getElementById('boton').addEventListener("click", Login);
    //Cargar Login
}

function Login() {
    var Rol = document.getElementById('Roles').value;

    if (Rol == "Administrador" || Rol == "administrador" || Rol == "aDMINISTRADOR") {
        Administrador();
    } else if (Rol == "Trabajador" || Rol == "trabajador" || Rol == "tRABAJADOR") {
        Trabajador();
    } else {
        alert("Porfavor escriba correctamente el rol");
    }


}

function Administrador() {
    //alert("Eres Administrador");
    var Tipo = 1


    // Mensaje 'No hay suficiente anchura'
    myHtml = "<div class='N_min'>";
    myHtml += "<h1>Esta pagina no tiene soporte en estas resoluciones</h1>";
    myHtml += "</div>";
    // Mensaje 'No hay suficiente anchura'

    // Indice
    myHtml += "<div class='Index'>";
    // Logo
    myHtml += "<img src='img/UNI eibar.png' alt='Logo' class='Logo'>";
    // Logo
    myHtml += "<ul>";
    myHtml += "<li class='Selected'>";
    myHtml += "<h5><a id='Inicio'>Inicio</a></h5>";
    myHtml += "</li>";
    myHtml += "<li>";
    myHtml += "<h5><a id='C_Noticias'>Creador de noticias</a></h5>";
    myHtml += "</li>";
    myHtml += "</ul>";
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

    // Script propio
    myHtml += "<script src='js/jsinx.js'></script>";
    // Script propio

    // LINKS

    //Imprimir la pagina
    document.getElementById('imp').innerHTML = myHtml;
    //Imprimir la pagina

    //Links indice
    document.getElementById('Inicio').addEventListener("click", Administrador);
    document.getElementById('C_Noticias').addEventListener("click", CreadorNoticias);
    //Links indice

    // Noticias la pagina
    Noticias();
    // Noticias la pagina
}

function CreadorNoticias() {
    //alert("Creador noticias");

    // Mensaje "No hay suficiente anchura"
    myHtml = "<div class='N_min'>";
    myHtml += "<h1>Esta pagina no tiene soporte en estas resoluciones</h1>";
    myHtml += "</div>";
    // Mensaje "No hay suficiente anchura"

    // Indice
    myHtml += "<div class='Index'>";
    // Logo
    myHtml += "<img src='img/UNI eibar.png' alt='Logo' class='Logo'>";
    // Logo
    myHtml += "<ul>";
    myHtml += "<li class='Selected'>";
    myHtml += "<h5><a id='Inicio'>Inicio</a></h5>";
    myHtml += "</li>";
    myHtml += "<li>";
    myHtml += "<h5><a id='C_Noticias'>Creador de noticias</a></h5>";
    myHtml += "</li>";
    myHtml += "</ul>";
    myHtml += "</div>";
    // Indice
    // Main
    myHtml += "<div class='Main'>";
    myHtml += "<h3>Titulo</h3>";
    myHtml += "<input type='text' class='Texto' id='Titulo_CN'>";
    myHtml += "<h3>Subtitulo</h3>";
    myHtml += "<input type='text' class='Texto' id='Subtitulo_CN'>";
    myHtml += "<h3>Imagen (Link)</h3>";
    myHtml += "<input type='text' class='Texto' id='Imagen_CN'>";
    myHtml += "<input class='btn btn-primary boton' type='submit' value='Enviar' id='Enviar_CN'>";
    myHtml += "</div>";
    // Main

    // LINKS
    // CSS propio
    myHtml += "<link rel='stylesheet' href='css/Styles Creador de noticias.css'>";
    // CSS propio

    // Script propio
    myHtml += "<script src='js/jscdn.js'></script>";
    // Script propio

    // LINKS

    //Imprimir la pagina
    document.getElementById('imp').innerHTML = myHtml;
    //Imprimir la pagina

    //Links indice
    document.getElementById('Inicio').addEventListener("click", Administrador);
    document.getElementById('C_Noticias').addEventListener("click", CreadorNoticias);
    //Links indice

    //Creador Noticias
    document.getElementById('Enviar_CN').addEventListener("click", Insert);
    //Creador Noticias
}

function Insert() {
    // Variable para filtro
    mal = 0
    // Variable para filtro

    var Titulo = document.getElementById('Titulo_CN').value;
    var Subtitulo = document.getElementById('Subtitulo_CN').value;
    var Imagen = document.getElementById('Imagen_CN').value;

    // Filtro Titulo
    if (/<script.*>.*<\/script>/i.test(Titulo)) {
        // Alerta
        alert("¡No se permiten scripts!");
        // Alerta
        mal = 1
    }
    // Filtro Titulo

    // Filtro Subtitulo
    if (/<script.*>.*<\/script>/i.test(Subtitulo)) {
        // Alerta
        alert("¡No se permiten scripts!");
        // Alerta
        mal = 1
    }
    // Filtro Subtitulo

    // Filtro Imagen
    if (/<script.*>.*<\/script>/i.test(Imagen)) {
        // Alerta
        alert("¡No se permiten scripts!");
        // Alerta
        mal = 1
    }
    // Filtro Imagen

    // Envio a la base de datos
    if (mal == 0) {
        var datos = {
            'Titulo': Titulo,
            'Subtitulo': Subtitulo,
            'Imagen': Imagen
        };


        jQuery.ajax({
            url: 'php/Creador_de_noticias.php',
            type: "POST",
            data: { Param: JSON.stringify(datos) },
            dataType: 'json',

            success: function (response) { // Response contiene la respuesta del server
                //alert (response.status);
                alert("Noticias Creada");
            },
            error: function (xhr) {
                console.log(xhr.responseText);
            }
        });
    }
    // Envio a la base de datos
}

function Trabajador() {
    //alert("Eres Trabajador");
    var Tipo = 0

    // Mensaje 'No hay suficiente anchura'
    myHtml = "<div class='N_min'>";
    myHtml += "<h1>Esta pagina no tiene soporte en estas resoluciones</h1>";
    myHtml += "</div>";
    // Mensaje 'No hay suficiente anchura'

    // Indice
    myHtml += "<div class='Index'>";
    // Logo
    myHtml += "<img src='img/UNI eibar.png' alt='Logo' class='Logo'>";
    // Logo
    myHtml += "<ul>";
    myHtml += "<li class='Selected'>";
    myHtml += "<h5><a id='Inicio'>Inicio</a></h5>";
    myHtml += "</li>";
    myHtml += "</ul>";
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

    // Script propio
    myHtml += "<script src='js/jsinx.js'></script>";
    // Script propio

    // LINKS

    //Imprimir la pagina
    document.getElementById('imp').innerHTML = myHtml;
    //Imprimir la pagina

    //Links indice
    document.getElementById('Inicio').addEventListener("click", Trabajador);
    //Links indice

    // Noticias la pagina
    Noticias();
    // Noticias la pagina
}

function Noticias() {
    $.ajax({
        url: 'php/Noticias.php',
        type: "POST",
        dataType: 'json',
        success: function (response) {
            //Variable
            var Noticias = "";
            //Loop
            for (var i = 0; i < response.length && i < 2; i++) {
                //Titulo
                Noticias += "<div class='News'><div class='T_News'>";
                Noticias += "<h1>" + response[i].titulo + "</h1></div>";
                //Titulo
                //Subtitulo
                Noticias += "<div class='S_News'>";
                Noticias += "<h3>" + response[i].subtitulo + "</h3></div>";
                //Subtitulo
                //Imagen
                Noticias += "<div class='I_News'><style>";
                Noticias += ".I_News {background-image: url(" + response[i].imagenes + ");}</style></div>";
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