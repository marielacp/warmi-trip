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

  // Creando el código de usuario en la rama de posts 
  // firebase.database().ref('posts/').set({ UID });

  // Cargando imagenes del localstorage según el id de usuario


  firebase.database().ref('posts/' + UID).on('value', function(snapshot) {

  });
  
  // limpiando el texto
    
  // document.getElementById('txt-file').files[0]['name'].val('');
  // Obteniendo imagenes del input file
  $('#btn-save-file').click(function() {
    // Referenciando al storage nodo raiz
    var $storageRef = firebase.storage().ref();

    
    console.log($storageRef);

    var $fileName = document.getElementById('txt-file').files[0]['name'];

    var $description = $('#txt-description').val();

    var $uploadTask = $storageRef.child('img/' + $fileName).put(document.getElementById('txt-file').files[0]);
    
    $uploadTask.on('state_changed', function(snapshot) {

    }, function(error) {
      alert('Hubo un error en la carga de imágenes');
    }, function() { 
      var $downloadURL = $uploadTask.snapshot.downloadURL;
      alert('Se subio la imagen con la url  :' + $downloadURL);
      console.log($downloadURL);

       
      // Guardando los posts en la base de datos - fotos
     

      firebase.database().ref('posts/' + UID).push(

        {
          photo: $downloadURL,
          description: $description,
          date: $date
        }

      );
      document.getElementById('txt-file').files[0]['name'].innerHTML = '';
      $('#txt-description').val('');
      // Insertando los posts en el muro
      var $newDivPhoto = $('<div class=\'post-perfil\'></div>');
      $newDivPhoto.append('<p class="date-post">' + $date + '</p>');
      $newDivPhoto.append('<img class="img-responsive img-rounded post-foto center-block" src="' + $downloadURL + '">');
  
      $newDivPhoto.append('<p class="text-center">' + $description + '</p>');
      
      $('#container-post div:first-child').before($newDivPhoto);
    });
  });


  // Guardando los posts en la base de datos .posts
  $('#btn-save-post').click(function() {
    var $post = $('#txt-post').val();
    var $newDivPost = $('<div class=\'post-perfil\'></div>');
    $newDivPost.append('<p class="date-post">' + $date + '</p>');
    $newDivPost.append('<p class="date-post">' + $post + '</p>');
    //$('#container-post').children(0).before($newDivPost);
console.log($('#container-post > div'));

    $('#container-post div:first-child').before($newDivPost);
  
    firebase.database().ref('posts/' + UID).push(
      {
        publish: $post,
        date: $date

      });
    $('#txt-post').val('');
  });
}); 