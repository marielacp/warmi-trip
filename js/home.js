
$(window).scroll(function () {
    if ($(this).scrollTop() > 50)  /*height in pixels when the navbar becomes non opaque*/ {
        $('.opaque-navbar').addClass('opaque');
    } else {
        $('.opaque-navbar').removeClass('opaque');
    }
});
//
$(document).ready(function() {

    // Obteniendo el UID del localStorage
  var UID = window.localStorage.getItem('storageUID');

  // Leyendo los datos del usuario
  firebase.database().ref('bd/' + UID).on('value', function(snap) {
    
       $('#img-perfil').attr('src', snap.val()['photo']);
       
     });

});