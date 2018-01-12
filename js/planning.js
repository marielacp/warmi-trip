$(document).ready(function() {
  // result user
  // Obtenemos la ciudad elegida
  var $city = window.localStorage.getItem('city');
  var $UID = window.localStorage.getItem('storageUID');
  // Cargando los platos tipicos en el popover
  firebase.database().ref('place/' + $city + '/').on('value', function(snap) {
    var $tipicalFood = Object.keys(snap.val()['platetypic']);
    $('#typical-food').attr('data-content', $tipicalFood);
    $('#btn-breakfast').attr('data-content', snap.val()['price']['breakfast']);
    $('#btn-lunch').attr('data-content', snap.val()['price']['lunch']);
    $('#btn-dinner').attr('data-content', snap.val()['price']['dinner']);
  });

 // Validaciòn campo presupuesto, que genero dos decimales.
$("#txt-budget").on({
  "focus": function (event) {
    $(event.target).select();
  },
  "keyup": function (event) {
    $(event.target).val(function (index, value) {
      return value.replace(/\D/g, "")
        .replace(/([0-9])([0-9]{2})$/, '$1.$2')
        .replace(/\B(?=(\d{3})+(?!\d)\.?)/g, ",");
    });
  }
});


  // Cargamos los datepickers en todos aquellos elementos que tengan la clase datepicker
  $('.datepicker').datepicker();
  // Habilitamos los popovers
  $('[data-toggle="popover"]').popover();
  // Obtenemos la data según la ciudad elegida
  firebase.database().ref('place/' + $city + '/hotels').on('value', function(snap) {
    // console.log(snap.val());
    var $hotels = Object.keys(snap.val());
    // Cargamos los hoteles según la ciudad elegida
    for (var i = 0; i < $hotels.length; i++) {
      var $option = $('<option value="' + $hotels[i] + '">' + $hotels[i] + '</option>');
      $('#hotels').append($option);
    }
  });
  // Obtenemos transporte según la ciudad elegida
  firebase.database().ref('transport').on('value', function(snap) {
    var $arrayTransport = Object.keys(snap.val());
    // Cargamos los hoteles según la ciudad elegida
    for (var i = 0; i < $arrayTransport.length; i++) {
      var $option = $('<option value="' + $arrayTransport[i] + '">' + $arrayTransport[i] + '</option>');
      $('#list-transport').append($option);
    }
  });
  // Obteniendo los datos según el hotel seleccionado
  $('#hotels').on('change', function() {
    var $nameHotel = $(this).val();
    // Limpiando los campos cada vez que elegimos una nueva opcion 
    $('#title-modal').html('');
    $('#modal-map').html('');
    $('#stars').html('');
    $('#wifi').html('');
    $('#tripadvisor').html('');
    $('#price-hotel').html('');
    $('#breakfast').html('');
    $('#address').html('');
    // Obteniendo costo del hotel
    $hotelPrice = 0;
    firebase.database().ref('place/' + $city + '/hotels/' + $nameHotel).on('value', function(snap) {
      $('#title-modal').html(snap.val()['name']);
      $('#modal-map').append(snap.val()['iframe']);
      var $rating = snap.val()['rating'];
      // Insertando iconos de stars según la bd
      for (var i = 0; i < $rating; i++) {
        var $stars = $('<span class="glyphicon glyphicon-star"></span>');
        $('#stars').append($stars);
      }
      // Obteniendo los datos del hotel seleccionado
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
      $('#address').append('<p><a target="" href="#">' + $address + '</a></p>');
    });
    // Llamando al modal con la informacion  del hotel
    $('#modal-hotel').modal('show');
  });
  $('#list-transport').on('change', function() {
    var $companyName = $(this).val();
    // Obteniendo el costo del transporte
    firebase.database().ref('transport/' + $companyName + '/destination-place/' + $city).on('value', function(snap) {
      var $transportPrice = snap.val();
      if ($transportPrice) {
        $('#txt-price-transport').val($transportPrice);
      } else {
        $('#txt-price-transport').val('Destino no disponible');
      }
    });
  });
  // Guardando los datos del planning en la data de firebase
  $('#btn-save').click(function() {
    firebase.database().ref('trips/' + $UID).push(
      $UID = {
        budget: $('#txt-budget').val(),
        fechaDePartida: $('#datepicker1').val(),
        fechaDeLlegada: $('#datepicker2').val(),
        hotel: $('#hotels').val(),
        transporte: $('#list-transport').val(),
        costoTransporte: $('#txt-price-transport').val()

      });
  });
}); 