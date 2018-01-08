/* logeando js con google. */
var provider = new firebase.auth.GoogleAuthProvider();

$('#login').click(function() {
  firebase.auth().signInWithPopup(provider).then(function(result) {
    console.log(result);
    guardaDatos(result.user);
    $('#login').hide();
    $('#root').append("<img src='" + result.user.photoURL + "'/ >");
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
    .set(usuario)
}

/* guardando bd */
$('#guardar').click(function() {
  firebase.database().ref('prueba')
    .set({
      nombre: 'mariela',
      edad: '15',
      sexo: 'femenino',
    });
});

/* agregando todas las fotos de inicio de secion de usuarios*/
firebase.database().ref('bd')
  .on('child_added', function(s) {
    var user = s.val();
    $('#root').append("<img width= '100px' src= '" + user.photo + "'/>");
  });
