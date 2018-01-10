$(document).ready(function() {
  // Obteniendo imagenes del input file
  $('#btn-save-file').click(function() {
    var $fileName = document.getElementById('txt-file').files[0]['name'];
    alert($fileName);
    var $description = $('#txt-description').val();
    $('#container-post').append('<img class="img-responsive img-rounded post-foto center-block" src="../assets/img/'+$fileName +'">')
    
    $('#container-post').append('<p class="text-center">'+$description+'</p>')
    
  });
}); 