lugaresModulo = (function () {
  var servicioLugares // Servicio para obtener lugares cercanos e información de lugares(como fotos, puntuación del lugar,etc).

    // Completa las direcciones ingresadas por el usuario a y establece los límites
    // con un círculo cuyo radio es de 20000 metros.
  function autocompletar () {
    /* Completar la función autocompletar(): autocompleta los 4 campos de texto de la
    página (las direcciones ingresables por el usuario).
    Para esto creá un círculo con radio de 20000 metros y usalo para fijar
    los límites de la búsqueda de dirección. El círculo no se debe ver en el mapa. */

    if (marcadorModulo.existeMiMarcador()) {
      var miPosicion = marcadorModulo.damePosicion();
    } else {
      miPosicion = posicionCentral;
    }

    var circulo = new google.maps.Circle(
      {center: miPosicion, radius: 20000} 
    );          

    var opciones = {
      bounds: circulo.getBounds(),
      types: ['establishment']
    };

    var inputDireccion = document.getElementById('direccion');
    var inputDesde = document.getElementById('desde');
    var inputHasta = document.getElementById('hasta');
    var inputAgregar = document.getElementById('agregar');
    var autocompleteDireccion = new google.maps.places.Autocomplete(inputDireccion, opciones);
    var autocompleteDesde = new google.maps.places.Autocomplete(inputDesde, opciones);
    var autocompleteHasta = new google.maps.places.Autocomplete(inputHasta, opciones);       
    var autocompleteAgregar= new google.maps.places.Autocomplete(inputAgregar, opciones);        


    autocompleteDireccion.setBounds(circulo.getBounds());
    autocompleteDireccion.setFields(['address_components', 'geometry', 'icon', 'name']);
  }

  // Inicializo la variable servicioLugares y llamo a la función autocompletar
  function inicializar () {
    servicioLugares = new google.maps.places.PlacesService(mapa);
    autocompletar()
  }

  // Busca lugares con el tipo especificado en el campo de TipoDeLugar

  function buscarCerca (posicion) {
    /* Completar la función buscarCerca que realice la búsqueda de los lugares
    del tipo (tipodeLugar) y con el radio indicados en el HTML cerca del lugar
    pasado como parámetro y llame a la función marcarLugares. */

    var req = {
      location: posicion,
      radius: $('#radio')[0].value,
      type: $('#tipoDeLugar')[0].value
    };

    servicioLugares.nearbySearch(req, marcadorModulo.marcarLugares);
}

  return {
    inicializar,
    buscarCerca
  }
})()
