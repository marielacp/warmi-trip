$(document).ready(function() {
  // Obteniendo el UID del localStorage
  var UID = window.localStorage.getItem('storageUID');
      
  // Leyendo los datos del usuario
  firebase.database().ref('bd/' + UID).on('value', function(snap) {
    $('#img-perfil').attr('src', snap.val()['photo']);
    $('#img-ico-perfil').attr('src', snap.val()['photo']);
    $('#txt-edit-name').attr('value', snap.val()['name']);
    $('#txt-edit-email').attr('value', snap.val()['email']);
  });

  // Leyendo los datos del viaje del usuario
  firebase.database().ref('trips/' + UID).on('value', function(snap) {
    arrTrip = Object.keys(snap.val());
    lastTrip = snap.val()[arrTrip[arrTrip.length - 1]];
    
    console.log(lastTrip['transporte']);
    $('#trip-city').html('<strong>Lugar:</strong> '+lastTrip['place']);
    $('#trip-date').html('<strong>Del:</strong> '+lastTrip['fechaDePartida']+ ' <strong>al </strong>' + lastTrip['fechaDeLlegada']);

    /* $('#img-perfil').attr('src', snap.val()['photo']);
    $('#img-ico-perfil').attr('src', snap.val()['photo']);
    $('#txt-edit-name').attr('value', snap.val()['name']);
    $('#txt-edit-email').attr('value', snap.val()['email']);*/
  });


  // Creando la variable city en el storage
  $('#btn-plan').click(function() {
    window.localStorage.setItem('city', $('#select-ciudad').val());
    // console.log($('#select-ciudad').val());
    window.location.href = 'planning.html';
  });

  // Alert del botón peligro
  $('#btn-danger').click(function() {
    alert('En este momento se está enviando tu ubicación a tus contactos de confianza');
  });
  // Cerrando sesión 
  $('#btn-logout').click(function() {
    window.location.href = 'login.html';
  });
}); 