$(document).ready(function() {
  $('#next').hide();
  /* logueando js con cuenta de google. */
  var provider = new firebase.auth.GoogleAuthProvider();
  $('#login').click(function() {
    // Aparece la ventana pop-up que permite validar
    firebase.auth().signInWithPopup(provider).then(function(result) {
      saveData(result.user);
      window.localStorage.setItem('storageUID', result.user.uid);
      // Guardando el UID en el localstorage
      var UID = window.localStorage.getItem('storageUID');
      console.log(UID);
      
      // Redireccionando al perfil
      $('#login').hide();
      $('#next').show();
    });
    
  });



  function saveData(user) {
    console.log(user);
    var userToSave = {
      uid: user.uid,
      name: user.displayName,
      email: user.email,
      photo: user.photoURL
    };
    // probando es el nombre de tu rama

    firebase.database().ref('bd/' + user.uid).set(userToSave); // push añade un registro 
  }
});


