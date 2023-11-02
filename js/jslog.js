document.addEventListener("DOMContentLoaded", function (event) {

  document.getElementById('boton').addEventListener('click', insert);

})

function insert() {
  //Variable para filtro
  mal = 0
  //Variable para filtro
  var Username = document.getElementById('Username').value;
  var Contraseña = document.getElementById('Contraseña').value;
  //Filtro Usuario
  var regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!regex.test(Username)) {
    //Alerta
    alert("Por favor, ingrese una cuenta de correo electrónico válida");
    //Alerta
    mal = 1
  }
  if (/<script.*>.*<\/script>/i.test(Username)) {
    //Alerta
    alert("¡No se permiten scripts!");
    //Alerta
    mal = 1
  }
  //Filtro Usuario
  //Filtro Contraseña
  if (/<script.*>.*<\/script>/i.test(Contraseña)) {
    //Alerta
    alert("¡No se permiten scripts!");
    //Alerta
    mal = 1
  }
  //Filtro Contraseña

  //Envio a la base de datos
  if (mal == 0) {
    var datos = {
      'Username': Username,
      'Contraseña': Contraseña
    };


    jQuery.ajax({
      url: './../php/Login.php',
      type: "POST",
      data: { Param: JSON.stringify(datos) },
      dataType: 'json',

      success: function (response) { // response contiene la respuesta del server
        //alert (response.status); 
        alert("formulario enviado");
      },
      error: function (xhr) {
        console.log(xhr.responseText);
      }
    });
  }
  //Envio a la base de datos

  //Comprobacion del filtro
  //console.log(mal);
  //Comprobacion del filtro
}