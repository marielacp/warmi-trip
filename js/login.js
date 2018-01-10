/* logeando js con google. */
var provider = new firebase.auth.GoogleAuthProvider();

$('#login').click(function() {
  firebase.auth().signInWithPopup(provider).then(function(result) {
    console.log(result);
    guardaDatos(result.user);
    
  }); 
});
/* funcion guardar datos */
function guardaDatos(user) {
  var usuario = {
    uid: user.uid,
    name: user.displayName,
    email: user.email,
    photo: user.photoURL,
  };
  firebase.database().ref('bd/ ' + user.uid)
    .set(usuario);
}


