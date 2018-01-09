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
    var $nameHotel = $(this).val();
    // Limpiando los campos cada vez que elegimos una nueva opcion  
    $('#stars').html('');
    $('#wifi').html('');
    $('#tripadvisor').html('');
    $('#price-hotel').html('');
    $('#breakfast').html('');
   $('#address').html('');
    // Obteniendo costo del hotel
    $hotelPrice = 0;
  
    firebase.database().ref('place/' + city + '/hotels/' + $nameHotel).on('value', function(snap) {
      var rating = snap.val()['rating'];
      // Insertando iconos de stars según la bd
      for (var i = 0; i < rating; i++) {
        var $stars = $('<span class="glyphicon glyphicon-star"></span>');  
        $('#stars').append($stars);
      }

      var $wifi = snap.val()['Wi-fi'];
      $('#wifi').append($wifi);
      var $tripadvisor = snap.val()['tripadvisor'];
      $('#tripadvisor').append('<p><a target="_blank" href="' + $tripadvisor + '"> Míralo en Tripadvisor</a></p>');
      var $hotelPrice = snap.val()['precio-dia'];
      $('#price-hotel').append($hotelPrice);

      var $breakfast = snap.val()['Desayuno-incluido'];
      $('#breakfast').append($breakfast);

      var $address = snap.val()['address'];
      var $iframe = snap.val()['iframe'];
      $('#address').append('<p><a target="" href="#">'+ $address +'</a></p>');
    });

//Llamando al  modal
$('#modal-hotel').modal('show');
    /* if ($('#list-kind-of-food').val().length === 0) {
      $('#btn-search').prop('disabled', true);
    } else {
      $('#btn-search').prop('disabled', false);
    }*/
  });
}); 