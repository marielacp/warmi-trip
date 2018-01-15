$(document).ready(function () {
  // Obteniendo el UID del localStorage
  var UID = window.localStorage.getItem('storageUID');
  // Obteniendo la fecha actual
  var d = new Date();
  var $date = d.getFullYear() + '/' + (d.getMonth() + 1) + '/' + d.getDate() + ' ' + d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds();

  // Leyendo los datos del usuario
  firebase.database().ref('bd/' + UID).on('value', function (snap) {
    $('#img-perfil').attr('src', snap.val()['photo']);
    $('#img-ico-perfil').attr('src', snap.val()['photo']);
    $('#txt-edit-name').attr('value', snap.val()['name']);
    $('#txt-edit-email').attr('value', snap.val()['email']);
  });

  // Leyendo los datos del viaje del usuario
  firebase.database().ref('trips/' + UID).on('value', function (snap) {
    var arrTrip = Object.keys(snap.val());
    var lastTrip = snap.val()[arrTrip[arrTrip.length - 1]];

    // console.log(lastTrip['transporte']);
    $('#trip-city').html('<strong>Lugar:</strong> ' + lastTrip['place']);
    $('#trip-date').html('<strong>Del:</strong> ' + lastTrip['fechaDePartida'] + ' <strong>al </strong>' + lastTrip['fechaDeLlegada']);
    $('#trip-budget').html(lastTrip['budget']);
  });


  // Cargando imagenes del localstorage según el id de usuario


  firebase.database().ref('photos/' + UID).on('value', function (snapshot) {
    var phototArray = Object.keys(snapshot.val());


    for (i = 0; i < phototArray.length; i++) {


      var $newDivPhoto = $('<div class=\'post-perfil\'></div>');
      $newDivPhoto.append('<p class="date-post">' + snapshot.val()[phototArray[i]]['date'] + '</p>');
      $newDivPhoto.append('<img class="img-responsive img-rounded post-foto center-block" src="' + snapshot.val()[phototArray[i]]['photo'] + '">');

      $newDivPhoto.append('<p class="text-center">' + snapshot.val()[phototArray[i]]['description'] + '</p>');
      $('#container-photo div:first-child').before($newDivPhoto);

      console.log(snapshot.val()[phototArray[i]]['photo']);
      console.log(snapshot.val()[phototArray[i]]['description']);
      console.log(snapshot.val()[phototArray[i]]['date']);
    }
  });
  // Cargando posts del usuario
  firebase.database().ref('posts/' + UID).on('value', function (snapshot) {
    var postArray = Object.keys(snapshot.val());


    for (i = 0; i < postArray.length; i++) {


      var $newDivPost = $('<div class=\'post-perfil\'></div>');
      $newDivPost.append('<p class="date-post">' + snapshot.val()[postArray[i]]['date'] + '</p>');
      $newDivPost.append('<p class="date-post">' + snapshot.val()[postArray[i]]['publish'] + '</p>');
      // $('#container-post').children(0).before($newDivPost);


      $('#container-post div:first-child').before($newDivPost);

    }
  });

  // Creando la variable city en el storage
  $('#btn-plan').click(function () {
    window.localStorage.setItem('city', $('#select-ciudad').val());
    // console.log($('#select-ciudad').val());
    window.location.href = 'planning.html';
  });

  // Alert del botón peligro
  $('#btn-danger').click(function () {
    alert('En este momento se está enviando tu ubicación a tus contactos de confianza');
  });
  // Cerrando sesión 
  $('#btn-logout').click(function () {
    window.location.href = 'login.html';
  });

  // Guardando fotos en la bd
  $('#btn-save-file').click(function () {
    // Referenciando al storage nodo raiz
    var $storageRef = firebase.storage().ref();
    // console.log($storageRef);


    // Asignamos nombre al archivo y le colocamos la funcion Math, en el caso que se posteen fotos con el mismo nombre
    var $fileName = document.getElementById('txt-file').files[0]['name'] + Math.random();

    var $description = $('#txt-description').val();

    var $uploadTask = $storageRef.child('img/' + $fileName).put(document.getElementById('txt-file').files[0]);
    // Mostrando la barra d progreso
    $('#page-upload').removeClass('hidden');

    $uploadTask.on('state_changed', function (snapshot) {
      // Cargando el progreso  de la barra 

      $('#upload-bar').css('width', '100%');
    }, function (error) {
      alert('Hubo un error en la carga de imágenes');
    }, function () {
      var $downloadURL = $uploadTask.snapshot.downloadURL;
      // Ocultando la barra de progreso
      $('#page-upload').addClass('hidden');
      alert('La imagen ha sido subida de forma exitosa');


      // Guardando los posts en la base de datos - fotos


      firebase.database().ref('photos/' + UID).push(

        {
          photo: $downloadURL,
          description: $description,
          date: $date
        }

      );
      document.getElementById('txt-file').value = '';
      $('#txt-description').val('');
      // Insertando los posts en el muro
      var $newDivPhoto = $('<div class=\'post-perfil\'></div>');
      $newDivPhoto.append('<p class="date-post">' + $date + '</p>');
      $newDivPhoto.append('<img class="img-responsive img-rounded post-foto center-block" src="' + $downloadURL + '">');

      $newDivPhoto.append('<p class="text-center">' + $description + '</p>');

      $('#container-photo div:first-child').before($newDivPhoto);
      // Cerrando la ventana
      $('#myModal').modal('hide');
    });
  });
  // Guardar publicaciones 
  $('#btn-save-post').click(function () {
    var $post = $('#txt-post').val();
    var $newDivPost = $('<div class=\'post-perfil\'></div>');
    $newDivPost.append('<p class="date-post">' + $date + '</p>');
    $newDivPost.append('<p class="date-post">' + $post + '</p>');
    // $('#container-post').children(0).before($newDivPost);


    $('#container-post div:first-child').before($newDivPost);

    firebase.database().ref('posts/' + UID).push(
      {
        publish: $post,
        date: $date

      });
    $('#txt-post').val('');
    $('#myPublish').modal('hide');
  });
}); 