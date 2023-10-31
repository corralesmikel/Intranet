document.addEventListener('DOMContentLoaded', function (event) {
    Noticias();
    //Login();
});

function Noticias() {

    $.ajax({
        url: './Noticias.php',
        type: "POST",
        dataType: 'json',
        success: function (response) {
            //Variable
            var myhtml = "";
            //Loop
            for (var i = 0; i < response.length && i < 2; i++) {
                //Titulo
                myhtml += "<div class='News'><div class='T_News'>";
                myhtml += "<h1>" + response[i].titulo + "</h1></div>";
                //Titulo
                //Subtitulo
                myhtml += "<div class='S_News'>";
                myhtml += "<h3>" + response[i].subtitulo + "</h3></div>";
                //Subtitulo
                //Imagen
                myhtml += "<div class='I_News'><style>";
                myhtml += ".I_News {background-image: url(" + response[i].imagenes + ");}</style></div>";
                //Imagen
            }
            //ID Container
            document.getElementById("News_C_ID").innerHTML = myhtml;
            //ID Container
        },
        error: function (xhr) {
            alert("An AJAX error occured: " + xhr.status + " " + xhr.statusText);
        }
    });
}

/*
function Login() {
    var datos = {
        'Titulo': Titulo,
        'Subtitulo': Subtitulo,
        'Imagenes': Imagenes
    };


    jQuery.ajax({
        url: '../php/Noticias.php',
        type: "POST",
        data: { Param: JSON.stringify(datos) },
        dataType: 'json',

        success: function (response) { // response contiene la respuesta del server
            alert(response.status);
        },
        error: function (xhr) {
            console.error(xhr.responseText);
        }
    });
}
*/