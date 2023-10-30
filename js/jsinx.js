document.addEventListener('DOMContentLoaded', function (event) {
    Noticias();
    //Login();
});

function Noticias() {
    $.ajax({
        url: './json/api.json',
        dataType: 'json', //specifying here the response type, there's no need to parse the response
        success: function (response) {
            //Variable
            var myhtml = "";
            //Loop
            for (var i = 0; i < response.data.length; i++) {
                myhtml += '<div class="Item-Flex">';
                myhtml += "<img src='" + response.data[i].avatar + "'>";
                myhtml += '<p>' + response.data[i].first_name + '</p>';
                myhtml += '<p>' + response.data[i].email + '</p>';
                myhtml += '</div>';
            }
            //ID Text
            document.getElementById("Main-ID").innerHTML = myhtml;
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