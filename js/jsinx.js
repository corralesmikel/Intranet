document.addEventListener('DOMContentLoaded', function (event) {
    Noticias();
});

function Noticias() {

    $.ajax({
        url: './../php/Noticias.php',
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