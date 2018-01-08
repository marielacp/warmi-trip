// login
// Copiando instancia del proveedor del servicio 
var provider = new firebase.auth.GoogleAuthProvider();

$('#login').click(function() { // provider = el proveedor del login
  firebase.auth().signInWithPopup(provider).then(function(result) {
    saveData(result.user);
    // Ya nos otorgaron permisos 
    $(this).hide();
    $('#root').append('<img src=' + result.user.photoURL + '>');
    console.log(result.user);
  });
});

// Escribir en la bd 
function saveData(user) {
  var userToSave = {
    uid: user.uid,
    name: user.displayName,
    email: user.email,
    photo: user.photoURL

  };
  // probando es el nombre de tu rama
  firebase.database().ref('probando/' + user.uid).set(userToSave); // push añade un registro 
}


$('#guardar').click(function() {
  firebase.database().ref('probando').set({ // set crea una nueva rama
    nombre: 'Ada Tatiana YAJAHUANCA',
    edad: '15',
    sexo: 'Femenino'
  });
});

// Aqui estoy leyendo la base data, recolectando a todos los usuarios que han iniciado sesion 

firebase.database().ref('probando').on('child_added', function(snap) {
  var user=snap.val();
  $('#root').append('<img width="100px" src=' + user.photo + '>'); // vas a jalar de la bd
});


/* $(document).ready(function() {

});*/


