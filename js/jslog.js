document.addEventListener("DOMContentLoaded", function (event) {

    document.getElementById('boton').addEventListener('click', insert);
  
  })
  
  function insert() {
    var Username = document.getElementById('Username').value;
    var Contraseña = document.getElementById('Contraseña').value;

    var regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!regex.test(Username)) {
        //Alerta
        alert("Por favor, ingrese una cuenta de correo electrónico válida");
        //Alerta
        mal = 1
    }
   
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
        alert("el dato ya existe");
      }
    });
  }