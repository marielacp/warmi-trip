$(document).ready(function() {
  // Obteniendo el UID del localStorage
  var UID = window.localStorage.getItem('storageUID');
  // Obteniendo la fecha actual
  var d = new Date();
  var $date = d.getFullYear() + '/' + (d.getMonth() + 1) + '/' + d.getDate();

  // Leyendo los datos del usuario
  firebase.database().ref('bd/' + UID).on('value', function(snap) {
    // console.log(snap.val()['photo']);
    $('#img-perfil').attr('src', snap.val()['photo']);
    $('#txt-user').attr('value', snap.val()['name']);
    $('#img-user-modal').attr('src', snap.val()['photo']);
    $('#txt-user-modal').attr('value', snap.val()['name']);
    $('#txt-mail-modal').attr('value', snap.val()['email']);
  });
  // Alert del botón peligro
  $('#btn-danger').click(function() {
    alert('En este momento se está enviando tu ubicación a tus contactos de confianza');
  });

  // Cerrando sesión 
  $('#btn-logout').click(function() {
    window.location.href = 'login.html';
  });


  // Guardando en el localstorage la ciudad que se elije
  $('.btn-plan').click(function() {
    window.localStorage.setItem('city', $('#select-ciudad').val());
    window.location.href = 'planning.html';
  });

  // Obteniendo imagenes del input file
  $('#btn-save-file').click(function() {
    // Referenciando al storage nodo raiz
    var $storageRef = firebase.storage().ref();

    
    console.log($storageRef);

    var $fileName = document.getElementById('txt-file').files[0]['name'];

    var $description = $('#txt-description').val();

    var $uploadTask = $storageRef.child('img/' + $fileName).put(document.getElementById('txt-file').files[0]);

    $uploadTask.on('', function(snapshot) {

    }, function(error) {
      alert('Hubo un error en la carga de imágenes');

    }, function() {
      var $downloadURL=$uploadTask.snapshot.downloadURL;
      
    });

    // Guardando los posts en el muro
    $('#container-post').append('<p class="date-post">' + $date + '</p>');
    $('#container-post').append('<img class="img-responsive img-rounded post-foto center-block" src="../assets/img/' + $fileName + '">');

    $('#container-post').append('<p class="text-center">' + $description + '</p>');
    // Guardando los posts en la base de datos - fotos
    firebase.database().ref('posts/' + UID).push(

      {
        photo: $fileName,
        description: $description,
        date: $date
      });
    document.getElementById('txt-file').files[0]['name'].innerHTML = '';
    $('#txt-description').val('');
  });

  // Guardando los posts en la base de datos .posts
  $('#btn-save-post').click(function() {
    var $post = $('#txt-post').val();
    $('#container-post').append('<p class="date-post">' + $date + '</p>');
    $('#container-post').append('<p class="text-center">' + $post + '</p>');
  
    firebase.database().ref('posts/' + UID).push({
      publish: $post,
      date: $date

    });
    $('#txt-post').val('');
  });
}); 