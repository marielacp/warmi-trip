$(document).ready(function() {
  // Cargamos los datepickers en todos aquellos elementos que tengan la clase datepicker
  $('.datepicker').datepicker();
  // Obtenemos la ciudad elegida
  var city = 'Cuzco';

  // Obtenemos la data según la ciudad elegida
  firebase.database().ref('place/' + city + '/hotels').on('value', function(snap) {
    console.log(snap.val());
    var hotels = Object.keys(snap.val());
    // Cargamos los hoteles según la ciudad elegida
    for (var i = 0; i < hotels.length; i++) {
      var $option = $('<option value="' + hotels[i] + '"></option>');  
      $('#hotels').append($option);
    }
  });

  // Obteniendo los datos según el hotel seleccionado
  $('#list-hotels').on('input', function() {
    var nameHotel = $(this).val();
  
    firebase.database().ref('place/' + city + '/hotels/' + nameHotel).on('value', function(snap) {
      var rating = snap.val()['rating'];
      
    });

    /* if ($('#list-kind-of-food').val().length === 0) {
      $('#btn-search').prop('disabled', true);
    } else {
      $('#btn-search').prop('disabled', false);
    }*/
  });
}); 