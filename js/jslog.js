document.addEventListener("DOMContentLoaded", function (event) {

    document.getElementById('boton').addEventListener('click', insert);
  
  })
  
  function insert() {
    var Usuario = document.getElementById('Nombre').value;
    var Contraseña = document.getElementById('Contraseña').value;
   
    var datos = {
      'Usuario': Usuario,
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