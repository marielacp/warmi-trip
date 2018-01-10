// login
// Copiando instancia del proveedor del servicio 
var provider = new firebase.auth.GoogleAuthProvider();

$('#login').click(function() { // provider = el proveedor del login
  firebase.auth().signInWithPopup(provider).then(function(result) {
    saveData(result.user);
    // Ya nos otorgaron permisos 
    $(this).hide();
  
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
  firebase.database().ref('bd/' + user.uid).set(userToSave); // push añade un registro 
}


