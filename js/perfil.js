$(document).ready(function() {
  // Obteniendo el UID del localStorage
  var UID = window.localStorage.getItem('storageUID');
  // Obteniendo la fecha actual
  var d = new Date();
  var $date = d.getFullYear() + '/' + (d.getMonth() + 1) + '/' + d.getDate() + ' ' + d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds();

  // Leyendo los datos del usuario
  firebase.database().ref('bd/' + UID).on('value', function(snap) {
 
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


  firebase.database().ref('photos/' + UID).on('value', function(snapshot) {
    
    var $postArray = Object.keys(snapshot.val());
    console.log(firebase.auth().currentUser.uid);
   
    console.log(snapshot.val()[$postArray[0]]);
    console.log(snapshot.val()[$postArray[0]]['photo'])
    console.log(snapshot.val()[$postArray[0]]['description'])
    console.log(snapshot.val()[$postArray[0]]['date'])
  });
  
  // limpiando el texto
    
  // document.getElementById('txt-file').files[0]['name'].val('');
  // Obteniendo imagenes del input file
  $('#btn-save-file').click(function() {
    // Referenciando al storage nodo raiz
    var $storageRef = firebase.storage().ref();

    
 
    // Asignamos nombre al archivo y le colocamos la funcion Math, en el caso que se posteen fotos con el mismo nombre
    var $fileName = document.getElementById('txt-file').files[0]['name'] + Math.random();

    var $description = $('#txt-description').val();

    var $uploadTask = $storageRef.child('img/' + $fileName).put(document.getElementById('txt-file').files[0]);
    // Mostrando la barra d progreso
    $('#page-upload').removeClass('hidden');
    
    $uploadTask.on('state_changed', function(snapshot) {
      // Cargando el progreso  de la barra 
    
      $('#upload-bar').css('width','100%');
    }, function(error) {
      alert('Hubo un error en la carga de imágenes');
    }, function() { 
      var $downloadURL = $uploadTask.snapshot.downloadURL;
      // Ocultando la barra de progreso
      $('#page-upload').addClass('hidden');
      alert('La imagen ha sido subida d forma exitosa');
     

       
      // Guardando los posts en la base de datos - fotos
     

      firebase.database().ref('photos/' + UID).push(

        {
          photo: $downloadURL,
          description: $description,
          date: $date
        }

      );
      document.getElementById('txt-file').files[0].innerHTML = '';
      $('#txt-description').val('');
      // Insertando los posts en el muro
      var $newDivPhoto = $('<div class=\'post-perfil\'></div>');
      $newDivPhoto.append('<p class="date-post">' + $date + '</p>');
      $newDivPhoto.append('<img class="img-responsive img-rounded post-foto center-block" src="' + $downloadURL + '">');
  
      $newDivPhoto.append('<p class="text-center">' + $description + '</p>');
      
      $('#container-photo div:first-child').before($newDivPhoto);
    });
  });


  // Guardando los posts en la base de datos .posts
  $('#btn-save-post').click(function() {
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
  });
}); 