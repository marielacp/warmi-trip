$(document).ready(function() {
  var UID = window.localStorage.getItem('storageUID');
  console.log(UID);
  var d = new Date();
  var $date = d.getFullYear() + '/' + (d.getMonth() + 1) + '/' + d.getDate();
  // Cargando la foto del usuario

  // Cargando los datos del usuario 
 
  firebase.database().ref('bd').on('value', function(data) {

    var user = data.val();
   
    console.log(user);
  })

  //
 // "select-ciudad"
 

 $('.btn-plan').click(function() {

  window.localStorage.setItem('city',$('#select-ciudad').val());
  console.log('botones')
  alert (window.localStorage.getItem('city'))
 });

  // Obteniendo imagenes del input file
  $('#btn-save-file').click(function() {
    var $fileName = document.getElementById('txt-file').files[0]['name'];
  
    var $description = $('#txt-description').val();
    $('#container-post').append('<img class="img-responsive img-rounded post-foto center-block" src="../assets/img/' + $fileName + '">');
    
    $('#container-post').append('<p class="text-center">' + $description + '</p>');
    firebase.database().ref('posts/' + UID).push(
      
      {
        photo: $fileName,
        description: $description,
        date: $date
      });
    $(this).hide();
  });

  $('#btn-save-post').click(function() {
    var $post = $('#txt-post').val();
       
    $('#container-post').append('<p class="text-center">' + $post + '</p>');
    firebase.database().ref('posts/' + UID).push({
      publish: $post,
      date: $date
      
    });

    $(this).hide();
  });
}); 