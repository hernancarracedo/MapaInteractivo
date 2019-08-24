streetViewModulo = (function () {
  var panorama // 'Visor' de StreetView

  function inicializar () {
    /* Completar la función inicializar()  que crea un panorama
    en una posición y lo muestra en la página. */

    if (marcadorModulo.existeMiMarcador()) {
      var miPosicion = marcadorModulo.damePosicion();
    } else {
      miPosicion = marcadorModulo.posicionCentral;
    }

    var panorama = new google.maps.StreetViewPanorama(
      document.getElementById('pano'), {
        position: miPosicion,
        pov: {
          heading: 34,
          pitch: 10
        }
      });
    
      mapa.setStreetView(panorama);
  }

  // Actualiza la ubicación del Panorama
  function fijarStreetView (ubicacion) {
    /* Completar la función fijarStreetView que actualiza la posición
    de la variable panorama y cambia el mapa de modo tal que se vea
    el streetView de la posición actual. */
    
    panorama = mapa.getStreetView();
    panorama.setPosition(ubicacion);     
  }

  return {
    inicializar,
    fijarStreetView
  }
})()
