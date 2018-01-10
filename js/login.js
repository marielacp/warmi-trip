$(document).ready(function() {
  /* logueando js con cuenta de google. */
  var provider = new firebase.auth.GoogleAuthProvider();

  $('#login').click(function() {
    // Aparece la ventana pop-up que permite validar
    firebase.auth().signInWithPopup(provider).then(function(result) {
      guardaDatos(result.user);
      window.localStorage.setItem('storageUID', result.user.uid);
      console.log(result.user);
      // Guardando el UID en el localstorage
      var UID = window.localStorage.getItem('storageUID');
      console.log(UID);
      // Creando el código de usuario en la rama de posts 
      firebase.database().ref('posts').set({ UID });
      // Redireccionando al perfil
      window.location.href = 'perfil.html';
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

    // Guardando los datos con el user.id
    firebase.database().ref('bd/' + user.uid).set(usuario);
  }
});


